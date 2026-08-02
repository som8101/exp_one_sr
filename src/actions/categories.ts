"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const categorySchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  parentId: z.string().optional().nullable(),
});

export async function getCategories() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return prisma.category.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: { campaigns: true },
      },
      parent: true,
    },
  });
}

export async function createCategory(data: z.infer<typeof categorySchema>) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const validated = categorySchema.parse(data);

  const category = await prisma.category.create({
    data: {
      name: validated.name,
      slug: validated.slug,
      parentId: validated.parentId || null,
    },
  });

  revalidatePath("/dashboard/categories");
  return category;
}

export async function updateCategory(id: string, data: Partial<z.infer<typeof categorySchema>>) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const category = await prisma.category.update({
    where: { id },
    data: {
      name: data.name,
      slug: data.slug,
      parentId: data.parentId || null,
    },
  });

  revalidatePath("/dashboard/categories");
  return category;
}

export async function deleteCategory(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await prisma.category.delete({
    where: { id },
  });

  revalidatePath("/dashboard/categories");
}
