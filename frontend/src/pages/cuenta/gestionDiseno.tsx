import {
  Box,
  Container,
  Heading,
  Text,
  Grid,
  Image,
  Spinner,
} from "@chakra-ui/react";
import CuentaLayout from "@/components/CuentaLayout";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useGetApiPedido } from "@/generated-sources/api";

export const GestionDisenos = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { data, isLoading } = useGetApiPedido();

  if (!user || user.rol !== "admin") return null;

  const mockups =
    data?.data
      ?.filter((p) => p.itemsPedidos)
      .flatMap(
        (p) =>
          p.itemsPedidos
            ?.filter((i) => i.personalizacione?.mockupGenerado)
            .map((i) => ({
              id: i.id!,
              cliente: p.usuario?.nombre ?? "Sin nombre",
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
            Gestión de diseños
          </Heading>
          {isLoading ? (
            <Spinner />
          ) : (
            <Grid
              templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)" }}
              gap={6}
            >
              {mockups.map((mockup) => (
                <Box
                  key={mockup.id}
                  bg="white"
                  shadow="md"
                  rounded="md"
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
                    <Text fontWeight="bold">{mockup.nombre}</Text>
                    <Text fontSize="sm" color="gray.500">
                      Cliente: {mockup.cliente}
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
