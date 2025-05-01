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

export interface Note {
  id: number;
  title: string;
  content: string;
}
