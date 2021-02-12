import { memo } from "react";
import styled, { css } from "styled-components";

interface DayProps {
  day: number;
  month: number;
  isToday?: boolean;
  isMonthVisible?: boolean;
  children?: React.ReactNode;
}

function Day({ day, month, isToday, isMonthVisible, children }: DayProps) {
  return (
    <Container>
      <Number isToday={isToday}>
        {isMonthVisible && `${month}.`}
        {day}
      </Number>
      {children}
    </Container>
  );
}

export default memo(Day);

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  padding: 10px;
  box-shadow: 0 0 0 1px #eee;
`;

const Number = styled.span<{ isToday?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 100px;
  ${({ isToday }) =>
    isToday &&
    css`
      color: #fff;
      font-weight: 600;
      background: cornflowerblue;
    `}
`;
