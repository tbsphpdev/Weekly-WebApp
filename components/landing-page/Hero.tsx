import { Image } from "@chakra-ui/image";
import { Box, Center, Heading, Circle, Stack, Text } from "@chakra-ui/layout";
import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";

import NextLink from "../utils/NextLink";

import DownloadPopup from "./DownloadPopup";

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Center
      bg="weekly.lavender"
      pt={90}
      pb={50}
      overflowX="hidden"
      paddingX="10%"
    >
      <Stack
        direction={["column", "column", "row"]}
        spacing={12}
        justifyContent="center"
        alignItems="center"
      >
        <Box m="auto" textAlign={["center", "center", "left"]}>
          <Heading fontSize={[40, 40, 64]}>
            Create better digital habits
          </Heading>
          <Text fontSize="md" mt={6}>
            Start changing the way you interact with the digital world by
            measuring your computer screen time.
          </Text>
          <Stack
            direction={["column", "column", "row"]}
            width="min-content"
            margin="auto"
            marginTop={["2rem", "2rem", "2rem"]}
          >
            <Button
              onClick={onOpen}
              flex={0.5}
              px={14}
              py={[4, 4, 7]}
              variant="blue"
            >
              Download Weekly
            </Button>
          </Stack>
          <Box mt={5} ml={[0, 0, -75]} textAlign="center">
            <NextLink
              href="https://discord.com/invite/VNXuQnt6aW"
              target="_blank"
              replace
            >
              <Button flex={0.5} px={5} py={[7, 7, 7]} variant="black">
                Join our Discord Now!
              </Button>
              {/* Join our Discord Now! */}
            </NextLink>
          </Box>
        </Box>
        <Circle
          size={["80vw", "80vw", "40vw"]}
          margin="auto"
          position="relative"
          bg="weekly.paleblue"
          borderRadius="full"
        >
          <Image
            src="/images/landing-page/hero.png"
            alt=""
            boxShadow="md"
            borderRadius={6}
            w="105%"
            position="absolute"
            m="auto"
            top={0}
            bottom={0}
            left={0}
            right={0}
          />
        </Circle>
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <DownloadPopup />
          {/* <DownloadAppPopup /> */}
        </ModalContent>
      </Modal>
    </Center>
  );
}
