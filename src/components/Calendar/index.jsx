import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Box, ToggleButton, ToggleButtonGroup, Paper } from "@mui/material";
import dayjs from "dayjs";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import { useTranslation } from "react-i18next";
import styles from "./Calendar.module.css";

// Locale سفارشی: ماه‌های شمسی به انگلیسی، روزهای هفته فارسی
const persian_en = {
  name: "persian_en",
  months: [
    ["Farvardin", "Far"],
    ["Ordibehesht", "Ord"],
    ["Khordad", "Kho"],
    ["Tir", "Tir"],
    ["Mordad", "Mor"],
    ["Shahrivar", "Sha"],
    ["Mehr", "Meh"],
    ["Aban", "Aba"],
    ["Azar", "Aza"],
    ["Dey", "Dey"],
    ["Bahman", "Bah"],
    ["Esfand", "Esf"],
  ],
  weekDays: [
    ["شنبه", "ش"],
    ["یکشنبه", "ی"],
    ["دوشنبه", "د"],
    ["سه‌شنبه", "س"],
    ["چهارشنبه", "چ"],
    ["پنجشنبه", "پ"],
    ["جمعه", "ج"],
  ],
  digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  meridiems: [
    ["AM", "am"],
    ["PM", "pm"],
  ],
};

const CalendarComponent = () => {
  const { t } = useTranslation();
  const [gregorianDate, setGregorianDate] = useState(dayjs());
  const [jalaliDate, setJalaliDate] = useState(new Date());
  const [calendarType, setCalendarType] = useState("gregorian");

  const handleCalendarTypeChange = (event, newType) => {
    if (newType !== null) {
      setCalendarType(newType);
    }
  };

  return (
    <Paper elevation={3} className={styles.calendarContainer}>
      <Box className={styles.header}>
        <ToggleButtonGroup
          value={calendarType}
          exclusive
          onChange={handleCalendarTypeChange}
          size="small"
          className={styles.toggleGroup}
        >
          <ToggleButton value="gregorian" className={styles.toggleButton}>
            {t("calendar.gregorian")}
          </ToggleButton>
          <ToggleButton value="jalali" className={styles.toggleButton}>
            {t("calendar.jalali")}
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box className={styles.calendarWrapper}>
        {calendarType === "gregorian" ? (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={gregorianDate}
              onChange={(newValue) => setGregorianDate(newValue)}
            />
          </LocalizationProvider>
        ) : (
          <Calendar
            value={jalaliDate}
            onChange={(date) => setJalaliDate(date?.toDate?.() || new Date())}
            calendar={persian}
            locale={persian_en}
            className={styles.jalaliCalendar}
          />
        )}
      </Box>
    </Paper>
  );
};

export default CalendarComponent;
