/* eslint-disable */

import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
} from "@chakra-ui/icons";

import NavBar from "../components/nav/NavBarInApp";
import {
  Box,
  Button,
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
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { BsLightningChargeFill, BsPeople } from "react-icons/bs";
import { API_BASE_URLS } from "../public/constant";
import {
  capitalizeFirstLetter,
  cryptoEncryption,
} from "../components/utils/utils";
import { CrossedSwords } from "./user-profile/[slug]";
import { useCurrentUser } from "../hooks";

export default function FriendList() {
  const router = useRouter();
  const toast = useToast();
  const { user } = useCurrentUser();

  const [selFilter, setSelFilter] = useState("Length");
  const [selCategory, setSelCategory] = useState("Select a Category");
  const [friendList, setFriendList] = useState([]);
  const [comment, setComment] = useState("");

  // handle remove friend or request
  const handleFrinendRemove = (_id: number) => {
    axios
      .get(API_BASE_URLS.baseUrl + "/api/friend/remove-request/" + _id)
      .then((res) => {
        if (res?.status === 200) {
          getMyFriendList();
        }
      });
  };

  useEffect(() => {
    getMyFriendList();
  }, []);

  //get my friend list API
  const getMyFriendList = () => {
    axios
      .get(API_BASE_URLS.baseUrl + "/api/friend/my-friends-list")
      .then((res) => {
        if (res?.status === 200) {
          setFriendList(res?.data?.data);
        }
      });
  };

  //handle submit compete
  const handleSubmitCompete = (id: any) => {
    axios
      .post(API_BASE_URLS.baseUrl + "/api/friend/compete-request", {
        userId: id,
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

  return (
    <Box w="100%" minH="100vh" bg="#f6feff">
      <NavBar />
      <VStack w="100%" py={6}>
        <Box
          w="85%"
          bg="white"
          px={[5, 5, 10, 20]}
          py={6}
          border="1px solid #ddd"
          rounded="lg"
        >
          <Box display="flex" w="100%">
            <Box w="100%">
              <Box display="flex" alignItems="center">
                <Text
                  fontSize="2xl"
                  fontWeight="semibold"
                  display="flex"
                  alignItems="center"
                  me="10px"
                  className="custom-pointer"
                  onClick={() => router.replace("/profile/" + user?.authSub)}
                >
                  <ChevronLeftIcon
                    fontWeight="900"
                    className="custom-pointer"
                    onClick={() => router.replace("/profile/" + user?.authSub)}
                  />
                  Profile
                </Text>
                <Text border="none" fontWeight="semibold" fontSize="xl">
                  Friend List
                </Text>
              </Box>

              {friendList?.length === 0 ? (
                <Text>No Data</Text>
              ) : (
                friendList?.map((x: any, i: number) => {
                  return (
                    <Box
                      key={i}
                      display={["block", "block", "flex"]}
                      justifyContent="space-between"
                      mt="25px"
                    >
                      <Box
                        bg="white"
                        px={[5]}
                        py={3}
                        width="100%"
                        border="1px solid #ddd"
                        rounded="lg"
                      >
                        <Box display="flex" alignItems="center">
                          <Box>
                            <Image
                              borderRadius="full"
                              boxSize="80px"
                              border={
                                x.subscription === 1
                                  ? "2px solid #F2C94C"
                                  : "none"
                              }
                              src={x.image}
                              alt="Dan Abramov"
                              me="25px"
                              cursor="pointer"
                              onClick={() =>
                                cryptoEncryption(x?._id).then((x) => {
                                  router.push(
                                    `${window.location.origin}/user-profile/${x}`
                                  );
                                })
                              }
                            />
                          </Box>
                          <Box w="100%">
                            <Text
                              fontSize="20px"
                              fontWeight="600"
                              mb="0"
                              lineHeight="18px"
                            >
                              <Text
                                display="flex"
                                alignItems="center"
                                cursor="pointer"
                                onClick={() =>
                                  cryptoEncryption(x?._id).then((x) => {
                                    router.push(
                                      `${window.location.origin}/user-profile/${x}`
                                    );
                                  })
                                }
                              >
                                {capitalizeFirstLetter(x.firstName)}{" "}
                                {capitalizeFirstLetter(x.lastName)}{" "}
                                {x?.subscription === 1 && (
                                  <BsLightningChargeFill color="#FFCB3D" />
                                )}
                              </Text>
                              <Text as="span" fontSize="12px" fontWeight="400">
                                {x.username}
                              </Text>
                            </Text>
                          </Box>
                        </Box>
                        <Box
                          display="flex"
                          flexWrap="wrap"
                          justifyContent="space-between"
                          alignItems="center"
                          mt="2"
                        >
                          <Box
                            display="flex"
                            flexWrap="wrap"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            {/* <Box w={["100px"]} /> */}
                            <Popover>
                              {({ onClose }) => (
                                <>
                                  <PopoverTrigger>
                                    <Button
                                      rightIcon={<BsPeople />}
                                      colorScheme="purple"
                                      variant="outline"
                                      mr="10px"
                                      size="sm"
                                    >
                                      Remove Friend
                                    </Button>
                                  </PopoverTrigger>
                                  <Portal>
                                    <PopoverContent borderColor="1px solid #797979">
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
                                          justifyContent="end"
                                        >
                                          <Button
                                            variant="purple"
                                            mr="10px"
                                            onClick={() =>
                                              handleFrinendRemove(x?._id)
                                            }
                                          >
                                            Yes
                                          </Button>
                                          <Button
                                            variant="unstyled"
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
                            <Text
                              fontSize="20px"
                              fontWeight="600"
                              mb="0"
                              lineHeight="18px"
                            >
                              Habits:
                              {x?.habit?.length > 0 ? (
                                x?.habit?.map((y: any, i: number) => {
                                  return (
                                    <Text
                                      key={i}
                                      as="span"
                                      fontSize="20px"
                                      color="weekly.purple"
                                      fontWeight="600"
                                    >
                                      {" "}
                                      {capitalizeFirstLetter(y)}
                                      {x?.habit?.length - 1 == i ? " " : ","}
                                    </Text>
                                  );
                                })
                              ) : (
                                <Text
                                  as="span"
                                  fontSize="20px"
                                  color="weekly.darkgray"
                                  fontWeight="600"
                                >
                                  {" "}
                                  No habit data{" "}
                                </Text>
                              )}
                            </Text>
                          </Box>
                          {user?.subscriptionId == 1 &&
                          x?.subscription === 1 ? (
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
                                          Invite {x.firstName} to Compete
                                        </Heading>
                                        <Text
                                          color="weekly.darkgray"
                                          fontSize="12px"
                                          mt="5px"
                                        >
                                          Select length of competition and
                                          Category
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
                                              {selFilter !== "Day"
                                                ? selFilter
                                                : capitalizeFirstLetter(
                                                    selFilter
                                                  )}
                                            </MenuButton>
                                            <MenuList>
                                              <MenuItem
                                                onClick={() =>
                                                  setSelFilter("Day")
                                                }
                                              >
                                                Day
                                              </MenuItem>
                                              <MenuItem
                                                onClick={() =>
                                                  setSelFilter("Week")
                                                }
                                              >
                                                Week
                                              </MenuItem>
                                              <MenuItem
                                                onClick={() =>
                                                  setSelFilter("Month")
                                                }
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
                                              w="180px"
                                            >
                                              {selCategory !==
                                              "Select a Category"
                                                ? selCategory
                                                : capitalizeFirstLetter(
                                                    selCategory
                                                  )}
                                            </MenuButton>
                                            <MenuList>
                                              <MenuItem
                                                onClick={() =>
                                                  setSelCategory(
                                                    "Most Productive"
                                                  )
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
                                                  setSelCategory(
                                                    "Time Spent Offline"
                                                  )
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
                                          onChange={(e) =>
                                            setComment(e.target.value)
                                          }
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
                                              handleSubmitCompete(x?._id);
                                              onClose();
                                              setSelFilter("Day");
                                              setComment("");
                                              setSelCategory("Most Productive");
                                            }}
                                          >
                                            Confirm
                                          </Button>
                                          <Button
                                            variant="unstyled"
                                            onClick={() => {
                                              onClose();
                                              setSelFilter("Day");
                                              setComment("");
                                              setSelCategory("Most Productive");
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
                          ) : (
                            <Box />
                          )}
                        </Box>
                      </Box>
                    </Box>
                  );
                })
              )}
            </Box>
          </Box>
        </Box>
      </VStack>
    </Box>
  );
}
