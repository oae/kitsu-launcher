import React from 'react';
import styled from 'styled-components';

import chibi from '../../../assets/chibi.png';

const Title = styled.span`
  font-family: 'AlmostJapanese';
  font-size: 45px;
  font-weight: bold;
  color: white;
  text-shadow: 0 0 5px #3b064d, 0 0 10px #3b064d, 0 0 15px #3b064d,
    0 0 20px #3b064d, 0 0 25px #3b064d, 0 0 30px #3b064d, 0 0 35px #3b064d;
  z-index: -3;
  position: relative;
  display: inline-block;
  -webkit-app-region: drag !important;
  -webkit-user-select: none !important;
`;

const Chibi = styled.img`
  position: absolute;
  width: 200px;
  height: 200px;
  margin-top: -20px;
  left: -40px;
  -webkit-app-region: drag !important;
  -webkit-user-select: none !important;
`;

const StyledHeader = styled.div`
  position: absolute;
  z-index: 3;
  width: 100%;
  text-align: center;
  padding-left: 40px;
  top: -35px;
`;

export function Header() {
  return (
    <StyledHeader>
      <Title>Kitsu Launcher</Title>
      <Chibi src={chibi} />
    </StyledHeader>
  );
}
