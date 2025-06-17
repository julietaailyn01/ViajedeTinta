import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

const VerificarEmailPage = () => {
  const [codigo, setCodigo] = useState(Array(6).fill(""));
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const [email, setEmail] = useState("");
  const toast = useToast();
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    // Obtenemos el email guardado en localStorage o query
    const emailFromStorage = localStorage.getItem("email_verificar");
    if (emailFromStorage) {
      setEmail(emailFromStorage);
    } else if (router.query.email) {
      setEmail(router.query.email as string);
    }
  }, [router.query.email]);

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const nuevoCodigo = [...codigo];
      if (codigo[index]) {
        // Si ya había algo, lo borra
        nuevoCodigo[index] = "";
        setCodigo(nuevoCodigo);
      } else if (index > 0) {
        // Si ya estaba vacío, va al anterior
        inputsRef.current[index - 1]?.focus();
        nuevoCodigo[index - 1] = "";
        setCodigo(nuevoCodigo);
      }
    }
  };

  const handleChange = (index: number, value: string) => {
    if (/^[0-9a-zA-Z]$/.test(value)) {
      const nuevoCodigo = [...codigo];
      nuevoCodigo[index] = value;
      setCodigo(nuevoCodigo);
      if (index < 5 && inputsRef.current[index + 1]) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const codigoFinal = codigo.join("");

    try {
      const response = await fetch("https://localhost:7182/api/Auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, codigo: codigoFinal }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Código inválido");
      }

      const data = await response.json();
      const token = data.token;

      login(token);

      toast({
        title: "Verificación exitosa",
        status: "success",
        duration: 3000,
      });

      setTimeout(() => {
        router.push("/cuenta");
      }, 100);

      router.push("/cuenta");
    } catch (error: any) {
      toast({
        title: "Error al verificar",
        description: error.message,
        status: "error",
        duration: 3000,
      });
    }
  };

  return (
    <Container maxW="sm" py={16}>
      <Box
        bg={useColorModeValue("white", "gray.800")}
        p={8}
        borderRadius="lg"
        boxShadow="md"
      >
        <Heading mb={6} size="lg" textAlign="center">
          Verificá tu email
        </Heading>
        <Text mb={4} textAlign="center">
          Ingresá el código que te enviamos a <strong>{email}</strong>
        </Text>

        <form onSubmit={handleSubmit}>
          <Stack spacing={6}>
            <FormControl isRequired>
              <FormLabel>Código de verificación</FormLabel>
              <HStack justify="center">
                {codigo.map((char, i) => (
                  <Input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={char}
                    ref={(el) => {
                      if (el) inputsRef.current[i] = el;
                    }}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    textAlign="center"
                    fontSize="2xl"
                    w="14"
                    h="14"
                    p={0}
                    variant="filled"
                    bg="gray.100"
                    _focus={{
                      bg: "white",
                      borderColor: "teal.400",
                      boxShadow: "outline",
                    }}
                    autoFocus={i === 0}
                  />
                ))}
              </HStack>
            </FormControl>
            <Button type="submit" colorScheme="teal" w="full">
              Verificar
            </Button>
            <Text textAlign="center">
              Volver al <a href="/login">inicio de sesión</a>
            </Text>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default VerificarEmailPage;
