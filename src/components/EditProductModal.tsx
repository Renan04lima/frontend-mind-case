import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
} from "@chakra-ui/react";
import {
  EditProductData,
  NewProductData,
  ProductModel,
} from "../models/product";
// import { dataURLtoFile } from "../utils";

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EditProductData, id: number) => void;
  productSelected: ProductModel;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  productSelected,
}) => {
  const [editProduct, setEditProduct] = useState<NewProductData>({
    name: productSelected.name,
    description: productSelected.description,
    price: productSelected.price,
    quantityStock: productSelected.quantityStock,
    image: undefined,
    // productSelected?.image
    //   ? dataURLtoFile(
    //       `data:${productSelected.image.mimetype};base64,${productSelected.image.buffer}`,
    //       "nome_do_arquivo.jpeg"
    //     )
    //   : undefined,
  });

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as any;
    setEditProduct({
      ...editProduct,
      [name]: value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setEditProduct({
      ...editProduct,
      image: file,
    });
  };

  const handleSubmit = () => {
    onSubmit(editProduct, productSelected.id);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Produto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Image</FormLabel>
            <label
              htmlFor="image-upload"
              style={{ display: "block", cursor: "pointer" }}
            >
              <Button as="span">Upload Image</Button>
            </label>
            <Input
              id="image-upload"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </FormControl>
          {editProduct.image && (
            <Image
              src={URL.createObjectURL(editProduct.image)}
              alt="Imagem do produto"
              mt={2}
              boxSize="150px"
              objectFit="cover"
            />
          )}
          <FormControl mb={4}>
            <FormLabel>Nome</FormLabel>
            <Input
              type="text"
              name="name"
              value={editProduct.name}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Descrição</FormLabel>
            <Input
              type="text"
              name="description"
              value={editProduct.description}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Preço</FormLabel>
            <Input
              type="number"
              name="price"
              value={editProduct.price}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Quantidade em estoque</FormLabel>
            <Input
              type="number"
              name="quantityStock"
              value={editProduct.quantityStock}
              onChange={handleInputChange}
            />
          </FormControl>

          <Button mt={4} colorScheme="teal" onClick={handleSubmit}>
            Salvar
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditProductModal;
