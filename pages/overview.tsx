/* eslint-disable */

import { Box, Center, Flex, Stack, VStack } from "@chakra-ui/layout";
import {
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import NavBar from "../components/nav/NavBarInApp";
import GoalTime from "../components/productivity-overview/GoalTime";
import ProductivityMap from "../components/productivity-map/ProductivityMap";
import ProductivityHeatMap from "../components/productivity-heat-map/ProductivityHeatMap";
import ProductivityTimeOverview from "../components/productivity-time-overview/ProductivityTimeOverview";
import DownloadAppPopup from "../components/landing-page/DownloadAppPopup";
import Competitions from "../components/your-profile/Competitions";
import { useCurrentUser } from "../hooks";
import DatePickerComp from "../components/calender/DatePickerComp";
import moment from "moment";

export default function Overview() {
  // show an error message
  // const showError = () => {
  //   alert("not aacess notification permission");
  // };

  // useEffect(async () => {
  //   // check notification permission
  //   let granted = false;

  //   if (Notification.permission === "granted") {
  //     granted = true;
  //   } else if (Notification.permission !== "denied") {
  //     let permission = await Notification.requestPermission();
  //     granted = permission === "granted" ? true : false;
  //   }
  //   console.log("granted", granted);
  //   // show notification or error
  //   granted ? showNotification() : showError();
  // }, []);

  // const showNotification = () => {
  //   const notification = new Notification("New message incoming", {
  //     body: "Hi there. How are you doing?",
  //     icon: "https://www.vkf-renzel.com/out/pictures/generated/product/1/356_356_75/r12044336-01/general-warning-sign-10836-1.jpg?    auto=compress&cs=tinysrgb&dpr=1&w=500",
  //   });
  //   notification.onclick = (e) => {
  //   };
  //     window.location.href = "https://google.com";
  //   notification.addEventListener("click", () => console.log("ggggk"));
  // };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, update } = useSession();
  const { user } = useCurrentUser();

  const [selFilter, setSelFilter] = useState("day");
  const [startDate, setStartDate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState<any>(new Date());
  //custom datefilter
  const [dateRange, setDateRange] = useState([
    new Date(user?.createdAt ?? new Date()),
    new Date(),
  ]);
  const [startDate1, endDate1] = dateRange;

  useEffect(() => {
    const tempData: {
      authSub: string;
      isNew: boolean;
      accessToken: string;
      expires?: any;
      user?: any;
    } = {
      authSub: "",
      isNew: false,
      accessToken: "",
      ...data,
    };
    setTimeout(() => {
      if (data && tempData?.isNew) {
        onOpen();
      }
      if (!data || !tempData?.isNew) {
        onClose();
      }
    }, 2000);
  }, [data]);

  useEffect(() => {
    if (isOpen) {
      onOpen();
    }
  }, [isOpen]);

  const handleCloseIcon = async () => {
    await update((prev: any) => ({
      ...prev,
      isNew: false,
    }));
  };

  let SD =
    selFilter == "custom"
      ? moment(startDate1).format("YYYY-MM-DD")
      : moment(startDate).format("YYYY-MM-DD");
  let ED =
    selFilter == "custom"
      ? moment(endDate1).format("YYYY-MM-DD")
      : moment(endDate).format("YYYY-MM-DD");

  return (
    <Flex
      w={["fit-content", "fit-content", "fit-content", "100%"]}
      height="100%"
      flexDirection="column"
    >
      <NavBar />
      <Box flexGrow={1} bg="weekly.lightgray">
        <VStack bg="weekly.lightgray" className="overview-main">
          <Box
            w="85%"
            mx={10}
            mt={6}
            alignItems="center"
            gap="2.5rem"
            display={["block", "block", "flex"]}
          >
            <Heading
              as="h3"
              fontSize="2rem"
              fontWeight={600}
              color="black"
              display="inline-block"
            >
              Overview
            </Heading>
            <DatePickerComp
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              selFilter={selFilter}
              setSelFilter={setSelFilter}
              dateRange={dateRange}
              setDateRange={setDateRange}
              startDate1={startDate1}
              endDate1={endDate1}
            />
          </Box>
        </VStack>
        <GoalTime SD={SD} ED={ED} />
        {/* {user?.subscriptionId === 1 ? ( */}
        <Competitions type="overview" selFilter={selFilter} SD={SD} ED={ED} />
        {/* ) : (
          <Box py={3} />
        )} */}
        <ProductivityTimeOverview
          startDate={startDate}
          endDate={endDate}
          startDate1={startDate1}
          endDate1={endDate1}
          selFilter={selFilter}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setSelFilter={setSelFilter}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
        <Center>
          <Stack
            direction={["column", "column", "column", "column"]}
            w="85%"
            // spacing={4}
          >
            <ProductivityHeatMap />
            <ProductivityMap />
            {/* <button onClick={() => showNotification()}>click</button> */}
          </Stack>
        </Center>
      </Box>
      {/* first time download app modal */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        isCentered={true}
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton onClick={handleCloseIcon} />
          <DownloadAppPopup />
        </ModalContent>
      </Modal>
      {/* first time download app modal */}
    </Flex>
  );
}
