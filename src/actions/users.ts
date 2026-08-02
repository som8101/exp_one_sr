"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";

export async function getUsers() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const client = await clerkClient();

  try {
    const users = await client.users.getUserList({
      limit: 100,
      orderBy: "-created_at"
    });

    return users.data.map(u => ({
      id: u.id,
      email: u.emailAddresses[0]?.emailAddress || "No email",
      firstName: u.firstName,
      lastName: u.lastName,
      imageUrl: u.imageUrl,
      createdAt: new Date(u.createdAt),
      lastSignInAt: u.lastSignInAt ? new Date(u.lastSignInAt) : null,
    }));
  } catch (error) {
    console.error("Failed to fetch Clerk users:", error);
    return [];
  }
}
