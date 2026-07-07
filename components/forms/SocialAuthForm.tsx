"use client";

import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import ROUTES from "@/constants/routes";

const SocialAuthForm = () => {
  const buttonClassNames =
    "background-dark400_light900 body-medium text-dark200_light800 rounded-2 min-h-12 flex-1 px-4 py-3.5";

  const handleSignIn = async (provider: "github" | "google") => {
    try {
      await signIn(provider, {
        redirectTo: ROUTES.HOME,
      });
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error);
      toast.error("Sign-in failed. Please try again.", {
        description: error instanceof Error ? error.message : "An unknown error occurred.",
        position: "top-center",
      });
    }
  };

  return (
    <div className="mt-10 flex flex-wrap gap-2.5">
      <Button className={buttonClassNames} onClick={() => handleSignIn("github")}>
        <Image
          src="/icons/github.svg"
          alt="GitHub Logo"
          width={20}
          height={20}
          className="invert-colors mr-2.5 object-contain"
        />
        <span>Login with GitHub</span>
      </Button>

      <Button className={buttonClassNames} onClick={() => handleSignIn("google")}>
        <Image src="/icons/google.svg" alt="Google Logo" width={20} height={20} className="mr-2.5 object-contain" />
        <span>Login with Google</span>
      </Button>
    </div>
  );
};

export default SocialAuthForm;
