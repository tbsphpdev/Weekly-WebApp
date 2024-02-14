/* eslint-disable */
import {
  Box,
  Flex,
  VStack,
  Text,
  Button,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Center,
  Circle,
  Divider,
  Spacer,
  Stack,
  Wrap,
  WrapItem,
} from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { Pie } from "@nivo/pie";

import axios from "axios";
import { API_BASE_URLS } from "../../public/constant";
import { capitalizeFirstLetter, HourToHrMin } from "../utils/utils";
import moment from "moment";
import AddToHabit from "../dialogBox/AddToHabit";

import AppHistory from "../dialogBox/AppHistory";
import { useCurrentUser } from "../../hooks";

type timeArr = [
  {
    application: string;
    hours: number;
  }
];

type Data = {
  category: string;
  color: string;
  time: timeArr;
};

export default function ProdctivityTimeOverview({
  startDate,
  endDate,
  startDate1,
  endDate1,
  selFilter,
  setStartDate,
  setEndDate,
  setSelFilter,
  dateRange,
  setDateRange,
}: any) {
  const [dummyData, setDummyData] = useState<Data[]>([]);
  const [blankData, setBlankData] = useState<Data[]>([]);
  const [isDummy, setDummy] = useState(false);
  const { user } = useCurrentUser();

  let SD =
    selFilter == "custom"
      ? moment(startDate1).format("YYYY-MM-DD")
      : moment(startDate).format("YYYY-MM-DD");
  let ED =
    selFilter == "custom"
      ? moment(endDate1).format("YYYY-MM-DD")
      : moment(endDate).format("YYYY-MM-DD");

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        // API_BASE_URLS.baseUrl + `/api/activities/get-habits-data?filter=${time}`
        API_BASE_URLS.baseUrl +
          `/api/activities/get-habits-data?startdate=${SD}&enddate=${ED}`
      );
      const val = response.data?.data;
      let DummyData = [];
      if (
        val.habit.length == 0 &&
        val.other.length == 0 &&
        val.productive.length == 0 &&
        val.unproductive.length == 0
      ) {
        setDummy(true);
        let data: Data[] = [
          {
            category: "habit",
            color: "#dcdcdc",
            time: [{ application: "", hours: 0 }],
          },
          {
            category: "productive",
            color: "#dcdcdc",
            time: [{ application: "", hours: 0 }],
          },
          {
            category: "unproductive",
            color: "#dcdcdc",
            time: [{ application: "", hours: 0 }],
          },
          {
            category: "other",
            color: "#dcdcdc",
            time: [{ application: "", hours: 100 }],
          },
        ];
        // console.log("data", data);
        setBlankData(data);
      } else {
        setDummy(false);
      }

      for (const key in val) {
        const timeentriesdata = val[key];
        const dataObj: any = {};
        dataObj.category = key;
        if (key == "habit") {
          dataObj.color = "#9F79DC";
        } else if (key == "productive") {
          dataObj.color = "#98E0EF";
        } else if (key == "unproductive") {
          dataObj.color = "#EB4335";
        } else {
          dataObj.color = "#797979";
        }
        const timeArr: any[] = [];
        for (const item in timeentriesdata) {
          timeArr.push({
            application: timeentriesdata[item].key,
            hours: timeentriesdata[item].value,
          });
        }
        timeArr.sort((a, b) =>
          a.hours < b.hours ? 1 : b.hours < a.hours ? -1 : 0
        );
        dataObj.time = timeArr;
        DummyData.push(dataObj);
      }
      setDummyData(DummyData);
    }
    fetchData();
  }, [selFilter, startDate, endDate, startDate1, endDate1]);

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();

  const [habitArrNum, setHabitArrNum] = useState<any>([]);
  const [titleArr, setTitleArr] = useState<any[]>([]);
  const [application, setApplication] = useState<string[]>([]);
  const [habits, setHabits] = useState<any[]>([]);

  useEffect(() => {
    getHabitListApi();
  }, []);

  function getHabitListApi() {
    axios.get(API_BASE_URLS.baseUrl + "/api/user/get-habit").then((res) => {
      if (res?.status === 200) {
        setHabits(res?.data?.data);
      }
    });
  }

  // function getCheckApplicationInHabit(application: string) {
  //   axios
  //     .get(API_BASE_URLS.baseUrl + "/api/user/check-application/" + application)
  //     .then((res) => {
  //       if (res?.status === 200) {
  //         setHabitArrNum(res?.data?.data?.map(Number));
  //       }
  //     });
  // }

  // function openAddDialog(val: any) {
  //   getCheckApplicationInHabit(application);
  //   setTimeout(() => {
  //     onAddOpen();
  //   }, 200);
  // }

  function handleAddHabit() {
    titleArr.forEach((x) => {
      axios
        .post(API_BASE_URLS.baseUrl + "/api/user/add-applications", {
          name: x,
          applications: application,
        })
        .then((res) => {
          onAddClose();
          setTitleArr([]);
        })
        .catch((err) => {
          onAddClose();
          setTitleArr([]);
        });
    });
  }

  return (
    <>
      <Center mb={6}>
        <Stack className="productivty-view" w="85%" rounded="lg">
          <Flex w="100%" alignItems="center" className="productivity-time">
            <Box className="productivity-time-sub">
              <Text fontSize={22} fontWeight={500} mr={2}>
                Productivity time overview
              </Text>
            </Box>
            <Spacer />
            <Box className="productivity-time-sub-new">
              {/* <Box mr="18px">
              <Calendar />
            </Box> */}
              {/* <Menu>
              <MenuButton
                as={Button}
                rightIcon={<FaCaretDown />}
                variant="outline"
                w="138px"
                h="30px"
                fontWeight="400"
                fontSize="14px"
                color="#464545"
              >
                {timePeriod}
              </MenuButton>
              <MenuList>
                {timePeriods.map((text) => (
                  <MenuItem onClick={() => setTimePeriod(text)} key={text}>
                    {text}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu> */}
            </Box>
          </Flex>
          <Flex w="100%" className="overview-flex-habbits">
            <Wrap spacing={6} mt={12}>
              {dummyData.map((item, i) => {
                return (
                  <CategoryHours
                    data={item}
                    key={i}
                    SD={SD}
                    ED={ED}
                    selFilter={selFilter}
                    onAddOpen={onAddOpen}
                    setApplication={setApplication}
                    setHabitArrNum={setHabitArrNum}
                    user={user}
                    startDate={startDate}
                    endDate={endDate}
                    startDate1={startDate1}
                    endDate1={endDate1}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    setSelFilter={setSelFilter}
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                  />
                );
              })}
            </Wrap>
            {/* <Spacer /> */}
            <Box
              h="100%"
              textAlign="center"
              position="relative"
              className="graph-mt-new"
            >
              <ProductivityPieChart
                data={isDummy ? blankData : dummyData}
                isDummy={isDummy}
              />
              <Text
                fontSize={20}
                pos="absolute"
                right="50%"
                top="50%"
                transform="translate(50%, -50%)"
              >
                Total(Hr)
              </Text>
            </Box>
          </Flex>
        </Stack>
      </Center>
      {/* add to habit modal */}
      <AddToHabit
        isOpen={isAddOpen}
        onClose={onAddClose}
        habits={habits}
        habitArrNum={habitArrNum}
        titleArr={titleArr}
        setTitleArr={setTitleArr}
        handleAddHabit={handleAddHabit}
        setHabitArrNum={setHabitArrNum}
      />
      {/* add to habit modal */}
    </>
  );
}

type ProductivityData = {
  category: string;
  color: string;
  time: {
    application: string;
    hours: number;
  }[];
};

function CategoryHours({
  data,
  SD,
  ED,
  selFilter,
  onAddOpen,
  setApplication,
  setHabitArrNum,
  user,
  startDate,
  endDate,
  startDate1,
  endDate1,
  setStartDate,
  setEndDate,
  setSelFilter,
  dateRange,
  setDateRange,
}: {
  data: ProductivityData;
  SD: string;
  ED: string;
  selFilter: string;
  onAddOpen: any;
  setApplication: any;
  setHabitArrNum: any;
  user: any;
  startDate: any;
  setStartDate: any;
  endDate: any;
  setEndDate: any;
  setSelFilter: any;
  dateRange: any;
  setDateRange: any;
  startDate1: any;
  endDate1: any;
}) {
  const [appArray, setAppArray] = useState<any[]>([]);
  const [openAppData, setOpenAppData] = useState("");
  const [appHistoryData, setAppHistoryData] = useState<any>("");

  const [chartData, setChartData] = useState([]);
  const [chartDate, setChartDate] = useState([]);
  const [chartTime, setChartTime] = useState([]);
  const [categoryType, setCategoryType] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setAppArray(data?.time.slice(0, 5));
  }, [data.time]);

  const handleSeemore = () => {
    setAppArray([...appArray, ...data?.time.slice(5, 10)]);
  };

  const handleSeeless = () => {
    setAppArray(data?.time.slice(0, 5));
  };

  function getAppHistroyAPI(name: string, isHabit: number) {
    axios
      .post(API_BASE_URLS.baseUrl + "/api/activities/app-history", {
        startdate: SD,
        enddate: ED,
        appName: name,
        isHabit: isHabit,
      })
      .then((res) => {
        setAppHistoryData(res?.data?.data);
        setChartData(res?.data?.data?.list?.map((x: any) => x.duration));
        setChartDate(res?.data?.data?.list?.map((x: any) => x.date));
        setChartTime(res?.data?.data?.list?.map((x: any) => x.time));
      });
  }

  return (
    <WrapItem>
      <VStack align="left">
        <Flex alignItems="center" className="data-flex-name">
          <Box className="parentDot" mr="5px" textAlign="right">
            <Circle size="16px" bg={data.color} />
          </Box>
          <Text>{capitalizeFirstLetter(data.category)}</Text>
        </Flex>
        <Divider />
        <VStack alignItems="left" pt="10px">
          {appArray?.map((data1, index) => {
            return (
              <Flex key={index} className="data-flex-name">
                <Text color="#407AEA" mr="5px" width="70px">
                  {data1.hours >= 59
                    ? HourToHrMin(data1.hours)
                    : `${data1.hours}s`}
                </Text>
                <Tooltip label={data1.application}>
                  <Text
                    className="trailingDots"
                    cursor="pointer"
                    onClick={() => {
                      if (user?.subscriptionId === 1) {
                        if (data.category !== "habit") {
                          getAppHistroyAPI(data1.application, 0);
                        } else {
                          getAppHistroyAPI(data1.application, 1);
                        }
                        onOpen();
                        setOpenAppData(data1.application);
                        setApplication(data1.application);
                        setCategoryType(data.category);
                      }
                    }}
                    _hover={{
                      color:
                        user?.subscriptionId === 1 ? "weekly.aqua" : "#000",
                    }}
                  >
                    {data1.application}
                  </Text>
                </Tooltip>
              </Flex>
            );
          })}
          {data?.time?.length > 5 && appArray?.length < 6 && (
            <Button
              variant="link"
              color="purple"
              width="100%"
              mt={5}
              onClick={() => handleSeemore()}
            >
              See more
            </Button>
          )}
          {appArray?.length > 5 && (
            <Button
              variant="link"
              color="purple"
              width="100%"
              mt={5}
              onClick={() => handleSeeless()}
            >
              See less
            </Button>
          )}
        </VStack>
      </VStack>

      <AppHistory
        isOpen={isOpen}
        onClose={onClose}
        openAppData={openAppData}
        appHistoryData={appHistoryData}
        chartData={chartData}
        chartDate={chartDate}
        SD={SD}
        ED={ED}
        selFilter={selFilter}
        onAddOpen={onAddOpen}
        setHabitArrNum={setHabitArrNum}
        chartTime={chartTime}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        setSelFilter={setSelFilter}
        dateRange={dateRange}
        setDateRange={setDateRange}
        startDate1={startDate1}
        endDate1={endDate1}
        getAppHistroyAPI={getAppHistroyAPI}
        categoryType={categoryType}
      />
    </WrapItem>
  );
}

function ProductivityPieChart({
  data,
  isDummy,
}: {
  data: ProductivityData[];
  isDummy: boolean;
}) {
  const chartData = data.map((d) => {
    const totalHours: number = d.time.reduce(
      (prevHours, curTime) => prevHours + curTime.hours,
      0
    );
    return {
      id: d.category,
      label: d.category,
      value: Math.round(totalHours / 3600),
      color: d.color,
    };
  });

  return (
    <Pie
      data={chartData}
      width={260}
      height={260}
      margin={{ top: 20, right: 5, bottom: 20, left: 15 }}
      innerRadius={0.7}
      padAngle={0}
      cornerRadius={0}
      activeOuterRadiusOffset={5}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      colors={{ datum: "data.color" }}
      enableArcLabels={false}
      enableArcLinkLabels={false}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      isInteractive={isDummy ? false : true}
    />
  );
}
