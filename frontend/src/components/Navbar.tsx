import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  HStack,
  VStack,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useState } from "react";
import NextLink from "next/link";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const Links = [
    { label: "Inicio", href: "/" },
    { label: "Productos", href: "/productos" },
    { label: "Personalizar", href: "/personalizar" },
    { label: "Contacto", href: "/contacto" },
  ];

  return (
    <Box
      bg="white"
      px={6}
      py={3}
      boxShadow="md"
      position="sticky"
      top={0}
      zIndex={1000}
    >
      <Flex align="center" justify="space-between" wrap="wrap">
        {/* Logo */}
        <Text fontSize="xl" fontWeight="bold" color="teal.500">
          Viaje de Tinta
        </Text>

        {/* Botón móvil */}
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={isOpen ? onClose : onOpen}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Abrir menú"
          variant="ghost"
        />

        {/* Menú horizontal */}
        <HStack
          as="nav"
          spacing={4}
          display={{ base: "none", md: "flex" }}
          align="center"
        >
          {Links.map((link) => (
            <NextLink key={link.label} href={link.href} passHref legacyBehavior>
              <Button variant="ghost" fontWeight="medium">
                {link.label}
              </Button>
            </NextLink>
          ))}

          {/* Íconos de usuario y carrito */}
          <NextLink href="/cuenta" passHref legacyBehavior>
            <IconButton
              aria-label="Mi cuenta"
              icon={<FaUser />}
              variant="ghost"
              size="sm"
            />
          </NextLink>
          <NextLink href="/carrito" passHref legacyBehavior>
            <IconButton
              aria-label="Carrito"
              icon={<FaShoppingCart />}
              variant="ghost"
              size="sm"
            />
          </NextLink>
        </HStack>
      </Flex>

      {/* Menú móvil desplegable */}
      {isOpen && (
        <VStack mt={2} align="start" spacing={3} display={{ md: "none" }}>
          {Links.map((link) => (
            <NextLink key={link.label} href={link.href} passHref legacyBehavior>
              <Button variant="ghost" w="full" justifyContent="flex-start">
                {link.label}
              </Button>
            </NextLink>
          ))}

          {/* Íconos de usuario y carrito para móvil */}
          <HStack w="full" spacing={2} pt={2}>
            <NextLink href="/cuenta" passHref legacyBehavior>
              <IconButton
                aria-label="cuenta"
                icon={<FaUser />}
                variant="ghost"
                size="sm"
              />
            </NextLink>
            <NextLink href="/carrito" passHref legacyBehavior>
              <IconButton
                aria-label="Carrito"
                icon={<FaShoppingCart />}
                variant="ghost"
                size="sm"
              />
            </NextLink>
          </HStack>
        </VStack>
      )}
    </Box>
  );
};

export default Navbar;
