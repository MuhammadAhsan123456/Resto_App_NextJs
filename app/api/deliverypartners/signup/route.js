import mongoose from "mongoose";
import { connectionStr } from "../../../lib/db";
import { NextResponse } from "next/server";
import { deliveryPartnersSchema } from "../../../lib/deliverypartners";

export async function POST(request) {
  const payload = await request.json();
  let success = false;
  await mongoose.connect(connectionStr);
  const user = new deliveryPartnersSchema(payload);
  const result = await user.save();
  if (result) {
    success = true;
  }

  return NextResponse.json({ result, success });
}
