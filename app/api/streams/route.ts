import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "@/app/lib/db";

const CreateStreamSchema = z.object({
  creatorId: z.string(),
  url: z
    .string()
    .refine(
      (url) => url.includes("youtube.com") || url.includes("spotify.com"),
      {
        message: "URL must be from YouTube or Spotify",
      }
    ),
});

export async function Post(req: NextRequest) {
  try {
    const data = CreateStreamSchema.parse(await req.json());
  } catch (error) {
    return NextResponse.json(
      {
        message: "error while adding a stream",
      },
      {
        status: 411,
      }
    );
  }
}
