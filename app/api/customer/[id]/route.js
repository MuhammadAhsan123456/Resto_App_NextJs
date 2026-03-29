import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "../../../lib/db";
import { restaurantSchema } from "../../../lib/returantsModels";
import { foodSchema } from "../../../lib/foodModel";

export async function GET(request, content) {
  const params = await content.params;
  const id = params.id;
  console.log("Restaurant ID:", id);
  await mongoose.connect(connectionStr);
  const details = await restaurantSchema.findOne({ _id: id });
  const foodItems = await foodSchema.find({ resto_id: id });
  return NextResponse.json({ success: true, details, foodItems });
}
