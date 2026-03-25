import { NextResponse } from "next/server";
import { connectionStr } from "../../../../../lib/db";
import { foodSchema } from "../../../../../lib/foodModel";
import mongoose from "mongoose";

export async function GET(request, content) {
  const params = await content.params;
  const id = params.id;
  let success = false;
  await mongoose.connect(connectionStr);
  const result = await foodSchema.findOne({ _id: id });
  if (result) {
    success = true;
  }
  return NextResponse.json({ result, success });
}

export async function PUT(request, context) {
  const params = await context.params;
  const id = params.id;
  const payload = await request.json();
  let success = false;
  await mongoose.connect(connectionStr);
  const result = await foodSchema.findOneAndUpdate({ _id: id }, payload);
  if (result) {
    success = true;
  }
  return NextResponse.json({ result, success });
}
