import gql from 'graphql-tag';

export const postsQuery = gql`
  query Posts {
    posts {
      id
      slug
      title
      content
      createdAt
      updatedAt
      user {
        id
        fullName
      }
    }
  }
`;
