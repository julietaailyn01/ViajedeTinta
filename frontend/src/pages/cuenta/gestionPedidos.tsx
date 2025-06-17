import {
  Container,
  Heading,
  Badge,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Select,
  useToast,
} from "@chakra-ui/react";
import CuentaLayout from "@/components/CuentaLayout";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useGetApiPedido, usePutApiPedidoId } from "@/generated-sources/api";

export const GestionPedidos = () => {
  const { user } = useAuth();
  const router = useRouter();
  const toast = useToast();
  const { data: pedidos, refetch } = useGetApiPedido();
  const updateEstado = usePutApiPedidoId();

  if (!user || user.rol !== "admin") return null;

  const handleEstadoChange = (id: number, estado: string) => {
    updateEstado.mutate(
      { id, data: estado },
      {
        onSuccess: () => {
          toast({
            title: "Estado actualizado",
            status: "success",
            duration: 2000,
          });
          refetch();
        },
      }
    );
  };

  return (
    <>
      <Navbar />
      <CuentaLayout>
        <Container maxW="6xl" py={10}>
          <Heading size="lg" mb={6}>
            Gestión de pedidos
          </Heading>
          <Table variant="simple">
            <Thead bg="gray.100">
              <Tr>
                <Th>ID</Th>
                <Th>Estado</Th>
                <Th>Actualizar</Th>
              </Tr>
            </Thead>
            <Tbody>
              {pedidos?.data?.map((p) => (
                <Tr key={p.id}>
                  <Td>#{p.id}</Td>
                  <Td>
                    <Badge>{p.estado}</Badge>
                  </Td>
                  <Td>
                    <Select
                      size="sm"
                      value={p.estado ?? ""}
                      onChange={(e) => {
                        if (p.id) handleEstadoChange(p.id, e.target.value);
                      }}
                    >
                      <option value="En proceso">En proceso</option>
                      <option value="Enviado">Enviado</option>
                      <option value="Entregado">Entregado</option>
                    </Select>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Container>
      </CuentaLayout>
      <Footer />
    </>
  );
};
