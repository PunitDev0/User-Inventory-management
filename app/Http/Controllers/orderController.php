<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function Orderstore(Request $request)
    {
        $userId = Auth::id(); // Get authenticated user's ID
        
        // Check if request data is empty
        if (!$request->has(['product_id', 'quantity', 'paid_amount'])) {
            $orders = Order::where('user_id', $userId)->get();
            return response()->json(['orders' => $orders]);
        }

        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
            'address' => 'required|string',
            'city' => 'required|string',
            'zip' => 'required|string',
            'paid_amount' => 'required|numeric',
            'total_amount' => 'required|numeric',
            'remaining_amount' => 'required|numeric',
            'product_name' => 'required|string',
            'quantity' => 'required|integer|min:1',
            'product_price' => 'required|numeric',
            'product_id' => 'required|exists:products,id',
        ]);

        $productId = $request->input('product_id');
        $product = Product::findOrFail($productId);

        if ($product->stock_quantity < $request->input('quantity')) {
            return response()->json(['error' => 'Insufficient stock available.'], 400);
        }

        $product->stock_quantity -= $request->input('quantity');
        $product->save();

        $order = Order::create([
            'user_id' => $userId,
            'product_id' => $productId,
            'user_name' => $request->input('name'),
            'user_email' => $request->input('email'),
            'user_phone' => $request->input('phone'),
            'user_address' => $request->input('address'),
            'user_city' => $request->input('city'),
            'user_zip' => $request->input('zip'),
            'paid_payment' => $request->input('paid_amount'),
            'total_amount' => $request->input('total_amount'),
            'pending_payment' => $request->input('remaining_amount'),
            'product_name' => $request->input('product_name'),
            'quantity' => $request->input('quantity'),
            'product_price' => $request->input('product_price'),
        ]);

        return response()->json(['message' => 'Order placed successfully. Stock updated.']);
    }

    public function payPendingPayment(Request $request)
    {
        $userId = Auth::id(); // Get authenticated user's ID
        $orderId = $request->input('order_id');
        $paymentAmount = $request->input('payment_amount');
        
        // Validate request data
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'payment_amount' => 'required|numeric|min:0',
        ]);

        // Find the order
        $order = Order::where('user_id', $userId)->where('id', $orderId)->first();

        if (!$order) {
            return response()->json(['error' => 'Order not found or you do not have permission to pay for this order.'], 404);
        }

        // Check if the payment amount is greater than the pending amount
        if ($paymentAmount > $order->pending_payment) {
            return response()->json(['error' => 'Payment amount exceeds the pending amount.'], 400);
        }

        // Update the payment details
        $order->paid_payment += $paymentAmount;  // Increase paid payment
        $order->pending_payment -= $paymentAmount; // Decrease pending payment

        // // Check if the order is fully paid
        // if ($order->pending_payment == 0) {
        //     $order->status = 'paid'; // Optionally update the status
        // }

        $order->save();

        return response()->json(['message' => 'Payment successful. Pending payment updated.']);
    }

}
