import { gql } from 'react-apollo';

export default gql`
  subscription {
    tweetAdded {
      _id
      text
      createdAt
      favoriteCount
      isFavorite
      user {
        username
        firstName
        lastName
        avatar
      }
    }
  }
`;
