import gql from 'graphql-tag';

export const editPostMutation = gql`
  mutation EditPost($data: EditPostInput!) {
    editPost(data: $data) {
      id
      title
      slug
      content
    }
  }
`;
