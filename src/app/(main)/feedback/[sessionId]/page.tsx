import React from "react";

export default function Page({ params }: { params: { sessionId: string } }) {
  return <div>My Post: {params.sessionId}</div>;
}
