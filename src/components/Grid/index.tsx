import React from 'react';

// STYLES
import { Wrapper, Content } from './Grid.styles';

// TYPES
type Props = {
  header: string;
};

const Grid: React.FC<Props> = ({ header, children }) => {
  return (
    <Wrapper>
      <h1>{header}</h1>
      <Content>{children}</Content>
    </Wrapper>
  )
};

export default Grid;