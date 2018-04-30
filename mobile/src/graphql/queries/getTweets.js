import { gql } from 'react-apollo';

import FeedCard from '../../components/FeedCard';

export default gql`
  {
    getTweets {
      ...FeedCard
    }
  }
  ${FeedCard.fragments.tweet}
`;
