import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "../../../lib/db";
import { restaurantSchema } from "../../../lib/returantsModels";

export async function GET() {
  await mongoose.connect(connectionStr);
  let result = await restaurantSchema.find();
  result = result.map((item)=>item.city.charAt(0).toUpperCase() + item.city.slice(1));
  result = [...new Set(result)];
  return NextResponse.json({ success: true, result });
}
 