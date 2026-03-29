import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "../../lib/db";
import { restaurantSchema } from "../../lib/returantsModels";

export async function GET(request) {
  let queryParams = request.nextUrl.searchParams;
  console.log(queryParams.get("resturant"));
  let filter = {};
  if (queryParams.get("location")) {
    let city = queryParams.get("location");
    filter = { city: { $regex: new RegExp(city, "i") } };
  } else if (queryParams.get("resturant")) {
    let name = queryParams.get("resturant");
    filter = { name: { $regex: new RegExp(name, "i") } };
  }
  await mongoose.connect(connectionStr);
  let result = await restaurantSchema.find(filter);
  return NextResponse.json({ success: true, result });
}
