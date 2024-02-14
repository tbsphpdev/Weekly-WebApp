/* eslint-disable */
import { Box, Heading, Button, Input } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/modal";
import axios from "axios";

import Navbar from "../../components/nav/NavBarInApp";
import SettingsSidebar from "../../components/nav/SettingsSidebar";
import { API_BASE_URLS } from "../../public/constant";
import { signOut, useSession } from "next-auth/react";
import { useDisclosure } from "@chakra-ui/hooks";

import DrawerComp from "../../components/nav/Drawer";
import { useEffect, useMemo, useState } from "react";
import { deleteAllCookies } from "../../components/utils/utils";
import TimezoneSelect, { allTimezones } from "react-timezone-select";
import { useCurrentUser } from "../../hooks";

export default function Account() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, update } = useSession();
  const { user } = useCurrentUser();

  const [text, setText] = useState("");
  const [timezone, setTimezone] = useState(user?.timezone);
  const [tz, setTz] = useState<any>(user?.timezone ?? "");
  // Intl.DateTimeFormat().resolvedOptions().timeZone

  const handleConfirm = () => {
    setText("");
    axios
      .get(API_BASE_URLS.baseUrl + "/api/user/deactivate-account")
      .then(async (res) => {
        await update((prev: any) => ({}));
        deleteAllCookies();
        signOut({ callbackUrl: "/" });
        // router.push(window.location.origin);
      });
  };

  useMemo(() => {
    const tzValue = tz?.value ?? tz;
    setTimezone(tzValue);
  }, [tz]);

  useEffect(() => {
    if (timezone !== "" && timezone !== undefined) {
      updateTimezoneAPI();
    }
  }, [timezone]);

  const updateTimezoneAPI = () => {
    axios
      .post(API_BASE_URLS.baseUrl + "/api/user/update-time-zone", {
        timezone: timezone,
      })
      .then((res) => {
        console.log("timezone api---->", res);
      });
  };

  return (
    <>
      <Box
        bg="#E5E5E5"
        minHeight="100%"
        // width={["fit-content", "fit-content", "fit-content", "100%"]}
        w="100%"
      >
        <Navbar />
        <DrawerComp />
        <Box display="flex" flexDirection="row" minH="100vh">
          <SettingsSidebar />
          <Box className="settingPageBox">
            <Box className="settingPageBoxInner">
              <Box>
                <Heading mb="25px">Account</Heading>
              </Box>
              <Box>
                <Heading fontSize="1.5em" fontWeight={"normal"}>
                  Deactivate account
                </Heading>
              </Box>
              <Box pt="20px">
                <Button
                  variant={"outline"}
                  size="sm"
                  mr="20px"
                  onClick={onOpen}
                  className="buttonHover"
                >
                  Deactivate account
                </Button>
              </Box>
              <Box>
                <Heading fontSize="1.5em" fontWeight={"normal"} mt="25px">
                  Timezone
                </Heading>
              </Box>
              <Box pt="20px" w="50%">
                <TimezoneSelect
                  value={tz}
                  onChange={setTz}
                  labelStyle="altName"
                  timezones={{
                    ...allTimezones,
                    "America/Lima": "Pittsburgh",
                    "Europe/Berlin": "Frankfurt",
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        preserveScrollBarGap
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Deactivate account</ModalHeader>
          <ModalBody>
            <Box color="#15192080">
              Please type "Deactivate" to deactivate your account
            </Box>
            <Input
              mt={4}
              placeholder='Type "Deactivate" to continue'
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Box mt={3} textColor="#15192" fontWeight={600}>
              NOTE: Are you sure you want to deactivate your account? This
              action is irreversible and will permanently delete all your data.
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="purple"
              mr={3}
              w="calc(50% - 6px)"
              disabled={text == "Deactivate" ? false : true}
              onClick={() => handleConfirm()}
            >
              Confirm
            </Button>
            <Button
              variant="outline"
              colorScheme="white"
              w="calc(50% - 6px)"
              onClick={() => {
                setText("");
                onClose();
              }}
            >
              Get me out of here!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
