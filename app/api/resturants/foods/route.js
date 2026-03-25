import mongoose from "mongoose";
import { connectionStr } from "../../../lib/db";
import { foodSchema } from "../../../lib/foodModel";
import { NextResponse } from "next/server";

export async function POST(request) {
    const payload = await request.json();
    let success = false;
    
    await mongoose.connect(connectionStr); 
    
    // Yahan 'new' keyword lagana behtar hai models ke liye
    const food = new foodSchema(payload); 
    const result = await food.save();
    
    if(result) {
        success = true;
    }

    // ✅ SAHI TARIKA: Dono ko ek hi object mein bhejein
    return NextResponse.json({ result, success }); 
}