import mongoose from "mongoose";
import { connectionStr } from "../../../../lib/db";
import { orderSchema } from "../../../../lib/ordersModel";
import { NextResponse } from "next/server";
import { restaurantSchema } from "../../../../lib/returantsModels";

export async function GET(request, content) {
  const params = await content.params;
  const id = params.id;
  let success = false;

  await mongoose.connect(connectionStr);
  let result = await orderSchema.find({ deliveryBoy_id: id });

  if (result) {
    let restoData = await Promise.all(
      result.map(async (item) => {
        let restoInfo = {};
        restoInfo.data = await restaurantSchema.findOne({ _id: item.resto_id });
        restoInfo.amount = item.amount;
        restoInfo.status = item.status;
        return restoInfo;
      }),
    );
    result = restoData;
    success = true;
  }

  return NextResponse.json({ result, success });
}
