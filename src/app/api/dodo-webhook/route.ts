import { initializeApp, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import mixpanel from "@/lib/mixpanel-server";

if (!getApps().length) {
  initializeApp();
}

const db = getFirestore();

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    console.log(
      "Dodo webhook:",
      body
    );

    if (
      body.type ===
      "payment.succeeded"
    ) {
      const uid =
        body.data?.metadata?.uid;

      if (!uid) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Missing uid",
          },
          {
            status: 400,
          }
        );
      }

      await db
        .collection("users")
        .doc(uid)
        .update({
          hasPurchased: true,
        });

      mixpanel.track("Purchase Completed", {
          distinct_id: uid,
      });

      console.log(
        "Premium unlocked for:",
        uid
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "Webhook error:",
      error
    );

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