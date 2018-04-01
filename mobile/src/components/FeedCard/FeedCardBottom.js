import React from 'react';
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
  color: ${props => props.theme.LIGHT_GREY};
`;

const isFav = false;

export default function FeedCardBottom() {
  return (
    <Root>
      <Button>
        <FontAwesome name="comment-o" size={22} color={colors.LIGHT_GREY} />
        <ButtonText>3</ButtonText>
      </Button>
      <Button>
        <MaterialCommunityIcons name="twitter-retweet" size={32} color={colors.LIGHT_GREY} />
        <ButtonText>4</ButtonText>
      </Button>
      <Button>
        <Ionicons
          name={isFav ? 'md-heart' : 'md-heart-outline'}
          size={24}
          color={isFav ? 'red' : colors.LIGHT_GREY}
        />
        <ButtonText>2</ButtonText>
      </Button>
    </Root>
  );
}
