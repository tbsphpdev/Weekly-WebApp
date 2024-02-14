/* eslint-disable */

import { Box, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

import NavBar from "../components/nav/NavBarInApp";
import ActivitiesCard from "../components/activities/ActivitiesCard";
import { ActivityType } from "../components/activities/Activity";
import { sampleActivities } from "../components/activities/SampleData";
import { API_BASE_URLS } from "../public/constant";
import DatePickerComp from "../components/calender/DatePickerComp";
import moment from "moment";
import { useCurrentUser } from "../hooks";
import AddToHabit from "../components/dialogBox/AddToHabit";
import AppHistory from "../components/dialogBox/AppHistory";

export default function Activities() {
  const { user } = useCurrentUser();

  const [activities, setActivities] = useState(sampleActivities);
  const [selFilter, setSelFilter] = useState("day");
  const [habits, setHabits] = useState<any[]>([]);
  const [titleArr, setTitleArr] = useState<any[]>([]);
  const [application, setApplication] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState<any>(new Date());
  //custom datefilter
  const [dateRange, setDateRange] = useState([
    new Date(user?.createdAt ?? new Date()),
    new Date(),
  ]);
  const [startDate1, endDate1] = dateRange;
  const [habitArrNum, setHabitArrNum] = useState<any>([]);

  const [openAppData, setOpenAppData] = useState("");
  const [appHistoryData, setAppHistoryData] = useState<any>("");

  const [chartData, setChartData] = useState([]);
  const [chartDate, setChartDate] = useState([]);
  const [chartTime, setChartTime] = useState([]);
  const [categoryType, setCategoryType] = useState("");

  useEffect(() => {
    setDateRange([new Date(user?.createdAt ?? ""), new Date()]);
  }, [user?.createdAt]);

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();

  const {
    isOpen: isAppHistoryOpen,
    onOpen: onAppHistoryOpen,
    onClose: onAppHistoryClose,
  } = useDisclosure();

  /* 
  NOTE: This is a sample implementation specific to the sampleActivities array implementation.
  This should be replaced with actual modificaitons to the database/caching layer during integration.
  This function moves an item between categories in the data model.
  */
  function update(
    ix: ActivityType["ix"],
    categoryIndexBefore: number,
    categoryIndexAfter: number
  ) {
    let item: any;
    if (categoryIndexBefore !== categoryIndexAfter) {
      setActivities((prevActivities) => {
        item = prevActivities[categoryIndexBefore].activities.find(
          (activity) => activity.ix === ix
        );
        return item
          ? prevActivities.map((activitiesGroup, i) => ({
              ...activitiesGroup,
              activities:
                i === categoryIndexBefore
                  ? activitiesGroup.activities.filter(
                      (activity) => activity.ix !== ix
                    )
                  : i === categoryIndexAfter
                  ? [...activitiesGroup.activities, item].sort(
                      (item1, item2) => item1.ix - item2.ix
                    )
                  : activitiesGroup.activities,
            }))
          : prevActivities;
      });
    }

    // update activity data API
    axios
      .post(API_BASE_URLS.baseUrl + "/api/activities/update-activity-data", {
        ActivityType:
          categoryIndexAfter === 0
            ? "productive"
            : categoryIndexAfter === 1
            ? "unproductive"
            : categoryIndexAfter === 2
            ? "other"
            : null,
        Id: item?._id,
      })
      .then((res) => {
        if (res.status === 200) {
          // console.log("res update--->", res);
        }
      });
  }

  let SD =
    selFilter == "custom"
      ? moment(startDate1).format("YYYY-MM-DD")
      : moment(startDate).format("YYYY-MM-DD");
  let ED =
    selFilter == "custom"
      ? moment(endDate1).format("YYYY-MM-DD")
      : moment(endDate).format("YYYY-MM-DD");

  useEffect(() => {
    let SD =
      selFilter == "custom"
        ? moment(startDate1).format("YYYY-MM-DD")
        : moment(startDate).format("YYYY-MM-DD");
    let ED =
      selFilter == "custom"
        ? moment(endDate1).format("YYYY-MM-DD")
        : moment(endDate).format("YYYY-MM-DD");

    axios
      .get(
        API_BASE_URLS.baseUrl +
          `/api/activities/get-activity-data/?startdate=${SD}&enddate=${ED}`
      )
      .then((res) => {
        setActivities((prev) => {
          let count = 1;
          const data = prev;
          data[0].activities = res?.data?.data?.productive;
          data[0].activities?.map((x: any) => {
            x.ix = count;
            count++;
            return null;
          });
          data[0].activities.sort((a, b) =>
            a.duration < b.duration ? 1 : b.duration < a.duration ? -1 : 0
          );

          data[1].activities = res?.data?.data?.unproductive;
          data[1].activities?.map((x: any) => {
            x.ix = count;
            count++;
            return null;
          });
          data[1].activities.sort((a, b) =>
            a.duration < b.duration ? 1 : b.duration < a.duration ? -1 : 0
          );

          data[2].activities = res?.data?.data?.other;
          data[2].activities?.map((x: any) => {
            x.ix = count;
            count++;
            return null;
          });
          data[2].activities.sort((a, b) =>
            a.duration < b.duration ? 1 : b.duration < a.duration ? -1 : 0
          );
          return Object.values(data);
        });
      });
  }, [selFilter, startDate, endDate, startDate1, endDate1]);

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

  function getCheckApplicationInHabit(
    application: string,
    callback: () => void
  ) {
    axios
      .get(API_BASE_URLS.baseUrl + "/api/user/check-application/" + application)
      .then((res) => {
        if (res?.status === 200) {
          setHabitArrNum(res?.data?.data?.map(Number));
          callback();
        }
      });
  }

  const openAddDialog = (val: any) => {
    setApplication(val == undefined ? application : val.activityName);
    // Pass onAddOpen as a callback to getCheckApplicationInHabit
    getCheckApplicationInHabit(
      val == undefined ? application : val.activityName,
      onAddOpen
    );
  };

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

  function onAppHistoryOpen1(val: any) {
    setApplication(val.activityName);
    getAppHistroyAPI(val.activityName, 0);
    setTimeout(() => {
      onAppHistoryOpen();
    }, 200);
  }

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
    <>
      <Flex
        w={["fit-content", "fit-content", "fit-content", "100%"]}
        bg="weekly.lightgray"
        flexDirection="column"
      >
        <NavBar />
        <Box
          mx={10}
          my={6}
          alignItems="center"
          gap="2.5rem"
          display={["block", "block", "flex"]}
        >
          <Heading
            as="h1"
            fontSize="2rem"
            fontWeight={600}
            color="black"
            display="inline-block"
            marginBottom={["10px"]}
          >
            Change Data
          </Heading>
          <DatePickerComp
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            selFilter={selFilter}
            setSelFilter={setSelFilter}
            dateRange={dateRange}
            setDateRange={setDateRange}
            startDate1={startDate1}
            endDate1={endDate1}
            userCreateDate={user?.createdAt}
          />
        </Box>
        <Box
          mx={5}
          borderBottomWidth={1}
          borderColor="weekly.lineGrey"
          borderStyle="solid"
        />
        <ActivitiesCard
          activities={activities}
          update={update}
          openAddDialog={openAddDialog}
          onAppHistoryOpen={onAppHistoryOpen1}
          categoryType={categoryType}
          setCategoryType={setCategoryType}
        />
      </Flex>

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

      {/* app history modal */}
      <AppHistory
        isOpen={isAppHistoryOpen}
        onClose={onAppHistoryClose}
        openAppData={openAppData}
        appHistoryData={appHistoryData}
        chartData={chartData}
        chartDate={chartDate}
        SD={SD}
        ED={ED}
        selFilter={selFilter}
        onAddOpen={openAddDialog}
        setHabitArrNum={setHabitArrNum}
        application={application}
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
      {/* app history modal */}
    </>
  );
}
