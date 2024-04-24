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
  useToast,
} from "@chakra-ui/react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import NewProductModal from "../components/NewProductModal";
import {
  EditProductData,
  NewProductData,
  ProductModel,
} from "../models/product";
import { ProductApi } from "../services/api";
import EditProductModal from "../components/EditProductModal";

const Products = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [productSelected, setProductSelected] = useState<ProductModel | null>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    ProductApi.getProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  const handleSubmitNewProduct = async (newProduct: NewProductData) => {
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
        toast({
          title: "Cadatrado com sucesso.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => {
        toast({
          title: "Erro ao cadastrar.",
          description: err.response.data.error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const handleSubmitEditProduct = async (
    editProduct: EditProductData,
    id: number
  ) => {
    ProductApi.updateProduct(editProduct, id)
      .then((data) => {
        let base64String;
        if (data?.image) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          base64String = Buffer.from(data.image.buffer, "binary").toString(
            "base64"
          );
        }

        setProducts(products.filter((product) => product.id !== id));

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
        toast({
          title: "Editado com sucesso.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => {
        toast({
          title: "Erro ao editar.",
          description: err.response.data.error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const handleDeleteProduct = async (id: number) => {
    ProductApi.deleteProduct(id)
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
        toast({
          title: "Deletado com sucesso.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => {
        toast({
          title: "Erro ao deletar.",
          description: err.response.data.error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
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
                    setProductSelected(product);
                    onOpenEdit();
                  }}
                />
                <IconButton
                  icon={<FaTrash />}
                  colorScheme="red"
                  aria-label="Delete"
                  onClick={() => handleDeleteProduct(product.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <NewProductModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmitNewProduct}
      />
      {productSelected && (
        <EditProductModal
          isOpen={isOpenEdit}
          onClose={onCloseEdit}
          onSubmit={handleSubmitEditProduct}
          productSelected={productSelected}
        />
      )}
    </Container>
  );
};

export default Products;
