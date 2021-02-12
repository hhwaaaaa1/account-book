import styled from "styled-components";

interface DailyRecordProps {
  day: number;
  month: number;
  year: number;
}

export default function DailyRecord({ day, month, year }: DailyRecordProps) {
  return (
    <Container>
      <Card>
        {year}.{month}.{day}
      </Card>
    </Container>
  );
}

const Container = styled.div``;

const Card = styled.div`
  display: flex;
  align-items: center;
  min-height: 36px;
  padding: 5px 10px;
  border-radius: 5px;
  box-sizing: border-box;
  box-shadow: 0 0 0 1px #eee;
`;
