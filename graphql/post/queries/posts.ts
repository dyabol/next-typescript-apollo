import gql from 'graphql-tag';

export const postsQuery = gql`
  query Posts($take: Int, $skip: Int) {
    posts(take: $take, skip: $skip) {
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
    postsCount
  }
`;

export const pagesQuery = gql`
  query Pages($take: Int, $skip: Int) {
    pages(take: $take, skip: $skip) {
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
    pagesCount
  }
`;
