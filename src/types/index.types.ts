interface Category {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

export interface Data {
  id: number;
  title: string;
  actual_price: number;
  description: string;
  images: Array<string>[];
  creationAt: string;
  updatedAt: string;
  category: Category;
}
