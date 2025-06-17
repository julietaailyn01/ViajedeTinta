import { Box, Container, Heading, Text } from "@chakra-ui/react";
import CuentaLayout from "@/components/CuentaLayout";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const AdminPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.rol !== "admin") {
      router.push("/cuenta/resumen");
    }
  }, [user, router]);

  return (
    <>
      <Navbar />
      <CuentaLayout>
        <Container maxW="4xl" py={10}>
          <Heading size="lg" mb={6}>
            Panel de administración
          </Heading>
          <Text>Aquí los admins gestionan productos, usuarios, etc.</Text>
        </Container>
      </CuentaLayout>
      <Footer />
    </>
  );
};

export default AdminPage;
