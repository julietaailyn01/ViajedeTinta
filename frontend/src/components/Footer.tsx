// src/components/Footer.tsx
import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  Flex,
  VStack,
  HStack,
} from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bg="gray.900" color="white" mt={20} py={10}>
      <Container maxW="container.xl">
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          gap={10}
          mb={6}
          borderBottom="1px solid"
          borderColor="gray.600"
          pb={6}
        >
          {/* Marca y lema */}
          <VStack align="start" spacing={2}>
            <Text fontSize="xl" fontWeight="bold" color="teal.300">
              Viaje de Tinta
            </Text>
            <Text fontSize="sm">Tu historia en cada diseño.</Text>
          </VStack>

          {/* Enlaces útiles */}
          <VStack align="start" spacing={1}>
            <Text fontWeight="bold" mb={2}>
              Enlaces
            </Text>
            <Link href="/" _hover={{ color: "teal.200" }}>
              Inicio
            </Link>
            <Link href="/productos" _hover={{ color: "teal.200" }}>
              Productos
            </Link>
            <Link href="/personalizar" _hover={{ color: "teal.200" }}>
              Personalizar
            </Link>
            <Link href="/contacto" _hover={{ color: "teal.200" }}>
              Contacto
            </Link>
          </VStack>

          {/* Contacto */}
          <VStack align="start" spacing={1}>
            <Text fontWeight="bold" mb={2}>
              Contacto
            </Text>
            <Text fontSize="sm">Avellaneda, Buenos Aires</Text>
            <Text fontSize="sm">viajedetinta@gmail.com</Text>
            <Text fontSize="sm">+54 11 1234 5678</Text>
          </VStack>
        </Flex>

        {/* Derechos reservados */}
        <Text fontSize="xs" textAlign="center" color="gray.400">
          © {new Date().getFullYear()} Viaje de Tinta. Todos los derechos
          reservados.
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
