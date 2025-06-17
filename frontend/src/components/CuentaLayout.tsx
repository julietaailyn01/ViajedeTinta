import {
  Box,
  Flex,
  VStack,
  Text,
  Icon,
  useColorModeValue,
  Divider,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  FiUser,
  FiPackage,
  FiImage,
  FiBarChart2,
  FiArchive,
  FiTruck,
  FiShield,
} from "react-icons/fi";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import NextLink from "next/link";

type Props = {
  children: React.ReactNode;
};

const CuentaLayout = ({ children }: Props) => {
  const { user } = useAuth();
  const router = useRouter();
  const bg = useColorModeValue("gray.50", "gray.900");
  const sidebarBg = useColorModeValue("white", "gray.800");
  const activeBg = useColorModeValue("teal.100", "teal.700");

  const menuItems =
    user?.rol === "admin"
      ? [
          {
            label: "Resumen de cuenta",
            icon: FiUser,
            href: "/cuenta/resumen",
          },
          {
            label: "Dashboard",
            icon: FiBarChart2,
            href: "/cuenta/dashboard",
          },
          {
            label: "Gestión de productos",
            icon: FiArchive,
            href: "/cuenta/productos",
          },
          {
            label: "Gestión de pedidos",
            icon: FiTruck,
            href: "/cuenta/gestion-pedidos",
          },
          {
            label: "Gestión de diseños",
            icon: FiImage,
            href: "/cuenta/gestion-diseno",
          },
        ]
      : [
          {
            label: "Resumen de cuenta",
            icon: FiUser,
            href: "/cuenta/resumen",
          },
          {
            label: "Mis pedidos",
            icon: FiPackage,
            href: "/cuenta/pedidos",
          },
          {
            label: "Mis diseños",
            icon: FiImage,
            href: "/cuenta/disenos",
          },
        ];

  return (
    <Flex minH="100vh" bg={bg}>
      {/* SIDEBAR */}
      <Box
        w="250px"
        bg={sidebarBg}
        p={6}
        boxShadow="lg"
        position="sticky"
        top={0}
        minH="100vh"
      >
        <VStack align="stretch" spacing={4}>
          <Text fontWeight="bold" fontSize="xl" mb={4}>
            Mi Cuenta
          </Text>
          <Divider />
          {menuItems.map((item) => {
            const isActive = router.pathname === item.href;
            return (
              <Link key={item.href} href={item.href} passHref>
                <ChakraLink
                  as={NextLink}
                  href={item.href}
                  p={3}
                  borderRadius="md"
                  bg={isActive ? activeBg : "transparent"}
                  _hover={{ bg: activeBg }}
                  display="flex"
                  alignItems="center"
                  gap={3}
                >
                  <Icon as={item.icon} boxSize={5} />
                  {item.label}
                </ChakraLink>
              </Link>
            );
          })}
        </VStack>
      </Box>

      {/* CONTENIDO */}
      <Box flex="1" p={8}>
        {children}
      </Box>
    </Flex>
  );
};

export default CuentaLayout;
