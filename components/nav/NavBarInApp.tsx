/* eslint-disable */
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Link as ChakraLink,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";

import Image from "next/image";
import NextLink from "next/link";
import { useState } from "react";
import axios from "axios";

import Logo from "../../public/images/logo.png";
import Clock from "../svgs/Clock.svg";
import PlainLink from "../utils/PlainLink";
import { API_BASE_URLS } from "../../public/constant";
import { BaseNotificationProps } from "../../pages/notification-list";

import SearchBar from "./SearchBar";
import NameBar from "./NameBar";
// import NameBarMobile from "./NameBarMobile";
import NotificationBell from "./NotificationBell";
import useUserDetails from "../../hooks/useUserDetails";
import { BsBarChartFill, BsExclamationTriangle } from "react-icons/bs";

type Open = "" | "Search" | "Notification" | "Name";

export default function NavBar() {
  const [open, setOpen] = useState<Open>("");
  const toast = useToast();

  const { currentUser, readNotification, getFriendListAPI } = useUserDetails();
  const [notifications, setNotifications] = useState<BaseNotificationProps[]>(
    []
  );

  const [isEditing, setIsEditing] = useState(false);

  //report a issue
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const setOpenFactory = (buttonOpen: Open) => () => {
    setOpen(buttonOpen);
  }; // show an error message

  const getNotifications = async () => {
    readNotification();
    await axios
      .post(API_BASE_URLS.baseUrl + "/api/activities/get-notifications", {})
      .then((res) => {
        if (res?.status === 200) {
          const Items = res?.data?.data?.Items ?? [];
          setNotifications([...Items]);
        }
      });
  };

  const handleChangeNotificationData = () => {
    getNotifications();
  };

  // handle send friend request
  const handleFrinendRequest = (_id: number) => {
    axios
      .get(API_BASE_URLS.baseUrl + "/api/friend/friend-request/" + _id)
      .then((res) => {
        if (res?.status === 200) {
          getFriendListAPI();
          // toast({
          //   title: "Success",
          //   position: "top-right",
          //   description: "Friend request sent successfully!",
          //   status: "success",
          //   duration: 3000,
          //   isClosable: true,
          // });
        }
      })
      .catch((err) => {
        // toast({
        //   title: "Error",
        //   position: "top-right",
        //   description: err?.response?.data?.error,
        //   status: "error",
        //   duration: 3000,
        //   isClosable: true,
        // });
      });
  };

  // handle remove friend or request
  const handleFrinendRemove = (_id: number) => {
    axios
      .get(API_BASE_URLS.baseUrl + "/api/friend/remove-request/" + _id)
      .then((res) => {
        if (res?.status === 200) {
          getFriendListAPI();
          // toast({
          //   title: "Success",
          //   position: "top-right",
          //   description: "Friend removed successfully.",
          //   status: "success",
          //   duration: 3000,
          //   isClosable: true,
          // });
        }
      })
      .catch((err) => {
        // toast({
        //   title: "Error",
        //   position: "top-right",
        //   description: err?.response?.data?.error,
        //   status: "error",
        //   duration: 3000,
        //   isClosable: true,
        // });
      });
  };

  //handle accept and decline friend request
  const handleActionFriendRequest = (userId: number, type: number) => {
    axios
      .get(
        API_BASE_URLS.baseUrl +
          "/api/friend/action-friend-request/" +
          userId +
          "/" +
          type
      )
      .then((res) => {
        if (res?.status === 200) {
          getFriendListAPI();
          // toast({
          //   title: "Success",
          //   position: "top-right",
          //   description:
          //     type == 1
          //       ? "Friend request accepted!"
          //       : "Friend request rejected.",
          //   status: "success",
          //   duration: 3000,
          //   isClosable: true,
          // });
        }
      })
      .catch((err) => {
        // toast({
        //   title: "Error",
        //   position: "top-right",
        //   description: err?.response?.data?.error,
        //   status: "error",
        //   duration: 3000,
        //   isClosable: true,
        // });
      });
  };

  return (
    <Box position={["relative"]}>
      {/* Desktop header */}
      <Flex
        className="deskTopNavbar"
        width="100%"
        background="weekly.darkTer"
        boxShadow="xs"
        px="1rem"
        alignItems="stretch"
        gap="1.75rem"
      >
        <Flex
          flex="0 0"
          justifySelf="flex-start"
          justifyContent="flex-start"
          alignItems="center"
          py="0.75rem"
          gap="2rem"
        >
          <PlainLink
            href={`/profile/${currentUser?.authSub}`}
            ml="4rem"
            mr="2rem"
          >
            <Image src={Logo} alt="Weekly Logo" loading="eager" />
          </PlainLink>
          <NextLink href="/overview" passHref>
            <ChakraLink textColor="weekly.light">
              <Flex gap="0.5rem" alignItems="center">
                <Clock />
                <Text as="span" whiteSpace="nowrap">
                  Overview
                </Text>
              </Flex>
            </ChakraLink>
          </NextLink>
          <NextLink href="/activities" passHref>
            <ChakraLink textColor="weekly.light">
              <Flex gap="0.5rem" alignItems="center">
                <BsBarChartFill />
                <Text as="span" whiteSpace="nowrap">
                  Change Data
                </Text>
              </Flex>
            </ChakraLink>
          </NextLink>
          <ChakraLink textColor="weekly.light">
            <Flex gap="0.5rem" alignItems="center">
              <Popover>
                {({ onClose }) => (
                  <>
                    <PopoverTrigger>
                      <Flex gap="0.5rem" alignItems="center">
                        <Button
                          fontWeight="normal"
                          variant="unstyled"
                          leftIcon={<BsExclamationTriangle />}
                        >
                          Report Problem
                        </Button>
                      </Flex>
                    </PopoverTrigger>
                    <PopoverContent mt="20px" w="500px" p="20px">
                      <PopoverHeader
                        color="#000"
                        fontWeight="bold"
                        border="none"
                      >
                        Report an issue
                      </PopoverHeader>
                      <PopoverBody>
                        <Textarea
                          placeholder="Please tell us in detail the issue you are having"
                          value={message}
                          onChange={(e) => {
                            setMessage(e.target.value);
                            setErrMsg("");
                          }}
                          w="100%"
                          mb="10px"
                          color="#4C4F62"
                        />
                        {errMsg && (
                          <Box color="red" mb="20px">
                            {errMsg}
                          </Box>
                        )}
                        <Box display="grid">
                          <Checkbox
                            color="#4C4F62"
                            isChecked={title === "This is harmful / unsafe"}
                            onChange={() =>
                              setTitle("This is harmful / unsafe")
                            }
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
                      </PopoverBody>
                      <Button
                        variant="purple"
                        mr={3}
                        w="calc(50% - 6px)"
                        onClick={async () => {
                          if (message.length > 256) {
                            setErrMsg(
                              "Message can't be longer than 256 characters"
                            );
                          }
                          if (message.length == 0) {
                            setErrMsg("This field shouldn't be empty.");
                          }
                          // if (spaceCheckRegex.test(message) == false) {
                          //   setErrMsg(
                          //     "This input field does not allow special characters or leading/trailing whitespace"
                          //   );
                          // }
                          else {
                            await axios
                              .post(
                                API_BASE_URLS.baseUrl + "/api/user/report",
                                {
                                  title,
                                  message,
                                }
                              )
                              .then((res) => {
                                setMessage("");
                                setTitle("");
                                setErrMsg("");
                                toast({
                                  title: "Success",
                                  position: "top-right",
                                  description: "Thanks for the feedback",
                                  status: "success",
                                  duration: 3000,
                                  isClosable: true,
                                });
                                onClose();
                              })
                              .catch((err) => {
                                onClose();
                                toast({
                                  title: "Error",
                                  position: "top-right",
                                  description:
                                    "One of the pre-defined category should be selected",
                                  status: "error",
                                  duration: 3000,
                                  isClosable: true,
                                });
                              });
                          }
                        }}
                        alignSelf="end"
                      >
                        Submit feedback
                      </Button>
                    </PopoverContent>
                  </>
                )}
              </Popover>
            </Flex>
          </ChakraLink>
        </Flex>
        <Flex
          flex="1 1"
          justifySelf="flex-end"
          justifyContent="flex-end"
          alignItems="center"
          gap="1.5rem"
        >
          <SearchBar
            handleFrinendRequest={handleFrinendRequest}
            handleFrinendRemove={handleFrinendRemove}
          />

          <NotificationBell
            count={currentUser?.notification_count}
            notifications={notifications}
            handleChangeNotificationData={handleChangeNotificationData}
            handleActionFriendRequest={handleActionFriendRequest}
          />

          {/* <NameBar
            onOpen={setOpenFactory("Name")}
            onClose={close}
            active={open === "Name"}
          /> */}

          <NameBar isEditing={isEditing} setIsEditing={setIsEditing} />
        </Flex>
      </Flex>

      {/* Mobile header */}
      <Flex
        className="mobileNavbar"
        width="100%"
        background="weekly.darkTer"
        boxShadow="xs"
        px="1rem"
        alignItems="stretch"
        gap="1.75rem"
      >
        <Flex
          flex="0 0"
          justifySelf="flex-start"
          justifyContent="flex-start"
          alignItems="center"
          py="0.75rem"
          gap="2rem"
        >
          {/* <NameBarMobile
          onOpen={setOpenFactory("Name")}
          onClose={close}
          active={open === "Name"}
          /> */}

          <NameBar isEditing={isEditing} setIsEditing={setIsEditing} />
        </Flex>
        <Flex
          flex="1 1"
          justifySelf="flex-end"
          justifyContent="flex-end"
          alignItems="center"
          gap="1.5rem"
        >
          {/* <SearchBar
            handleFrinendRequest={handleFrinendRequest}
            handleFrinendRemove={handleFrinendRemove}
          /> */}

          <NotificationBell
            count={currentUser?.notification_count}
            notifications={notifications}
            handleChangeNotificationData={handleChangeNotificationData}
            handleActionFriendRequest={handleActionFriendRequest}
          />
        </Flex>
      </Flex>
    </Box>
  );
}
