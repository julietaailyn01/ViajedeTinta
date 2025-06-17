import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ContactoPage = () => {
  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Box>
      <Navbar />

      <Box as="section" py={16} px={4} bg="gray.50">
        <Container
          maxW="container.md"
          bg={cardBg}
          p={8}
          borderRadius="lg"
          boxShadow="md"
        >
          <Heading size="lg" mb={6} textAlign="center">
            Contactanos
          </Heading>

          <VStack spacing={5}>
            <FormControl id="nombre" isRequired>
              <FormLabel>Nombre</FormLabel>
              <Input placeholder="Tu nombre" />
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="tu@email.com" />
            </FormControl>

            <FormControl id="mensaje" isRequired>
              <FormLabel>Mensaje</FormLabel>
              <Textarea placeholder="Escribinos tu consulta..." rows={5} />
            </FormControl>

            <Button colorScheme="teal" size="lg" w="full">
              Enviar mensaje
            </Button>
          </VStack>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default ContactoPage;
