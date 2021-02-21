import { useEffect, useRef, useState } from "react";
import { useDrag } from "react-dnd";
import styled, { css } from "styled-components";

export const DAILY_RECORD_ITEM = "dailyRecordItem";

export interface DailyRecordItemData {
  id: string;
  text: string;
}

interface DailyRecordItemProps {
  // onDrop(): void;
  amount?: number;
  focusOnMount?: boolean;
  onSave(amount: number): void;
}

export default function DailyRecordItem({
  amount,
  focusOnMount,
  onSave,
}: // onDrop,
DailyRecordItemProps) {
  const card = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(`${amount || ""}`);

  // const [{ isDragging }, drag] = useDrag({
  //   item: {
  //     type: DAILY_RECORD_ITEM,
  //     date,
  //     onDrop,
  //     // ...data,
  //   },
  //   collect: (monitor) => ({
  //     isDragging: monitor.isDragging(),
  //   }),
  // });

  // drag(ref);

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

  return (
    <Card ref={card} onClick={(e) => e.stopPropagation()}>
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
