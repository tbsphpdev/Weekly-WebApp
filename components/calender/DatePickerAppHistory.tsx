/* eslint-disable */

import { CalendarIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import moment from "moment";

import { capitalizeFirstLetter } from "../utils/utils";

const DateRangeDisplay = ({
  startDate,
  endDate,
  onPreviousClick,
  onNextClick,
  selFilter,
}: any) => {
  return (
    <Box>
      {startDate && endDate && (
        <Box display="flex" alignItems="center">
          <IconButton
            aria-label="Send email"
            icon={<BsFillCaretLeftFill />}
            onClick={onPreviousClick}
            className="custom-pointer"
          />
          <Input
            type="text"
            value={`${moment(startDate).format("MMM DD, yyyy")} - ${moment(
              endDate
            ).format("MMM DD, yyyy")}`}
            readOnly
            style={{ border: "1px solid gray" }}
            w={260}
            bg="white"
          />
          <IconButton
            aria-label="Send email"
            icon={<BsFillCaretRightFill />}
            size="sm"
            onClick={onNextClick}
            className="custom-pointer"
            disabled={
              selFilter === "day" && moment(startDate).isSame(moment(), "day")
                ? true
                : selFilter === "week" && endDate >= new Date()
                ? true
                : selFilter === "month" && endDate >= new Date()
                ? true
                : selFilter === "year" && endDate >= new Date()
                ? true
                : false
            }
          />
        </Box>
      )}
    </Box>
  );
};

const DatePickerAppHistory = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  selFilter,
  setSelFilter,
  setDateRange,
  startDate1,
  endDate1,
  getAppHistroyAPI,
  name,
  categoryType,
}: any) => {
  const handleTimeframeChange = (timeframe: any) => {
    setSelFilter(timeframe);

    const currentDate = new Date();
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);

    switch (timeframe) {
      case "day":
        setStartDate(currentDate);
        setEndDate(currentDate);
        break;
      // case "yesterday":
      //   setStartDate(currentDate.setDate(currentDate.getDate() - 1));
      //   setEndDate(currentDate.setDate(currentDate.getDate()));
      //   break;
      case "week":
        const startOfWeek = new Date(currentDate);
        const diff = currentDate.getDay() - 1; // Get the difference from Monday
        startOfWeek.setDate(currentDate.getDate() - diff);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        setStartDate(startOfWeek);
        setEndDate(endOfWeek);
        break;
      case "month":
        const startOfMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        );
        const lastDayOfMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0
        );
        setStartDate(startOfMonth);
        setEndDate(lastDayOfMonth);
        break;
      case "year":
        const lastDay = new Date(currentDate.getFullYear(), 12, 0);
        setStartDate(startOfYear);
        setEndDate(lastDay);
        break;
      case "custom":
        setStartDate(null);
        setEndDate(null);
        break;
      default:
        break;
    }
  };

  const handlePreviousClick = () => {
    switch (selFilter) {
      case "day":
        const previousTodayDate = new Date(startDate);
        previousTodayDate.setDate(startDate.getDate() - 1);
        setStartDate(previousTodayDate);
        setEndDate(previousTodayDate);
        break;
      // case "yesterday":
      //   const currentDate = new Date(startDate);
      //   const yesterday = new Date(currentDate);
      //   yesterday.setDate(yesterday.getDate() - 1);
      //   setStartDate(yesterday);
      //   setEndDate(yesterday);
      //   break;
      case "week":
        const previousWeekStartDate = new Date(startDate);
        previousWeekStartDate.setDate(startDate.getDate() - 7);
        const previousWeekEndDate = new Date(startDate);
        previousWeekEndDate.setDate(startDate.getDate() - 1);
        setStartDate(previousWeekStartDate);
        setEndDate(previousWeekEndDate);
        break;
      case "month":
        const previousMonthStartDate = new Date(startDate);
        previousMonthStartDate.setMonth(startDate.getMonth() - 1);
        const previousMonthEndDate = new Date(startDate);
        previousMonthEndDate.setDate(0);
        setStartDate(previousMonthStartDate);
        setEndDate(previousMonthEndDate);
        break;
      case "year":
        const previousYearStartDate = new Date(startDate);
        previousYearStartDate.setFullYear(startDate.getFullYear() - 1);
        const previousYearEndDate = new Date(startDate);
        previousYearEndDate.setFullYear(startDate.getFullYear() - 1, 11, 31);
        setStartDate(previousYearStartDate);
        setEndDate(previousYearEndDate);
        break;
      default:
        break;
    }
  };

  const handleNextClick = () => {
    switch (selFilter) {
      case "day":
        const previousTodayDate = new Date(startDate);
        previousTodayDate.setDate(startDate.getDate() + 1);
        setStartDate(previousTodayDate);
        setEndDate(previousTodayDate);
        break;
      // case "yesterday":
      //   const currentDate = new Date(startDate);
      //   const yesterday = new Date(currentDate);
      //   yesterday.setDate(yesterday.getDate() + 1);
      //   setStartDate(yesterday);
      //   setEndDate(yesterday);
      //   break;
      case "week":
        const nextWeekStartDate = new Date(endDate);
        nextWeekStartDate.setDate(endDate.getDate() + 1);
        const nextWeekEndDate = new Date(endDate);
        nextWeekEndDate.setDate(endDate.getDate() + 7);
        setStartDate(nextWeekStartDate);
        setEndDate(nextWeekEndDate);
        break;
      case "month":
        const nextMonthStartDate = new Date(endDate);
        nextMonthStartDate.setMonth(endDate.getMonth() + 1, 1);
        const nextMonthEndDate = new Date(
          nextMonthStartDate.getFullYear(),
          nextMonthStartDate.getMonth() + 1,
          0
        );
        setStartDate(nextMonthStartDate);
        setEndDate(nextMonthEndDate);
        break;
      case "year":
        const nextYearStartDate = new Date(startDate);
        nextYearStartDate.setFullYear(startDate.getFullYear() + 1);
        const nextYearEndDate = new Date(nextYearStartDate);
        nextYearEndDate.setFullYear(nextYearStartDate.getFullYear(), 11, 31);
        setStartDate(nextYearStartDate);
        setEndDate(nextYearEndDate);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (categoryType !== "habit") {
      getAppHistroyAPI(name, 0);
    } else {
      getAppHistroyAPI(name, 1);
    }
  }, [selFilter, startDate, endDate, startDate1, endDate1]);

  return (
    <>
      <Box display={["flex"]} flexDirection={["row"]}>
        <Menu>
          <MenuButton
            as={Button}
            variant="outline"
            fontSize="sm"
            fontWeight={500}
            backgroundColor="white"
            color="weekly.textSecondary"
            border="2px"
            leftIcon={<CalendarIcon mr={2} />}
            rightIcon={<ChevronDownIcon />}
            mr="10px"
            style={{ border: "1px solid gray" }}
          >
            {selFilter !== "day"
              ? capitalizeFirstLetter(selFilter)
              : capitalizeFirstLetter(selFilter)}
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => {
                setSelFilter("day");
                handleTimeframeChange("day");
              }}
            >
              Day
            </MenuItem>
            {/* <MenuItem
              onClick={() => {
                setSelFilter("yesterday");
                handleTimeframeChange("yesterday");
              }}
            >
              Yesterday
            </MenuItem> */}
            <MenuItem
              onClick={() => {
                setSelFilter("week");
                handleTimeframeChange("week");
              }}
            >
              Week
            </MenuItem>
            <MenuItem
              onClick={() => {
                setSelFilter("month");
                handleTimeframeChange("month");
              }}
            >
              Month
            </MenuItem>
            <MenuItem
              onClick={() => {
                setSelFilter("year");
                handleTimeframeChange("year");
              }}
            >
              Year
            </MenuItem>
            <MenuItem
              onClick={() => {
                setSelFilter("custom");
                handleTimeframeChange("custom");
              }}
            >
              Custom
            </MenuItem>
          </MenuList>
        </Menu>
        {selFilter === "custom" ? (
          <Box alignItems="center" h="10">
            <DatePicker
              selectsRange={true}
              startDate={startDate1}
              endDate={endDate1}
              maxDate={new Date()}
              onChange={(update: any) => setDateRange(update)}
              isClearable={true}
              dateFormat="MMM dd, yyyy"
              customInput={
                <Input
                  style={{ border: "1px solid gray" }}
                  w={260}
                  bg="white"
                  ml={50}
                />
              }
              autoFocus={true}
            />
          </Box>
        ) : (
          <DateRangeDisplay
            startDate={startDate}
            endDate={endDate}
            onPreviousClick={handlePreviousClick}
            onNextClick={handleNextClick}
            selFilter={selFilter}
          />
        )}
      </Box>
    </>
  );
};

export default DatePickerAppHistory;
