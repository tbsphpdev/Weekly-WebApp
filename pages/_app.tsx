/* eslint-disable */
import "../globals.css";
import "../globals2.css";
import { AppProps } from "next/app";
import {
  ChakraProvider,
  extendTheme,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  ModalFooter,
  Center,
  Button,
} from "@chakra-ui/react";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";
import axios from "axios";
import NextNProgress from "nextjs-progressbar";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { SWRConfig } from "swr";
import { ErrorBoundary } from "react-error-boundary";
import { WarningTwoIcon } from "@chakra-ui/icons";
import { UserProvider } from "../context/UserContext";
import moment from "moment-timezone";

const theme = extendTheme({
  colors: {
    weekly: {
      purple: "#9F79DC",
      lavender: "#B298DC",
      blue: "#98E0EF",
      lightblue: "#C1ECF5",
      paleblue: "#E2F7FF",
      aqua: "#18CAEF",
      black: "#18191f",
      lightgray: "#F5F3F8",
      darkgray: "#4C4F62",
      darkBlue: "#407AEA",
      light: "#F6F6F6",
      lightBis: "#F3F9FE",
      grey: "#464545",
      darkTer: "#304854",
      textSecondary: "#797979",
      notification: "#FF8A65",
      lineGrey: "#E5E5E5",
      cardOutlineGrey: "#D8D8D8",
      dropTargetBackground: "#407AEA5E",
    },
  },
  fonts: {
    heading: "Poppins, sans-serif",
    body: "Poppins, sans-serif",
  },
  components: {
    Box: {
      baseStyle: {
        overflowWrap: "anywhere",
      },
    },
    Text: {
      baseStyle: {
        overflowWrap: "anywhere",
      },
    },
    Button: {
      variants: {
        purple: {
          bg: "weekly.purple",
          color: "white",
          _hover: {
            bg: "weekly.lavender",
            _active: {
              bg: "weekly.lavender",
            },
          },
        },
        blue: {
          bg: "weekly.blue",
          _hover: {
            bg: "weekly.lightblue",
            _active: {
              bg: "weekly.lightblue",
            },
          },
        },
        black: {
          bg: "weekly.black",
          color: "white",
          _hover: {
            bg: "weekly.darkgray",
            _active: {
              bg: "weekly.darkgray",
            },
          },
        },
      },
    },
    Link: {
      baseStyle: {
        color: "weekly.aqua",
      },
    },
  },
});

axios.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === "development") {
      config.baseURL = process.env.REACT_APP_API_URL;
    } else {
      // TODO: change the baseURL for production server
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let interceptorCreated = false;

function AuthProtector({ children }: { children: ReactNode }) {
  const router = useRouter();
  // const { data: sessionData } = useSession();
  // make authentication required on all pages except the landing, login, and error page
  const required = ![
    "/",
    "/login-app",
    "/log-in",
    "/register",
    "/register-app",
    "/error",
    "/pricing",
  ].includes(router.pathname);
  const { status, data, update } = useSession({ required });

  let tempData: {
    authSub: string;
    isNew: boolean;
    accessToken: string;
    expires?: any;
    user?: any;
    typeCheck: string;
  } = {
    authSub: "",
    isNew: false,
    accessToken: "",
    typeCheck: "",
    ...data,
  };
  if (data && !interceptorCreated) {
    // automatically add the JWT as an authorization header to all outgoing server requests
    axios.interceptors.request.use(
      (config) => {
        if (tempData?.accessToken && config.headers) {
          config.headers.Authorization = "Bearer " + tempData.accessToken;
          // config.headers.zone = moment.tz.guess();
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
    interceptorCreated = true;
  }

  // don't render any content until we've confirmed whether the user is logged in
  switch (status) {
    case "loading":
      return null;
    case "authenticated":
      if (!required) {
        console.log("tempData.typeCheck", tempData);
        // // Replace 'your-desktop-app-url' with the actual URL you want to open
        const appUrl = `weeklyllc://oauth-redirect?token=${tempData.accessToken}`;
        tempData.typeCheck = "signin-app";
        update((prev: any) => ({
          ...prev,
          typeCheck: "signin-app",
        }));
        router.push(appUrl);
        // location.assign(appUrl);
        setTimeout(() => {
          router.replace("/profile/" + tempData?.authSub);
        }, 1000);
        console.log("tempData.typeCheck---->", tempData);
      }
  }
  return <>{children}</>;
}

interface WeeklyAppProps extends AppProps {
  pageProps: Omit<AppProps["pageProps"], "session"> & {
    session: Session;
  };
}

const myErrorHandler = (error: Error, info: { componentStack: string }) => {
  // Do something with the error
  // E.g. log to an error logging client here
  console.log("error--->", error);
  console.log("info--->", info);
  signOut({ callbackUrl: "/" });
};

export default function WeeklyApp({
  Component,
  pageProps: { session, ...pageProps },
}: WeeklyAppProps) {
  const { onClose } = useDisclosure();

  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <UserProvider>
          <SWRConfig
            value={{
              async fetcher(url: string) {
                const response = await axios.get(url);
                return response.data as string | object;
              },
            }}
          >
            <AuthProtector>
              <ErrorBoundary
                FallbackComponent={() => (
                  <Modal
                    isOpen
                    onClose={onClose}
                    isCentered
                    preserveScrollBarGap
                  >
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Unknown Error</ModalHeader>
                      <ModalBody>
                        <Center>
                          <WarningTwoIcon boxSize={16} color="red.500" />
                        </Center>
                        Unfortunately, an unexpected error has occurred. Please
                        reload the page to try again.
                      </ModalBody>
                      <ModalFooter>
                        <Center>
                          <Button onClick={() => signOut({ callbackUrl: "/" })}>
                            Go to Login page
                          </Button>
                        </Center>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                )}
                onError={myErrorHandler}
              >
                <NextNProgress color="#18caef" height={5} />
                <Component {...pageProps} />
              </ErrorBoundary>
            </AuthProtector>
          </SWRConfig>
        </UserProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}
