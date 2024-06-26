import { Flex, Stack, useColorModeValue } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

function AuthOutlet() {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} minW={"md"} py={12} px={6}>
        <Outlet />
      </Stack>
    </Flex>
  );
}

export default AuthOutlet;
