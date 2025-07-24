import { styled, keyframes } from "styled-components";

const jumpUnderline = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
`;

export const Nav = styled.div`
  display: flex;
  justify-content: center;
  gap: 5rem;
  padding: .6rem;
`;

export const ButtonNav = styled.span`
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  cursor: pointer;
  color: #333333;
  text-decoration: underline #e5e7eb;
  text-underline-offset: 8px;
  display: inline-block; 
  transition: color 0.5s ease-in-out, transform 0.5s ease-in-out;

  &:hover {
    color: #1a1a1a;
    text-decoration: underline 1.5px #1a1a1a;
    letter-spacing: 1.2px;
    animation: ${jumpUnderline} 0.5s ease 2;
  }
`;
