import styled from "styled-components";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, ...props }: ButtonProps) {
  return <Element {...props}>{children}</Element>;
}

const Element = styled.button<{ color?: string }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 12px;
  border: 0;
  border-radius: 4px;
  background: none;
  outline: none;
  cursor: pointer;
  &:before {
    content: "";
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border-radius: inherit;
    background: rgba(0, 0, 0, 0.05);
    opacity: 0;
    transition: opacity 0.1s;
    pointer-events: none;
  }
  &:hover:before {
    opacity: 1;
  }
`;
