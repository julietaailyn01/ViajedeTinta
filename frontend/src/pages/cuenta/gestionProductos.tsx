import {
  Container,
  Heading,
  Button,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import CuentaLayout from "@/components/CuentaLayout";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  useGetApiProduct,
  useDeleteApiProductId,
} from "@/generated-sources/api/product/product";

export const GestionProductos = () => {
  const { user } = useAuth();
  const router = useRouter();
  const toast = useToast();
  const { data: productos, isLoading, refetch } = useGetApiProduct();
  const deleteMutation = useDeleteApiProductId();

  const eliminarProducto = (id?: number) => {
    if (!id) return;
    deleteMutation.mutate(
      { id },
      {
        onSuccess: () => {
          toast({
            title: "Producto eliminado",
            status: "success",
            duration: 2000,
          });
          refetch();
        },
      }
    );
  };

  if (!user || user.rol !== "admin") return null;

  return (
    <>
      <Navbar />
      <CuentaLayout>
        <Container maxW="6xl" py={10}>
          <Heading size="lg" mb={6}>
            Gestión de productos
          </Heading>
          {isLoading ? (
            <Spinner />
          ) : (
            <Table variant="simple">
              <Thead bg="gray.100">
                <Tr>
                  <Th>Nombre</Th>
                  <Th>Precio</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {productos?.map((prod) => (
                  <Tr key={prod.id}>
                    <Td>{prod.nombre}</Td>
                    <Td>${prod.precio?.toFixed(2)}</Td>
                    <Td>
                      <Button size="sm" colorScheme="blue" mr={2}>
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="red"
                        onClick={() => eliminarProducto(prod.id)}
                      >
                        Eliminar
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Container>
      </CuentaLayout>
      <Footer />
    </>
  );
};
