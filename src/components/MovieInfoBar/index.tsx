import React from 'react'

// HELPERS
import { calcTime, convertMoney } from '../../helpers';

// STYLES
import { Content, Wrapper } from './MovieInfoBar.styles';

// TYPES
type Props = {
  time: number;
  budget: number;
  revenue: number;
};

const MovieInfoBar: React.FC<Props> = ({ time, budget, revenue }) => (
  <Wrapper>
    <Content>
      <div className='column'>
        <p>Running Time: {calcTime(time)}</p>
      </div>
      <div className='column'>
        <p>Budget: {convertMoney(budget)}</p>
      </div>
      <div className='column'>
        <p>Revenue: {convertMoney(revenue)}</p>
      </div>
    </Content>
  </Wrapper>

);

export default MovieInfoBar
