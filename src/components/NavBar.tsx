import React from "react";
import { Flex, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar: React.FC = () => {
  const { logOut } = useAuth();

  const handleLogout = () => {
    logOut();
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      paddingX={8}
      paddingY={4}
      boxShadow="md"
      borderBottomWidth={1}
      width={"full"}
      mb={"20px"}
    >
      <Text fontSize="xl" fontWeight="bold">
        Sistema de Estoque
      </Text>
      <Flex align="center">
        <Link to="/">
          <Button colorScheme="red" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Navbar;
