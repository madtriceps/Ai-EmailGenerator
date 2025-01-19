import React from 'react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const CharacterWrapper = styled.div`
  position: absolute;
  animation: ${float} 6s ease-in-out infinite;
`;

const CharacterBody = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size * 1.2}px;
  background-color: ${props => props.color};
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 20%;
    left: 5%;
    width: 90%;
    height: 60%;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  }

  &::after {
    content: "";
    position: absolute;
    top: 60%;
    left: 25%;
    width: 50%;
    height: 25%;
    background-color: ${props => props.color};
    border-radius: 0 0 50% 50%;
  }
`;

const Character = ({ color, size, top, left, delay }) => (
    <CharacterWrapper style={{ top, left, animationDelay: `${delay}s` }}>
        <CharacterBody color={color} size={size} />
    </CharacterWrapper>
);

const FloatingCharacters = () => {
    const colors = ['#C51111', '#132ED1', '#117F2D', '#ED54BA', '#EF7D0D', '#F5F557'];

    return (
        <>
            {colors.map((color, index) => (
                <Character
                    key={index}
                    color={color}
                    size={40 + Math.random() * 30}
                    top={`${Math.random() * 100}%`}
                    left={`${Math.random() * 100}%`}
                    delay={Math.random() * 5}
                />
            ))}
        </>
    );
};

export default FloatingCharacters;

