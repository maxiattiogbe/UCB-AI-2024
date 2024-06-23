"use client";

import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Button } from "@mui/material";

import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import React, { useEffect } from "react";

function Dashboard() {
  const { isSignedIn, isLoaded, user } = useUser();

  // You can use the User for the info

  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/");
    }
  }, [isLoaded, isSignedIn, router]);

  const handleScore = async () => {
    console.log("Scoring...");
    const response = await (
      await fetch("/api/score/1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: "https://hume-tutorials.s3.amazonaws.com/faces.zip",
        }),
      })
    ).json();
    // const response = await (
    //   await fetch("/api/users", {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    // ).json();

    console.log("REPONSE: ", response);
  };

  return (
    <div>
      {/* <ClerkLoading>
        <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal" forceRedirectUrl={"/dashboard"}>
            <button className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400">
              Sign in
            </button>
          </SignInButton>
        </SignedOut>
      </ClerkLoaded> */}

      <div>This is the dashboard</div>
      <Button variant="contained" color="primary" onClick={handleScore}>
        Primary
      </Button>
    </div>
  );
}

export default Dashboard;
