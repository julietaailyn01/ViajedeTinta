import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { useGetApiProduct } from "@/generated-sources/api";

const ProductosPage = () => {
  const { data, isLoading, error } = useGetApiProduct();
  const cardBg = useColorModeValue("white", "gray.800");

  console.log(data);

  return (
    <Box>
      <Navbar />

      <Box as="section" py={16} px={8} bg="gray.50">
        <Container maxW="container.lg">
          <Heading size="lg" mb={8} textAlign="center">
            Todos los productos
          </Heading>

          {isLoading ? (
            <Flex justify="center">
              <Spinner size="xl" color="teal.500" />
            </Flex>
          ) : error ? (
            <Text color="red.500">Error al cargar los productos</Text>
          ) : (
            <Flex wrap="wrap" gap={6} justify="center">
              {data?.data.map((producto) => (
                <Box
                  key={producto.id}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  w="250px"
                  p={4}
                  bg={cardBg}
                  boxShadow="md"
                >
                  <Image
                    src={producto.imagenUrl || "/productos/placeholder.jpg"}
                    mb={4}
                  />
                  <Text fontWeight="bold">{producto.nombre}</Text>
                  <Text color="gray.500">
                    ${producto.precio?.toLocaleString()}
                  </Text>
                  <Button mt={2} colorScheme="teal" w="full">
                    Ver más
                  </Button>
                </Box>
              ))}
            </Flex>
          )}
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default ProductosPage;
