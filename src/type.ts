export type BookType = {
  ID?: number;
  title?: string;
  description?: string;
  price?: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category?: string;
  thumbnail?: string;
  images?: string[];
  author?: string;
  longerDescription?: string;
}

export type BookTypeArray = BookType[]
