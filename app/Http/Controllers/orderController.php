<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public function OrderStore(Request $request)
    {
        $userId = Auth::id(); // Get authenticated user's ID

        // Validate the request data
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
            'products.*.product_name' => 'required|string',
            'products.*.quantity' => 'required|integer|min:1',
            'products.*.product_price' => 'required|numeric|min:0',
            'products.*.total_price' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Check product stock and update quantities
        $products = $request->input('products');
        foreach ($products as $product) {
            $productModel = Product::find($product['product_id']);
            if (!$productModel) {
                return response()->json(['error' => 'Product not found: ' . $product['product_name']], 404);
            }
            if ($productModel->stock_quantity < $product['quantity']) {
                return response()->json(['error' => 'Insufficient stock for ' . $product['product_name']], 400);
            }
        }

        // Deduct stock quantities
        foreach ($products as $product) {
            $productModel = Product::find($product['product_id']);
            $productModel->stock_quantity -= $product['quantity'];
            $productModel->save();
        }

        // Create the order
        $order = Order::create([
            'user_id' => $userId,
            'user_name' => $request->input('name'),
            'user_email' => $request->input('email'),
            'user_phone' => $request->input('phone'),
            'user_address' => $request->input('address'),
            'user_city' => $request->input('city'),
            'user_zip' => $request->input('zip'),
            'paid_payment' => $request->input('paid_amount'),
            'total_amount' => $request->input('total_amount'),
            'pending_payment' => $request->input('pending_payment'),
            'products' => json_encode($products),
            'status' => $request->input('pending_payment') > 0 ? 'pending' : 'paid',
        ]);

        return response()->json([
            'message' => 'Order placed successfully.',
            'order' => $order,
        ], 201);
    }

    public function PayPendingPayment(Request $request)
    {
        $userId = Auth::id(); // Get authenticated user's ID

        // Validate the request data
        $validator = Validator::make($request->all(), [
            'order_id' => 'required|exists:orders,id',
            'payment_amount' => 'required|numeric|min:0',
        ]);
        
        // if ($validator->fails()) {
        //     return response()->json(['error' => $validator->errors()], 400);
        // }
        // dd(Order::where('user_id', $userId)
        // ->where('id', $request->input('order_id'))
        // ->first());

        // Fetch the order
        $order = Order::where('user_id', $userId)
            ->where('id', $request->input('order_id'))
            ->first();

        if (!$order) {
            return response()->json(['error' => 'Order not found or unauthorized access.'], 404);
        }

        // Validate payment amount
        if ($request->input('payment_amount') > $order->pending_payment) {
            return response()->json(['error' => 'Payment exceeds pending amount.'], 400);
        }

        // Update order payment details
        $order->paid_payment += $request->input('payment_amount');
        $order->pending_payment -= $request->input('payment_amount');

        // if ($order->pending_payment == 0) {
        //     $order->status = 'paid';
        // }

        $order->save();

        return response()->json([
            'message' => 'Payment successful.',
            'order' => $order,
        ]);
    }

     // Method to fetch all orders for the authenticated user
     public function getAllOrders(Request $request)
     {
         $userId = Auth::id(); // Get authenticated user's ID
 
         // Get all orders for the authenticated user
         $orders = Order::where('user_id', $userId)->get();
 
         if ($orders->isEmpty()) {
             return response()->json(['message' => 'No orders found.'], 404);
         }
 
         return response()->json([
             'orders' => $orders,
         ]);
     }
}