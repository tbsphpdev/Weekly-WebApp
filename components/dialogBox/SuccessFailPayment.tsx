/* eslint-disable */

import {
  Box,
  Button,
  Center,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "../utils/NextLink";

export default function SuccessFailPayment({
  isOpenDialog,
  handleCloseDialog,
  srcImg,
  headerColor,
  headerText,
}: {
  isOpenDialog: boolean;
  handleCloseDialog?: any;
  srcImg: any;
  headerColor?: any;
  headerText: any;
}) {
  return (
    <Modal
      isOpen={isOpenDialog}
      onClose={() => handleCloseDialog()}
      isCentered
      preserveScrollBarGap
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Center>
            <Box marginY={5}>
              <Box display="flex" justifyContent="center">
                <Image src={srcImg} alt="" height={32} width={32} />
              </Box>
              <Box display="flex" flexDirection="column">
                <Text
                  fontSize={30}
                  textAlign="center"
                  color={headerColor}
                  fontWeight="semibold"
                >
                  {headerText}
                </Text>
                <NextLink href="/overview" alignSelf="center" mt={2}>
                  <Button
                    variant="purple"
                    fontSize="sm"
                    fontWeight="regular"
                    alignSelf="center"
                  >
                    Go to Dashboard
                  </Button>
                </NextLink>
              </Box>
            </Box>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
