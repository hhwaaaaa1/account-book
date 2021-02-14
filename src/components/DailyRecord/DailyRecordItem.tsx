import { useRef } from "react";
import { useDrag } from "react-dnd";
import styled, { css } from "styled-components";

export const DAILY_RECORD_ITEM = "dailyRecordItem";

export interface DailyRecordItemData {
  id: string;
  text: string;
}

interface DailyRecordItemProps {
  data: DailyRecordItemData;
  date: string;
  onDrop(): void;
}

export default function DailyRecordItem({
  data,
  date,
  onDrop,
}: DailyRecordItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: DAILY_RECORD_ITEM,
      date,
      onDrop,
      ...data,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(ref);
  return (
    <Card ref={ref} isDragging={isDragging}>
      {data.text}
    </Card>
  );
}

const Card = styled.div<{ isDragging: boolean }>`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  min-height: 36px;
  margin-top: 5px;
  padding: 5px 10px;
  border-radius: 5px;
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0 0 0 1px #eee;
  ${({ isDragging }) =>
    isDragging &&
    css`
      opacity: 0.3;
    `}
  &:first-child {
    margin-top: 0;
  }
`;
