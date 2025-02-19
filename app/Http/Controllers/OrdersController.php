<?php

namespace App\Http\Controllers;

use App\Models\Order;
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
            'products.*.product_price' => 'required|numeric|min:0',
            'products.*.total_price' => 'required|numeric|min:0',
            'delivered_date' => 'required|string', // Validation for ISO 8601 format
        ]);
    
        // if ($validator->fails()) {
        //     return response()->json(['error' => $validator->errors()], 400);
        // }
    
        // Check stock availability
        foreach ($request->products as $product) {
            $productModel = Product::find($product['product_id']);
            if ($productModel->stock_quantity < $product['quantity']) {
                return response()->json(['error' => 'Insufficient stock for ' . $productModel->name], 400);
            }
        }
    
        // Deduct stock quantities
        foreach ($request->products as $product) {
            $productModel = Product::find($product['product_id']);
            $productModel->stock_quantity -= $product['quantity'];
            $productModel->save();
        }
    
      
    
        // Create order with delivered_date from request
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
            'delivered_date' => $request->delivered_date, // Store delivered_date
        ]);
    
        return response()->json(['message' => 'Order placed successfully.', 'order' => $order], 201);
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
    public function update(Request $request, string $id)
    {
        $userId = Auth::id();
        $validator = Validator::make($request->all(), [
            'payment_amount' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $order = Order::where('user_id', $userId)->where('id', $id)->first();
        if (!$order) {
            return response()->json(['error' => 'Order not found or unauthorized access.'], 404);
        }

        if ($request->payment_amount > $order->pending_payment) {
            return response()->json(['error' => 'Payment exceeds pending amount.'], 400);
        }

        $order->paid_payment += $request->payment_amount;
        $order->pending_payment -= $request->payment_amount;
        $order->status = $order->pending_payment == 0 ? 'paid' : 'pending';
        $order->save();

        return response()->json(['message' => 'Payment successful.', 'order' => $order]);
    }

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
    
        // Decode the products JSON stored in the order
        $products = json_decode($order->products, true);
    
        // Loop through each product in the order and update the quantity in the Products table
        foreach ($products as $product) {
            $productRecord = Product::find($product['product_id']);
            
            if ($productRecord) {
                // Add the product quantity from the order back to the product's quantity
                $productRecord->stock_quantity += $product['quantity'];
                $productRecord->save(); // Save the updated product
            }
        }
    
        // Update the order status to 'canceled'
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


   


}
