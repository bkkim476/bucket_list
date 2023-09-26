import React from "react"; // 리액트 호출
import { TouchableOpacity, Text } from "react-native"; // 리액트 네이티브에서 제공하는 컴포넌트 추가



const ButtonGroup = styled.div`
  & + & {
    margin-top: 1rem;
  }
`;


const sizeStyles = css`
  /*크기*/
  ${(props) =>
    props.size === "large" &&
    css`
      height: 3rem;
      font-size: 1.25rem;
    `}
  ${(props) =>
    props.size === "medium" &&
    css`
      height: 2.25rem;
      font-size: 1rem;
    `}
    ${(props) =>
    props.size === "small" &&
    css`
      height: 1.75rem;
      font-size: 0.875rem;
    `}
`;

const sizes = {
    large: {
        height: '3rem',
        fontSize: '1.25rem'
    },
    medium: {
        height: '2.25rem',
        fontSize: '1rem',
    },
    small: {
        height:  '1.75rem',
        fontSize: '0.875rem'
    }
};

/*
const sizeStyles = css`

  ${({size}) => css`
    height: ${sizes[size].height};
    font-size: ${sizes[size].fontSize}
  `}
`;

*/