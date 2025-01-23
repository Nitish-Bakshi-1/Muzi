"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function Redirect() {
  const session = useSession();
  const Router = useRouter();
  useEffect(() => {
    if (session?.data?.user) {
      Router.push("/dashboard");
    }
  }, [session]);
}
