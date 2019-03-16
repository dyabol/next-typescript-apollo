import gql from 'graphql-tag';

export const createPostMuttation = gql`
  mutation CreatePost($data: CreatePostInput!) {
    createPost(data: $data) {
      id
      title
      slug
      content
    }
  }
`;
