import React from 'react';
import styled from 'styled-components';

import chibi from '../../../assets/chibi.png';

const Title = styled.span`
  font-family: 'AlmostJapanese';
  position: absolute;
  left: 135px;
  font-size: 45px;
  top: -35px;
  font-weight: bold;
  color: white;
  text-shadow: 0 0 5px #3b064d, 0 0 10px #3b064d, 0 0 15px #3b064d,
    0 0 20px #3b064d, 0 0 25px #3b064d, 0 0 30px #3b064d, 0 0 35px #3b064d;
  z-index: -3;
`;

const Chibi = styled.img`
  position: absolute;
  width: 200px;
  height: 200px;
  top: 0px;
  margin-top: -60px;
  left: -40px;
`;

const StyledHeader = styled.div`
  position: absolute;
  z-index: 3;
  width: 100%;
`;

export function Header() {
  return (
    <StyledHeader>
      <Title>Kitsu Launcher</Title>
      <Chibi src={chibi} />
    </StyledHeader>
  );
}
