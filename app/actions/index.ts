"use server";

import { db } from "../db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: { code },
  });
  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
}

async function deleteSnippet(id: number) {
  await db.snippet.delete({ where: { id } });
  revalidatePath("/");
  redirect("/");
}

async function createSnippet(
  formState: { message: string },
  formData: FormData,
) {
  // this is supposed to be server action
  // make sure user entered valid input
  try {
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;

    if (typeof title !== "string" || title.length < 3) {
      return {
        message: "Title must be longe",
      };
    }

    if (typeof code !== "string" || code.length < 3) {
      return {
        message: "code must be longe",
      };
    }
    // create a new record in db
    const snippet = await db.snippet.create({
      data: {
        title,
        code,
      },
    });
    // redirect user back to home page
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    } else {
      return {
        message: "Something went wrong...",
      };
    }
  }
  revalidatePath("/");
  redirect("/");
}

export { editSnippet, deleteSnippet, createSnippet };
