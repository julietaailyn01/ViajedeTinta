import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

export default function HomePage() {
  return (
    <Box>
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <Box as="section" bg="gray.100" py={20} px={8} textAlign="center">
        <Container maxW="container.lg">
          <Heading size="2xl" mb={4}>
            Contá tu historia con cada producto
          </Heading>
          <Text fontSize="lg" mb={8}>
            Diseños personalizados que expresan tu esencia.
          </Text>
          <HStack spacing={4} justify="center">
            <Button size="lg" colorScheme="teal">
              Ver productos
            </Button>
            <Button size="lg" variant="outline" colorScheme="teal">
              Subí tu diseño
            </Button>
          </HStack>
        </Container>
      </Box>

      {/* Productos Destacados */}
      <Box as="section" py={16} px={8}>
        <Container maxW="container.lg">
          <Heading size="lg" mb={8}>
            Productos destacados
          </Heading>
          <Flex wrap="wrap" gap={6} justify="center">
            {[1, 2, 3].map((i) => (
              <Box
                key={i}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                w="250px"
                p={4}
                bg="white"
              >
                <Image
                  src={`/productos/producto${i}.jpg`}
                  alt={`Producto ${i}`}
                  mb={4}
                />
                <Text fontWeight="bold">Producto {i}</Text>
                <Text color="gray.500">$10.000</Text>
                <Button mt={2} colorScheme="teal" w="full">
                  Comprar
                </Button>
              </Box>
            ))}
          </Flex>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
}
