import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Icon, Button, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

const StyledLogin = styled.div`
  position: relative;
  z-index: 2;
  width: 450px;
  max-height: 370px;
  display: inline-flex;
  border-radius: 3px;
  margin-left: 12px;
  margin-top: 22px;
  padding-left: 100px;
  border: 1px solid #3b064d;
  font-size: 30px;
  color: white;
  outline: none;
  background: #3b064d;
  align-items: center;
  box-shadow: 3px 2px 5px 0px rgba(0, 0, 0, 0.75);
`;

const StyledForm = styled(Form)`
  width: 280px;
  margin-left: 50px;
  margin-top: 20px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  border-radius: 3px;
`;

const StyledButton = styled(Button)`
  width: 89%;
  background-color: #6a1b9a;
  border-color: #6a1b9a;

  &:hover,
  &:focus {
    color: #fff;
    background-color: #9c4dcc;
    border-color: #9c4dcc;
  }
`;
const StyledUserIcon = styled(Icon)`
  color: 'rgba(0,0,0,.25)';
`;

const StyledSpinner = styled(Spin)`
  .ant-spin-dot-item {
    background-color: #3b064d !important;
  }
`;

const StyledInput = ({ placeHolder, onChange, type }) => {
  return (
    <Input
      prefix={<StyledUserIcon type="user" />}
      placeholder={placeHolder}
      spellCheck={false}
      type={type}
      onChange={e => {
        onChange(e);
      }}
    />
  );
};

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLoging = useSelector(state => state.kitsu.isLoggingIn);
  const dispatch = useDispatch();

  return (
    <StyledSpinner spinning={isLoging} size="large">
      <StyledLogin>
        <StyledForm>
          <Form.Item>
            <StyledInput
              type="text"
              placeHolder="Email"
              onChange={e => {
                setEmail(e.currentTarget.value);
              }}
            />
          </Form.Item>
          <Form.Item>
            <StyledInput
              type="password"
              placeHolder="Password"
              onChange={e => setPassword(e.currentTarget.value)}
            />
          </Form.Item>
          <Form.Item>
            <StyledButton
              type="primary"
              htmlType="submit"
              onClick={() => {
                dispatch({
                  type: 'LOGIN_REQUESTED',
                  payload: {
                    email,
                    password,
                  },
                });
              }}
            >
              LOGIN
            </StyledButton>
          </Form.Item>
        </StyledForm>
      </StyledLogin>
    </StyledSpinner>
  );
};
