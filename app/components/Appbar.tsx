"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Music } from "lucide-react";

export function Appbar() {
  const session = useSession();
  return (
    <div className="w-full px-20  flex items-center justify-between">
      <Link className="flex items-center justify-center" href="#">
        <Music className="h-6 w-6 mr-2 text-purple-600 dark:text-purple-400" />
        <span className="font-bold text-2xl text-purple-600 dark:text-purple-400">
          StreamTunes
        </span>
      </Link>
      <nav className="ml-auto flex  gap-4 sm:gap-6">
        {session.data?.user ? (
          <button
            className="  bg-[#7E22CE] text-white px-10 py-[0.7rem] rounded-md text-xl"
            onClick={() => signOut()}
          >
            Log Out
          </button>
        ) : (
          <button
            className="  bg-[#7E22CE] text-white px-10 py-[0.7rem] rounded-md text-xl"
            onClick={() => signIn()}
          >
            {" "}
            Sign In
          </button>
        )}
      </nav>
    </div>
  );
}
