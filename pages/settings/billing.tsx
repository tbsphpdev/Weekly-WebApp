/* eslint-disable */
import React from "react";
import { Box, Heading, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import DrawerComp from "../../components/nav/Drawer";

import Navbar from "../../components/nav/NavBarInApp";
import SettingsSidebar from "../../components/nav/SettingsSidebar";
import { API_BASE_URLS } from "../../public/constant";
import axios from "axios";
import NextLink from "../../components/utils/NextLink";

export default function Billing() {
  const router = useRouter();

  const handleChangePaymentAPI = () => {
    axios
      .post(API_BASE_URLS.baseUrl + "/api/other/change-payment-method", {
        success_url: window.location.origin + "/payment/success",
        cancel_url: window.location.origin + "/payment/failed",
      })
      .then((res) => {
        if (res.status === 200) {
          router.push(res?.data?.data);
        }
      });
  };

  return (
    <Box bg="#E5E5E5" minHeight="100%" w={"100%"}>
      <Navbar />
      <DrawerComp />
      <Box height="100%" display="flex" flexDirection="row">
        <SettingsSidebar />
        <Box className="settingPageBox">
          <Box className="settingPageBoxInner">
            <Heading mb="25px">Billing</Heading>
            <Box mt={10}>
              <Button
                variant="purple"
                fontSize="sm"
                w={400}
                onClick={() => handleChangePaymentAPI()}
              >
                Change Payment Method
              </Button>
            </Box>
            <Box mt={6}>
              <NextLink
                color="weekly.purple"
                target="_blank"
                href="/subscription"
                replace
                fontSize="sm"
                fontWeight="semibold"
                style={{
                  width: 400,
                  border: "1px solid #000000",
                  borderColor: "#000000",
                  display: "flex",
                  borderRadius: "0.375rem",
                  textAlign: "center",
                  height: "2.5rem",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Change Plan
              </NextLink>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
