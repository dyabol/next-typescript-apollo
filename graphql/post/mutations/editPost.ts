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

export const editPageMutation = gql`
  mutation EditPage($data: EditPostInput!) {
    editPage(data: $data) {
      id
      title
      slug
      content
    }
  }
`;
