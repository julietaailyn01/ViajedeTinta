// Página: /cuenta/resumen (Cliente y Admin)
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Flex,
  Avatar,
  Divider,
  useBreakpointValue,
} from "@chakra-ui/react";
import CuentaLayout from "@/components/CuentaLayout";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ResumenCuenta = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    if (!user) router.push("/");
  }, [user, router]);

  return (
    <>
      <Navbar />
      <CuentaLayout>
        <Container maxW="4xl" py={10}>
          <Flex direction={{ base: "column", md: "row" }} gap={8}>
            <Avatar name={user?.nombre} size="2xl" />
            <Box flex={1}>
              <Heading size="lg" mb={4}>
                Resumen de cuenta
              </Heading>
              <Text fontSize="lg" fontWeight="semibold">
                Nombre:{" "}
                <Text as="span" fontWeight="normal">
                  {user?.nombre}
                </Text>
              </Text>
              <Text fontSize="lg" fontWeight="semibold">
                Email:{" "}
                <Text as="span" fontWeight="normal">
                  {user?.email}
                </Text>
              </Text>
              <Text fontSize="lg" fontWeight="semibold">
                Rol:{" "}
                <Text as="span" fontWeight="normal">
                  {user?.rol}
                </Text>
              </Text>
              <Divider my={6} />
              <Flex gap={4} wrap="wrap">
                <Button
                  colorScheme="pink"
                  onClick={() => router.push("/cuenta/editar")}
                >
                  Editar cuenta
                </Button>
                <Button colorScheme="gray" onClick={logout}>
                  Cerrar sesión
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Container>
      </CuentaLayout>
      <Footer />
    </>
  );
};

export default ResumenCuenta;
