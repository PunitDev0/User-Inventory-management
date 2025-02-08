<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\productName;
use Illuminate\Support\Facades\Storage;

class ProductsController extends Controller
{
    public function getAllProduct(Request $request)
    {
        // Check if 'id' is passed in the query string
        if ($request->has('id')) {
            // Get the 'id' from the request
            $id = $request->id;
            
            // Find product(s) that match the 'id'
            $product = Product::where('id', $id)->get();
    
            if ($product->isEmpty()) {
                return response()->json(['message' => 'Product not found'], 404);
            } else {
                return response()->json(['product' => $product], 200);
            }
        } else {
            // If no 'id' is provided, return all products
            $products = Product::all();
            return response()->json(['products' => $products], 200);
        }
    }
    
    
}
