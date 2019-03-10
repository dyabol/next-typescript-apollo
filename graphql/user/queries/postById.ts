import gql from 'graphql-tag';

export const postByIdQuery = gql`
  query PostById($id: Int!) {
    post(id: $id) {
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
