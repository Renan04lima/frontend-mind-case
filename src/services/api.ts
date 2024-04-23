import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ProductData } from "../models/product";

const instance = axios.create({
  baseURL: "http://localhost:3333/api/",
  timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

type CreateProduct = Omit<ProductData, "id">;
type UpdateProduct = Partial<Omit<ProductData, "id">>;

const requests = {
  post: (
    url: string,
    formDataBody: FormData,
    options: AxiosRequestConfig<any>
  ) => instance.post(url, formDataBody, options).then(responseBody),
  get: (url: string) => instance.get(url).then(responseBody),
  put: (url: string, body: UpdateProduct) =>
    instance.put(url, body).then(responseBody),
  delete: (url: string) => instance.delete(url).then(responseBody),
};

export const ProductApi = {
  createPost: (post: CreateProduct): Promise<ProductData> => {
    const formData = new FormData();
    formData.append("name", post.name);
    formData.append("description", post.description);
    formData.append("price", post.price.toString());
    formData.append("quantityStock", post.quantityStock.toString());

    if (post.image) formData.append("file", post.image);
    return requests.post("products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getPosts: (): Promise<ProductData[]> => requests.get("products"),
  updatePost: (post: UpdateProduct, id: number): Promise<ProductData> =>
    requests.put(`products/${id}`, post),
  deletePost: (id: number): Promise<void> => requests.delete(`products/${id}`),
};
