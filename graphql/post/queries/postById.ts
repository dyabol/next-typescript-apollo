import gql from 'graphql-tag';

export const postByIdQuery = gql`
  query PostById($id: ID!) {
    post(id: $id) {
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
