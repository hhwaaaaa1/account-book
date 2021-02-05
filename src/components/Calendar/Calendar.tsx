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

export default function Calendar({ startDayOfMonth = 1 }: CalendarProps) {
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

  const { start, end } = dates;

  return (
    <S.Container>
      <S.Header>
        <S.Title>
          {start.year}년 {start.month}월 {start.day}일 -{" "}
          {start.year !== end.year && `${end.year}년 `}
          {start.month !== end.month && `${end.month}월 `}
          {end.day}일
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
      <S.Body columnStart={(start.weekday % 7) + 1}>
        {days.map((day, i) => (
          <Day
            key={i}
            day={day}
            month={
              (i === 0 && start.month) || (day === 1 && end.month) || undefined
            }
          />
        ))}
      </S.Body>
    </S.Container>
  );
}
