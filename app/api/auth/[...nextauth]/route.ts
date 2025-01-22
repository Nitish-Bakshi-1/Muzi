import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CreateStreamSchema = z.object({
  creatorId: z.string(),
  url: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const data = CreateStreamSchema.safeParse(await req.json());
  } catch (error) {}
  return NextResponse.json(
    {
      message: "Error while adding a stream",
    },
    {
      status: 411,
    }
  );
}
