import { NextResponse } from "next/server";

import cloudinary from "@/lib/cloudinary";

export async function POST(
  request: Request
) {
  try {
    const formData =
      await request.formData();

    const files =
      formData.getAll(
        "images"
      ) as File[];

    if (files.length !== 3) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Exactly 3 images required",
        },
        {
          status: 400,
        }
      );
    }

    const imageUrls =
      await Promise.all(
        files.map(
          async (file) => {
            const bytes =
              await file.arrayBuffer();

            const buffer =
              Buffer.from(bytes);

            return new Promise<string>(
              (
                resolve,
                reject
              ) => {
                cloudinary.uploader
                  .upload_stream(
                    {
                      folder:
                        "become-him",
                    },
                    (
                      error,
                      result
                    ) => {
                      if (
                        error ||
                        !result
                      ) {
                        reject(
                          error
                        );

                        return;
                      }

                      resolve(
                        result.secure_url
                      );
                    }
                  )
                  .end(buffer);
              }
            );
          }
        )
      );

    return NextResponse.json({
      success: true,
      imageUrls,
    });
  } catch (error) {
    console.error(
      "UPLOAD ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Upload failed",
      },
      {
        status: 500,
      }
    );
  }
}