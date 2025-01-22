import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const downvotesSchema = z.object({
  streamId: z.string(),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  const user = await prismaClient.user.findFirst({
    where: {
      email: session?.user?.email ?? "",
    },
  });
  // TODO: replace email with id
  // TODO: can get rid of db call here
  if (!user) {
    return NextResponse.json(
      {
        message: "unauthenticated",
      },
      {
        status: 403,
      }
    );
  }
  try {
    const data = downvotesSchema.parse(await req.json());
    await prismaClient.upvote.delete({
      where: {
        userId_streamId: {
          userId: user.id,
          streamId: data.streamId,
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "you can't upvote twice",
      },
      {
        status: 403,
      }
    );
  }
}
