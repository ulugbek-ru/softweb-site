import { NextRequest, NextResponse } from "next/server";
import { quickContactSchema } from "@/lib/validations";
import { sendTelegramContactNotification } from "@/lib/telegram";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = quickContactSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please check all required form fields.",
          errors: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const payload = parseResult.data;
    const tgResult = await sendTelegramContactNotification(payload);

    if (!tgResult.success) {
      console.error("Failed to send contact inquiry to Telegram:", tgResult.error);
      return NextResponse.json(
        {
          success: false,
          message:
            tgResult.error ||
            "Unable to deliver message right now. Reach out directly on Telegram @ulugbekraxmatillayev.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message received! Ulugbek will get back to you promptly.",
      messageId: tgResult.messageId,
    });
  } catch (error: unknown) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error processing contact request.",
      },
      { status: 500 }
    );
  }
}
