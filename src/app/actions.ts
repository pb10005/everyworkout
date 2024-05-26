'use server';
import { revalidatePath } from "next/cache";

export function revalidate(path: string) {
    revalidatePath(path);
    return Promise.resolve();
};