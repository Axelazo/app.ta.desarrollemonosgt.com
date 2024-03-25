import { Box, Button, FormControl, FormLabel, Heading, Input, Link, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

function Login() {
  return (
    <>
      <Stack align={"center"}>
        <Heading fontSize={"4xl"}>Iniciar sesión</Heading>
      </Stack>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
      >
        <Stack spacing={4}>
          <FormControl id="email">
            <FormLabel>Correo electrónico</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Contraseña</FormLabel>
            <Input type="password" />
          </FormControl>
          <Stack spacing={10}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"center"}
            >
              <Text>
                No tienes una cuenta?{" "}
                <Link as={ReactRouterLink} to="/register" color={"blue.400"}>
                  Regístrate
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
              Iniciar sesión
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

export default Login;
