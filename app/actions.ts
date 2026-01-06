"use server";

import z from "zod";
import { postSchema } from "./schemas/blog";
import { fetchAuthMutation } from "@/lib/auth-server";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";

export async function createBlogAction(values: z.infer<typeof postSchema>) {
  const parsed = postSchema.safeParse(values);

  if (!parsed.success) {
    return { error: parsed.error.issues };
  }

  try {
    await fetchAuthMutation(api.posts.createPost, {
      title: parsed.data.title,
      body: parsed.data.content,
    });
  } catch (e) {
    return { error: "Failed to create post" };
  }

  redirect("/");
}
