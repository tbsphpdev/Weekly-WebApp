/* eslint-disable */

import { ChevronLeftIcon } from "@chakra-ui/icons";

import { useDisclosure } from "@chakra-ui/hooks";
import axios from "axios";

import NavBar from "../components/nav/NavBarInApp";
import { API_BASE_URLS } from "../public/constant";
import { useEffect, useRef, useState } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Box,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { habitSchema } from "../types";
import { useRouter } from "next/router";
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
  BsPencil,
} from "react-icons/bs";
import AssociatedApplication from "../components/habits/AssociatedApplication";
import Link from "next/link";
import SearchBox from "../components/habits/SearchBox";
import { useCurrentUser } from "../hooks";

export default function HabitList() {
  const [habit, setHabit] = useState<any>(null);
  const [addName, setAddName] = useState("");

  const [newName, setNewName] = useState("");
  const [nameLen, setNameLen] = useState(0);
  const keepDataButton = useRef<HTMLButtonElement>(null);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);

  const router = useRouter();
  const { user } = useCurrentUser();
  const toast = useToast();

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

  useEffect(() => {
    getHabitDataById();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      // Check if Ctrl (or Command on macOS) and 'F' are pressed simultaneously
      if ((event.ctrlKey || event.metaKey) && event.key === "f") {
        event.preventDefault(); // Prevent the default browser search bar from popping up
        setShowSearchBar(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  function goToTop() {
    window.scrollTo(0, 0);
  }

  function goToDown() {
    window.scrollTo(0, 1000);
  }

  function getHabitDataById() {
    axios
      .get(
        API_BASE_URLS.baseUrl + "/api/user/get-habit-details/" + router.query.id
      )
      .then((res) => {
        if (res?.status == 200) {
          setHabit(res?.data?.data);
        }
      });
  }

  function askToKeepData({ name }: { name: string }) {
    setAddName("");
    setNewName(name);
    keepDataButton.current?.focus();
  }

  function renameHabit(keepData: boolean) {
    closeChangeName();
    axios
      .post(API_BASE_URLS.baseUrl + "/api/user/rename-habit", {
        oldName: habit?.name,
        keepData,
        name: newName,
      })
      .then((res) => {
        if (res?.status == 200) {
          // toast({
          //   title: "Success",
          //   position: "top-right",
          //   description: "Habit successfully updated.",
          //   status: "success",
          //   duration: 3000,
          //   isClosable: true,
          // });
          getHabitDataById();
        }
      });
  }

  function handleSearchClose() {
    setShowSearchBar(false);
  }

  return (
    <Box
      // w={["fit-content", "fit-content", "fit-content", "100%"]}
      w="100%"
      minH="100vh"
      bg="#f6feff"
    >
      <NavBar />
      <Box
        // mx={{ base: 8, md: 220 }}
        px={[10, 10, 24]}
        py={10}
        minH="100vh"
        bg="white"
      >
        <Stack>
          <Box justifyContent="flex-start" display="flex" alignItems={"center"}>
            <ChevronLeftIcon
              w={8}
              h={8}
              onClick={() => router.push("/habits")}
              className="custom-pointer"
            />
            <Link href="/habits" color="weekly.black">
              <Text fontSize={20} className="custom-pointer">
                Habits
              </Text>
            </Link>
          </Box>
          <Box maxW={["100%", "100%", "80%"]}>
            <Button
              p={3}
              fontSize="lg"
              color="#4285f4"
              bg="#4285f41a"
              textTransform="uppercase"
              fontWeight="regular"
              rounded="md"
              onClick={() => {
                onChangeNameOpen();
                setValue("name", habit?.name);
              }}
            >
              {habit?.name}
              <Box ml={2}>
                <BsPencil size={16} />
              </Box>
            </Button>
          </Box>

          {/* searchbar */}
          {showSearchBar && (
            <>
              <SearchBox
                applicationData={habit?.applications?.map((x: any) => x)}
                handleSearchClose={handleSearchClose}
                habit={habit}
                setHabit={setHabit}
              />
            </>
          )}
          {/* searchbar */}

          {/* for display application name */}
          {!showSearchBar &&
            habit?.applications?.map((application: any, i: number) => {
              return (
                <>
                  <AssociatedApplication
                    key={i}
                    applicationId={application?._id}
                    application={application?.name}
                    habit={habit}
                    setHabit={setHabit}
                    pageType="habit-list"
                  />
                </>
              );
            })}
          {/* for display application name */}

          {!showSearchBar && (
            <AssociatedApplication
              habit={habit}
              setHabit={setHabit}
              pageType="habit-list"
            />
          )}
        </Stack>
      </Box>
      {/* rename habit name modal */}
      <Modal
        isOpen={isChangeNameOpen}
        onClose={closeChangeName}
        isCentered
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(askToKeepData)}>
            {!newName ? (
              <>
                <ModalHeader>Change Habit Name</ModalHeader>
                <ModalBody>
                  <Box color="#15192080">
                    Edit the name associated with this habit
                  </Box>
                  {/* <Box color={user?.subscriptionId === 0 ? "red" : "#15192080"}>
                    {user?.subscriptionId === 0
                      ? "You currently have more than 3 Apps/URLs for this habit. Remove some before editing your habit name."
                      : "Edit the name associated with this habit"}
                  </Box> */}
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
                  <Button
                    variant="purple"
                    mr={3}
                    w="calc(50% - 6px)"
                    type="submit"
                  >
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
              </>
            ) : (
              <>
                <ModalHeader color="green">Keep Data</ModalHeader>
                <ModalBody>
                  <Box color="#15192080">
                    Do you want to keep the data associated with the previous
                    name?
                  </Box>
                </ModalBody>
                <ModalFooter>
                  <Button
                    ref={keepDataButton}
                    variant="purple"
                    mr={3}
                    w="calc(50% - 6px)"
                    onClick={() => renameHabit(true)}
                  >
                    Yes
                  </Button>
                  <Button
                    variant="ghost"
                    w="calc(50% - 6px)"
                    onClick={() => renameHabit(false)}
                  >
                    No
                  </Button>
                </ModalFooter>
              </>
            )}
          </form>
        </ModalContent>
      </Modal>
      {/* rename habit name modal */}
      <Box className="top-to-btm">
        {window.scrollY > 0 ? (
          <BsFillArrowUpCircleFill
            className="icon-position"
            onClick={goToTop}
            size={20}
          />
        ) : window.scrollY == 0 ? (
          <BsFillArrowDownCircleFill
            className="icon-position"
            onClick={goToDown}
            size={20}
          />
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
}
