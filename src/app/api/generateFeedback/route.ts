import { NextRequest, NextResponse } from "next/server";

// Named export for the POST method
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // console.log("body", body)
    // console.log("body loop link", body.loopLink)
    // const url = body.loopLink
    const url =
      "https://magicloops.dev/api/loop/run/ff35be0e-e21c-4aa6-9e76-5c1430ae0324";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(body.values),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const responseJson = await response.json();
    return NextResponse.json(responseJson);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      {
        message: "An error occurred",
        error: "Your Magic Loop Form had an error.",
      },
      { status: 500 },
    );
  }
}
