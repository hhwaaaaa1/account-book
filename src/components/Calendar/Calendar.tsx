import { DateTime } from "luxon";
import { useEffect, useMemo, useState } from "react";
import Day from "./components/Day";
import * as S from "./Calendar.style";
import Arrow from "@/components/icons/Arrow";

interface Dates {
  start: DateTime;
  end: DateTime;
}

interface CalendarProps {
  startDayOfMonth?: number;
}

export default function Calendar({ startDayOfMonth = 10 }: CalendarProps) {
  const [dates, setDates] = useState<Dates | null>(null);

  function setDatesFrom(date: DateTime) {
    const start = DateTime.local(date.year, date.month, startDayOfMonth);
    const end = start.plus({ month: 1 }).minus({ day: 1 });
    setDates({ start, end });
  }

  function goToPrevMonth() {
    if (!dates) return;
    setDatesFrom(dates.start.minus({ month: 1 }));
  }

  function goToNextMonth() {
    if (!dates) return;
    setDatesFrom(dates.start.plus({ month: 1 }));
  }

  useEffect(() => {
    const now = DateTime.local();
    setDatesFrom(now);
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
        <S.DirButton onClick={goToPrevMonth}>
          <Arrow width={15} />
          <span>이전</span>
        </S.DirButton>
        <S.Title>
          {start.year}년 {start.month}월 {start.day}일 -{" "}
          {start.year !== end.year && `${end.year}년 `}
          {start.month !== end.month && `${end.month}월 `}
          {end.day}일
        </S.Title>
        <S.DirButton onClick={goToNextMonth}>
          <span>다음</span>
          <Arrow width={15} direction="right" />
        </S.DirButton>
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
