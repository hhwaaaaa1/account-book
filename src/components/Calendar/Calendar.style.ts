import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-rows: 100px 1fr;
  width: 100%;
  min-height: 100vh;
`

export const Header = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: 1fr 40px;
  border-bottom: 1px solid #ddd;
`

export const Title = styled.div`
  place-self: center;
`

export const Weekdays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`

export const Weekday = styled.div`
  place-self: center;
`

export const Body = styled.div<{ columnStart?: number }>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  > *:first-child {
    grid-column-start: ${({ columnStart }) => columnStart || 1};
  }
`
