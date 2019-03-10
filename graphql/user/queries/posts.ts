import gql from 'graphql-tag';

export const meQuery = gql`
  query Posts {
    posts {
      id
      slug
      title
      content
      user {
        fullName
      }
    }
  }
`;
