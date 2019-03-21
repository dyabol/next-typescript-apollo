import gql from 'graphql-tag';

export const meQuery = gql`
  query Me {
    me {
      id
      firstName
      lastName
      email
      fullName
      avatar
    }
  }
`;
