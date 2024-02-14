/* eslint-disable */
import { ResponsiveBar } from "@nivo/bar";
import { VStack, Spacer, Flex, Box, HStack, Divider } from "@chakra-ui/layout";
import {
  Text,
  Center,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FaCaretDown } from "react-icons/fa";

import axios from "axios";
import { API_BASE_URLS } from "../../public/constant";
import moment from "moment";

type Data = {
  day: string;
  productive: number;
  unproductive: number;
};

let dummyToday: any[] = [];
let dummyData7Days: any[] = [];
let dummyData14Days: any[] = [];
let dummyDataMonth: any[] = [];

export default function ProductivityMap() {
  const timePeriods: string[] = [
    "Today",
    "Last 7 Days",
    "Last 14 Days",
    "Last 28 Days",
  ];
  const [timePeriod, setTimePeriod] = useState("Last 7 Days");
  const [dummyData, setDummyData] = useState<Data[]>([]);
  const [yAxisUpperLimit, setYAxisUpperLimit] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      let time =
        timePeriod == "Today"
          ? 0
          : timePeriod == "Last 7 Days"
          ? 7
          : timePeriod == "Last 14 Days"
          ? 14
          : 28;
      const response = await axios.get(
        API_BASE_URLS.baseUrl +
          `/api/activities/get-productive-unproductive-data?filter=${time}`
      );
      let proData = response.data.data.Productive;
      let unproData = response.data.data.Unproductive;

      let Max_Val = Math.max(...[Math.max(...proData), Math.max(...unproData)]);

      setYAxisUpperLimit(Max_Val / 60);

      let lst = [];
      for (let i = 0; i < proData.length; i++) {
        const obj: any = {};
        obj.productive = Number(proData[i] / 60).toFixed(0);
        // const date = new Date();
        // date.setDate(date.getDate() - (proData.length - i));
        // obj.day = date.getMonth() + 1 + "/" + date.getDate();
        const date = moment();
        date.subtract(i, "day").format("DD-MM-YYYY");
        obj.day = moment(date).format("MM/DD");
        lst.push(obj);
      }
      for (let i = 0; i < unproData.length; i++) {
        lst[i].unproductive = Number(unproData[i] / 60).toFixed(0);
      }
      lst = lst.reverse();

      dummyToday = [lst[lst.length - 1]];
      dummyData7Days = lst.slice(-7);
      dummyData14Days = lst.slice(-14);
      dummyDataMonth = lst;

      setDummyData(
        timePeriod == "Today"
          ? dummyToday
          : timePeriod == "Last 7 Days"
          ? dummyData7Days
          : timePeriod == "Last 14 Days"
          ? dummyData14Days
          : dummyDataMonth
      );
    }
    fetchData();
  }, [timePeriod]);

  return (
    <VStack
      bg="white"
      w={["auto", "auto", "auto", "auto"]}
      rounded="lg"
      border="1px solid #ddd"
      pb={4}
      py={6}
      px={8}
      // className="productivty-view"
    >
      <Flex w="100%" alignItems="center" className="productivity-time">
        <Box className="productivity-time-sub">
          <Text fontSize="22px" fontWeight={500} color="#464545">
            Productivity Map
          </Text>
        </Box>
        <Spacer />
        <Box className="productivity-time-sub-new">
          {/* <Box mr="18px">
            <Calendar />
          </Box> */}
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<FaCaretDown />}
              variant="outline"
              w="212px"
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
          </Menu>
        </Box>
      </Flex>
      <Center h={350} w="90%" pl="0px">
        <BarChart yAxisUpperLimit={yAxisUpperLimit} data={dummyData} />
      </Center>
      <Center w="85%">
        <Divider />
      </Center>
      <HStack w="80%" spacing="32px" pt="10px" pb="10px">
        <HStack>
          <Box bg="#417AEA" borderRadius="100%" w="10px" h="10px" />
          <Text fontSize="12px" color="#464545">
            Productive
          </Text>
        </HStack>
        <HStack>
          <Box bg="#EB4335" borderRadius="100%" w="10px" h="10px" />
          <Text fontSize="12px" color="#464545">
            Unproductive
          </Text>
        </HStack>
      </HStack>
    </VStack>
  );
}

type ProductivityData = {
  day: string;
  productive: number;
  unproductive: number;
};

function BarChart({
  data,
  yAxisUpperLimit,
}: {
  data: ProductivityData[];
  yAxisUpperLimit: number;
}) {
  const [diff, setDiff] = useState(0);

  const roundOffToNearestThousands = (val: any) => {
    let a = parseInt(val).toString().length;
    let a1 = 1;
    let dev = parseInt(
      a1
        .toFixed(a - 1)
        .split(".")
        .join("")
    );
    let b = Math.ceil(val / dev) * dev;
    return b;
  };

  useEffect(() => {
    getYAxisArray(yAxisUpperLimit);
  }, [yAxisUpperLimit]);

  const getYAxisArray = (val: any) => {
    let interval = roundOffToNearestThousands(val / 12);
    let arr = Array.from({ length: 12 }, (v, i) => (i + 1) * interval);
    // setDiff(arr[0] - 0);
    return arr;
  };

  return (
    <ResponsiveBar
      data={data}
      keys={["unproductive", "productive"]}
      groupMode="grouped"
      indexBy="day"
      margin={{ top: 40, right: 20, bottom: 25, left: 100 }}
      padding={0.5}
      innerPadding={5}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={["#EB4335", "#417AEA"]}
      borderRadius={3}
      enableLabel={false}
      enableGridX
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 0,
        tickPadding: 10,
      }}
      axisLeft={{
        tickValues: getYAxisArray(yAxisUpperLimit),
        // tickSize: diff,
        legend: "MINUTES",
        tickPadding: 10,
        tickRotation: 0,
        legendPosition: "middle",
        legendOffset: -70,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
    />
  );
}

function Calendar() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
        stroke="#7B8798"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 2V6"
        stroke="#7B8798"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 2V6"
        stroke="#7B8798"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 10H21"
        stroke="#7B8798"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
