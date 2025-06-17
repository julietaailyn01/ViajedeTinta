import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";

const RegisterPage = () => {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("https://localhost:7182/api/Auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al registrarse");
      }

      toast({
        title: "Registro exitoso",
        description: "Revisá tu correo para verificar tu cuenta.",
        status: "success",
        duration: 3000,
      });
      localStorage.setItem("email_verificar", form.email);
      router.push("/register/verificar");
    } catch (error: any) {
      toast({
        title: "Error al registrarse",
        description: error.message || "Revisá los datos ingresados",
        status: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Navbar />
      <Container maxW="sm" py={16}>
        <Box
          bg={useColorModeValue("white", "gray.800")}
          p={8}
          borderRadius="lg"
          boxShadow="md"
        >
          <Heading mb={6} size="lg" textAlign="center">
            Crear cuenta
          </Heading>
          <form onSubmit={handleRegister}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Nombre completo</FormLabel>
                <Input
                  name="nombre"
                  type="text"
                  placeholder="Ej: Daniel Martín"
                  value={form.nombre}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Contraseña</FormLabel>
                <Input
                  name="password"
                  type="password"
                  placeholder="******"
                  value={form.password}
                  onChange={handleChange}
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="teal"
                w="full"
                isLoading={loading}
              >
                Registrarme
              </Button>
              <Text textAlign="center">
                ¿Ya tenés cuenta? <a href="/login">Iniciar sesión</a>
              </Text>
            </Stack>
          </form>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default RegisterPage;
