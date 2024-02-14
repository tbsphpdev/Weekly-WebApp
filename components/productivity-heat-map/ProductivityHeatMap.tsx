/* eslint-disable */
import {
  Box,
  Center,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  Button,
  MenuItem,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { Spacer } from "@chakra-ui/layout";
import { FaCaretDown } from "react-icons/fa";
import { useEffect, useState } from "react";

import Calendar from "../svgs/Calendar.svg";

import axios from "axios";
import { API_BASE_URLS } from "../../public/constant";
import moment from "moment";

let dummyToday: any[] = [];
let dummyData7Days: any[] = [];
let dummyData14Days: any[] = [];
let dummyDataMonth: any[] = [];

export default function ProductivityHeatMap() {
  const timePeriods: string[] = [
    "Today",
    "Last 7 Days",
    "Last 14 Days",
    "Last 28 Days",
  ];
  const [timePeriod, setTimePeriod] = useState("Last 28 Days");
  const [numDays, setNumDays] = useState(28);

  const [dayNum, setDayNum] = useState<string[]>([]);
  const [dayWeek, setDayWeek] = useState<string[]>([]);
  const [dayToday, setDayToday] = useState("");
  const [dateToday, setDateToday] = useState("");
  const cellHeight = 47;
  const cellGap = 8;

  const [dummyData, setDummyData] = useState(dummyDataMonth);

  useEffect(() => {
    let days = 7;
    if (timePeriod != "Today") {
      days = parseInt(timePeriod.split(" ")[1]);
    }
    setNumDays(days);
  }, [timePeriod]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        API_BASE_URLS.baseUrl +
          `/api/activities/get-productive-unproductive-data?filter=${numDays}`
      );
      let lst = [];

      let proData = response.data.data.Productive.reverse();
      let unproData = response.data.data.Unproductive.reverse();

      for (let i = 0; i < proData.length; i++) {
        const obj: any = {};
        obj.productive = proData[i];
        const date = new Date();
        date.setDate(date.getDate() - (proData.length - i));
        obj.day = date.getMonth() + 1 + "/" + date.getDate();
        lst.push(obj);
      }

      for (let i = 0; i < unproData.length; i++) {
        lst[i].unproductive = unproData[i];
      }

      dummyToday = [lst[lst.length - 1]];
      dummyData7Days = lst.slice(-7);
      dummyData14Days = lst.slice(-14);
      dummyDataMonth = lst;

      lst.map((x) => {
        return x.productive > x.unproductive
          ? (x.color = "#4659AD")
          : x.productive < x.unproductive
          ? (x.color = "#97C5EF")
          : (x.color = "#759FF0");
      });
      setDummyData(lst);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const dates1 = [];
    const dates2 = [];
    const NUM_OF_DAYS = 28; // get last 28 dates.

    for (let i = 0; i < NUM_OF_DAYS; i++) {
      let date = moment();
      date.subtract(i, "day").format("DD-MM-YYYY");
      dates1.push(moment(date).format("MMM DD"));
      dates2.push(moment(date).format("ddd"));
    }

    let dateDemo = dates1;
    let data1 = dateDemo[0] + " - " + dateDemo[6];
    let data2 = dateDemo[7] + " - " + dateDemo[13];
    let data3 = dateDemo[14] + " - " + dateDemo[20];
    let data4 = dateDemo[21] + " - " + dateDemo[27];
    let dayNum: string[] = [data1, data2, data3, data4];
    setDayNum(dayNum);
    setDayWeek(dates2.splice(0, 7));
    setDayToday(dates2[0]);
    setDateToday(dateDemo[0]);
  }, []);

  return (
    <Box
      py={6}
      px={8}
      bg="white"
      w={["auto", "auto", "auto", "auto"]}
      rounded="lg"
      border="1px solid #ddd"
      mb={5}
    >
      <Flex className="productivity-time">
        <Box className="productivity-time-sub">
          <Text ml={2} fontSize={22} fontWeight={500}>
            Productivity Heatmap
          </Text>
        </Box>
        <Spacer />
        <Box className="productivity-time-sub-new" mb="30px">
          {/* <Box mr="18px" mt={0.5}>
            <Calendar />
          </Box> */}
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<FaCaretDown />}
              variant="outline"
              w="260px"
              h="30px"
              fontWeight="400"
              fontSize="14px"
              color="#464545"
            >
              {timePeriod}
            </MenuButton>
            <MenuList>
              {timePeriods.map((text) => (
                <MenuItem
                  onClick={() => {
                    setTimePeriod(text);
                  }}
                  key={text}
                >
                  {text}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Box>
      </Flex>
      <Flex direction="column" justify="center" fontSize={12} fontWeight={400}>
        <Grid
          h={cellHeight * (numDays / 7 + 1) + cellGap * (numDays / 7) + "px"}
          templateRows="repeat(5, 1fr)"
          templateColumns="repeat(8, 1fr)"
          gap={cellGap + "px"}
        >
          <GridItem rowSpan={4} colSpan={1}>
            <Grid
              templateRows={"repeat(" + numDays / 7 + ", 1fr)"}
              gap={cellGap + "px"}
            >
              {timePeriod != "Today" ? (
                dayNum.slice(0, numDays / 7).map((days, index) => (
                  <GridItem w="100%" h={cellHeight + "px"} key={index}>
                    <Center h="100%" className="small-font">
                      {days}
                    </Center>
                  </GridItem>
                ))
              ) : (
                <GridItem w="100%" h={cellHeight + "px"}>
                  <Center h="100%" className="small-font">
                    {dateToday}
                  </Center>
                </GridItem>
              )}
            </Grid>
          </GridItem>
          <GridItem rowSpan={4} colSpan={7}>
            <Grid
              templateRows={"repeat(" + numDays / 7 + ", 1fr)"}
              templateColumns={"repeat(" + 7 + ", 1fr)"}
              gap={cellGap + "px"}
            >
              {dummyData
                .slice(timePeriod == "Today" ? -1 : -numDays)
                .reverse()
                .map((data, index) => (
                  <GridItem
                    bg={data.color}
                    w="100%"
                    h={cellHeight + "px"}
                    key={index}
                  />
                ))}
            </Grid>
          </GridItem>
          <GridItem w="100%" h={cellHeight + "px"} rowSpan={1} colSpan={1} />
          <GridItem rowSpan={1} colSpan={7}>
            <Grid
              templateColumns={"repeat(" + 7 + ", 1fr)"}
              gap={cellGap + "px"}
            >
              {timePeriod != "Today" ? (
                dayWeek.map((day, index) => (
                  <GridItem w="100%" h={cellHeight + "px"} key={index}>
                    <Center h="100%">{day}</Center>
                  </GridItem>
                ))
              ) : (
                <GridItem w="100%" h={cellHeight + "px"}>
                  <Center h="100%">{dayToday}</Center>
                </GridItem>
              )}
            </Grid>
          </GridItem>
        </Grid>
      </Flex>
      <Flex direction="row" justify="flex-end" align="center">
        <Grid
          templateRows="repeat(3, 1fr)"
          templateColumns="repeat(1, 1fr)"
          w="75px"
          h="48px"
          mr="10px"
        >
          <GridItem fontSize={10} w="100%" h="16px" rowSpan={1} colSpan={1}>
            Productive
          </GridItem>
          <GridItem w="100%" h="16px" rowSpan={1} colSpan={1} />
          <GridItem fontSize={10} w="100%" h="16px" rowSpan={1} colSpan={1}>
            Unproductive
          </GridItem>
        </Grid>
        <Grid
          templateRows="repeat(3, 1fr)"
          templateColumns="repeat(1, 1fr)"
          w="40px"
          h="48px"
        >
          <GridItem w="100%" h="16px" rowSpan={1} colSpan={1} bg="#4659AD" />
          <GridItem w="100%" h="16px" rowSpan={1} colSpan={1} bg="#759FF0" />
          <GridItem w="100%" h="16px" rowSpan={1} colSpan={1} bg="#97C5EF" />
        </Grid>
      </Flex>
    </Box>
  );
}
