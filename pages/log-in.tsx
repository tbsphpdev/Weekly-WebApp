import {
  Box,
  Button,
  Text,
  Flex,
  Heading,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useEffect } from "react";

import Navbar from "../components/auth/Navbar";
import WebDesign from "../components/svgs/WebDesign.svg";
import Google from "../components/svgs/Google.svg";
import NextLink from "../components/utils/NextLink";

export default function LoginPage() {
  const toast = useToast();

  useEffect(() => {
    const html = document.getElementsByTagName("html")[0];
    const body = document.getElementsByTagName("body")[0];
    body.classList.add("auth-page");
    html.classList.add("auth-page");
  }, []);

  useEffect(() => {
    if (window.location?.search === "?error=AccessDenied") {
      toast({
        title: "Access Denied",
        description: "The account has already been created, please log in.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    // setTimeout(() => {
    //   router.replace(window.location.origin + "/log-in");
    // }, 5000);
  }, []);

  return (
    <Flex width="100%" height="100%" flexDirection="column" position="relative">
      <Navbar showSignup />
      <Flex flexWrap="wrap" position="relative" height="100%">
        <Flex
          background="#EFFAFE"
          height={["min-content", "min-content", "100%"]}
          width="50%"
          paddingY={[10, 10, 0]}
          flex={1}
          maxWidth="100%"
          justifyContent="center"
          alignItems="center"
        >
          <WebDesign />
        </Flex>
        <Flex
          direction="column"
          justifyContent={["center", "center", "center"]}
          alignItems="center"
          gap="2em"
          flex={1}
          px={["1em", "6em"]}
          py="3em"
        >
          <Heading textAlign="center">Log In to Weekly</Heading>
          <Button
            width="100%"
            leftIcon={
              <Box width="1em" height="1em">
                <Google />
              </Box>
            }
            variant="outline"
            fontWeight="normal"
            onClick={() => {
              signIn(
                "google",
                {
                  callbackUrl: `${window.location.origin}/profile`,
                },
                { type: "signin" }
              );
            }}
          >
            Continue with Google
          </Button>
          <Stack alignItems="center">
            {/* <Checkbox color="#C4C4C4">
              I agree to the <NextLink href="/">terms and conditions</NextLink>
            </Checkbox> */}
            <Text>
              Don&rsquo;t have an account?&nbsp;
              <NextLink href="/register">Sign Up</NextLink>
            </Text>
          </Stack>
        </Flex>
      </Flex>
    </Flex>
  );
}
