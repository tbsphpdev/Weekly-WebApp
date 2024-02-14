/* eslint-disable */
import {
  Box,
  Button,
  Checkbox,
  Heading,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/modal";
import { useState } from "react";
import DrawerComp from "../../components/nav/Drawer";

import Navbar from "../../components/nav/NavBarInApp";
import SettingsSidebar from "../../components/nav/SettingsSidebar";
import axios from "axios";
import { API_BASE_URLS } from "../../public/constant";
import { spaceCheckRegex } from "../../components/utils/utils";

export default function Help() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleFeedback = async () => {
    if (message.length > 256) {
      setErrMsg("Message can't be longer than 256 characters");
    }
    if (message.length == 0) {
      setErrMsg("This field is required. Please fill out this field");
    }
    if (spaceCheckRegex.test(message) == false) {
      setErrMsg(
        "This input field does not allow special characters or leading/trailing whitespace"
      );
    } else {
      await axios
        .post(API_BASE_URLS.baseUrl + "/api/user/report", {
          title,
          message,
        })
        .then((res) => {
          setMessage("");
          setTitle("");
          setErrMsg("");
          onClose();
        });
    }
  };

  return (
    <>
      <Box
        bg="#E5E5E5"
        minHeight="100%"
        // width={["fit-content", "fit-content", "fit-content", "100%"]}
        w={"100%"}
      >
        <Navbar />
        <DrawerComp />
        <Box display="flex" flexDirection="row" minH="100vh">
          <SettingsSidebar />
          <Box className="settingPageBox">
            <Box className="settingPageBoxInner">
              <Box>
                <Heading mb="25px">Help</Heading>
              </Box>
              <Box>
                {/* <Text
                  variant={"gost"}
                  size="md"
                  colorScheme="white"
                  onClick={onOpen}
                  style={{ cursor: "pointer" }}
                >
                  Report a Problem
                </Text> */}
                <Button
                  variant={"outline"}
                  size="sm"
                  mr="20px"
                  onClick={onOpen}
                  className="buttonHover"
                >
                  Report a Problem
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setMessage("");
          setTitle("");
          setErrMsg("");
          onClose();
        }}
        isCentered
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Report an issue</ModalHeader>
          <ModalBody>
            <Textarea
              placeholder="Please tell us in detail the issue you are having"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setErrMsg("");
              }}
              mb="10px"
            />
            {errMsg && (
              <Box color="red" mb="20px">
                {errMsg}
              </Box>
            )}
            <Box display={"grid"}>
              <Checkbox
                color="#4C4F62"
                isChecked={title === "This is harmful / unsafe"}
                onChange={() => setTitle("This is harmful / unsafe")}
              >
                This is harmful / unsafe
              </Checkbox>
              <Checkbox
                color="#4C4F62"
                isChecked={title === "This isn't helpful"}
                onChange={() => setTitle("This isn't helpful")}
              >
                This isn't helpful
              </Checkbox>
              <Checkbox
                color="#4C4F62"
                isChecked={title === "This is unwanted"}
                onChange={() => setTitle("This is unwanted")}
              >
                This is unwanted
              </Checkbox>
              <Checkbox
                color="#4C4F62"
                isChecked={title === "This isn't true"}
                onChange={() => setTitle("This isn't true")}
              >
                This isn't true
              </Checkbox>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              mr={3}
              w="calc(50% - 6px)"
              onClick={() => {
                setMessage("");
                setTitle("");
                setErrMsg("");
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="purple"
              mr={3}
              w="calc(50% - 6px)"
              onClick={() => handleFeedback()}
            >
              Submit feedback
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
