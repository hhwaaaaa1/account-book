import { DateTime } from "luxon";
import { useEffect, useMemo, useRef, useState } from "react";
import Day from "./components/Day";
import * as S from "./Calendar.style";
import Arrow from "@/components/icons/Arrow";
import Button from "../Button";

interface DateTimes {
  start: DateTime;
  end: DateTime;
}

interface CalendarProps {
  startDayOfMonth?: number;
}

export default function Calendar({ startDayOfMonth = 1 }: CalendarProps) {
  const now = useRef<DateTime>({} as DateTime);
  const [dateTimes, setDateTimes] = useState<DateTimes | null>(null);

  const days = useMemo<[month: number, day: number][]>(() => {
    if (!dateTimes) return [];
    const { start, end } = dateTimes;
    const { daysInMonth } = start;
    const diff = (end.diff(start, "day").toObject().days || 0) + 1;
    return Array(diff)
      .fill(start.day)
      .map((d, i) => {
        const isNextMonth = d + i > daysInMonth;
        const day = d + i - Number(isNextMonth && daysInMonth);
        const month = isNextMonth ? end.month : start.month;
        return [month, day];
      });
  }, [dateTimes]);

  const isThisMonth = useMemo(() => {
    if (!dateTimes) return false;
    return (
      dateTimes.start.startOf("millisecond") <= now.current &&
      dateTimes.end.startOf("millisecond") > now.current
    );
  }, [dateTimes]);

  function setDateTimesFrom(date: DateTime) {
    const start = DateTime.local(date.year, date.month, startDayOfMonth);
    const end = start.plus({ month: 1 }).minus({ day: 1 });
    setDateTimes({ start, end });
  }

  function goToThisMonth() {
    setDateTimesFrom(now.current);
  }

  function goToPrevMonth() {
    if (!dateTimes) return;
    setDateTimesFrom(dateTimes.start.minus({ month: 1 }));
  }

  function goToNextMonth() {
    if (!dateTimes) return;
    setDateTimesFrom(dateTimes.start.plus({ month: 1 }));
  }

  useEffect(() => {
    now.current = DateTime.local();
    goToThisMonth();
  }, []);

  if (!dateTimes) return <div />;

  const { start, end } = dateTimes;
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
          {!isThisMonth && <Button onClick={goToThisMonth}>오늘</Button>}
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
            month={day[0]}
            day={day[1]}
            isMonthVisible={i === 0 || day[1] === 1}
            today={now.current.month === day[0] && now.current.day === day[1]}
          />
        ))}
      </S.Body>
    </S.Container>
  );
}
