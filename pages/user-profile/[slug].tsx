/* eslint-disable */
import { AddIcon, CalendarIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Spacer,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BsLightningChargeFill, BsPeople } from "react-icons/bs";

import NavBar from "../../components/nav/NavBarInApp";
import {
  capitalizeFirstLetter,
  cryptoDecryption,
} from "../../components/utils/utils";
import { API_BASE_URLS } from "../../public/constant";
import Competitions from "../../components/your-profile/Competitions";

import { useCurrentUser } from "../../hooks";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function InviteFriend() {
  const [userData, setUserData] = useState<any>(null);
  const toast = useToast();
  const [id, setId] = useState<any>(0);
  const [lab, setLab] = useState([]);
  const [val, setVal] = useState([]);
  const [selFilter, setSelFilter] = useState("Day");
  const [selCategory, setSelCategory] = useState("Most Productive");
  const [comment, setComment] = useState("");
  const { user } = useCurrentUser();

  function handleRemove() {
    handleFrinendRemove(id);
  }

  // get user profile API
  const getUserProfileAPI = (decData: any) => {
    axios
      .get(API_BASE_URLS.baseUrl + "/api/friend/user-profile/" + decData)
      .then((res) => {
        if (res?.status === 200) {
          setUserData(res?.data?.data);
        }
      });
  };

  useEffect(() => {
    if (id > 0) {
      axios
        .get(API_BASE_URLS.baseUrl + "/api/friend/user-today-overview/" + id)
        .then((res) => {
          if (res?.status === 200) {
            delete res?.data?.data?.total;
            let a: any = Object.keys(res?.data?.data);
            setLab(a.map((x: string) => capitalizeFirstLetter(x)));
            let b: any = Object.values(res?.data?.data);
            let c = b?.map((x: any) => Math.round(x / 3600));
            setVal(c);
          }
        });
    }
  }, [id]);

  useEffect(() => {
    const url = window.location.pathname.split("user-profile/");
    const decData = cryptoDecryption(url[1]);
    setId(decData);
    getUserProfileAPI(decData);
  }, [window.location.pathname]);

  // handle send friend request
  const handleFrinendRequest = (_id: number) => {
    axios
      .get(API_BASE_URLS.baseUrl + "/api/friend/friend-request/" + _id)
      .then((res) => {
        if (res?.status === 200) {
          getUserProfileAPI(_id);
        }
      });
  };

  // handle remove friend or request
  const handleFrinendRemove = (_id: number) => {
    axios
      .get(API_BASE_URLS.baseUrl + "/api/friend/remove-request/" + _id)
      .then((res) => {
        if (res?.status === 200) {
          getUserProfileAPI(_id);
        }
      });
  };

  //handle submit compete
  const handleSubmitCompete = () => {
    axios
      .post(API_BASE_URLS.baseUrl + "/api/friend/compete-request", {
        userId: parseInt(id),
        time: selFilter === "Day" ? 1 : selFilter == "Week" ? 7 : 30,
        category:
          selCategory === "Most Productive"
            ? "productive"
            : selCategory === "Time Spent on Habit"
            ? "habit"
            : "unproductive",
        comment: comment,
      })
      .then((res) => {
        if (res?.status === 200) {
          toast({
            title: "Success",
            position: "top-right",
            description: "Competition request sent successfully!",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        toast({
          title: "Error",
          position: "top-right",
          description: err?.response?.data?.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const options = {
    labels: lab,
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: any) {
        return Math.trunc(val) + "%";
      },
    },
    colors: ["#98E0EF", "#EB4335", "#797979", "#9F79DC"],
    legend: {
      fontSize: "16px",
      fontWeight: "bold",
    },
  };

  const EmptyChartOptions = {
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          labels: {
            value: {
              show: false,
            },
          },
        },
      },
    },
    tooltip: {
      enabled: false,
    },
    dataLabels: {
      enabled: false,
      formatter: function (val: any) {
        return 0 + "%";
      },
    },
    colors: ["#797979"],
    legend: {
      show: false,
      fontSize: "16px",
      fontWeight: "bold",
    },
  };

  return (
    <Flex w="100%" height="100%" flexDirection="column">
      <NavBar />
      <Box flexGrow={1} bg="weekly.lightgray">
        <VStack bg="weekly.lightgray">
          <Box
            bg="#D4C7E9"
            w="85%"
            h="184px"
            mt={26}
            className="deskCustomProfile"
          />
          <Box
            bg="white"
            borderRadius="0px 0px 10px 10px"
            w="85%"
            h="220px"
            mt={6}
            className="deskCustomProfile"
          >
            <Flex>
              <Flex flexDir="column" ml="6.5%" mt="3.8%">
                <Text
                  pos="relative"
                  fontSize="34"
                  fontWeight="600"
                  display="flex"
                >
                  {userData?.firstName + " " + userData?.lastName}
                  {userData?.issubscription === 1 && (
                    <BsLightningChargeFill color="#FFCB3D" />
                  )}
                  <Box position="absolute" bottom="45px" left="70px">
                    <Flex
                      bg="white"
                      boxSize={210}
                      borderRadius="full"
                      align="center"
                      justify="center"
                    >
                      <Image
                        src={userData?.image}
                        alt=""
                        borderRadius="full"
                        boxSize={190}
                        border={
                          userData?.issubscription === 0
                            ? "none"
                            : "3px solid #FFCB3D"
                        }
                      />
                    </Flex>
                  </Box>
                </Text>

                <Text fontSize="14" color="weekly.grey">
                  @{userData?.username}
                </Text>
                <Box mt="10px">
                  {userData?.isfriend === "-" ? (
                    <Button
                      variant="purple"
                      fontSize="sm"
                      fontWeight="regular"
                      leftIcon={<AddIcon />}
                      onClick={() => handleFrinendRequest(id)}
                    >
                      Add Friend
                    </Button>
                  ) : userData?.isfriend === 1 ? (
                    <Popover>
                      {({ onClose }) => (
                        <>
                          <PopoverTrigger>
                            <Button
                              rightIcon={<BsPeople />}
                              colorScheme="purple"
                              variant="outline"
                              mr="10px"
                            >
                              Remove Friend
                            </Button>
                          </PopoverTrigger>
                          <Portal>
                            <PopoverContent
                              borderColor="1px solid #797979"
                              minW={{ base: "100%", lg: "max-content" }}
                            >
                              <PopoverBody>
                                <Heading
                                  size="md"
                                  textAlign="center"
                                  fontWeight="semibold"
                                >
                                  Do you want to remove friend?
                                </Heading>
                                <Text
                                  textAlign="center"
                                  fontSize="12px"
                                  mt="5px"
                                >
                                  You will stop seeing each other’s data
                                </Text>
                                <Box
                                  mt="10px"
                                  display="flex"
                                  justifyContent="center"
                                >
                                  <Button
                                    variant="purple"
                                    mr="10px"
                                    size="sm"
                                    onClick={() => handleRemove()}
                                  >
                                    Yes
                                  </Button>
                                  <Button
                                    variant="unstyled"
                                    size="sm"
                                    onClick={onClose}
                                  >
                                    Cancel
                                  </Button>
                                </Box>
                              </PopoverBody>
                            </PopoverContent>
                          </Portal>
                        </>
                      )}
                    </Popover>
                  ) : (
                    <Button
                      fontSize="sm"
                      variant="outline"
                      borderColor="#407AEA"
                      color="purple"
                      fontWeight="normal"
                      onClick={() => handleRemove()}
                    >
                      Invited
                    </Button>
                  )}
                  {user?.subscriptionId === 1 &&
                    userData?.isfriend === 1 &&
                    userData?.issubscription === 1 && (
                      <Popover>
                        {({ onClose }) => (
                          <>
                            <PopoverTrigger>
                              <Button
                                rightIcon={<CrossedSwords />}
                                variant="purple"
                              >
                                Compete
                              </Button>
                            </PopoverTrigger>
                            <Portal>
                              <PopoverContent
                                borderColor="1px solid #797979"
                                w="400px"
                              >
                                <PopoverBody>
                                  <Heading
                                    size="md"
                                    textAlign="center"
                                    fontWeight="semibold"
                                    textDecoration="underline"
                                    my="10px"
                                  >
                                    Invite {userData?.firstName} to Compete
                                  </Heading>
                                  <Text
                                    color="weekly.darkgray"
                                    fontSize="12px"
                                    mt="5px"
                                  >
                                    Select length of competition and Category
                                  </Text>
                                  <Box
                                    mt="10px"
                                    display="flex"
                                    alignItems="center"
                                  >
                                    <CalendarIcon
                                      mr={2}
                                      color="weekly.textSecondary"
                                    />
                                    <Menu>
                                      <MenuButton
                                        as={Button}
                                        variant="outline"
                                        fontSize="sm"
                                        fontWeight={500}
                                        backgroundColor="white"
                                        color="weekly.textSecondary"
                                        border="2px"
                                        rightIcon={<ChevronDownIcon />}
                                        mr="10px"
                                        w="115px"
                                      >
                                        {selFilter}
                                      </MenuButton>
                                      <MenuList>
                                        <MenuItem
                                          onClick={() => setSelFilter("Day")}
                                        >
                                          Day
                                        </MenuItem>
                                        <MenuItem
                                          onClick={() => setSelFilter("Week")}
                                        >
                                          Week
                                        </MenuItem>
                                        <MenuItem
                                          onClick={() => setSelFilter("Month")}
                                        >
                                          Month
                                        </MenuItem>
                                      </MenuList>
                                    </Menu>
                                    <Menu>
                                      <MenuButton
                                        as={Button}
                                        variant="outline"
                                        fontSize="sm"
                                        fontWeight={500}
                                        backgroundColor="white"
                                        color="weekly.textSecondary"
                                        border="2px"
                                        rightIcon={<ChevronDownIcon />}
                                        mr="10px"
                                        w="220px"
                                      >
                                        {selCategory}
                                      </MenuButton>
                                      <MenuList>
                                        <MenuItem
                                          onClick={() =>
                                            setSelCategory("Most Productive")
                                          }
                                        >
                                          Most Productive
                                        </MenuItem>
                                        <MenuItem
                                          onClick={() =>
                                            setSelCategory(
                                              "Time Spent on Habit"
                                            )
                                          }
                                        >
                                          Time Spent on Habit
                                        </MenuItem>
                                        <MenuItem
                                          onClick={() =>
                                            setSelCategory("Time Spent Offline")
                                          }
                                        >
                                          Time Spent Offline
                                        </MenuItem>
                                      </MenuList>
                                    </Menu>
                                  </Box>
                                  <Text
                                    color="weekly.darkgray"
                                    fontSize="12px"
                                    mt="5px"
                                  >
                                    Comment
                                  </Text>
                                  <Input
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    w="100%"
                                    mb="10px"
                                    color="#4C4F62"
                                  />
                                  <Box
                                    mt="10px"
                                    display="flex"
                                    justifyContent="end"
                                  >
                                    <Button
                                      variant="purple"
                                      mr="10px"
                                      onClick={() => {
                                        handleSubmitCompete();
                                        onClose();
                                        setComment("");
                                        setSelCategory("Most Productive");
                                        setSelFilter("Day");
                                      }}
                                    >
                                      Confirm
                                    </Button>
                                    <Button
                                      variant="unstyled"
                                      onClick={() => {
                                        onClose();
                                        setComment("");
                                        setSelCategory("Most Productive");
                                        setSelFilter("Day");
                                      }}
                                    >
                                      Cancel
                                    </Button>
                                  </Box>
                                </PopoverBody>
                              </PopoverContent>
                            </Portal>
                          </>
                        )}
                      </Popover>
                    )}
                </Box>
              </Flex>
              <Spacer />
              {userData?.isfriend === 1 && (
                <Flex flexDir="column" mr="25px" justifyContent="end">
                  {/* <Box display={["flex"]}>
                    <Text fontSize={20} mt="14px">
                      Following{" "}
                      <span style={{ fontWeight: "bold", marginRight: "30px" }}>
                        {userData?.following}
                      </span>
                    </Text>
                    <Text fontSize={20} mt="14px">
                      Followers{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {" "}
                        {userData?.followers}
                      </span>
                    </Text>
                  </Box> */}
                </Flex>
              )}
            </Flex>
          </Box>

          {userData?.isfriend === 1 && (
            <Competitions type="other_profile" id={id} />
          )}

          {/* for today overview pie chart */}
          {userData?.isfriend === 1 && (
            <Box
              display="flex"
              justifyContent="space-between"
              flexWrap="wrap"
              w="85%"
            >
              <Box
                w={["100%", "100%", "48%"]}
                borderWidth="1px"
                borderRadius="lg"
                borderColor="#E5E5E5"
                p={["15px", "30px"]}
                display="flex"
                bg="#ffffff"
                flexDirection="column"
              >
                <Text fontSize={22} fontWeight={500}>
                  Today’s Time Overview
                </Text>
                {val.filter((el) => el && el > 0).length > 0 ? (
                  <Chart
                    options={options}
                    series={val}
                    type="donut"
                    width="400"
                  />
                ) : (
                  <Chart
                    options={EmptyChartOptions}
                    series={[100]}
                    type="donut"
                    width="400"
                  />
                )}
              </Box>
            </Box>
          )}
          {/* for today overview pie chart */}

          {/* mobile profile */}
          <Box
            className="customProfileMobile"
            bg="#D4C7E9"
            w={["100%", "85%"]}
            h="184px"
            mt={[0, 26]}
          />
          <Box
            className="customProfileMobile"
            bg="white"
            borderRadius="0px 0px 10px 10px"
            w={["100%", "85%"]}
            h="173px"
            mt={6}
          >
            <Flex>
              <Flex flexDir="column" mt="3.8%">
                <Box position="absolute" top={["130px"]} left={["25%", "70px"]}>
                  <Flex
                    bg="white"
                    boxSize={190}
                    borderRadius="full"
                    align="center"
                    justify="center"
                  >
                    <Image
                      src={userData?.image}
                      alt=""
                      borderRadius="full"
                      boxSize={170}
                    />
                  </Flex>
                </Box>
              </Flex>
              <Box w={["100%"]} mt={["60px"]}>
                <Text fontSize="36" fontWeight="600" align="center">
                  {userData?.firstName + " " + userData?.lastName}
                </Text>
                <Text fontSize="14" color="weekly.grey" align="center">
                  @{userData?.username}
                </Text>
              </Box>
              <Spacer />
            </Flex>
          </Box>
        </VStack>
      </Box>
    </Flex>
  );
}

export function CrossedSwords() {
  return (
    <Box ml="10px">
      <svg
        width="19"
        height="20"
        viewBox="0 0 19 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.49964 4.65788C1.05089 3.20913 0.526909 1.0271 0.526909 1.0271L14.2737 14.7739L13.4439 15.6037C13.4439 15.6022 3.94839 6.10663 2.49964 4.65788Z"
          fill="white"
        />
        <path
          d="M4.15769 2.99983C2.70894 1.55108 0.526909 1.0271 0.526909 1.0271L14.2737 14.7739L15.1035 13.9441L4.15769 2.99983Z"
          fill="white"
        />
        <path
          d="M14.5603 15.0586L15.2104 14.4084L17.4266 16.9586L17.1906 17.6904L16.4588 17.9264L13.9086 15.7102L14.5603 15.0586Z"
          fill="white"
        />
        <path
          d="M14.5603 15.0584L15.2119 14.4067L17.4281 16.9569C17.4281 16.9569 17.6404 17.2389 17.1921 17.6872C16.7438 18.1355 16.4618 17.9232 16.4618 17.9232L13.9086 15.71L14.5603 15.0584Z"
          fill="white"
        />
        <path
          d="M16.5375 17.3674C16.5018 17.3897 16.3668 17.455 16.2005 17.3125C16.107 17.2323 16.0966 17.1433 16.202 17.0794C16.4335 16.9384 16.7304 16.5688 16.8581 16.312L17.1683 16.6697C17.0065 16.9429 16.8032 17.2056 16.5375 17.3674Z"
          fill="white"
        />
        <path
          d="M15.8917 16.5905C15.8561 16.6128 15.6913 16.6989 15.5666 16.6247C15.39 16.5193 15.4212 16.3857 15.5266 16.3219C15.7581 16.1808 16.0891 15.835 16.2346 15.5916L16.5389 15.9419C16.3519 16.2091 16.15 16.4332 15.8917 16.5905Z"
          fill="white"
        />
        <path
          d="M15.0901 16.0252C15.0545 16.0475 14.9135 16.0846 14.771 15.9851C14.679 15.9198 14.6478 15.7729 14.7532 15.709C15.0189 15.5487 15.4078 15.1405 15.5874 14.8511L15.8902 15.1999C15.6676 15.5235 15.3395 15.8723 15.0901 16.0252Z"
          fill="white"
        />
        <path
          d="M16.3994 18.3867L16.4587 17.9265C16.4587 17.9265 16.6888 17.928 17.0584 17.5584C17.428 17.1888 17.4266 16.9587 17.4266 16.9587L17.8867 16.8993C18.2252 16.84 18.5161 17.1428 18.4686 17.4797C18.4226 17.7959 18.2459 18.1536 17.9506 18.4505C17.6552 18.7459 17.2974 18.9225 16.9798 18.9686C16.6443 19.0161 16.3563 18.7236 16.3994 18.3867Z"
          fill="white"
        />
        <path
          d="M11.6331 17.1604L13.1916 15.2545L13.9739 14.4722L14.7562 13.69L16.6621 12.1314C16.7541 12.0542 16.8892 12.0601 16.9753 12.1447C17.0614 12.2308 17.0659 12.3703 16.9842 12.4624C16.5716 12.9225 15.7403 13.8859 15.3677 14.2822C15.1065 14.5613 14.8334 14.8389 14.587 15.0838C14.342 15.3287 14.063 15.6018 13.7854 15.8646C13.3891 16.2371 12.4257 17.0684 11.9656 17.481C11.8735 17.5627 11.7355 17.5582 11.6479 17.4721C11.5603 17.3875 11.5559 17.2525 11.6331 17.1604Z"
          fill="white"
        />
        <path
          d="M16.5003 4.65788C17.9491 3.20913 18.4731 1.0271 18.4731 1.0271L4.72628 14.7739L5.55605 15.6037C5.55605 15.6022 15.0516 6.10663 16.5003 4.65788Z"
          fill="white"
        />
        <path
          d="M14.8423 2.99983C16.291 1.55108 18.473 1.0271 18.473 1.0271L4.72625 14.7739L3.89648 13.9441L14.8423 2.99983Z"
          fill="white"
        />
        <path
          d="M4.43979 15.0586L3.78964 14.4084L1.57346 16.9586L1.80948 17.6904L2.54128 17.9264L5.09143 15.7102L4.43979 15.0586Z"
          fill="white"
        />
        <path
          d="M4.43976 15.0591L3.78812 14.4075L1.57343 16.9591C1.57343 16.9591 1.34483 17.2248 1.80944 17.6894C2.27405 18.154 2.53976 17.9254 2.53976 17.9254L5.08991 15.7093L4.43976 15.0591Z"
          fill="white"
        />
        <path
          d="M2.60061 18.3867L2.54123 17.9265C2.54123 17.9265 2.31116 17.928 1.94155 17.5584C1.57194 17.1888 1.57342 16.9587 1.57342 16.9587L1.11326 16.8993C0.776312 16.8563 0.48389 17.1428 0.53139 17.4797C0.577406 17.7959 0.754046 18.1536 1.04944 18.4505C1.34483 18.7459 1.70256 18.9225 2.02022 18.9685C2.35569 19.016 2.64366 18.7236 2.60061 18.3867Z"
          fill="white"
        />
        <path
          d="M7.36699 17.1612L5.80839 15.2552L5.02613 14.473L4.24386 13.6907L2.33792 12.1321C2.24589 12.0549 2.11081 12.0608 2.02472 12.1454C1.93863 12.2315 1.93417 12.3711 2.01581 12.4631C2.42847 12.9233 3.25972 13.8866 3.6323 14.283C3.89355 14.562 4.16667 14.8396 4.41308 15.0845C4.658 15.3294 4.93707 15.6026 5.21464 15.8653C5.61097 16.2379 6.57433 17.0691 7.03449 17.4818C7.12652 17.5634 7.26456 17.559 7.35214 17.4729C7.43972 17.3883 7.44417 17.2532 7.36699 17.1612Z"
          fill="white"
        />
        <path
          d="M0.756976 17.4014C0.82318 17.658 0.972447 17.8856 1.18151 18.0486C1.47838 18.2831 1.65057 18.105 1.51698 17.8348C1.40862 17.6181 1.32698 17.5097 1.16518 17.2218C1.01229 16.9501 0.684242 17.1104 0.756976 17.4014Z"
          fill="white"
        />
        <path
          d="M2.59322 12.7729C2.46557 12.623 2.66596 12.5711 2.9658 12.8264C3.26565 13.0817 4.52736 14.1594 4.52736 14.1594C4.9326 14.5275 4.72775 14.9075 4.72775 14.9075C4.39971 14.6477 2.72088 12.9229 2.59322 12.7729Z"
          fill="white"
        />
        <path
          d="M2.4566 17.3674C2.49223 17.3897 2.62731 17.455 2.79356 17.3125C2.88707 17.2323 2.89746 17.1433 2.79207 17.0794C2.56051 16.9384 2.26364 16.5688 2.13598 16.312L1.82574 16.6697C1.98903 16.9429 2.1909 17.2056 2.4566 17.3674Z"
          fill="white"
        />
        <path
          d="M3.10379 16.5908C3.13942 16.613 3.30418 16.6991 3.42887 16.6249C3.60551 16.5195 3.57434 16.3859 3.46895 16.3221C3.23739 16.1811 2.90637 15.8352 2.7609 15.5918L2.4566 15.9421C2.64215 16.2093 2.84551 16.4334 3.10379 16.5908Z"
          fill="white"
        />
        <path
          d="M3.90388 16.0252C3.93951 16.0475 4.08053 16.0846 4.22303 15.9851C4.31506 15.9198 4.34623 15.7729 4.24084 15.709C3.97513 15.5487 3.58623 15.1405 3.40662 14.8511L3.10381 15.1999C3.32646 15.5235 3.65451 15.8723 3.90388 16.0252Z"
          fill="white"
        />
        <path
          d="M9.5 11.658L10.3268 12.4863L11.7162 10.5581L11.158 10L9.5 11.658Z"
          fill="white"
        />
        <path
          d="M15.1792 13.5373C14.9001 13.7689 15.3974 13.8446 15.7447 13.4943L16.4424 12.8011C16.616 12.6244 16.616 12.3216 16.2939 12.5739L15.1792 13.5373Z"
          fill="white"
        />
        <path
          d="M17.6269 17.5612C17.5275 17.7155 17.5705 17.8684 17.7323 17.8699C17.8481 17.8714 17.9728 17.7853 18.0307 17.7274C18.1153 17.6428 18.1761 17.5745 18.2177 17.4009C18.2726 17.1678 18.0203 16.9333 17.8718 17.1574C17.7397 17.3563 17.7264 17.4083 17.6269 17.5612Z"
          fill="white"
        />
      </svg>
    </Box>
  );
}
