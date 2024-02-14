/* eslint-disable */

import {
  Box,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Progress,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { Circle } from "@chakra-ui/layout";
import React from "react";

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { Pie } from "@nivo/pie";
import {
  capitalizeFirstLetter,
  secondsToHrMin,
  toHoursMinutesSeconds,
} from "../utils/utils";
import { useCurrentUser } from "../../hooks";

export default function CompResult({
  isOpenDialog,
  handleCloseDialog,
  competeResultData,
  userName,
}: {
  isOpenDialog: boolean;
  handleCloseDialog: any;
  competeResultData: any;
  userName: any;
}) {
  const { user } = useCurrentUser();
  let optionsBar: any = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
        endingShape: "rounded",
        borderRadius: 2,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#98E0EF", "#9F79DC"],
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: competeResultData?.log?.map((x: any) => x.date),
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        formatter: function (val: any) {
          return secondsToHrMin(val);
        },
      },
    },
    grid: {
      show: true,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
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

  let optionsBarInprogress: any = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
        endingShape: "rounded",
        borderRadius: 2,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#9F79DC"],
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: competeResultData?.log?.map((x: any) => x.date),
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        formatter: function (val: any) {
          return secondsToHrMin(val);
        },
      },
    },
    grid: {
      show: true,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
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

  let optionsLine: any = {
    chart: {
      height: 350,
      type: "area",
      toolbar: { show: false },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    colors: ["#9F79DC", "#98E0EF"],
    xaxis: {
      categories: competeResultData?.log?.map((x: any) => x.date),
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        formatter: function (val: any) {
          return secondsToHrMin(val);
        },
      },
    },
    grid: {
      show: true,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
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
        name: "Average",
        data: competeResultData?.log?.map((x: any) => Math.round(x.average)),
      },
      {
        name: "This Competition",
        data: competeResultData?.log?.map((x: any) => Math.round(x.compete)),
      },
    ],
  };

  let chartLinedata = {
    series: [
      {
        name: "This Competition",
        data: competeResultData?.log?.map((x: any) => Math.round(x.compete)),
      },
      {
        name: "Last Competition",
        data: competeResultData?.log?.map((x: any) =>
          Math.round(x.lastCompete)
        ),
      },
    ],
  };

  let chartdataInprogress = {
    series: [
      {
        name: "This Competition",
        data: competeResultData?.log?.map((x: any) => Math.round(x.compete)),
      },
    ],
  };

  let chartLinedataInprogress = {
    series: [
      {
        name: "This Competition",
        data: competeResultData?.log?.map((x: any) => Math.round(x.compete)),
      },
    ],
  };

  const per =
    (competeResultData?.ring * 100) / Number(competeResultData?.compete?.time);

  const userTimePer =
    (100 * Math.round(competeResultData?.compete?.userPoint / 3600)) /
    (competeResultData?.compete?.time * 24);

  const otherUserTimePer =
    (100 * Math.round(competeResultData?.compete?.otherUserPoint / 3600)) /
    (competeResultData?.compete?.time * 24);

  const totalOnlineOffline =
    competeResultData?.Totaloffline + competeResultData?.Totalonline;
  const perOnline = Math.round(
    (competeResultData?.Totalonline * 100) / totalOnlineOffline
  );
  const perOffline = Math.round(
    (competeResultData?.Totaloffline * 100) / totalOnlineOffline
  );

  return (
    <Modal
      isOpen={isOpenDialog}
      onClose={() => handleCloseDialog()}
      isCentered
      preserveScrollBarGap
      size={"5xl"}
    >
      <ModalOverlay />
      <ModalContent py="30px" px="20px" h="90vh" overflow="auto">
        <ModalCloseButton />
        <ModalHeader mr="20px" color="#39434F">
          {`${"Competition Report"}: ${
            competeResultData?.compete?.time
          } Day | ${capitalizeFirstLetter(
            competeResultData?.compete?.category === "unproductive"
              ? "Offline"
              : competeResultData?.compete?.category
          )} | ${competeResultData?.compete?.name}`}
        </ModalHeader>
        <ModalBody>
          <Divider mb="20px" />
          <Box color="#000" fontWeight="semibold" fontSize="xl">
            {competeResultData?.compete?.status == 1
              ? `${"Nice Job"}, ${userName}!`
              : `${"You finished! Nice Job"}, ${userName}! 😎⭐️`}
          </Box>
          <Box
            boxShadow="0px 1px 12px 0px #191B231A"
            p="20px"
            mt="20px"
            borderRadius="10px"
          >
            <Text color="#39434F" fontWeight="semibold" fontSize="18px">
              Time Comparison
            </Text>
            <Box
              boxShadow="0px 1px 12px 0px #191B231A"
              w="60px"
              borderRadius="10px"
              mt="5px"
            >
              <Text color="#39434F" fontSize="12px" p="5px">
                {competeResultData?.compete?.time} Day
              </Text>
            </Box>
            <Divider py="5px" />
            <Box display="flex" alignItems="center" w="100%" mt="10px">
              <Text w="15%" color="#39434F">
                {user?._id === competeResultData?.compete?.userId
                  ? "You"
                  : competeResultData?.compete?.name}
              </Text>
              <Progress
                value={Math.round(userTimePer)}
                w="70%"
                borderRadius="10px"
              />
              <Text w="15%" ml="30px" color="#39434F">
                {toHoursMinutesSeconds(competeResultData?.compete?.userPoint)}
              </Text>
            </Box>
            <Box display="flex" alignItems="center" w="100%">
              <Text w="15%" color="#39434F">
                {user?._id === competeResultData?.compete?.userId
                  ? competeResultData?.compete?.name
                  : "You"}
              </Text>
              <Progress
                value={Math.round(otherUserTimePer)}
                w="70%"
                borderRadius="10px"
              />
              <Text w="15%" ml="30px" color="#39434F">
                {toHoursMinutesSeconds(
                  competeResultData?.compete?.otherUserPoint
                )}
              </Text>
            </Box>
          </Box>

          {competeResultData?.compete?.category === "unproductive" && (
            <Box
              boxShadow="0px 1px 12px 0px #191B231A"
              p="20px"
              mt="20px"
              borderRadius="10px"
            >
              <Text color="#39434F" fontWeight="semibold" fontSize="18px">
                Offline vs Online Time
              </Text>
              <Box
                boxShadow="0px 1px 12px 0px #191B231A"
                w="60px"
                borderRadius="10px"
                mt="5px"
              >
                <Text color="#39434F" fontSize="12px" p="5px">
                  {competeResultData?.compete?.time} Day
                </Text>
              </Box>
              <Progress
                value={
                  Math.round(perOffline) +
                  Math.round(perOnline) -
                  Math.round(perOnline)
                }
                w="90%"
                borderRadius="10px"
                mt="10px"
              />
              <Divider py="5px" />
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                w="100%"
                mt="10px"
              >
                <Text color="#39434F" display="flex" alignItems="center">
                  <Circle size="16px" bg="#3182ce" mr={3} />
                  Offline
                </Text>
                <Text ml="30px" color="#39434F">
                  {toHoursMinutesSeconds(competeResultData?.Totaloffline)}
                </Text>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                w="100%"
                mt="10px"
              >
                <Text color="#39434F" display="flex" alignItems="center">
                  <Circle size="16px" bg="#EDF2F7" mr={3} />
                  Online
                </Text>
                <Text ml="30px" color="#39434F">
                  {toHoursMinutesSeconds(competeResultData?.Totalonline)}
                </Text>
              </Box>
            </Box>
          )}

          {/* cloumn chart  */}
          <Box
            boxShadow="0px 1px 12px 0px #191B231A"
            p="20px"
            mt="20px"
            borderRadius="10px"
          >
            <Text color="#39434F" fontWeight="semibold" fontSize="18px">
              {competeResultData?.compete?.time === "1"
                ? "Day "
                : competeResultData?.compete?.time == "7"
                ? "Week "
                : "Month "}
              Comparison
            </Text>
            <Box
              boxShadow="0px 1px 12px 0px #191B231A"
              w="60px"
              borderRadius="10px"
              mt="5px"
            >
              <Text color="#39434F" fontSize="12px" p="5px">
                {competeResultData?.compete?.time} Day
              </Text>
            </Box>
            <Chart
              options={
                competeResultData?.compete?.status == 1
                  ? optionsBarInprogress
                  : optionsBar
              }
              series={
                competeResultData?.compete?.status == 1
                  ? chartdataInprogress.series
                  : chartdata.series
              }
              type="bar"
              height={350}
            />
          </Box>
          {/* cloumn chart  */}

          {competeResultData?.compete?.category != "unproductive" && (
            <Box display="flex" w="100%" justifyContent="space-between">
              <Box
                width="25%"
                boxShadow="0px 1px 12px 0px #191B231A"
                m="10px"
                ml="0px"
                p="10px"
              >
                <Text color="#39434F" fontWeight="semibold" fontSize="16px">
                  Productive Change
                </Text>
                {/* {competeResultData?.hasOwnProperty("change") ? ( */}
                <Text
                  color={competeResultData?.change >= 0 ? "#48AE6D" : "red"}
                  fontSize="32px"
                >
                  {competeResultData?.change?.toFixed(2)}%
                </Text>
                {/* ) : (
                  <Text color="#48AE6D" fontSize="20px" className="trailingDot">
                    In progess
                  </Text>
                )} */}
              </Box>
              <Box
                width="25%"
                boxShadow="0px 1px 12px 0px #191B231A"
                m="10px"
                p="10px"
              >
                <Text color="#39434F" fontWeight="semibold" fontSize="16px">
                  Top Productive App/Site
                </Text>
                <Tooltip label={competeResultData?.topSite}>
                  <Text color="#48AE6D" fontSize="20px" className="trailingDot">
                    {competeResultData?.topSite}
                  </Text>
                </Tooltip>
              </Box>
              <Box
                width="25%"
                boxShadow="0px 1px 12px 0px #191B231A"
                m="10px"
                p="10px"
              >
                <Text color="#39434F" fontWeight="semibold" fontSize="16px">
                  Your Top Habit
                </Text>
                <Tooltip label={competeResultData?.topHabit}>
                  <Text
                    color="#48AE6D"
                    fontSize="20px"
                    className="trailingDots"
                  >
                    {competeResultData?.topHabit}
                  </Text>
                </Tooltip>
              </Box>
              <Box
                width="25%"
                boxShadow="0px 1px 12px 0px #191B231A"
                m="10px"
                mr="0px"
                p="10px"
              >
                <Text color="#39434F" fontWeight="semibold" fontSize="16px">
                  Productive Ring
                </Text>
                <Text
                  color={
                    per < 50
                      ? "red"
                      : per >= 50 && per < 80
                      ? "orange"
                      : per >= 80
                      ? "green"
                      : "blue"
                  }
                  fontWeight="semibold"
                  fontSize="20px"
                  ml="65px"
                  mb="-20px"
                >
                  {competeResultData?.ring}/{competeResultData?.compete?.time}
                </Text>
                <Pie
                  data={[
                    {
                      id: "data1",
                      value: 100 - per,
                      color: "red",
                    },
                    {
                      id: "data2",
                      value: per,
                      color: "blue",
                    },
                  ]}
                  padAngle={2}
                  width={160}
                  height={70}
                  startAngle={90}
                  endAngle={270}
                  innerRadius={0.8}
                  colors={{ datum: "data.color" }}
                  enableArcLabels={false}
                  enableArcLinkLabels={false}
                  isInteractive={false}
                />
              </Box>
            </Box>
          )}
          {/* line chart  */}
          <Box
            boxShadow="0px 1px 12px 0px #191B231A"
            p="20px"
            mt="20px"
            borderRadius="10px"
          >
            <Text color="#39434F" fontWeight="semibold" fontSize="18px">
              {competeResultData?.compete?.time === "1"
                ? "Day "
                : competeResultData?.compete?.time == "7"
                ? "Week "
                : "Month "}{" "}
              Comparison
            </Text>
            <Box
              boxShadow="0px 1px 12px 0px #191B231A"
              w="60px"
              borderRadius="10px"
              mt="5px"
            >
              <Text color="#39434F" fontSize="12px" p="5px">
                {competeResultData?.compete?.time} Day
              </Text>
            </Box>
            <Chart
              options={optionsLine}
              series={
                competeResultData?.compete?.status == 1
                  ? chartLinedataInprogress.series
                  : chartLinedata.series
              }
              type="area"
              height={350}
            />
          </Box>
          {/* line chart  */}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
