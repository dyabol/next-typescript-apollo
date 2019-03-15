import { ContentState, EditorState } from 'draft-js';
// @ts-ignore
import draftToHtml from 'draftjs-to-html';
// @ts-ignore
import htmlToDraft from 'html-to-draftjs';
import * as React from 'react';
import { Editor, RawDraftContentState } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export interface Props {
  content?: string;
  onChange?: (value: string) => void;
  onBlur?: (event: React.SyntheticEvent<{}, Event>) => void;
}

export interface State {
  editorState: EditorState;
}

export default class MyEditor extends React.Component<Props, State> {
  private lastHtml: string;

  constructor(props: Props) {
    super(props);
    this.lastHtml = props.content ? props.content : '';
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }

  componentDidMount() {
    const contentBlock = htmlToDraft(this.props.content);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      this.setState({ editorState });
    }
  }

  onEditorStateChange(editorState: EditorState) {
    this.setState({ editorState });
  }

  onChangeHandler(value: RawDraftContentState) {
    if (this.props.onChange) {
      const html = draftToHtml(value);
      if (html != this.lastHtml) {
        this.props.onChange(html);
        this.lastHtml = html;
      }
    }
  }

  public render() {
    const { editorState } = this.state;
    return (
      <Editor
        editorState={editorState}
        toolbarClassName="editor-toolbar"
        wrapperClassName="editor-wrapper"
        editorClassName="editor-content"
        onEditorStateChange={this.onEditorStateChange}
        onContentStateChange={this.onChangeHandler}
        onBlur={this.props.onBlur}
      />
    );
  }
}
