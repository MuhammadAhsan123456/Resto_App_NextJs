import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "../../../../lib/db";
import { foodSchema } from "../../../../lib/foodModel";

export async function GET(request, content) {
  const params = await content.params;
  const id = params.id;
  let success = false;
  await mongoose.connect(connectionStr);
  const result = await foodSchema.find({ resto_id: id });
  if (result && result.length > 0) {
    success = true;
  }
  return NextResponse.json({ result, success });
}

export async function DELETE(request, content) {
  const params = await content.params;
  const id = params.id;

  let success = false;
  await mongoose.connect(connectionStr);
  const result = await foodSchema.deleteOne({ _id: id });
  if (result.deletedCount > 0) {
    success = true;
  }
  return NextResponse.json({ result, success });
}
