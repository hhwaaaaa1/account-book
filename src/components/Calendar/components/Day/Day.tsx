import { memo } from 'react'
import styled from 'styled-components'

interface DayProps {
  day: number
  month?: number
}

function Day({ day, month }: DayProps) {
  return (
    <Container>
      {month && `${month}.`}
      {day}
    </Container>
  )
}

export default memo(Day)

const Container = styled.div`
  padding: 10px;
  box-shadow: 0 0 0 1px #eee;
`
