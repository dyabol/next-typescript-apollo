import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ApolloClient } from 'apollo-boost';
import * as React from 'react';
import { ApolloConsumer } from 'react-apollo';
import AvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import { uploadAvatar } from '../../../graphql/user/mutations/uploadAvatar';

export interface AvatarProps {
  className?: string;
  avatar?: string;
}
export interface AvatarState {
  image: File | string | null;
  scale: number;
  rotate: number;
  savedImage: string;
}

const DropContainer = styled.div`
  width: 240px;
  height: 240px;
  border: 5px dashed #dddfeb;
  cursor: pointer;
  display: flex;
  padding: 10px;

  &.active {
    border: 5px dashed #858796;
  }
`;

const DropTitle = styled.p`
  margin: auto; /* Important */
  text-align: center;
`;

export default class Avatar extends React.Component<AvatarProps, AvatarState> {
  editor = React.createRef<AvatarEditor>();

  state = {
    image: '/static/img/avatar.png',
    scale: 1.2,
    rotate: 0,
    savedImage: ''
  };

  handleDrop = (dropped: File[]) => {
    const file = dropped[0];
    if (
      [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/bmp',
        'image/wemp',
        'image/tiff'
      ].indexOf(file.type) > -1
    ) {
      this.setState({ image: file });
    } else {
      throw new Error('Nepodporovaný formát obrázku.');
    }
  };

  resetImage = () => {
    this.setState({ image: null });
  };

  rotateToLeft = () => {
    this.setState({ rotate: this.state.rotate - 90 });
  };

  rotateToRight = () => {
    this.setState({ rotate: this.state.rotate + 90 });
  };

  setScale = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    this.setState({ scale: val });
  };

  saveImage = (client: ApolloClient<any>) => {
    if (this.editor && this.editor.current) {
      const canvas = this.editor.current.getImageScaledToCanvas();
      const image = canvas.toDataURL();
      canvas.toBlob(
        blob => {
          if (blob) {
            client.mutate({
              mutation: uploadAvatar,
              variables: {
                avatar: blob
              }
            });
          }
        },
        'image/jpeg',
        0.8
      );
      this.setState({
        savedImage: image
      });
    }
  };

  public render() {
    const { image, scale, rotate, savedImage } = this.state;
    const { className } = this.props;
    if (savedImage) {
      return <img className="rounded-circle mb-5 mt-3" src={savedImage} />;
    } else if (image) {
      return (
        <ApolloConsumer>
          {client => (
            <>
              <AvatarEditor
                ref={this.editor}
                className={`rounded border ${className}`}
                image={image}
                width={200}
                height={200}
                border={20}
                color={[255, 255, 255, 0.6]} // RGBA
                scale={scale}
                rotate={rotate}
                borderRadius={200}
              />
              <div>
                <input
                  className="d-block mb-3"
                  onChange={this.setScale}
                  type="range"
                  step={0.01}
                  min={1}
                  max={2}
                  name="scale"
                  value={scale}
                />
                <Button
                  size="sm"
                  onClick={() => this.saveImage(client)}
                  className="m-1"
                >
                  Save
                </Button>
                <Button size="sm" onClick={this.resetImage} className="m-1">
                  Zahodit
                </Button>
                <Button
                  size="sm"
                  onClick={this.rotateToLeft}
                  className="m-1 btn-circle"
                >
                  <FontAwesomeIcon icon="undo-alt" />
                </Button>
                <Button
                  size="sm"
                  onClick={this.rotateToRight}
                  className="m-1 btn-circle"
                >
                  <FontAwesomeIcon icon="redo-alt" />
                </Button>
              </div>
            </>
          )}
        </ApolloConsumer>
      );
    }
    return (
      <Dropzone onDrop={this.handleDrop}>
        {({ getRootProps, getInputProps, isDragActive }) => (
          <DropContainer
            className={`rounded ${isDragActive ? 'active ' : ''} ${className}`}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <DropTitle>Drop the files here ...</DropTitle>
            ) : (
              <DropTitle>
                Drag 'n' drop some files here, or click to select files
              </DropTitle>
            )}
          </DropContainer>
        )}
      </Dropzone>
    );
  }
}
