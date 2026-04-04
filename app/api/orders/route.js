import mongoose from "mongoose";
import { connectionStr } from "../../lib/db";
import { orderSchema } from "../../lib/ordersModel";
import { NextResponse } from "next/server";

export async function POST(request) {
    const payload = await request.json();
    await mongoose.connect(connectionStr)
    let success = false;
    const orderObj = new orderSchema(payload);
    const result = await orderObj.save();
    if (result) {
        success = true;
    }
    return NextResponse.json({result, success})
} 