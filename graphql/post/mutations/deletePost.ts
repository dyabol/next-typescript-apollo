import gql from 'graphql-tag';

export const deletePostMutation = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;
