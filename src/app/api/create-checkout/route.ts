import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const {
      email,
      uid,
    } = await request.json();

    const response = await fetch(
      "https://live.dodopayments.com/checkouts",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.DODO_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_cart: [
            {
              product_id:
                process.env
                  .NEXT_PUBLIC_DODO_PRODUCT_ID,
              quantity: 1,
            },
          ],

          customer: {
            email,
          },

          metadata: {
            uid,
          },

          return_url:
            `${process.env.NEXT_PUBLIC_BASE_URL}/results`,
        }),
      }
    );

    
const text = await response.text();

console.log("Status:", response.status);
console.log("Dodo response:", text);

if (!response.ok) {
  return NextResponse.json(
    { error: text },
    { status: response.status }
  );
}

const data = JSON.parse(text);

return NextResponse.json({
  checkoutUrl:
    data.payment_link ||
    data.checkout_url,
});

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to create checkout",
      },
      {
        status: 500,
      }
    );
  }
}