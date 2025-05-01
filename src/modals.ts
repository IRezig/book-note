export interface Post {
  id: number;
  title: string;
  content: string;
}

export interface Reflection {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  genre: string[];
  publisher: string;
  publicationDate: string;
  pages: number;
  isbn: string;
}

export interface BookT {
  id: number;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  genre: string[];
  publisher: string;
  publicationDate: string;
  pages: number;
  isbn: string;
}
