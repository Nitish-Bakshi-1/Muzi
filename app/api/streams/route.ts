import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "@/app/lib/db";
import { StreamType } from "@prisma/client";
//@ts-ignore
import youtubesearchapi from "youtube-search-api";
const YT_REGEX = /^https:\/\/www\.youtube\.com\/watch\?v=([\w-]+)/;

const CreateStreamSchema = z.object({
  creatorId: z.string(),
  url: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const data = CreateStreamSchema.parse(await req.json());
    const isYt = YT_REGEX.test(data.url);

    if (!isYt) {
      return NextResponse.json(
        {
          message: "wrong url format",
        },
        {
          status: 411,
        }
      );
    }

    const extractedId = data.url.split("?v=")[1];

    const res = await youtubesearchapi.GetVideoDetails(extractedId);
    const thumbnails = res.thumbnail.thumbnails;
    thumbnails.sort((a: { width: number }, b: { width: number }) =>
      a.width < b.width ? -1 : 1
    );

    const stream = await prismaClient.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extractedId,
        type: StreamType.Youtube,
        title: res.title || "Can't find title",
        smallImg:
          (thumbnails.length > 1
            ? thumbnails[thumbnails.length - 2].url
            : thumbnails[thumbnails.length - 1].url) ??
          "https://imgs.search.brave.com/H33fyJx1QOnjxRQoJV0Huk4BuUamVu4vMzQP7tMdmM8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDI3NDAy/OTgucG5n",
        bigImg:
          thumbnails[thumbnails.length - 1].url ??
          "https://imgs.search.brave.com/H33fyJx1QOnjxRQoJV0Huk4BuUamVu4vMzQP7tMdmM8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDI3NDAy/OTgucG5n",
      },
    });

    return NextResponse.json({
      message: "added stream",
      id: stream.id,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred");
    }
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

export async function GET(req: NextRequest) {
  const creatorId = req.nextUrl.searchParams.get("creatorId");
  const streams = await prismaClient.stream.findMany({
    where: {
      userId: creatorId ?? "",
    },
  });
  return NextResponse.json({
    streams,
  });
}
