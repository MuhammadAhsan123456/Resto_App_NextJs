import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { restaurantSchema } from "../../lib/returantsModels";
import { connectionStr } from "../../lib/db";

export async function GET() {
  await mongoose.connect(connectionStr);

  const data = await restaurantSchema.find();

  return NextResponse.json({ result: data });
}

export async function POST(request) {
  let payload = await request.json();
  let result;
  let success = false;
  await mongoose.connect(connectionStr);
  if (payload.login) {
    // use it for login
    result = await restaurantSchema.findOne({ email: payload.email, password: payload.password });
    if(result){
      success = true;
    }
  } else {
    // use it for signup
    let resturant = new restaurantSchema(payload);
    result = await resturant.save();
    if(result){
      success = true;
    }
  } 
  return NextResponse.json({ result, success });
}
