"use client";

import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      {session ? (
        <p>Welcome, {session.user?.name} (ID: {session.user?.id})</p>
      ) : (
        <p>User not authenticated</p>
      )}
    </div>
  );
}
