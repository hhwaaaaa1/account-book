import styled from "styled-components";
import Button from "@/components/Button";

export const Container = styled.div`
  display: grid;
  grid-template-rows: 100px 1fr;
  width: 100%;
  min-height: 100vh;
`;

export const Header = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: 1fr 40px;
  grid-template-columns: 100px 1fr 100px;
  border-bottom: 1px solid #ddd;
`;

export const Title = styled.div`
  place-self: center;
`;

export const DirButton = styled(Button)`
  && {
    place-self: center;
    padding: 10px 12px;
    svg {
      margin: 0 3px;
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
`;

export const Weekdays = styled.div`
  grid-column: 1 / 4;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

export const Weekday = styled.div`
  place-self: center;
`;

export const Body = styled.div<{ columnStart?: number }>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  > *:first-child {
    grid-column-start: ${({ columnStart }) => columnStart || 1};
  }
`;
