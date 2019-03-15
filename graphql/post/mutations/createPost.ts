import gql from 'graphql-tag';

export const createPostMuttation = gql`
  mutation CreatePost($data: PostInput!) {
    createPost(data: $data) {
      id
      title
      slug
      content
    }
  }
`;
