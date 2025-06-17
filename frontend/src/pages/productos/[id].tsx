import { useRouter } from "next/router";
import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagenUrl: string;
  personalizable: boolean;
}

const ProductoDetalle = () => {
  const router = useRouter();
  const { id } = router.query;
  const [producto, setProducto] = useState<Producto | null>(null);

  useEffect(() => {
    if (id) {
      // Simulación de fetch
      fetch(`/api/productos/${id}`)
        .then((res) => res.json())
        .then((data) => setProducto(data))
        .catch(() => console.error("Error al cargar el producto"));
    }
  }, [id]);

  if (!producto)
    return (
      <Text textAlign="center" mt={10}>
        Cargando producto...
      </Text>
    );

  return (
    <Box bg="gray.50" minH="100vh" py={10}>
      <Container maxW="container.xl">
        <Stack
          direction={{ base: "column", md: "row" }}
          gap={10}
          align="center"
        >
          <Box flex={1}>
            <Image
              src={producto.imagenUrl}
              alt={producto.nombre}
              rounded="2xl"
              objectFit="cover"
              w="full"
              maxH="500px"
              border="1px solid"
              borderColor="gray.200"
              shadow="md"
            />
          </Box>

          <Stack flex={1} spacing={5}>
            <Heading size="lg" color="gray.800">
              {producto.nombre}
            </Heading>
            <Text fontSize="md" color="gray.600">
              {producto.descripcion}
            </Text>
            <Text fontSize="2xl" fontWeight="bold" color="pink.500">
              ${producto.precio.toLocaleString()}
            </Text>

            <Stack direction="row" gap={4} flexWrap="wrap">
              <Button colorScheme="pink" rounded="2xl" px={8}>
                Agregar al carrito
              </Button>
              {producto.personalizable && (
                <Button
                  variant="outline"
                  borderColor="pink.500"
                  color="pink.500"
                  rounded="2xl"
                  px={8}
                  _hover={{ bg: "pink.50" }}
                >
                  Subí tu diseño
                </Button>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default ProductoDetalle;
