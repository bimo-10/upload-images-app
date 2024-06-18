"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
import PostDeleteModal from "./PostDeleteModal";

export default function ImageHomeCard() {
  const {
    data: getPosts,
    isLoading: isLoadingGetPosts,
    isError: isErrorGetPosts,
    isPending: isPendingGetPosts,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/api/post");
      const data = await res.data;

      return data;
    },
  });

  if (isLoadingGetPosts) {
    return (
      <>
        <div className="flex flex-col space-y-3 w-96">
          <Skeleton className="h-[200px] w-[360px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[360px]" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {getPosts?.data.map((post) => (
        <Card className="w-96">
          <div>
            <Image
              src={`/images/${post.image}`}
              alt="hero"
              width={400}
              height={400}
              className="rounded-xl"
            />
          </div>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <CardDescription>{post.description}</CardDescription>
          </CardHeader>
          <CardFooter>
            <PostDeleteModal postId={post.id} />
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
