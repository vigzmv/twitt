import { gql } from 'react-apollo';

export default gql`
  {
    getUserTweets {
      text
      _id
      createdAt
      favoriteCount
      isFavorite
      user {
        username
        avatar
        firstName
        lastName
      }
    }
  }
`;
