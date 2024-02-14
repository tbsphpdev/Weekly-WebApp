/* eslint-disable */

import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

export default function DialogBox({
  isOpenDialog,
  handleCloseDialog,
  handleBtn1Click,
  headerColor,
  headerText,
  discriptionText,
  btnName1,
  btnName2,
  notes,
  size,
  headerclosebtn,
  closeOnOverlayClick,
}: {
  isOpenDialog: boolean;
  handleCloseDialog?: any;
  handleBtn1Click?: any;
  headerColor?: any;
  headerText: any;
  discriptionText: any;
  btnName1?: any;
  btnName2?: any;
  notes?: any;
  size?: string;
  headerclosebtn?: boolean;
  closeOnOverlayClick?: boolean;
}) {
  return (
    <Modal
      isOpen={isOpenDialog}
      onClose={() => handleCloseDialog()}
      isCentered
      preserveScrollBarGap
      size={size}
      closeOnOverlayClick={closeOnOverlayClick === false ? false : true}
    >
      <ModalOverlay />
      <ModalContent>
        {headerclosebtn === false ? <></> : <ModalCloseButton />}
        <ModalHeader mr="20px" color={headerColor && headerColor}>
          {headerText}
        </ModalHeader>
        <ModalBody>
          <Box color="weekly.darkgray">{discriptionText}</Box>
        </ModalBody>
        <ModalFooter>
          <Box w="100%">
            {btnName1 && (
              <Button
                variant="purple"
                w="calc(50% - 6px)"
                mr={3}
                onClick={() => handleBtn1Click()}
              >
                {btnName1}
              </Button>
            )}
            {btnName2 && (
              <Button
                variant="ghost"
                w="calc(50% - 6px)"
                onClick={() => handleCloseDialog()}
              >
                {btnName2}
              </Button>
            )}
            {notes && (
              <Box color="#15192080" mt={3} fontSize="sm">
                {notes}
              </Box>
            )}
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
