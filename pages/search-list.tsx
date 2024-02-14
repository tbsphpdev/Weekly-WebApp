/* eslint-disable */

import { ChevronLeftIcon } from "@chakra-ui/icons";

import NavBar from "../components/nav/NavBarInApp";
import {
  Box,
  Button,
  Image,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URLS } from "../public/constant";
import { BsLightningChargeFill } from "react-icons/bs";
import {
  capitalizeFirstLetter,
  cryptoEncryption,
} from "../components/utils/utils";
import FriendsPlus from "../components/svgs/FriendsPlus.svg";
import Friends from "../components/svgs/Friends.svg";
import DialogBox from "../components/dialogBox/DialogBox";
import useUserDetails from "../hooks/useUserDetails";
import Link from "next/link";

export default function SearchList() {
  const router = useRouter();
  const toast = useToast();
  const { friendList, getFriendListAPI } = useUserDetails();

  const [selectedData, setSelectedData] = useState<any>(null);

  const {
    isOpen: isRemoveFriendOpen,
    onOpen: onRemoveFriendOpen,
    onClose: onRemoveFriendClose,
  } = useDisclosure();

  function handleRemove() {
    onRemoveFriendClose();
    handleFrinendRemove(selectedData?._id);
  }

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

  return (
    <Box w="100%" minH="100vh" bg="#f6feff">
      <NavBar />
      <Box px={[10, 10, 24]} py={10} minH="100vh" bg="white">
        <Stack>
          <Box justifyContent="flex-start" display="flex" alignItems={"center"}>
            <ChevronLeftIcon
              w={8}
              h={8}
              onClick={() => router.push("/overview")}
              className="custom-pointer"
            />
            <Link href="/overview" color="weekly.black">
              <Text fontSize={20} className="custom-pointer">
                Overview
              </Text>
            </Link>
          </Box>

          {friendList?.map((x: any, i: number) => {
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
                          x.subscription === 1 ? "2px solid #F2C94C" : "none"
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
                      </Text>
                    </Box>
                    <Box>
                      {x?.isfriend === "-" ? (
                        <Box
                          className="custom-pointer"
                          onClick={() => handleFrinendRequest(x?._id)}
                        >
                          <FriendsPlus />
                        </Box>
                      ) : x?.isfriend === 1 ? (
                        <Box
                          className="custom-pointer"
                          onClick={() => {
                            onRemoveFriendOpen();
                            setSelectedData(x);
                          }}
                        >
                          <Friends />
                        </Box>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          borderColor="#407AEA"
                          color="purple"
                          fontWeight="normal"
                          onClick={() => {
                            // onRemoveFriendOpen();
                            handleRemove();
                            setSelectedData(x);
                          }}
                        >
                          Invited
                        </Button>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Stack>
      </Box>
      {/* remove friend dialbox */}
      <DialogBox
        isOpenDialog={isRemoveFriendOpen}
        handleCloseDialog={() => onRemoveFriendClose()}
        handleBtn1Click={() => handleRemove()}
        headerColor="red"
        headerText="Remove Friend"
        discriptionText={`Do you want to remove ${selectedData?.firstName} as a friend?`}
        btnName1="Yes"
        btnName2="Cancel"
      />
      {/* remove friend dialbox */}
    </Box>
  );
}
