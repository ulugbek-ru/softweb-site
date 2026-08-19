import { NextRequest, NextResponse } from "next/server";
import { quickContactSchema, contactFormSchema } from "@/lib/validations";
import { sendTelegramContactNotification } from "@/lib/telegram";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Support both contactFormSchema (name, contact) and quickContactSchema (fullName, telegramOrEmail)
    const fullName = body.fullName || body.name || "Client";
    const telegramOrEmail = body.telegramOrEmail || body.contact || "@client";
    const phone = body.phone;
    const message = body.message || "";

    const payload = {
      fullName,
      telegramOrEmail,
      phone,
      message,
    };

    const parseResult = quickContactSchema.safeParse(payload);

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

    const tgResult = await sendTelegramContactNotification(parseResult.data);

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
