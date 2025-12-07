import type { BookDetail } from "@/types/book";
import api from "../api";

export async function fetchBookDetail(bookId: string): Promise<BookDetail> {
  return api.get(`/books/${bookId}`);
}

