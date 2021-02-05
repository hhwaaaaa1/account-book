import { DateTime } from "luxon";
import { useEffect, useMemo, useState } from "react";
import Day from "./components/Day";
import * as S from "./Calendar.style";

interface Dates {
  start: DateTime;
  end: DateTime;
}

interface CalendarProps {
  startDayOfMonth?: number;
}

export default function Calendar({ startDayOfMonth = 10 }: CalendarProps) {
  const [dates, setDates] = useState<Dates | null>(null);

  useEffect(() => {
    const now = DateTime.local();
    const start = DateTime.local(now.year, now.month, startDayOfMonth);
    const end = start.plus({ month: 1 }).minus({ day: 1 });
    setDates({ start, end });
  }, []);

  const days = useMemo(() => {
    if (!dates) return [];

    const { start, end } = dates;
    const diff = (end.diff(start, "day").toObject().days || 0) + 1;
    const { daysInMonth } = start;

    return Array(diff)
      .fill(start.day)
      .map((d, i) => d + i - Number(d + i > daysInMonth && daysInMonth));
  }, [dates]);

  if (!dates) return <div />;

  return (
    <S.Container>
      <S.Header>
        <S.Title>
          {dates.start.year}.{dates.start.month}.{dates.start.day} -{" "}
          {dates.end.year}.{dates.end.month}.{dates.end.day}
        </S.Title>
        <S.Weekdays>
          <S.Weekday>SUN</S.Weekday>
          <S.Weekday>MON</S.Weekday>
          <S.Weekday>TUE</S.Weekday>
          <S.Weekday>WED</S.Weekday>
          <S.Weekday>THU</S.Weekday>
          <S.Weekday>FRI</S.Weekday>
          <S.Weekday>SAT</S.Weekday>
        </S.Weekdays>
      </S.Header>
      <S.Body columnStart={(dates.start.weekday % 7) + 1}>
        {days.map((day, i) => (
          <Day
            key={i}
            day={day}
            month={
              (i === 0 && dates.start.month) ||
              (day === 1 && dates.end.month) ||
              undefined
            }
          />
        ))}
      </S.Body>
    </S.Container>
  );
}
