import { db } from "@/config/db";
import { openrouter } from "@/config/openrouter";
import { ScreenConfigTable } from "@/config/schema";
import { GENERATION_SCREEN_PROMPT } from "@/data/Prompt";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const {
    projectId,
    screenId,
    screenName,
    purpose,
    screenDescription,
    projectVisualDescription,
  } = await req.json();
  const userInput = `
    screen Name: ${screenName},
    screen Purpose : ${purpose}, 
    screen Description: ${screenDescription},
    `;

  try {
    const aiResult = await openrouter.chat.send({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: [
            {
              type: "text",
              text: GENERATION_SCREEN_PROMPT,
            },
          ],
        },
        {
          role: "user",
          content: userInput,
        },
      ],
      stream: false,
    });
    const code = aiResult?.choices[0]?.message?.content || "";
    const updateResults = await db
      .update(ScreenConfigTable)
      .set({
        code: code as string,
      })
      .where(
        and(
          eq(ScreenConfigTable.projectId, projectId),
          eq(ScreenConfigTable?.screenId, screenId as string)
        )
      )
      .returning();
    return NextResponse.json(updateResults[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate screen code" },
      { status: 500 }
    );
  }
}
