import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { fetchAuthQuery } from "@/lib/auth-server";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CommentSection } from "@/components/web/CommentSection";

interface PostIdRouteProps {
  params: Promise<{ postId: Id<"posts"> }>;
}

export default async function PostIdRoute({ params }: PostIdRouteProps) {
  const { postId } = await params;

  const post = await fetchAuthQuery(api.posts.getPostById, { postId: postId });


  if (!post) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Post not found</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              The post you are looking for does not exist or was deleted.
            </p>

            <Link href="/blog">
              <Button className="w-full">Back to blog</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animated-in fade-in duration-500 relative">
      <Link
        href="/blog"
        className={buttonVariants({ variant: "outline", className: "mb-4" })}
      >
        <ArrowLeft className="size-4" />
        Go Back
      </Link>
      <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden shadow-sm">
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full rounded-xl object-cover hover:scale-105 trandition-transform duration-500"
          />
        ) : (
          <Image
            src="https://cdn.pixabay.com/photo/2025/11/11/05/51/05-51-57-137_640.jpg"
            alt="fallback"
            fill
            className="object-cover hover:scale-105 trandition-transform duration-500"
          />
        )}
      </div>
      <div className="space-y-4 flex flex-col">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          {post.title}
        </h1>
        <p className="text-sm text-muted-foreground">
          Posted on: {new Date(post._creationTime).toLocaleDateString("en-US")}
        </p>
      </div>
      <Separator className="my-8" />
      <p className="text-muted-foreground">{post.body}</p>
      <Separator className="my-8" />
      <CommentSection  />
    </div>
  );
}
