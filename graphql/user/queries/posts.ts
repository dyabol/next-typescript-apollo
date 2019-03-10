import gql from 'graphql-tag';

export const meQuery = gql`
  query Posts {
    posts {
      id
      title
      content
      user {
        fullName
      }
    }
  }
`;
