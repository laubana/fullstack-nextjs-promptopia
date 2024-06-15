"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { BeatLoader } from "react-spinners";

const Protect = ({ children }) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <BeatLoader color="#FF5722" style={{ padding: "32px" }} />;
  }

  if (status === "authenticated") {
    return children;
  }

  return null;
};

export default Protect;
