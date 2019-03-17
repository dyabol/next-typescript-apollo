import gql from 'graphql-tag';

export const createPostMutation = gql`
  mutation CreatePost($data: CreatePostInput!) {
    createPost(data: $data) {
      id
      title
      slug
      content
    }
  }
`;
