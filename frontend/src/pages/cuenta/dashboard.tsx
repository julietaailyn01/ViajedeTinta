import {
  Container,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  SimpleGrid,
} from "@chakra-ui/react";
import CuentaLayout from "@/components/CuentaLayout";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Página: /cuenta/dashboard (Admin)
export const DashboardAdmin = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.rol !== "admin") router.push("/cuenta/resumen");
  }, [user, router]);

  return (
    <>
      <Navbar />
      <CuentaLayout>
        <Container maxW="6xl" py={10}>
          <Heading size="lg" mb={6}>
            Dashboard administrativo
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <Stat bg="gray.50" p={5} rounded="lg" shadow="md">
              <StatLabel>Total Ventas</StatLabel>
              <StatNumber>$245.000</StatNumber>
            </Stat>
            <Stat bg="gray.50" p={5} rounded="lg" shadow="md">
              <StatLabel>Pedidos</StatLabel>
              <StatNumber>64</StatNumber>
            </Stat>
            <Stat bg="gray.50" p={5} rounded="lg" shadow="md">
              <StatLabel>Diseños enviados</StatLabel>
              <StatNumber>19</StatNumber>
            </Stat>
          </SimpleGrid>
        </Container>
      </CuentaLayout>
      <Footer />
    </>
  );
};
