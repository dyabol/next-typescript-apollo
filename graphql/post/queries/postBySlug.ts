import gql from 'graphql-tag';

export const postBySlugQuery = gql`
  query PostBySlug($slug: String!) {
    post(slug: $slug) {
      id
      slug
      title
      content
      createdAt
      updatedAt
      user {
        id
        firstName
        lastName
        fullName
        email
      }
    }
  }
`;

export const pageBySlugQuery = gql`
  query PageBySlug($slug: String!) {
    page(slug: $slug) {
      id
      slug
      title
      content
      createdAt
      updatedAt
      user {
        id
        firstName
        lastName
        fullName
        email
      }
    }
  }
`;
