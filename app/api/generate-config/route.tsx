// // import { openrouter } from "@/config/openrouter";
// // import { APP_LAYOUT_CONFIG_PROMPT } from "@/data/Prompt";
// // import { NextRequest, NextResponse } from "next/server";

// // export async function POST(req: NextRequest) {
// //   const {userInput, deviceType, projectId} = await req.json();

// //   // AI Model
// //   const aiResult = await openrouter.chat.send({
// //     model: "openai/gpt-5.1-codex",
// //     messages: [
// //       {
// //         role: "system",
// //         content: [
// //           {
// //             type: "text",
// //             text: APP_LAYOUT_CONFIG_PROMPT.replace("{deviceType}", deviceType),
// //           },
// //         ],
// //       },
// //       {
// //         role: "user",
// //         content: [
// //           {
// //             type: "text",
// //             text: userInput,
// //           },
// //         ],
// //       },
// //     ],
// //     stream: false,
// //   });

// //   // save to DB
// //   console.log(aiResult);
// //   return NextResponse.json(aiResult?.choices[0]?.message?.content);
// // }

import { db } from "@/config/db";
import { openrouter } from "@/config/openrouter";
import { ProjectTable, ScreenConfigTable } from "@/config/schema";
import { APP_LAYOUT_CONFIG_PROMPT } from "@/data/Prompt";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userInput, deviceType, projectId } = await req.json();

    if (!userInput || !deviceType) {
      return NextResponse.json({ error: "Missing input" }, { status: 400 });
    }

    const aiResult = await openrouter.chat.send({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: APP_LAYOUT_CONFIG_PROMPT.replace("{deviceType}", deviceType),
        },
        {
          role: "user",
          content: userInput,
        },
      ],
    });

    // console.log("🧠 FULL AI RESULT:", aiResult);

    const JSONAiResult = JSON.parse(
      aiResult.choices[0]?.message?.content as string
    );

    if (JSONAiResult) {
      // Update ProjectTable with Project Name
      await db.update(ProjectTable).set({
        projectVisualDescription: JSONAiResult?.projectVisualDescription,
        projectName: JSONAiResult?.projectName,
        theme: JSONAiResult?.theme,
      }).where(eq(ProjectTable.projectId, projectId as string));

      JSONAiResult.screens?.forEach(async (screen: any) => {
        const result = await db.insert(ScreenConfigTable).values({
          purpose: screen?.purpose,
          screenDescription: screen?.layoutDescription,
          screenId: screen?.id,
          screenName: screen?.name,
          projectId: projectId,
        });
      });
      return NextResponse.json({
        success: true,
        // data: aiResult.choices[0].message.content,
        data: JSONAiResult,
      });
    }
  } catch (error: any) {
    console.error("❌ OPENROUTER FAILED:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "AI generation failed",
      },
      { status: 500 }
    );
  }
}
