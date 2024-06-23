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
  const [feedback, setFeedback] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

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
          url: "https://us-west-2-recallai-production-bot-data.s3.amazonaws.com/163cf925-cde0-4867-9ef9-481d1f4b953e/AROA3Z2PRSQANGTUQXHNJ%3Ai-03f2b4d2f1a3ea9cd/video-9e8f472b-2edd-4fe1-8a6c-c8be508043b1.mp4?AWSAccessKeyId=ASIA3Z2PRSQALNZZ5Q5L&Signature=dBWFB%2FmOLiNYSVvLQa0WyhWOt24%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDmRJknyTvOqzHQxylEj2LDh6e9C9oOYOUmYRmXgIrfogIhAJ5FG7lZEw8t3Z9DaORXEyG%2FH1v%2FIqLdlZ2z8sN1GVHYKsIFCIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMODExMzc4Nzc1MDQwIgyMpxXLYxa7rxe8YmQqlgVeEDnIk1Hw1wjU36PuI4Qm1Xwz1OymCaz0lECyI5eX6WQ5NBt7T42daFdXzXBLJ3Li6YpVAGygk8i7Wf5JwVIDC%2BVmaYzusN%2BFeOkVG5OE%2F499P9LPwV%2FMj5Gqme54Gv%2Fmcadtjk9u3PSvgx84%2BteSF4nqnSGzvFJ%2BybHZKUed%2F2I%2BozcZARlmkI7fY7ielO2fSjLTCTJGIgNRbRVYKSw4gTpd9Ve0cNTsvuRDuZE1lbb4dDp%2Fcote1H76Ar5bMCOEn959csLeyoNAEXe9xio8sCRSaoi%2B5zB0BUKGNcvkuWMDgsIh9L8LUE4zIyS1%2BlK5ePygicVizlN1usDqIye%2B64PzzIQDe0QH5trydwbgYVVeHJWEf07vuReBOPo6FbsbFoZvSiwiHd4bgtM56%2FsLccwoCywWKboqZKyvckteIjS1eQD4oJwPNVmhe8u0Ycwk%2Bai4SannT9TV5lNQFHa3Oxpyg8%2BA3qFy5druUGDysnpXGjQ%2FICGD5uaRivJmxGOAthaMyW4TVwG1VLmxVoLxhPuPkcYNYhLOews6Dk4EjStXe9dQ2uCTCTa1VqRJMg4eUKeYuCTxM4JCkevKTsyxKRRB9ikWD%2Fmtiw9mWL%2BlVHTKb96c02S3SyqLnuM9Ov14c0XZlIseh2IW%2Ba1cC%2FVQgljtjfZb0%2ByFqykkEFT3xrgeYq%2BCwovsmA78jiDguCZD4UVeNtc1z%2BukUdyjnrtWoxjAqmgYtMZe2kvM621LIg4sug5fdJnup9WLa7gzGvGRML6qO2H6aKZdoSkC%2FKwCtX7jO9eOhqZ03DiBIFH9zq2XppdKljH5cskqs%2FG7VRrEZXQDPQ8hmkVCU5GY2niKSXdEGriRNqyZbL%2BW9DYW5hTzSGzZnzDHiN%2BzBjqwAbItri6wRjswRomNLdjjRJjPcSnmgQfpMidY9CHhiVdVns%2F%2Bu%2FS8QExkPzch3T2g%2BcfPeQAOGeZkqTmK%2BBdM9vG9bi4skzbyI9mWFx%2BVU9luvDxbkwHARqr%2FW2%2FX%2FA4aM0MWBmk6vhA1zuyf4TyGfLKytVNIimeq%2FJzgqAInPQRzgGvRRkpwmFRcyUOgTvnKXy6a3c6Y3FeK7bx%2F9Au8W0w5WVi0f20PmVonoDHYGkaa&Expires=1719155505",
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

  const getFeedback = (data) => async () => {
    setLoading(true);
    const response = await (
      await fetch("/api/generateFeedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
    ).json();

    setFeedback(response.loopOutput);
    setLoading(false);
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

      <div className="flex flex-col space-y-8">
        <div>This is the dashboard</div>
        <Button variant="contained" color="primary" onClick={handleScore}>
          Primary
        </Button>
        {/* Please make sure replace humeData with Real data!! */}
        {/* <>{JSON.stringify(feedback)}</> */}
        <Button
          variant="contained"
          color="primary"
          onClick={getFeedback(humeData)}
        >
          Get Feedback
        </Button>
        {loading && (
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        )}
        {!!feedback && (
          <FeedbackCard
            imgSrc={feedback.graph}
            title="Hume AI Feedback"
            description="Here is your personalised feedback generated by Hume AI"
            feedback={feedback.keyInsights.discussion}
            imgAlt={feedback.keyInsights.discussion}
          ></FeedbackCard>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
