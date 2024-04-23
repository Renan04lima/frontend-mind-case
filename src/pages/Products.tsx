import React, { useEffect, useState } from "react";
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
  Container,
  Heading,
  Image,
  Flex,
} from "@chakra-ui/react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import NewProductModal from "../components/NewProductModal";
import { NewProductData, ProductModel } from "../models/product";
import { ProductApi } from "../services/api";

const Products = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    ProductApi.getProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  const handleSubmit = async (newProduct: NewProductData) => {
    ProductApi.createProduct(newProduct)
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
      })
      .then((err) => {
        console.log(err);
      });
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
                  onClick={() => {
                    onOpen;
                  }}
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

      <NewProductModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      />
    </Container>
  );
};

export default Products;
