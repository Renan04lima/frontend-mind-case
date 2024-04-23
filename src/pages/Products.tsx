import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  IconButton,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Container,
  Heading,
  Image,
  Flex,
} from "@chakra-ui/react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { NewProductData, ProductModel } from "../models/product";
import { ProductApi } from "../services/api";

const Products = () => {
  const [products, setProducts] = useState<ProductModel[]>([
    {
      id: 1,
      name: "Product 1",
      description: "",
      price: 10,
      quantityStock: 10,
      image: undefined,
    },
    {
      id: 2,
      name: "Product 2",
      description: "",
      price: 20,
      quantityStock: 10,
      image: undefined,
    },
    {
      id: 3,
      name: "Product 3",
      description: "",
      price: 30,
      quantityStock: 10,
      image: undefined,
    },
  ]);
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const handleSubmit = async () => {
    ProductApi.createPost(newProduct)
      .then((data) => {
        let base64String;
        if (data?.image)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          base64String = Buffer.from(data.image.buffer, "binary").toString(
            "base64"
          );

        setProducts([
          ...products,
          {
            id: data.id,
            name: data.name,
            description: data.description,
            price: data.price,
            quantityStock: data.quantityStock,
            image: data?.image
              ? {
                  buffer: base64String as unknown as Buffer,
                  mimetype: data?.image?.mimetype,
                }
              : undefined,
          },
        ]);

        setNewProduct({
          name: "",
          description: "",
          price: 0,
          quantityStock: 0,
          image: undefined,
        });
        onClose();
      })
      .then((err) => {
        console.log(err);
      });

    onClose();
  };

  return (
    <Container>
      <Flex justify={"space-between"} mb={"30px"} alignItems={"center"}>
        <Heading>Produtos</Heading>
        <Button
          leftIcon={<Icon as={FaPlus} />}
          colorScheme="teal"
          onClick={onOpen}
          size={"sm"}
        >
          Novo produto
        </Button>
      </Flex>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Image</Th>
            <Th>Nome</Th>
            <Th>Preço</Th>
            <Th>Ação</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => (
            <Tr key={product.id}>
              <Td>
                <Image
                  borderRadius="full"
                  borderColor={"gray"}
                  borderWidth={"medium"}
                  border={"5px"}
                  boxSize={{ base: "40px", lg: "56px" }}
                  src={
                    product?.image
                      ? `data:${product.image.mimetype};base64,${product.image.buffer}`
                      : "src/assets/placeholder.png"
                  }
                  alt="imagem produto"
                />
              </Td>
              <Td>{product.name}</Td>
              <Td>R$ {product.price}</Td>
              <Td>
                <IconButton
                  icon={<FaEdit />}
                  colorScheme="blue"
                  aria-label="Edit"
                  mr={2}
                />
                <IconButton
                  icon={<FaTrash />}
                  colorScheme="red"
                  aria-label="Delete"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

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
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setNewProduct({
                    ...newProduct,
                    image: file,
                  });
                }}
                style={{ display: "none" }}
              />
              {newProduct.image && (
                <Image
                  src={URL.createObjectURL(newProduct.image)}
                  alt="Product"
                  mt={2}
                  boxSize="150px"
                  objectFit="cover"
                />
              )}
            </FormControl>
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
            <FormControl>
              <FormLabel>Preço</FormLabel>
              <Input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Quantidade em estoque</FormLabel>
              <Input
                type="number"
                name="quantityStock"
                value={newProduct.quantityStock}
                onChange={handleInputChange}
              />
            </FormControl>
          </ModalBody>
          <Button mt={4} colorScheme="teal" onClick={handleSubmit}>
            Salvar
          </Button>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Products;
