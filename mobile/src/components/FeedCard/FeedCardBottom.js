import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { MaterialCommunityIcons, FontAwesome, Ionicons } from '@expo/vector-icons';

import { colors } from '../../utils/constants';

const Root = styled.View`
  height: 40;
  flex-direction: row;
`;

const Button = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 0 44px;
`;

const ButtonText = styled.Text`
  font-size: 16;
  font-weight: 400;
  color: ${props => props.theme.GREY};
`;

function FeedCardBottom({ favoriteCount, onFavoritePress, isFavorite }) {
  return (
    <Root>
      <Button>
        <FontAwesome name="comment-o" size={22} color={colors.GREY} />
        <ButtonText>{Math.floor(Math.random() * 8)}</ButtonText>
      </Button>
      <Button>
        <MaterialCommunityIcons name="twitter-retweet" size={32} color={colors.GREY} />
        <ButtonText>{Math.floor(Math.random() * 8)}</ButtonText>
      </Button>
      <Button onPress={onFavoritePress}>
        <MaterialCommunityIcons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={23}
          color={isFavorite ? colors.PRIMARY_LIGHT : colors.GREY}
        />
        <ButtonText>{favoriteCount}</ButtonText>
      </Button>
    </Root>
  );
}

FeedCardBottom.propTypes = {
  favoriteCount: PropTypes.number.isRequired,
  onFavoritePress: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool,
};

FeedCardBottom.defaultProps = {
  isFavorite: false,
};

export default FeedCardBottom;
