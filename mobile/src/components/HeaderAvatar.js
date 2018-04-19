import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import { connectActionSheet } from '@expo/react-native-action-sheet';

import Loading from './Loading';
import { logout } from '../actions/user';

const AVATAR_SIZE = 34;
const AVATAR_RADIUS = AVATAR_SIZE / 2;

const Avatar = styled.Image`
  height: ${AVATAR_SIZE};
  width: ${AVATAR_SIZE};
  border-radius: ${AVATAR_RADIUS};
`;

const Button = styled.TouchableOpacity`
  margin-left: 14;
  margin-top: 1;
  justify-content: center;
  align-items: center;
`;

class HeaderAvatar extends Component {
  static propTypes = {
    info: PropTypes.object,
    client: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    showActionSheetWithOptions: PropTypes.func.isRequired,
  };

  static defaultProps = {
    info: null,
  };

  _onOpenActionSheet = () => {
    const options = ['Logout', 'Cancel'];
    const destructiveButtonIndex = 0;
    this.props.showActionSheetWithOptions({ options, destructiveButtonIndex }, buttonIndex => {
      if (buttonIndex === 0) {
        this.props.logout();
        this.props.client.resetStore();
      }
    });
  };

  render() {
    const { info } = this.props;

    if (!info)
      return (
        <Button disabled>
          <Loading size={28} color="white" />
        </Button>
      );

    return (
      <Button onPress={this._onOpenActionSheet}>
        <Avatar
          source={{
            uri: info.avatar || 'https://avatars1.githubusercontent.com/u/22526593?s=460&v=4',
          }}
        />
      </Button>
    );
  }
}

export default withApollo(
  connect(state => ({ info: state.user.info }), { logout })(connectActionSheet(HeaderAvatar)),
);
