import { NextResponse } from "next/server";

import crypto from "crypto";

import { db } from "@/lib/firebase-admin";

export async function POST(
  request: Request
) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      uid,
    } = await request.json();

    const body =
      razorpay_order_id +
      "|" +
      razorpay_payment_id;

    const expectedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env
            .RAZORPAY_KEY_SECRET!
        )
        .update(body)
        .digest("hex");

    if (
      expectedSignature !==
      razorpay_signature
    ) {
      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    await db
      .collection("users")
      .doc(uid)
      .set(
        {
          hasPurchased: true,

          paymentId:
            razorpay_payment_id,

          orderId:
            razorpay_order_id,

          purchasedAt:
            Date.now(),
        },
        {
          merge: true,
        }
      );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}