import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
  Form,
} from "../ui";
import { PostApi } from "@/api/Post.api";
import CookieManager from "@/helpers/Cookie";
import { useForm } from "react-hook-form";

const PostSchema = z.object({
  content: z.string().min(1, "Content is mandatory"),
});

type PostFormProps = {
  action: "Create" | "Update";
};

const PostForm = ({ action }: PostFormProps) => {
  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: { content: "" },
  });

  const handleSubmit = async (data: z.infer<typeof PostSchema>) => {
    try {
    const accessToken = CookieManager.getCookie("accessToken"); 

    if (!accessToken) throw new Error("Token não encontrado");
      const post = await PostApi.create(data, accessToken);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full max-w-2xl mx-auto space-y-6"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium text-light-2 mb-2">
                What's on your mind?
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Start typing..."
                  className="min-h-[100px] resize-none rounded-xl border border-dark-4 bg-transparent px-4 py-3 text-light-1 placeholder:text-light-4 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
                />
              </FormControl>
              <FormMessage className="text-red-400 mt-1 text-sm" />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end gap-3">
          <Button
            type="submit"
            variant="ghost"
            className="text-light-3 border border-dark-4 rounded-full px-5 py-2 hover:bg-dark-4 transition"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="bg-white text-black font-semibold rounded-full px-6 py-2 hover:bg-zinc-200 transition"
          >
            {action}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;