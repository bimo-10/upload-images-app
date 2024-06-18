"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  image: z.instanceof(FileList).optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string(),
});

export default function PostFormUploadCard() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: null,
      title: "",
      description: "",
    },
  });
  const fileRef = form.register("image");

  const { mutateAsync: createPost, isLoading: isLoadingCreatePost } =
    useMutation({
      mutationFn: async (data) => {
        const formData = new FormData();
        formData.append("image", data.image[0]);
        formData.append("title", data.title);
        formData.append("description", data.description);
        const res = await axios.post(
          "http://localhost:3000/api/post/create",
          formData
        );

        return res;
      },
      onSuccess: () => {
        form.reset({
          image: null,
          title: "",
          description: "",
        });
        router.push("/");
        queryClient.invalidateQueries(["posts"]);
      },
    });

  const onSubmitPost = (data) => {
    createPost(data);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Upload Image</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              action=""
              onSubmit={form.handleSubmit(onSubmitPost)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input type="file" {...fileRef} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea rows={4} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="mt-6">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
