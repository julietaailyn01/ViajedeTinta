import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface ItemCarrito {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  imagenUrl: string;
}

const Carrito = () => {
  const [items, setItems] = useState<ItemCarrito[]>([]);

  useEffect(() => {
    // Simulamos carga desde localStorage o API
    const datos = localStorage.getItem("carrito");
    if (datos) setItems(JSON.parse(datos));
  }, []);

  const subtotal = items.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const eliminarItem = (id: string) => {
    const nuevoCarrito = items.filter((item) => item.id !== id);
    setItems(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  return (
    <Box bg="gray.50" minH="100vh" py={10}>
      <Container maxW="container.xl">
        <Heading mb={6} color="gray.800">
          Carrito de Compras
        </Heading>

        {items.length === 0 ? (
          <Text color="gray.500">Tu carrito está vacío.</Text>
        ) : (
          <Stack spacing={6}>
            {items.map((item) => (
              <Stack
                key={item.id}
                direction={{ base: "column", md: "row" }}
                gap={6}
                align="center"
                bg="white"
                p={4}
                rounded="2xl"
                shadow="md"
              >
                <Image
                  src={item.imagenUrl}
                  alt={item.nombre}
                  boxSize="100px"
                  objectFit="cover"
                  rounded="xl"
                  border="1px solid"
                  borderColor="gray.200"
                />
                <Box flex={1}>
                  <Text fontWeight="bold">{item.nombre}</Text>
                  <Text color="gray.600">Cantidad: {item.cantidad}</Text>
                  <Text color="pink.500">
                    ${item.precio.toLocaleString()} c/u
                  </Text>
                </Box>
                <Button
                  size="sm"
                  colorScheme="pink"
                  variant="ghost"
                  onClick={() => eliminarItem(item.id)}
                >
                  Eliminar
                </Button>
              </Stack>
            ))}

            <Divider borderColor="gray.300" />

            <Box textAlign="right">
              <Text fontSize="xl" fontWeight="bold">
                Total: ${subtotal.toLocaleString()}
              </Text>
              <Button mt={4} colorScheme="pink" rounded="2xl" px={8} size="lg">
                Finalizar compra
              </Button>
            </Box>
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default Carrito;
