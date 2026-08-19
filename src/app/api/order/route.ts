import { NextRequest, NextResponse } from "next/server";
import { projectOrderSchema } from "@/lib/validations";
import { sendTelegramOrderNotification } from "@/lib/telegram";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = projectOrderSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const payload = parseResult.data;
    const tgResult = await sendTelegramOrderNotification(payload);

    if (!tgResult.success) {
      // Log for server debugging, still return informative status
      console.error("Failed to send order to Telegram:", tgResult.error);
      return NextResponse.json(
        {
          success: false,
          message:
            tgResult.error ||
            "Unable to deliver project request to Telegram. Please contact directly via @ulugbekraxmatillayev.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your project request has been submitted successfully! We will contact you shortly.",
      messageId: tgResult.messageId,
    });
  } catch (error: unknown) {
    console.error("Order API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error processing your project order.",
      },
      { status: 500 }
    );
  }
}
