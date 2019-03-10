import gql from 'graphql-tag';

export const postBySlugQuery = gql`
  query PostBySlug($slug: String!) {
    post(slug: $slug) {
      id
      slug
      title
      content
      createdAt
      upadatedAt
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
