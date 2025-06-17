import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

const productos = [
  { nombre: "Remera", img: "/mockups/remera.png" },
  { nombre: "Taza", img: "/mockups/taza.png" },
  { nombre: "Termo", img: "/mockups/termo.png" },
];

const Personalizar = () => {
  const [producto, setProducto] = useState(productos[0]);
  const [diseño, setDiseño] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const toast = useToast();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDiseño(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const agregarAlCarrito = () => {
    toast({
      title: "Producto personalizado agregado al carrito 🎨",
      status: "success",
      duration: 2500,
      isClosable: true,
    });
    // Aquí podrías agregar lógica real de carrito
  };

  return (
    <Box bg="gray.50" py={10} minH="100vh">
      <Container maxW="lg">
        <Heading mb={8} textAlign="center" color="gray.800">
          Personalizá tu producto
        </Heading>

        <Stack spacing={6}>
          <FormControl isRequired>
            <FormLabel>Seleccioná el producto</FormLabel>
            <Select
              value={producto.nombre}
              onChange={(e) =>
                setProducto(productos.find((p) => p.nombre === e.target.value)!)
              }
            >
              {productos.map((p) => (
                <option key={p.nombre} value={p.nombre}>
                  {p.nombre}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Subí tu diseño (PNG recomendado)</FormLabel>
            <Input type="file" accept="image/*" onChange={handleFile} />
          </FormControl>

          <Box textAlign="center">
            <Text fontWeight="semibold" mb={2}>
              Vista previa del diseño:
            </Text>
            <Box
              position="relative"
              display="inline-block"
              border="1px solid #e2e8f0"
              rounded="2xl"
              overflow="hidden"
              boxShadow="md"
            >
              <Image src={producto.img} alt="mockup" w="300px" />
              {preview && (
                <Image
                  src={preview}
                  alt="diseño"
                  position="absolute"
                  top="30%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  w="120px"
                  opacity={0.8}
                />
              )}
            </Box>
          </Box>

          <Button
            colorScheme="pink"
            size="lg"
            rounded="2xl"
            onClick={agregarAlCarrito}
            isDisabled={!diseño}
          >
            Agregar al carrito
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Personalizar;
