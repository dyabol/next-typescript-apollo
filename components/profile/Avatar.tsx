import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Slider } from "antd";
import { SliderValue } from "antd/lib/slider";
import { ApolloClient } from "apollo-boost";
import * as React from "react";
import { ApolloConsumer } from "react-apollo";
import AvatarEditor from "react-avatar-editor";
import Dropzone from "react-dropzone";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { uploadAvatar } from "../../graphql/user/mutations/uploadAvatar";

export interface IAvatarProps {
  className?: string;
  avatar: string;
}
export interface IAvatarState {
  image: File | string | null;
  scale: number;
  rotate: number;
  avatar: string;
}

const DropContainer = styled.div`
  width: 230px;
  height: 230px;
  border: 5px dashed transparent;
  display: flex;
  padding: 10px;
  border-radius: 50%;
  position: relative;

  &.active {
    border: 5px dashed #858796;
  }

  &:hover .upload-button {
    display: block;
  }
`;

const UploadButton = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  display: none;
  width: 200px;
  height: 100px;
  padding-top: 25px;
  background: #000000aa;
  border-bottom-left-radius: 100px;
  border-bottom-right-radius: 100px;
  color: #fff;
  cursor: pointer;

  svg {
    display: block;
    margin: 0 auto;
  }

  span {
    text-align: center;
    display: block;
  }
`;

export default class Avatar extends React.Component<
  IAvatarProps,
  IAvatarState
> {
  public editor = React.createRef<AvatarEditor>();

  constructor(props: IAvatarProps) {
    super(props);
    this.state = {
      image: null,
      scale: 1.2,
      rotate: 0,
      avatar: props.avatar
    };
  }

  public handleDrop = (dropped: File[]) => {
    const file = dropped[0];
    if (
      [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/bmp",
        "image/wemp",
        "image/tiff"
      ].indexOf(file.type) > -1
    ) {
      this.setState({ image: file });
    } else {
      throw new Error("Nepodporovaný formát obrázku.");
    }
  };

  public resetImage = () => {
    this.setState({ image: null });
  };

  public rotateToLeft = () => {
    this.setState({ rotate: this.state.rotate - 90 });
  };

  public rotateToRight = () => {
    this.setState({ rotate: this.state.rotate + 90 });
  };

  public setScale = (val: SliderValue) => {
    if (Array.isArray(val)) {
      val = val[0];
    }
    this.setState({ scale: val });
  };

  public saveImage = (client: ApolloClient<any>) => {
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
        "image/jpeg",
        0.8
      );
      this.setState({
        avatar: image,
        image: null
      });
    }
  };

  public render() {
    const { image, scale, rotate, avatar } = this.state;
    const { className } = this.props;
    if (image) {
      return (
        <ApolloConsumer>
          {client => (
            <div style={{ maxWidth: "240px" }} className="mb-3">
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
              <div style={{ textAlign: "center" }}>
                <div>
                  <Slider
                    step={0.01}
                    min={1}
                    max={3}
                    onChange={this.setScale}
                    value={scale}
                  />
                  <Button
                    size="small"
                    type="primary"
                    shape="circle"
                    onClick={this.rotateToLeft}
                    className="m-1 mb-2"
                    icon="undo"
                  />
                  <Button
                    size="small"
                    type="primary"
                    shape="circle"
                    onClick={this.rotateToRight}
                    className="m-1 mb-2"
                    icon="redo"
                  />
                </div>
                <div>
                  <Button
                    size="small"
                    onClick={() => this.saveImage(client)}
                    className="m-2"
                    icon="save"
                    type="primary"
                  >
                    <FormattedMessage id="save" defaultMessage="Save" />
                  </Button>
                  <Button
                    size="small"
                    onClick={this.resetImage}
                    className="m-2"
                    icon="close"
                    type="dashed"
                  >
                    <FormattedMessage id="discard" defaultMessage="Discard" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </ApolloConsumer>
      );
    }

    return (
      <Dropzone onDrop={this.handleDrop}>
        {({ getRootProps, getInputProps, isDragActive }) => (
          <DropContainer
            className={`${isDragActive ? "active " : ""} ${className}`}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <img
              className="rounded-circle"
              src={avatar}
              width={200}
              height={200}
            />
            <UploadButton className="upload-button animated--grow-in">
              <FontAwesomeIcon icon="camera" />
              <FormattedMessage id="update" defaultMessage="Update" />
            </UploadButton>
          </DropContainer>
        )}
      </Dropzone>
    );
  }
}
