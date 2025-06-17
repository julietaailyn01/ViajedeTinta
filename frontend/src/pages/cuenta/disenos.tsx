import {
  Box,
  Container,
  Grid,
  Heading,
  Image,
  Text,
  Spinner,
} from "@chakra-ui/react";
import CuentaLayout from "@/components/CuentaLayout";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useGetApiPedido } from "@/generated-sources/api";

const DisenosCliente = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { data, isLoading } = useGetApiPedido();

  if (!user) return null;

  // Obtener los pedidos del usuario con mockups personalizados
  const pedidosConMockups =
    data?.data
      ?.filter((p) => p.usuarioId === user.id && p.itemsPedidos)
      .flatMap(
        (p) =>
          p.itemsPedidos
            ?.filter((i) => i.personalizacione?.mockupGenerado)
            .map((i) => ({
              id: i.id!,
              nombre: i.producto?.nombre ?? "Producto",
              imagen: i.personalizacione?.mockupGenerado!,
            })) ?? []
      ) ?? [];

  return (
    <>
      <Navbar />
      <CuentaLayout>
        <Container maxW="6xl" py={10}>
          <Heading size="lg" mb={6}>
            Mis diseños personalizados
          </Heading>
          {isLoading ? (
            <Spinner />
          ) : (
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              }}
              gap={6}
            >
              {pedidosConMockups.map((mockup) => (
                <Box
                  key={mockup.id}
                  bg="white"
                  rounded="lg"
                  shadow="md"
                  overflow="hidden"
                >
                  <Image
                    src={mockup.imagen}
                    alt={mockup.nombre}
                    w="100%"
                    h="200px"
                    objectFit="cover"
                  />
                  <Box p={4}>
                    <Text fontWeight="semibold" fontSize="md">
                      {mockup.nombre}
                    </Text>
                  </Box>
                </Box>
              ))}
            </Grid>
          )}
        </Container>
      </CuentaLayout>
      <Footer />
    </>
  );
};

export default DisenosCliente;
