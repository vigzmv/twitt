import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

import { colors } from '../utils/constants';

const RootWrapper = styled.TouchableWithoutFeedback`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Root = styled.View`
  flex: 1;
  position: relative;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;

const Wrapper = styled.View`
  align-self: stretch;
  justify-content: center;
  align-items: center;
`;

const BackButton = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 6%;
  left: 5%;
`;

const ButtonConfirm = styled(TouchableOpacity)`
  position: absolute;
  bottom: 15%;
  height: 50;
  width: 56%;
  background-color: ${props => props.theme.PRIMARY};
  border-radius: 5;
  justify-content: center;
  align-items: center;
  elevation: 3;
`;

const ButtonConfirmText = styled.Text`
  color: ${props => props.theme.WHITE};
  font-weight: 600;
  font-size: 22px;
`;

const InputWrapper = styled.View`
  height: 50;
  width: 70%;
  border-bottom-width: 2px;
  border-bottom-color: ${props => props.theme.WHITE};
  margin: 8px;
  justify-content: flex-end;
`;

const Input = styled.TextInput.attrs({
  placeholderTextColor: colors.GREY_LIGHT,
  selectionColor: colors.PRIMARY,
  autoCorrect: false,
  underlineColorAndroid: 'transparent',
})`
  height: 30;
  width: 100%;
  text-decoration-line: none;
  font-size: 20;
  color: ${props => props.theme.WHITE};
`;

class SignUpForm extends Component {
  state = {
    fullName: '',
    email: '',
    password: '',
    username: '',
  };

  _onTextChange = (text, type) => this.setState({ [type]: text });

  _onOutSidePress = () => Keyboard.dismiss();

  render() {
    return (
      <RootWrapper onPress={this._onOutSidePress}>
        <Root>
          <BackButton onPress={this.props.onBackPress}>
            <MaterialIcons name="arrow-back" color={colors.WHITE} size={34} />
          </BackButton>
          <Wrapper>
            <InputWrapper>
              <Input
                placeholder="Full Name"
                autoCapitalize="words"
                onChangeText={text => this._onTextChange(text, 'fullName')}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={text => this._onTextChange(text, 'email')}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                placeholder="Password"
                secureTextEntry
                onChangeText={text => this._onTextChange(text, 'password')}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                placeholder="Username"
                autoCapitalize="none"
                onChangeText={text => this._onTextChange(text, 'username')}
              />
            </InputWrapper>
          </Wrapper>
          <ButtonConfirm>
            <ButtonConfirmText>Sign Up</ButtonConfirmText>
          </ButtonConfirm>
        </Root>
      </RootWrapper>
    );
  }
}

SignUpForm.propTypes = {
  onBackPress: PropTypes.func.isRequired,
};

export default SignUpForm;
