/* eslint-disable */
import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import axios from "axios";

import NavBar from "../components/nav/NavBarInApp";
import HabitSection from "../components/habits/HabitSection";
import { useCurrentUser } from "../hooks";
import { API_BASE_URLS } from "../public/constant";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { habitSchema } from "../types";
import useUserDetails from "../hooks/useUserDetails";
import { AdvHabitComp } from "../components/adv/AdvComp";
import { getCookie } from "../components/utils/utils";
import NextLink from "../components/utils/NextLink";

export default function Habits() {
  const { user } = useCurrentUser();
  const { addNotification } = useUserDetails();
  const [habit, setHabit] = useState<any[]>([]);
  const [addName, setAddName] = useState("");
  const [nameLen, setNameLen] = useState(0);
  const toast = useToast();
  const [displayCookies, setDisplayCookies] = useState(true);

  useEffect(() => {
    checkCookie();
  }, []);

  function checkCookie() {
    let displayCks = getCookie("displayHabitAdv");
    setDisplayCookies(!displayCks);
  }

  useEffect(() => {
    axios.get(API_BASE_URLS.baseUrl + "/api/user/get-habit").then((res) => {
      if (res?.status === 200) {
        setHabit(res?.data?.data);
      }
    });
  }, []);

  const {
    isOpen: isChangeNameOpen,
    onOpen: onChangeNameOpen,
    onClose: onChangeNameClose,
  } = useDisclosure();

  function closeChangeName() {
    setAddName("");
    onChangeNameClose();
  }

  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<{ name: string }>({
    resolver: zodResolver(
      habitSchema.pick({ name: true }).refine(
        ({ name }) => {
          return name;
        },
        {
          path: ["name"],
          message: "Habit name can't be the same as one that already exists",
        }
      )
    ),
    defaultValues: {
      name: addName,
    },
  });

  function addHabit(name: string) {
    axios
      .post(API_BASE_URLS.baseUrl + "/api/user/create-habit", {
        name,
      })
      .then((res) => {
        if (res?.status == 200) {
          addNotification();
          // toast({
          //   title: "Success",
          //   position: "top-right",
          //   description: "Habit successfully added.",
          //   status: "success",
          //   duration: 3000,
          //   isClosable: true,
          // });
          axios
            .get(API_BASE_URLS.baseUrl + "/api/user/get-habit")
            .then((res) => {
              if (res?.status == 200) {
                setHabit(res?.data?.data);
                window.scrollTo(0, 500);
              }
            });
        }
      });
  }

  function askToKeepData({ name }: { name: string }) {
    setAddName("");
    addHabit(name);
    closeChangeName();
  }

  return (
    <Box
      // w={["fit-content", "fit-content", "fit-content", "100%"]}
      w="100%"
      minH="100vh"
      bg="#f6feff"
    >
      <NavBar />
      {user?.subscriptionId === 0 && displayCookies && <AdvHabitComp />}
      <Box
        // mx={{ base: 8, md: 220 }}
        px={[10, 10, 24]}
        py={10}
        minH="100vh"
        bg="white"
      >
        <Heading fontSize="3xl">Habits</Heading>
        {user ? (
          <>
            <Box fontSize="xl" mt={4} mb={8}>
              You are working on
            </Box>
            <Stack spacing={8} divider={<StackDivider />}>
              {habit?.map((habit, i) => (
                <HabitSection key={i} habit={habit} setHabit={setHabit} />
              ))}
            </Stack>

            {habit?.length == 0 ? (
              <Button
                mt={12}
                variant="purple"
                fontSize="sm"
                fontWeight="regular"
                leftIcon={<AddIcon />}
                onClick={() => {
                  onChangeNameOpen();
                  setValue("name", addName);
                }}
              >
                Add habit
              </Button>
            ) : habit?.length < 3 ? (
              <Button
                mt={12}
                variant="purple"
                fontSize="sm"
                fontWeight="regular"
                leftIcon={<AddIcon />}
                onClick={() => {
                  onChangeNameOpen();
                  setValue("name", addName);
                }}
              >
                Add another habit
              </Button>
            ) : (
              <></>
            )}
          </>
        ) : (
          <Center mt={4}>
            <Spinner thickness="4px" color="weekly.purple" size="lg" />
            <Box ml={4} fontSize="xl">
              Fetching your habits...
            </Box>
          </Center>
        )}
        {user?.subscriptionId == 0 && (
          <>
            <Text mt={5}>
              You are currently on the Habit Starter plan and can only track 3
              websites or apps per habit.
            </Text>
            <Text mb={2}>
              Upgrade to habit Enthusiast to track{" "}
              <span style={{ color: "#9F79DC", fontWeight: "bold" }}>
                infinite
              </span>{" "}
              websites and apps.
            </Text>
            <NextLink
              href="/subscription"
              w="fit-content"
              color={"weekly.purple"}
              fontWeight="bold"
            >
              See Plan Details
            </NextLink>
          </>
        )}
      </Box>

      {/* add habit modal */}
      <Modal
        isOpen={isChangeNameOpen}
        onClose={closeChangeName}
        isCentered
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(askToKeepData)}>
            <ModalHeader>Add Habit Name</ModalHeader>
            <ModalBody>
              {/* <Input mt={4} {...register("name")} /> */}
              <InputGroup>
                <Input
                  mt={4}
                  {...register("name", {
                    onChange: (e) => {
                      setNameLen(e.target.value.length);
                    },
                  })}
                />
                <InputRightElement
                  mt={4}
                  color="#15192080"
                  children={`${getValues()?.name?.length || 0}/20`}
                  pr={5}
                />
              </InputGroup>
              {errors.name && (
                <Box mt={3} color="red">
                  {errors.name.message}
                </Box>
              )}
            </ModalBody>
            <ModalFooter>
              <Button variant="purple" mr={3} w="calc(50% - 6px)" type="submit">
                Done
              </Button>
              <Button
                variant="ghost"
                w="calc(50% - 6px)"
                onClick={onChangeNameClose}
              >
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      {/* add habit modal */}
    </Box>
  );
}
