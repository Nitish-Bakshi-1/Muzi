import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "@/app/lib/db";
const YT_REGEX = new RegExp(
  "^https://www.youtube.com/watch?v=[w-]+(&[w-]+=?[^s]*)*$"
);

const CreateStreamSchema = z.object({
  creatorId: z.string(),
  url: z.string(),
});

export async function Post(req: NextRequest) {
  try {
    const data = CreateStreamSchema.parse(await req.json());
    prismaClient.stream.create({
      userId: data.creatorId,
      url: data.url,
    });
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
