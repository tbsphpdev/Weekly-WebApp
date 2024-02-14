/* eslint-disable */

import { CheckIcon } from "@chakra-ui/icons";
import { Box, Button, Divider, Flex, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../components/auth/Navbar";
import { HabitEnthusiast, HabitStarter } from "../components/utils/utils";
import { API_BASE_URLS } from "../public/constant";

export default function Pricing() {
  const router = useRouter();

  const [selSubType, setSelSubType] = useState("monthly");
  const [monthSubData, setMonthSubData] = useState<any>("");
  const [yearSubData, setYearSubData] = useState<any>("");

  useEffect(() => {
    axios
      .get(API_BASE_URLS.baseUrl + "/api/other/get-subscription-list", {
        transformRequest: () => {
          delete axios.defaults.headers.common["Authorization"];
        },
      })
      .then((res) => {
        setMonthSubData(res?.data?.data?.monthly);
        setYearSubData(res?.data?.data?.yearly);
      });
  }, []);

  return (
    <Flex width="100%" height="100%" flexDirection="column" position="relative">
      <Navbar showLogin showSignup />
      <Flex w="100%" height="100%" flexDirection="column">
        <VStack bg="weekly.white">
          <Box w={["95%", "90%", "80%"]} h="184px" mt={50}>
            <Box>
              <Text fontSize="4xl" fontWeight="bold" textAlign={["center"]}>
                Pricing Plans
              </Text>
              <Text textAlign={["center"]}>Learn about your time!</Text>
              <Box display={["flex"]} justifyContent="center">
                <Box
                  className="home_header_buttons"
                  textAlign={["center"]}
                  mt={["30px"]}
                  w={["300px"]}
                >
                  <Button
                    bg={selSubType === "monthly" ? "#e2d7f5" : "#407AEA"}
                    color={selSubType === "monthly" ? "#000" : "#fff"}
                    zIndex={selSubType === "monthly" ? "0" : "999"}
                    className="btn_home"
                    onClick={() => setSelSubType("yearly")}
                    _hover={{ bg: "weekly.blue", color: "#fff" }}
                  >
                    Annual
                  </Button>
                  <Button
                    bg={selSubType === "yearly" ? "#e2d7f5" : "#407AEA"}
                    color={selSubType === "yearly" ? "#000" : "#fff"}
                    zIndex={selSubType === "yearly" ? "0" : "999"}
                    className="btn_home"
                    onClick={() => setSelSubType("monthly")}
                    _hover={{ bg: "weekly.blue", color: "#fff" }}
                  >
                    Monthly
                  </Button>
                </Box>
              </Box>
              {/* feature list box */}
              <Box
                display="flex"
                justifyContent="space-between"
                flexWrap="wrap"
                mt="30px"
              >
                <Box
                  w={["100%", "100%", "48%"]}
                  borderWidth="1px"
                  borderRadius="lg"
                  borderColor="#D8D8D8"
                  p={["15px", "30px"]}
                  display="flex"
                  flexDirection="column"
                >
                  <Box mb="20px">
                    <Text fontSize="3xl" fontWeight="semibold">
                      Habit Starter
                    </Text>
                    <Text height={["unset", "unset", "65px"]}>
                      Automatically track your online time and connect with
                      friends!
                    </Text>
                    <Box mt="10px" maxH={["unset", "unset", "650px"]}>
                      <Text
                        fontSize="70px"
                        textAlign={["center"]}
                        color="#407AEA"
                      >
                        ${" "}
                        {selSubType === "monthly"
                          ? monthSubData[0]?.price
                          : yearSubData[0]?.price}
                      </Text>
                      <Text textAlign={["center"]}>Per month</Text>
                      <Divider
                        borderColor="#000"
                        orientation="horizontal"
                        my={5}
                      />
                      {HabitStarter?.map((habitName, i) => (
                        <Box
                          key={i}
                          display="flex"
                          alignItems="baseline"
                          ml="0px"
                        >
                          <CheckIcon color="#63D350" />
                          <Text ml="15px" lineHeight={8}>
                            {habitName}
                          </Text>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                  <Button
                    w="100%"
                    mt="auto"
                    backgroundColor="#DADADA"
                    onClick={() => router.push("/register?s=price")}
                  >
                    Create an account
                  </Button>
                </Box>
                <Box
                  w={["100%", "100%", "48%"]}
                  borderWidth="1px"
                  borderRadius="lg"
                  mt={["20px", "20px", "0px"]}
                  p="30px"
                  bg={"weekly.purple"}
                  display="flex"
                  flexDirection="column"
                >
                  <Box mb="20px">
                    <Text fontSize="3xl" fontWeight="semibold" color="#ffffff">
                      Habit Enthusiast
                    </Text>
                    <Text height={["unset", "unset", "65px"]} color="#ffffff">
                      All the benefits of Starter + advanced features to help
                      you to master your habits and manage your computer
                      activity
                    </Text>
                    <Box mt="10px" maxH={["unset", "unset", "650px"]}>
                      <Text
                        fontSize="70px"
                        textAlign={["center"]}
                        color="#407AEA"
                      >
                        ${" "}
                        {selSubType === "monthly"
                          ? monthSubData[1]?.price
                          : yearSubData[1]?.price}
                      </Text>
                      <Text textAlign={["center"]} color="#ffffff">
                        Per month
                      </Text>
                      <Divider
                        borderColor="#000"
                        orientation="horizontal"
                        my={5}
                      />
                      {HabitEnthusiast?.map((habitName, i) => (
                        <Box
                          key={i}
                          display="flex"
                          alignItems="baseline"
                          ml="10px"
                        >
                          <CheckIcon color="#4BFF8C" />
                          <Text ml="15px" color="#ffffff" lineHeight={8}>
                            {habitName}
                          </Text>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                  <Button
                    w="100%"
                    mt="auto"
                    color="weekly.purple"
                    onClick={() => router.push("/register?s=price")}
                  >
                    Create an account
                  </Button>
                </Box>
              </Box>
              {/* feature list box */}
            </Box>
          </Box>
        </VStack>
      </Flex>
    </Flex>
  );
}
