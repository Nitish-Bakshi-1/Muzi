import { prismaClient } from "@/app/lib/db";
import { log } from "console";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextResponse } from "next/server";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn(params) {
      try {
        console.log(params.user.email);
        if (params.user.email) {
          await prismaClient.user.create({
            data: {
              email: params.user.email,
              provider: "Google",
            },
          });
        }
      } catch (e) {
        console.log(e);
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
