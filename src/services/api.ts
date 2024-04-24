import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  NewProductData,
  ProductModel,
  EditProductData,
} from "../models/product";

const instance = axios.create({
  baseURL: "http://localhost:3333/api/",
  timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  post: (
    url: string,
    formDataBody: FormData,
    options: AxiosRequestConfig<any>
  ) => instance.post(url, formDataBody, options).then(responseBody),
  get: (url: string) => instance.get(url).then(responseBody),
  put: (url: string, body: EditProductData) =>
    instance.put(url, body).then(responseBody),
  delete: (url: string) => instance.delete(url).then(responseBody),
};

export const ProductApi = {
  createProduct: (product: NewProductData): Promise<ProductModel> => {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price.toString());
    formData.append("quantityStock", product.quantityStock.toString());

    if (product.image) formData.append("file", product.image);
    return requests.post("products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getProducts: (): Promise<ProductModel[]> => requests.get("products"),
  updateProduct: (
    product: EditProductData,
    id: number
  ): Promise<ProductModel> => requests.put(`products/${id}`, product),
  deleteProduct: (id: number): Promise<void> =>
    requests.delete(`products/${id}`),
};
