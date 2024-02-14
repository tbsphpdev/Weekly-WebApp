/* eslint-disable */

import React from "react";
import {
  Box,
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function AddToHabit({
  isOpen,
  onClose,
  habits,
  titleArr,
  setTitleArr,
  habitArrNum,
  handleAddHabit,
  setHabitArrNum,
}: {
  isOpen: boolean;
  onClose: any;
  habits?: any;
  titleArr?: any;
  setTitleArr?: any;
  habitArrNum?: any;
  handleAddHabit: any;
  setHabitArrNum?: any;
}) {
  const router = useRouter();

  return (
    <Modal
      size="md"
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setHabitArrNum([]);
      }}
      isCentered
      preserveScrollBarGap
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton />
          {habits?.length == 0
            ? " You have not included any habits yet. Please add a habit."
            : "Select Habit(s) you would like to add"}
        </ModalHeader>
        <ModalBody>
          {habits?.length == 0 ? (
            <></>
          ) : (
            habits &&
            habits?.map((habit: any, i: number) => {
              return (
                <Box
                  key={i}
                  display="grid"
                  borderWidth={1}
                  borderStyle="solid"
                  borderColor="weekly.cardOutlineGrey"
                  borderRadius="0.5rem"
                  m={3}
                  p={3}
                >
                  <Checkbox
                    key={i}
                    color="#4C4F62"
                    defaultChecked={habitArrNum.includes(habit?._id)}
                    onChange={(e) => {
                      e.target.checked
                        ? setTitleArr([...titleArr, habit?.name])
                        : setTitleArr(
                            [...titleArr].filter((o) => o !== habit?.name)
                          );
                    }}
                    disabled={habitArrNum?.includes(habit?._id)}
                  >
                    {habit?.name}
                  </Checkbox>
                </Box>
              );
            })
          )}
        </ModalBody>
        <ModalFooter>
          {habits?.length == 0 ? (
            <Box w="100%" display="flex" justifyContent="center">
              <Button
                variant="purple"
                w="calc(50% - 6px)"
                mr={3}
                onClick={() => router.push("/habits")}
              >
                Add Habits
              </Button>
            </Box>
          ) : (
            <Box w="100%">
              <Button
                variant="purple"
                w="calc(50% - 6px)"
                mr={3}
                onClick={() => {
                  handleAddHabit();
                  setHabitArrNum([]);
                }}
              >
                Done
              </Button>
              <Button
                variant="ghost"
                w="calc(50% - 6px)"
                onClick={() => {
                  onClose();
                  setHabitArrNum([]);
                }}
              >
                Cancel
              </Button>
            </Box>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
