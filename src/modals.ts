export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  genres: string[];
  language: string;
  pages: number;
}

export interface Note {
  id: number;
  title: string;
  content: string;
}
