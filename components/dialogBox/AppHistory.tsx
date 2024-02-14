/* eslint-disable */

import React, { useState } from "react";
import {
  Box,
  Checkbox,
  Divider,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import {
  capitalizeFirstLetter,
  secondsToHrMin,
  toHoursMinutesSeconds,
} from "../utils/utils";
import { BsPlusCircle } from "react-icons/bs";
import { Circle } from "@chakra-ui/layout";

import dynamic from "next/dynamic";
import axios from "axios";

import { API_BASE_URLS } from "../../public/constant";
import DatePickerAppHistory from "../calender/DatePickerAppHistory";
import Loader from "../svgs/Loader.svg";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function AppHistory({
  isOpen,
  onClose,
  openAppData,
  chartData,
  appHistoryData,
  SD,
  ED,
  selFilter,
  chartDate,
  onAddOpen,
  setHabitArrNum,
  application,
  chartTime,
  startDate,
  endDate,
  startDate1,
  endDate1,
  getAppHistroyAPI,
  setStartDate,
  setEndDate,
  dateRange,
  setDateRange,
  setSelFilter,
  categoryType,
}: {
  isOpen: boolean;
  onClose: any;
  openAppData: string;
  chartData: any;
  appHistoryData: any;
  SD: string;
  ED: string;
  selFilter: string;
  chartDate: any;
  onAddOpen: any;
  setHabitArrNum: any;
  application?: any;
  chartTime: any;
  startDate?: any;
  setStartDate?: any;
  endDate?: any;
  setEndDate?: any;
  setSelFilter?: any;
  dateRange?: any;
  setDateRange?: any;
  startDate1?: any;
  endDate1?: any;
  getAppHistroyAPI?: any;
  categoryType?: string;
}) {
  const [time, setTime] = useState(true);
  const [click, setClick] = useState(false);

  let optionsBar: any = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "10%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["transparent"],
    },
    xaxis: {
      categories: chartDate,
    },
    yaxis: {
      labels: {
        formatter: function (val: any) {
          return secondsToHrMin(val);
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val: any) {
          return toHoursMinutesSeconds(val);
        },
      },
    },
  };

  let chartdata = {
    series: [
      {
        name: "",
        data: chartData,
      },
    ],
  };

  let optionsBarTime: any = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "10%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["transparent"],
    },
    xaxis: {
      categories: chartDate,
    },
    yaxis: {
      title: {
        text: "Times",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val: any) {
          return val + " time";
        },
      },
    },
  };

  let chartdataTime = {
    series: [
      {
        name: "",
        data: chartTime,
      },
    ],
  };

  function getCheckApplicationInHabit(application: string) {
    axios
      .get(API_BASE_URLS.baseUrl + "/api/user/check-application/" + application)
      .then((res) => {
        if (res?.status === 200) {
          setHabitArrNum(res?.data?.data?.map(Number));
        }
      });
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setClick(false);
      }}
      size="3xl"
    >
      <ModalOverlay />
      <ModalContent p={5}>
        <ModalHeader color="#39434F">
          <Box display="flex">
            <Box w="45%">
              History of using {openAppData ? openAppData : application}
            </Box>
            {categoryType !== "habit" && (
              <Box w="10%">
                <Tooltip
                  label={
                    appHistoryData?.habitName !== "" &&
                    `Habit: ${appHistoryData?.habitName}`
                  }
                >
                  {appHistoryData?.habitName !== "" ? (
                    <Circle
                      size="16px"
                      bg="weekly.purple"
                      mb="3"
                      cursor="pointer"
                    />
                  ) : (
                    <></>
                  )}
                </Tooltip>

                {categoryType && (
                  <Tooltip label={capitalizeFirstLetter(categoryType)}>
                    <Circle
                      size="16px"
                      bg={
                        categoryType === "productive"
                          ? "weekly.blue"
                          : categoryType === "unproductive"
                          ? "red"
                          : "gray"
                      }
                      cursor="pointer"
                    />
                  </Tooltip>
                )}
              </Box>
            )}
            <Box w="45%" ml={2}>
              <Checkbox
                defaultChecked={true}
                checked={time}
                onChange={() => setTime(!time)}
              >
                <Text fontSize={14} fontWeight="normal">
                  Time usage
                </Text>
              </Checkbox>
              <Checkbox
                ml={2}
                checked={click}
                onChange={() => setClick(!click)}
              >
                <Text fontSize={14} fontWeight="normal">
                  Number of Opens
                </Text>
              </Checkbox>
              {categoryType !== "habit" && (
                <Box display="flex" alignItems="baseline">
                  <BsPlusCircle size={14} />
                  <Text
                    fontSize={14}
                    fontWeight="normal"
                    display="flex"
                    ml={2}
                    cursor="pointer"
                    onClick={() => {
                      getCheckApplicationInHabit(
                        openAppData ? openAppData : application
                      );
                      setTimeout(() => {
                        onAddOpen();
                      }, 200);
                    }}
                  >
                    Add to habit
                  </Text>
                </Box>
              )}
            </Box>
          </Box>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Divider />
          <Box display="flex" justifyContent="center" mt="20px">
            <DatePickerAppHistory
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
              getAppHistroyAPI={getAppHistroyAPI}
              name={openAppData ? openAppData : application}
              categoryType={categoryType}
            />
          </Box>
          {/* total time view */}
          {time && (
            <>
              {chartData.length > 0 && (
                <>
                  <Text
                    color="#39434F"
                    fontSize="20"
                    fontWeight="semibold"
                    mt={5}
                  >
                    Total Time
                  </Text>
                  <Box display="flex" alignItems="baseline">
                    {toHoursMinutesSeconds(appHistoryData?.totalTime)}
                  </Box>
                </>
              )}
              <Box
                boxShadow="0px 1px 12px 0px #191B231A"
                p="20px"
                mt="20px"
                borderRadius="10px"
              >
                {chartData?.length > 0 ? (
                  <>
                    <Box display="flex" justifyContent="space-between">
                      <Text color="#39434F" fontSize="20" fontWeight="semibold">
                        Open Time
                      </Text>
                      <Box display="flex" />
                    </Box>
                    <Chart
                      options={optionsBar}
                      series={chartdata.series}
                      type="bar"
                      height={350}
                    />
                    <Box bg="#F5F5F5" p={1}>
                      <Text color="#7B828A">Additional Information</Text>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mt={2}>
                      <Box>
                        <Text>Most usage in 1 day</Text>
                        <Text>Longest streak</Text>
                      </Box>
                      <Box>
                        <Text>
                          {toHoursMinutesSeconds(
                            appHistoryData?.mostUsage?.duration
                          )}
                        </Text>
                        <Text>{appHistoryData?.strike?.days}</Text>
                      </Box>
                      <Box>
                        <Text>{appHistoryData?.mostUsage?.date}</Text>
                        <Text>{appHistoryData?.strike?.date}</Text>
                      </Box>
                    </Box>
                  </>
                ) : (
                  <Box display="flex" justifyContent="center">
                    <Loader />
                  </Box>
                )}
              </Box>
            </>
          )}
          {/* total time view */}

          {/* number of click view */}
          {click && (
            <>
              {chartData.length > 0 && (
                <>
                  <Text
                    color="#39434F"
                    fontSize="20"
                    fontWeight="semibold"
                    mt={5}
                  >
                    Total Opens
                  </Text>
                  <Box display="flex" alignItems="baseline">
                    {appHistoryData?.totalOpen}
                  </Box>
                </>
              )}

              <Box
                boxShadow="0px 1px 12px 0px #191B231A"
                p="20px"
                mt="20px"
                borderRadius="10px"
              >
                {chartData.length > 0 ? (
                  <>
                    <Box display="flex" justifyContent="space-between">
                      <Text color="#39434F" fontSize="20" fontWeight="semibold">
                        Open Time
                      </Text>
                      <Box display="flex"></Box>
                    </Box>
                    <Chart
                      options={optionsBarTime}
                      series={chartdataTime.series}
                      type="bar"
                      height={350}
                    />
                    <Box bg="#F5F5F5" p={1}>
                      <Text color="#7B828A">Additional Information</Text>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mt={2}>
                      <Box>
                        <Text>Most open in 1 day</Text>
                        <Text>Average number of opens</Text>
                      </Box>
                      <Box>
                        <Text>{appHistoryData?.mostOpen?.time}</Text>
                        <Text>
                          {appHistoryData?.avg == null
                            ? 0
                            : appHistoryData?.avg}{" "}
                        </Text>
                      </Box>
                      <Box>
                        <Text>{appHistoryData?.mostOpen?.date}</Text>
                        <Text />
                      </Box>
                    </Box>
                  </>
                ) : (
                  <Box display="flex" justifyContent="center">
                    <Loader />
                  </Box>
                )}
              </Box>
            </>
          )}
          {/* number of click view */}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
