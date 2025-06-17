import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
} from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

const AuthPage = () => {
  const cardBg = useColorModeValue("white", "gray.800");

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    nombre: "",
  });

  const handleLogin = () => {
    console.log("Iniciar sesión con:", loginData);
    // Aquí harás la llamada al endpoint /login
  };

  const handleRegister = () => {
    console.log("Registrarse con:", registerData);
    // Aquí harás la llamada al endpoint /register
  };

  return (
    <Box>
      <Navbar />
      <Box py={16} px={4} minH="80vh" bg="gray.50">
        <Container maxW="md" bg={cardBg} p={8} borderRadius="lg" boxShadow="lg">
          <Heading mb={6} textAlign="center">
            Bienvenido a Viaje de Tinta
          </Heading>

          <Tabs variant="soft-rounded" colorScheme="teal" isFitted>
            <TabList mb={6}>
              <Tab>Iniciar sesión</Tab>
              <Tab>Registrarse</Tab>
            </TabList>

            <TabPanels>
              {/* TAB: LOGIN */}
              <TabPanel>
                <Stack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Contraseña</FormLabel>
                    <Input
                      type="password"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                    />
                  </FormControl>
                  <Button colorScheme="teal" onClick={handleLogin}>
                    Iniciar sesión
                  </Button>
                </Stack>
              </TabPanel>

              {/* TAB: REGISTER */}
              <TabPanel>
                <Stack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Nombre completo</FormLabel>
                    <Input
                      value={registerData.nombre}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          nombre: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      value={registerData.email}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          email: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Contraseña</FormLabel>
                    <Input
                      type="password"
                      value={registerData.password}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          password: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                  <Button colorScheme="teal" onClick={handleRegister}>
                    Registrarse
                  </Button>
                </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default AuthPage;
