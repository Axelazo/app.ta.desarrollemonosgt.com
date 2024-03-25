import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Text,
  Link,
} from "@chakra-ui/react";

import { Link as ReactRouterLink } from "react-router-dom";

function Register() {
  return (
    <>
      <Stack align={"center"}>
        <Heading fontSize={"4xl"}>Regístrate</Heading>
      </Stack>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
      >
        <Stack spacing={4}>
          <FormControl id="username">
            <FormLabel>Nombre de Usuario</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Correo electrónico</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Contraseña</FormLabel>
            <Input type="password" />
          </FormControl>
          <FormControl id="confirmPassword">
            <FormLabel>Confirmar contraseña</FormLabel>
            <Input type="password" />
          </FormControl>
          <Stack spacing={10}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"center"}
            >
              <Text>
                Ya tienes una cuenta?{" "}
                <Link as={ReactRouterLink} to="/login" color={"blue.400"}>
                  Inicia sesión
                </Link>
              </Text>
            </Stack>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
            >
              Regístrate
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

export default Register;
