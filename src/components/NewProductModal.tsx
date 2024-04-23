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
import { NewProductData } from "../models/product";

interface NewProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: NewProductData) => void;
}

const NewProductModal: React.FC<NewProductModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [newProduct, setNewProduct] = useState<NewProductData>({
    name: "",
    description: "",
    price: 0,
    quantityStock: 0,
    image: undefined,
  });

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as any;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setNewProduct({
      ...newProduct,
      image: file,
    });
  };

  const handleSubmit = () => {
    onSubmit(newProduct);
    setNewProduct({
      name: "",
      description: "",
      price: 0,
      quantityStock: 0,
      image: undefined,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Novo Produto</ModalHeader>
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
          {newProduct.image && (
            <Image
              src={URL.createObjectURL(newProduct.image)}
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
              value={newProduct.name}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Descrição</FormLabel>
            <Input
              type="text"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Preço</FormLabel>
            <Input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Quantidade em estoque</FormLabel>
            <Input
              type="number"
              name="quantityStock"
              value={newProduct.quantityStock}
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

export default NewProductModal;
