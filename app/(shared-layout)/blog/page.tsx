import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { fetchAuthQuery } from "@/lib/auth-server";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogPage() {
  return (
    <div className="py-12">
      <div className="text-center pb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Our Blog
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-muted-foreground pt-4">
          Read our latest articles
        </p>
      </div>
      <Suspense fallback={<BlogSkeleton />}>
        <LoadingBlog />
      </Suspense>
    </div>
  );
}

async function LoadingBlog() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const data = await fetchAuthQuery(api.posts.getPosts);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data?.map((post) => (
        <Card key={post._id} className="pt-0">
          <div className="relative h-48 w-full overflow-hidden ">
            <Image
              src={
                post.imageUrl ??
                "https://cdn.pixabay.com/photo/2025/11/11/05/51/05-51-57-137_640.jpg"
              }
              alt="image"
              fill
              className="object-cover rounded-t-lg"
              unoptimized //dont for get to delete when deploy!!!
            />
          </div>
          <CardContent>
            <Link href={`/blog/${post._id}`}>
              <h1 className="text-2xl font-bold hover:text-primary">
                {post.title}
              </h1>
            </Link>
            <p className="text-muted-foreground line-clamp-3">{post.body}</p>
          </CardContent>

          <CardFooter>
            <Link
              href={`/blog/${post._id}`}
              className={buttonVariants({ className: "w-full" })}
            >
              Read more
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

function BlogSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div className="flex flex-col space-y-3" key={i}>
          <Skeleton className="h-48 w-full rounded-xl" />
          <div className="space-y-2 flex flex-col">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
