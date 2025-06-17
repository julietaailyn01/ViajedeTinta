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
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const toast = useToast();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://localhost:7182/api/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorRes = await response.json();
        throw new Error(errorRes.message || "Credenciales inválidas");
      }

      const data = await response.json();
      const token = data.token;

      if (!token) throw new Error("Token no recibido");

      login(token); // ⬅️ Se guarda en contexto, se decodifica y redirige
      toast({ title: "Sesión iniciada", status: "success", duration: 2000 });
      router.push("/cuenta");
    } catch (error: any) {
      toast({
        title: "Error al iniciar sesión",
        description: error.message || "Ocurrió un error inesperado",
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
            Iniciar sesión
          </Heading>
          <form onSubmit={handleLogin}>
            <Stack spacing={4}>
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
                Iniciar sesión
              </Button>
              <Text textAlign="center">
                ¿No tenés cuenta?{" "}
                <a
                  href="/register"
                  style={{ color: "#319795", fontWeight: "bold" }}
                >
                  Registrate
                </a>
              </Text>
            </Stack>
          </form>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default LoginPage;
