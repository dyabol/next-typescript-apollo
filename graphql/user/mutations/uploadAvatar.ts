import gql from 'graphql-tag';

export const uploadAvatar = gql`
  mutation UploadAvatar($avatar: Upload!) {
    addProfilePicture(picture: $avatar)
  }
`;
