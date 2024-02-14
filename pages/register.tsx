import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Flex,
  Heading,
  Text,
  Box,
  useToast,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

import Navbar from "../components/auth/Navbar";
import WebDesign from "../components/svgs/WebDesign.svg";
import Google from "../components/svgs/Google.svg";
import NextLink from "../components/utils/NextLink";

export default function RegisterPage() {
  const toast = useToast();
  const router = useRouter();
  const [terms, setTerms] = useState(false);
  const { query } = router;
  const lastPage = query?.s;

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
        description: "The account does not exist, please sign up.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    // setTimeout(() => {
    //   router.replace(window.location.origin + "/register");
    // }, 5000);
  }, []);

  return (
    <Flex width="100%" height="100%" flexDirection="column" position="relative">
      <Navbar showLogin />
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
          <Heading textAlign="center">Sign Up for Weekly</Heading>
          {/* <Button
            width="100%"
            leftIcon={
              <Box width="1em" height="1em">
                <Google />
              </Box>
            }
            variant="outline"
            fontWeight="normal"
            // onClick={() =>
            //   signIn("google", {
            //     callbackUrl: window.location.origin + "/profile",
            //   })
            // }
          >
            Continue with Google
          </Button> */}
          <Checkbox
            color="#C4C4C4"
            name="terms"
            isChecked={terms}
            onChange={() => setTerms(!terms)}
          >
            I agree to the{" "}
            <NextLink target="_blank" href="/tos.pdf" replace>
              Terms of Use
            </NextLink>{" "}
            &{" "}
            <NextLink target="_blank" href="/privacy-policy.pdf" replace>
              Privacy Policy.
            </NextLink>
          </Checkbox>
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
                  callbackUrl:
                    lastPage === "price"
                      ? `${window.location.origin}/subscription`
                      : `${window.location.origin}/profile`,
                },
                { type: "signup" }
              );
            }}
            disabled={terms ? false : true}
          >
            Create Account With Google
          </Button>
          {/* <Button
            width="100%"
            variant="purple"
            disabled={terms ? false : true}
            onClick={() =>
              signIn("google", {
                callbackUrl: window.location.origin + "/profile",
              })
            }
          >
            Create account
          </Button> */}
          <Text>
            I already have an account.{" "}
            <NextLink href="/log-in">Log in</NextLink>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  ); /*
  return (
    <Flex width="100%" height="100%" flexDirection="column">
      <Navbar>
        <ButtonLink
          href="/log-in"
          width="8rem"
          variant="outline"
          fontWeight="semibold"
          textColor="#464545"
          borderColor="#464545"
          borderRadius="8px"
        >
          Log in
        </ButtonLink>
      </Navbar>
      <Flex flex="1" flexDirection="row">
        <Center background="#EFFAFE" flex="50%">
          <WebDesign />
        </Center>
        <Flex
          direction="column"
          align="center"
          gap="2em"
          flex="50%"
          px="6em"
          py="3em"
        >
          <Heading>Sign Up to Weekly</Heading>
          <Button
            width="100%"
            leftIcon={
              <Box width="1em" height="1em">
                <Google />
              </Box>
            }
            variant="outline"
            fontWeight="normal"
            onClick={() =>
              signIn("google", {
                callbackUrl: window.location.origin + "/profile",
              })
            }
          >
            Continue with Google
          </Button>
          <Checkbox color="#C4C4C4">
            I agree to the <NextLink href="/">terms and conditions</NextLink>
          </Checkbox>
          <Button width="100%" variant="purple">
            Create account
          </Button>
          <Text>
            I already have an account.{" "}
            <NextLink href="/log-in">Log in</NextLink>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );*/
}
