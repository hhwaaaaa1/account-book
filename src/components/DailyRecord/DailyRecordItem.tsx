import { useEffect, useRef, useState } from "react";
import { useDrag } from "react-dnd";
import styled, { css } from "styled-components";

export const DAILY_RECORD_ITEM = "dailyRecordItem";

export interface DailyRecordItemForDrag {
  id: string;
  date: string;
}

interface DailyRecordItemProps {
  id: string;
  date: string;
  amount?: number;
  focusOnMount?: boolean;
  onSave(amount: number): void;
}

export default function DailyRecordItem({
  id,
  date,
  amount,
  focusOnMount,
  onSave,
}: DailyRecordItemProps) {
  const input = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(`${amount || ""}`);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    const isDigit = /^[0-9]+$/.test(value);
    if (!isDigit && !!value) return;
    setValue(value);
  }

  function handleBlur() {
    onSave(+value);
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key !== "Enter") return;
    onSave(+value);
  }

  useEffect(() => {
    if (!focusOnMount) return;
    input.current?.focus();
  }, []);

  const [{ isDragging }, drag] = useDrag({
    item: { type: DAILY_RECORD_ITEM, id, date },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  return (
    <Card
      ref={drag}
      isDragging={isDragging}
      onClick={(e) => e.stopPropagation()}
    >
      <Input
        ref={input}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyPress={handleKeyPress}
      />
    </Card>
  );
}

export const Card = styled.div<{ isDragging?: boolean }>`
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

const Input = styled.input`
  border: 0;
`;
