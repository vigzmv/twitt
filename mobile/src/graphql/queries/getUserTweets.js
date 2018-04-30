import { gql } from 'react-apollo';

import FeedCard from '../../components/FeedCard';

export default gql`
  {
    getUserTweets {
      ...FeedCard
    }
  }
  ${FeedCard.fragments.tweet}
`;
