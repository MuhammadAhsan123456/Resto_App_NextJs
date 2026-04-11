import mongoose from "mongoose";
import { connectionStr } from "../../../lib/db";
import { NextResponse } from "next/server";
import { deliveryPartnersSchema } from "../../../lib/deliverypartners";

export async function GET(request, content) {
    // Params ko await karna zaroori hai
    const params = await content.params; 
    const city = params.city;
    let success = false;
    await mongoose.connect(connectionStr);
    let filter = {city:{$regex: new RegExp(city, "i")}}; // Case-insensitive search
    const result = await deliveryPartnersSchema.find(filter);
    return NextResponse.json({ result });
}