import {
  Box,
  Container,
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Badge,
  Icon,
  Flex,
  Spinner,
  useQuery,
} from "@chakra-ui/react";
import CuentaLayout from "@/components/CuentaLayout";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaBoxOpen } from "react-icons/fa";
import { useGetApiPedido } from "@/generated-sources/api";

const PedidosCliente = () => {
  const { user } = useAuth();
  const router = useRouter();

  const { data, isLoading } = useGetApiPedido(); // Hook generado por Orval

  const getColorEstado = (estado: string | undefined | null) => {
    switch (estado) {
      case "En proceso":
        return "orange";
      case "Enviado":
        return "blue";
      case "Entregado":
        return "green";
      default:
        return "gray";
    }
  };

  if (!user) return null;

  return (
    <>
      <Navbar />
      <CuentaLayout>
        <Container maxW="6xl" py={10}>
          <Heading size="lg" mb={6}>
            Mis pedidos
          </Heading>
          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : (
            <Box overflowX="auto" shadow="md" rounded="lg">
              <Table variant="simple">
                <Thead bg="gray.100">
                  <Tr>
                    <Th>ID</Th>
                    <Th>Fecha</Th>
                    <Th>Estado</Th>
                    <Th>Total</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.data
                    ?.filter((p) => p.usuarioId === user.id)
                    .map((pedido) => (
                      <Tr key={pedido.id}>
                        <Td>#{pedido.id}</Td>
                        <Td>
                          {pedido.fecha
                            ? new Date(pedido.fecha).toLocaleDateString()
                            : "Sin fecha"}
                        </Td>
                        <Td>
                          <Badge colorScheme={getColorEstado(pedido.estado)}>
                            {pedido.estado ?? "Desconocido"}
                          </Badge>
                        </Td>
                        <Td>${pedido.total?.toFixed(2) ?? "0.00"}</Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </Box>
          )}
        </Container>
      </CuentaLayout>
      <Footer />
    </>
  );
};

export default PedidosCliente;
