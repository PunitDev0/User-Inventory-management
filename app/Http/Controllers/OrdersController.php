<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderpaymentLog;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class OrdersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::all();
        return response()->json(['orders' => $orders]);
    }

    /**
     * Store a newly created order in storage.
     */
    public function store(Request $request)
    {
        $userId = Auth::id();
    
        // Validate request data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
            'address' => 'required|string',
            'city' => 'required|string',
            'zip' => 'required|string',
            'paid_amount' => 'required|numeric|min:0',
            'total_amount' => 'required|numeric|min:0',
            'pending_payment' => 'required|numeric|min:0',
            'products' => 'required|array|min:1',
            'products.*.product_id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
            'products.*.From' => 'required|string|',
            'products.*.product_price' => 'required|numeric|min:0',
            'products.*.total_price' => 'required|numeric|min:0',
            'delivered_date' => 'required|string',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
    
        // Create the order without reducing stock
        $order = Order::create([
            'user_id' => $userId,
            'user_name' => $request->name,
            'user_email' => $request->email,
            'user_phone' => $request->phone,
            'user_address' => $request->address,
            'user_city' => $request->city,
            'user_zip' => $request->zip,
            'paid_payment' => $request->paid_amount,
            'total_amount' => $request->total_amount,
            'pending_payment' => $request->pending_payment,
            'products' => json_encode($request->products),
            'status' => $request->pending_payment > 0 ? 'pending' : 'paid',
            'delivered_date' => $request->delivered_date,
        ]);
    
        // Log payment in OrderpaymentLog
        $paymentLog = OrderpaymentLog::create([
            'order_id' => $order->id,
            'user_id' => $userId,
            'payment_amount' => $request->paid_amount,
        ]);
    
        // Check if the type is 'checkout' and delete the user's checkout data
        if ($request->type === 'checkout') {
            Cart::where('user_id', $userId)->delete(); // Delete checkout data after order
        }
    
        return response()->json([
            'message' => 'Order placed successfully.',
            'order' => $order,
            'payment_log' => $paymentLog,
            'type' => $request->type
        ], 201);
    }
    
    
    

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['error' => 'Order not found.'], 404);
        }
        return response()->json(['order' => $order]);
    }

    /**
     * Update payment for an existing order.
     */

    /**
     * Remove the specified order from storage.
     */
    public function destroy(string $id)
    {
        // Find the order by ID
        $order = Order::find($id);
    
        // Check if the order exists
        if (!$order) {
            return response()->json(['error' => 'Order not found.'], 404);
        }

        $order->status = 'canceled';
        $order->save(); // Save the updated order status
    
        // Return success response
        return response()->json(['message' => 'Order status updated to canceled and product quantities restored.']);
    }
    

    /**
     * Fetch all orders for the authenticated user.
     */
    public function AuthOrders()
    {
        $userId = Auth::id();
        $orders = Order::where('user_id', $userId)->get();
        return response()->json(['orders' => $orders ?: 'No orders found.']);
    }


   
    public function checkAvailability(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'products' => 'required|array|min:1',
            'products.*.product_id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
            'delivered_date' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $availability = [];

        foreach ($request->products as $product) {
            $productModel = Product::find($product['product_id']);
            $requestedQty = $product['quantity'];

            // Get total quantity reserved for this product on the given date
            $reservedQty = Order::where('delivered_date', $request->delivered_date)
                ->where('status', '!=', 'canceled')
                ->get()
                ->sum(function ($order) use ($product) {
                    $products = json_decode($order->products, true);
                    $matchedProduct = array_filter($products, fn($p) => $p['product_id'] == $product['product_id']);
                    return !empty($matchedProduct) ? array_values($matchedProduct)[0]['quantity'] : 0;
                });

            $availableQty = $productModel->stock_quantity - $reservedQty;
            $isAvailable = $availableQty >= $requestedQty;

            $availability[$product['product_id']] = [
                'available' => $isAvailable,
                'message' => $isAvailable 
                    ? "Available: $availableQty in stock" 
                    : "Not enough stock. Only $availableQty available",
            ];
        }

        return response()->json($availability);
    }


}
