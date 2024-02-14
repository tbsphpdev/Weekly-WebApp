/* eslint-disable */

import {
  VStack,
  Box,
  Flex,
  Text,
  Center,
  Grid,
  GridItem,
  Spacer,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  MenuButton,
  Menu,
  MenuList,
  IconButton,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/modal";
import { RadialBar } from "@nivo/radial-bar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCurrentUser } from "../../hooks";
import { useSession } from "next-auth/react";
import { BsThreeDots } from "react-icons/bs";
import { API_BASE_URLS } from "../../public/constant";

type ProductivityData = {
  id: string;
  data: {
    x: string;
    y: any;
    color: string;
  }[];
};

const productivityDummyData: ProductivityData[] = [
  {
    id: "Productivity",
    data: [
      {
        x: "Completed",
        y: 5 / 6,
        color: "#407AEA",
      },
    ],
  },
  {
    id: "Habit",
    data: [
      {
        x: "Completed",
        y: 50 / 75,
        color: "#9f79dc",
      },
    ],
  },
];

export default function GoalTime({ SD, ED }: any) {
  const { user } = useCurrentUser();
  const { data, update } = useSession();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [habitGet, setHabitGet] = useState<any>("");
  const [productiveGet, setProductiveGet] = useState("");
  const [habitText, setHabitText] = useState(user?.habit);
  const [productiveText, setProductiveText] = useState(user?.productivity);

  const [habitTotalGet, setHabitTotalGet] = useState("");
  const [productiveTotalGet, setProductiveTotalGet] = useState("");

  const [chartData, setChartData] = useState<ProductivityData[]>(
    productivityDummyData
  );
  const [per, setPer] = useState(0);
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    syncVals();
  }, [user]);

  useEffect(() => {
    if (isOpen) {
      onOpen();
    }
  }, [isOpen]);

  useEffect(() => {
    updateChartData();
  }, [habitTotalGet, productiveTotalGet, productiveText, habitText]);

  const handleConfirm = async () => {
    await axios
      .post(API_BASE_URLS.baseUrl + "/api/user/add-goal", {
        habit: parseInt(habitText),
        productivity: parseInt(productiveText),
      })
      .then(async (res) => {
        await update((prev: any) => ({
          ...prev,
          isNew: false,
        }));
      });
  };

  const updateChartData = () => {
    const data = chartData.map((val) => {
      const prodDataPer = (parseInt(productiveTotalGet) / productiveText) * 100;
      const habitDataPer = (parseInt(habitTotalGet) / habitText) * 100;
      return {
        id: val.id,
        data: [
          {
            x: "Completed",
            y:
              val.id === "Productivity"
                ? (val.data[0].y =
                    prodDataPer >= 100 ? 100 : prodDataPer.toFixed())
                : (val.data[0].y =
                    habitDataPer >= 100 ? 100 : habitDataPer.toFixed()),
            color: val.id === "Productivity" ? "#407AEA" : "#9f79dc",
          },
        ],
      };
    });
    setChartData(data);
  };

  const syncVals = async () => {
    setIsLoader(true);
    const response = await axios.get(
      API_BASE_URLS.baseUrl +
        `/api/activities/get-activities-data?startdate=${SD}&enddate=${ED}`
    );
    const val = response.data.data;

    if (!user?.habit) {
      setHabitText(0);
    }
    if (!user?.productivity) {
      setProductiveText(0);
    }

    setHabitGet(val.habit);
    setProductiveGet(val.productivity);
    setHabitText(user?.habit ?? 0);
    setProductiveText(user?.productivity ?? 0);
    setPer(val.per);
    setProductiveTotalGet(val.totalproductivity);
    setHabitTotalGet(val.totalhabit);
    setIsLoader(false);
  };

  return (
    <VStack bg="weekly.lightgray" className="overview-main">
      <Box
        bg="white"
        w="85%"
        h="100%"
        mt={26}
        border="1px solid #ddd"
        rounded="lg"
      >
        <Grid
          className="overview-grid"
          templateColumns="repeat(4, 1fr)"
          gap={6}
          h="100%"
          px="6.5%"
          py="3.8%"
        >
          <GridItem colSpan={3} h="100%">
            <Flex flexDir="column" h="100%">
              {per === 0 ? (
                <Box flexDir="row">
                  <Text fontSize="xl" fontWeight="bold" color="weekly.darkgray">
                    Start working on your habits, {user?.firstName}!
                  </Text>
                </Box>
              ) : (
                <Box flexDir="row">
                  <Text fontSize="xl" fontWeight="bold" color="weekly.darkgray">
                    Good Job, {user?.firstName}! You spent{" "}
                    <span className="color-blue">{per}%</span> of your time
                    being productive. Keep it up!
                  </Text>
                </Box>
              )}
              <Spacer />
              {isLoader ? (
                <>{isLoader}</>
              ) : (
                <Flex
                  flexDir="row"
                  gap="48px"
                  mt="20px"
                  mb="20px"
                  className="goalName"
                >
                  <Flex flexDir="column">
                    <Text>Habit Goal</Text>
                    <Text color="weekly.purple">
                      {habitGet}/
                      {Math.floor(habitText / 60) + "h " + (habitText % 60)}m
                    </Text>
                  </Flex>
                  <Flex flexDir="column">
                    <Text>Productivity Goal </Text>
                    <Text color="weekly.darkBlue">
                      {productiveGet}/
                      {Math.floor(productiveText / 60) +
                        "h " +
                        (productiveText % 60)}
                      m
                    </Text>
                  </Flex>
                  <Flex flexDir="column">
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        aria-label=""
                        icon={<BsThreeDots />}
                        variant="none"
                      />
                      <MenuList minW="0px" w="125px" fontSize="14px">
                        <MenuItem onClick={() => onOpen()}>Edit Goal</MenuItem>
                      </MenuList>
                    </Menu>
                  </Flex>
                </Flex>
              )}
              <Spacer />
            </Flex>
          </GridItem>

          <GridItem colSpan={1}>
            <Flex flexDir="column" h="100%">
              <Center h="100%" className="custom-goal-graph">
                <ProductivityGraph data={chartData} />
              </Center>
            </Flex>
          </GridItem>
        </Grid>
      </Box>

      {/* edit habit and productivity goal modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => onClose()}
        isCentered
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent p={3}>
          <ModalBody display="flex">
            <Box display="flex" flexDirection="column">
              <Box fontWeight="bold">Habit Goal</Box>
              <InputGroup mt={4} w="80%">
                <Input
                  value={parseInt(habitText)}
                  type="number"
                  onChange={(e) => setHabitText(e.target.value)}
                />
                <InputRightElement children={<Text>min</Text>} />
              </InputGroup>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="flex-end">
              <Box fontWeight="bold">Productivity Goal</Box>
              <InputGroup mt={4} w="80%">
                <Input
                  value={parseInt(productiveText)}
                  type="number"
                  onChange={(e) => setProductiveText(e.target.value)}
                />
                <InputRightElement children={<Text>min</Text>} />
              </InputGroup>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="purple"
              mr={3}
              w="calc(50% - 6px)"
              onClick={() => handleConfirm()}
            >
              Done
            </Button>
            <Button
              variant="ghost"
              colorScheme="white"
              w="calc(50% - 6px)"
              onClick={() => onClose()}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* edit habit and productivity goal modal */}
    </VStack>
  );
}

function ProductivityGraph({ data }: { data: ProductivityData[] }) {
  return (
    <RadialBar
      width={240}
      height={240}
      data={data}
      endAngle={360}
      padding={0.4}
      maxValue={100}
      cornerRadius={2}
      enableRadialGrid={false}
      enableCircularGrid={false}
      radialAxisStart={null}
      circularAxisOuter={null}
      labelsTextColor={{ from: "color", modifiers: [] }}
      legends={[]}
      colors={{ datum: "data.color" }}
    />
  );
}
