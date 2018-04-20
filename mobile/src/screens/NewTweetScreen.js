import React, { Component } from 'react';
import styled from 'styled-components/native';

const Root = styled.View`
  background-color: ${props => props.theme.WHITE};
  flex: 1;
  align-items: center;
`;

const Wrapper = styled.View`
  height: 80%;
  width: 90%;
  padding-top: 5;
  background-color: pink;
`;

const Input = styled.TextInput.attrs({
  underlineColorAndroid: 'transparent',
  multiline: true,
  maxLength: 140,
})`
  height: 40%;
  width: 100%;
  font-size: 18;
  color: ${props => props.theme.SECONDARY};
`;

const T = styled.Text``;

class NewTweetScreen extends Component {
  state = {};
  render() {
    return (
      <Root>
        <Wrapper>
          <Input />
        </Wrapper>
      </Root>
    );
  }
}

export default NewTweetScreen;
