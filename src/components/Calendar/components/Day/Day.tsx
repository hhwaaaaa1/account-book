import { memo } from "react";
import styled, { css } from "styled-components";

interface DayProps {
  day: number;
  month?: number;
  today?: boolean;
  isMonthVisible?: boolean;
}

function Day({ day, month, today, isMonthVisible }: DayProps) {
  return (
    <Container>
      <Number today={today}>
        {isMonthVisible && `${month}.`}
        {day}
      </Number>
    </Container>
  );
}

export default memo(Day);

const Container = styled.div`
  padding: 10px;
  box-shadow: 0 0 0 1px #eee;
`;

const Number = styled.span<{ today?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 100px;
  ${({ today }) =>
    today &&
    css`
      color: #fff;
      font-weight: 600;
      background: cornflowerblue;
    `}
`;
