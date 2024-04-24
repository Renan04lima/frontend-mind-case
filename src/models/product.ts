export type ProductData = {
  name: string;
  description: string;
  price: number;
  quantityStock: number;
  image?: {
    buffer: string;
    mimetype: string;
  };
};
export type ProductModel = {
  id: number;
  name: string;
  description: string;
  price: number;
  quantityStock: number;
  image?: {
    buffer: Buffer;
    mimetype: string;
  };
};

export type NewProductData = {
  name: string;
  description: string;
  price: number;
  quantityStock: number;
  image?: File;
};

export type EditProductData = Partial<NewProductData>;
