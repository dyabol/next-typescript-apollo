import gql from "graphql-tag";
import { graphql } from "react-apollo";
// import uploadsQuery from '../queries/uploads';

const UploadFile = ({ mutate }: any) => {
  const handleChange = ({
    target: {
      validity,
      files: [file]
    }
  }: any) =>
    validity.valid &&
    mutate({
      variables: { file }
    });

  return <input type="file" required onChange={handleChange} />;
};

export default graphql(gql`
  mutation($file: Upload!) {
    addProfilePicture(picture: $file)
  }
`)(UploadFile);
