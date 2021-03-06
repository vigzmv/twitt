import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import { connectActionSheet } from '@expo/react-native-action-sheet';

import Loading from './Loading';
import ButtonHeader from './ButtonHeader';
import { logout } from '../actions/user';

const AVATAR_SIZE = 35;
const AVATAR_RADIUS = AVATAR_SIZE / 2;

const Avatar = styled.Image`
  height: ${AVATAR_SIZE};
  width: ${AVATAR_SIZE};
  border-radius: ${AVATAR_RADIUS};
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
        <ButtonHeader side="left" disabled>
          <Loading size={28} color="white" />
        </ButtonHeader>
      );

    return (
      <ButtonHeader side="left" onPress={this._onOpenActionSheet}>
        <Avatar
          source={{
            uri: info.avatar,
          }}
        />
      </ButtonHeader>
    );
  }
}

export default withApollo(
  connect(state => ({ info: state.user.info }), { logout })(connectActionSheet(HeaderAvatar)),
);
