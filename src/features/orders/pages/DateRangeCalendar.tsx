import React, { useState } from "react";

type Props = {
  fromDate: Date | null;
  toDate: Date | null;
  setFromDate: (date: Date | null) => void;
  setToDate: (date: Date | null) => void;
};

const DateRangeCalendar: React.FC<Props> = ({
  fromDate,
  toDate,
  setFromDate,
  setToDate,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selecting, setSelecting] = useState<"from" | "to" | null>("from");

  const getDaysInMonth = (month: number, year: number) =>
    new Date(year, month + 1, 0).getDate();

  const generateCalendarDays = () => {
    const firstDay = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

    const daysInMonth = getDaysInMonth(
      currentMonth.getMonth(),
      currentMonth.getFullYear()
    );
    const calendar: (Date | null)[] = [];

    for (let i = 0; i < startDay; i++) {
      calendar.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      calendar.push(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i)
      );
    }

    return calendar;
  };

  const toggleDateSelection = (date: Date) => {
    if (selecting === "from") {
      setFromDate(date);
      if (toDate && date > toDate) setToDate(null);
      setSelecting("to");
    } else if (selecting === "to") {
      if (fromDate && date < fromDate) {
        setFromDate(date);
        setToDate(null);
        setSelecting("to");
      } else {
        setToDate(date);
        setSelecting(null);
      }
    }
  };
  const years = [2021, 2022, 2023, 2024, 2025];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //   const navigateMonth = (direction: "prev" | "next") => {
  //     const newDate = new Date(currentMonth);
  //     newDate.setMonth(currentMonth.getMonth() + (direction === "next" ? 1 : -1));
  //     setCurrentMonth(newDate);
  //   };

  return (
    <div className="mb-4">
      {/* Toggle Buttons */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setSelecting("from")}
          className={`w-full py-2 rounded-l-md text-sm font-medium ${
            selecting === "from"
              ? "bg-[#C8A8E9] text-white"
              : "bg-[#F1DAFC] text-[#C8A8E9]"
          }`}
        >
          From
        </button>
        <button
          onClick={() => setSelecting("to")}
          className={`w-full py-2 rounded-r-md text-sm font-medium ${
            selecting === "to"
              ? "bg-[#C8A8E9] text-white"
              : "bg-[#F1DAFC] text-[#C8A8E9]"
          }`}
        >
          To
        </button>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-start gap-9 mb-4 pl-2">
        {/* Year Dropdown */}
        <div className="relative">
          <select
            value={currentMonth.getFullYear()}
            onChange={(e) =>
              setCurrentMonth(
                new Date(
                  Number(e.target.value),
                  currentMonth.getMonth(),
                  currentMonth.getDate()
                )
              )
            }
            className="appearance-none bg-transparent border-none text-sm font-medium pr-6 cursor-pointer"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-gray-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Month Dropdown */}
        <div className="relative">
          <select
            value={currentMonth.getMonth()}
            onChange={(e) =>
              setCurrentMonth(
                new Date(
                  currentMonth.getFullYear(),
                  Number(e.target.value),
                  currentMonth.getDate()
                )
              )
            }
            className="appearance-none bg-transparent border-none text-sm font-medium pr-6 cursor-pointer"
          >
            {months.map((month, index) => (
              <option key={index} value={index}>
                {month}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-gray-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-gray-500 font-bold mb-1">
        {["M", "T", "W", "T", "F", "S", "S"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {generateCalendarDays().map((date, index) => {
          const isStart =
            date && fromDate && date.toDateString() === fromDate.toDateString();
          const isEnd =
            date && toDate && date.toDateString() === toDate.toDateString();
          const inRange =
            date && fromDate && toDate && date > fromDate && date < toDate;

          return (
            <div
              key={index}
              onClick={() => date && toggleDateSelection(date)}
              className={`p-1 text-sm cursor-pointer relative ${
                isStart || isEnd
                  ? "bg-[#C8A8E9] text-[#1F1F1F] font-semibold rounded-full"
                  : ""
              } ${inRange ? "bg-[#FFE8E8] text-purple-60" : ""} ${
                date ? "hover:bg-gray-50" : ""
              }`}
            >
              {date ? date.getDate() : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DateRangeCalendar;
