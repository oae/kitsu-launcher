import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Icon, Button } from 'antd';
import { useDispatch } from 'react-redux';

const StyledLogin = styled.div`
  // padding-top: 50px;
  // display: flex;
  // width: 500px;
  // max-height: 370px;
  // margin-left: 145px;
  // border-bottom-left-radius: 0px;
  // border-bottom-right-radius: 0px;
  // border-radius: 3px;
  // font-size: 12px;
  // z-index: 2;
  // align-items: center;
  // margin-top: 75px;

  z-index: 2;
  width: 500px;
  max-height: 370px;
  display: inline-flex;
  border-radius: 3px;
  padding: 10px;
  padding-left: 140px;
  border: 1px solid #3b064d;
  font-size: 30px;
  color: white;
  outline: none;
  background: #3b064d;
  align-items: center;
  box-shadow: 3px 2px 5px 0px rgba(0, 0, 0, 0.75);
`;

const StyledForm = styled(Form)`
  witdh: 100%;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  border-radius: 3px;
  .login-form {
    max-width: 100%;
  }

  .login-form-register {
    float: right;
  }

  .login-form-button {
    width: 88%;
  }
`;

const StyledUserIcon = styled(Icon)`
  color: 'rgba(0,0,0,.25)';
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

  const dispatch = useDispatch();

  return (
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
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
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
            Log in
          </Button>
          <a href="">Forgot password</a>
          <a className="login-form-register" href="">
            Register now!
          </a>
        </Form.Item>
      </StyledForm>
    </StyledLogin>
  );
};
