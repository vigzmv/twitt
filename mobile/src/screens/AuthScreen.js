import React, { Component } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

import SignUpForm from './../components/SignUpForm';

const Root = styled.View`
  flex: 1;
  background-color: ${props => props.theme.SECONDARY};
  position: relative;
`;

const ButtonSignUpText = styled.Text`
  color: ${props => props.theme.WHITE};
  font-weight: bold;
  font-size: 26;
  padding-bottom: 4px;
`;

const ButtonSignUp = styled(TouchableOpacity)`
  height: 68;
  width: 160;
  background-color: ${props => props.theme.RED};
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 20%;
  right: 0;
  border-top-left-radius: 20;
  border-bottom-left-radius: 20;
  elevation: 12;
  shadow-opacity: 0.4;
  shadow-radius: 5;
  shadow-offset: 0px 4px;
  shadow-color: #000;
`;

const ButtonLoginContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200;
  justify-content: center;
  align-items: center;
`;

const ButtonLogin = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ButtonLoginText = styled.Text`
  color: ${props => props.theme.WHITE};
  font-weight: 400;
  font-size: 22;
`;

const intialState = {
  showSignUp: false,
  showLogin: false,
};
class AuthScreen extends Component {
  state = {
    ...intialState,
  };

  _onShowSignUpPress = () => {
    this.setState({ showSignUp: true });
  };

  _onBackPress = () => {
    this.setState({ ...intialState });
  };

  render() {
    if (this.state.showSignUp) {
      return (
        <Root>
          <SignUpForm onBackPress={this._onBackPress} />
        </Root>
      );
    }

    return (
      <Root>
        <ButtonSignUp onPress={this._onShowSignUpPress}>
          <ButtonSignUpText>Sign Up</ButtonSignUpText>
        </ButtonSignUp>
        <ButtonLoginContainer>
          <ButtonLogin>
            <ButtonLoginText>Already have an account? Sign in</ButtonLoginText>
          </ButtonLogin>
        </ButtonLoginContainer>
      </Root>
    );
  }
}

export default AuthScreen;
