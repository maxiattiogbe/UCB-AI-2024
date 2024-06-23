"use client";

import FeedbackCard from "@/components/Feedback";
import { humeData } from "@/lib/constants";
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
    console.log("Prefilling...");
    const response = await (
      await fetch("/api/scenarios/prefill", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();

    console.log("REPONSE: ", response);
  };

  return (
    <div>
      <div className="flex flex-col space-y-8">
        <div>Welcome!</div>
        <div className="w-auto">
          <Button variant="contained" color="primary" onClick={handleScore}>
            Preload sample scenarios.
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
