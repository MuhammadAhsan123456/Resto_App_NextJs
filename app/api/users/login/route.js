import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "../../../lib/db";
import { userSchema } from "../../../lib/userModel";

export async function POST(request) {
    const payload = await request.json();
    let success = false;
    await mongoose.connect(connectionStr)
    const result = await userSchema.findOne({email: payload.email, password: payload.password})
    if(result){
        success = true;
    }
    return NextResponse.json({result, success})
}