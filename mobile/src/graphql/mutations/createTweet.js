import { gql } from 'react-apollo';

export default gql`
  mutation createTweet($text: String!) {
    createTweet(text: $text) {
      _id
      favoriteCount
      isFavorite
      createdAt
      text
      user {
        avatar
        username
        firstName
        lastName
      }
    }
  }
`;
