import { db } from "@/config/db";
import { ProjectTable, ScreenConfigTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userInput, device, projectId } = await req.json();
  const user = await currentUser();

  const result = await db
    .insert(ProjectTable)
    .values({
      projectId: projectId,
      userId: user?.primaryEmailAddress?.emailAddress as string,
      device: device,
      userInput: userInput,
    })
    .returning();

  return NextResponse.json(result[0]);
}

export async function GET(req: NextRequest) {
  const projectId = await req.nextUrl.searchParams.get("projectId");
  const users = await currentUser();

  try {
    const result = await db
      .select()
      .from(ProjectTable)
      .where(
        and(
          eq(ProjectTable.projectId, projectId as string),
          eq(
            ProjectTable.userId,
            users?.primaryEmailAddress?.emailAddress as string
          )
        )
      );

    const screenConfig = await db
      .select()
      .from(ScreenConfigTable)
      .where(eq(ScreenConfigTable.projectId, projectId as string));

    return NextResponse.json({
      projectDetails: result[0],
      screenConfig: screenConfig,
    });
  } catch (e) {
    return NextResponse.json({ msg: "Error" });
  }
}

// export async function GET(req: NextRequest) {
//   try {
//     const projectId = req.nextUrl.searchParams.get("projectId");
//     const user = await currentUser();

//     if (!projectId || !user) {
//       return NextResponse.json(null);
//     }

//     const result = await db
//       .select()
//       .from(ProjectTable)
//       .where(
//         and(
//           eq(ProjectTable.projectId, projectId),
//           eq(ProjectTable.userId, user.id)
//         )
//       );

//     return NextResponse.json(result[0] ?? null);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(null, { status: 500 });
//   }
// }
