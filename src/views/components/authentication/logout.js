import React from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Avatar } from 'antd';
import { useDispatch } from 'react-redux';

const StyledLogout = styled(LogoutOutlined)`
  transform: rotate(-90deg);
  color: white;
`;

const StyledButton = styled(Avatar)`
  z-index: 10;
  position: absolute;
  right: 10px;
  top: 17px;
  background: transparent;
`;
export const Logout = () => {
  const dispatch = useDispatch();
  return (
    <StyledButton
      type="primary"
      onClick={() => {
        dispatch({
          type: 'LOGOUT',
          payload: {
            user: { id: null },
          },
        });
      }}
      shape="circle"
      icon={<StyledLogout />}
    />
  );
};
