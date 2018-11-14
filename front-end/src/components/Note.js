import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

export default class Note extends React.Component {
  constructor(props) {
    super(props);
    let editorState = null;
    if(this.props.initialData) EditorState.createWithContent(convertFromRaw(this.props.initialData));
    else editorState =  EditorState.createEmpty();
    this.title = React.createRef();
    this.state = {
      editorState: editorState,
      title: this.props.title?this.props.title:'Untitled'
    };
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  clearEditor = (e) => {
    const contentState = ContentState.createFromText('');
    const editorState = EditorState.push(this.state.editorState, contentState, 'backspace-character');
    this.setState({
      editorState
    })
  };

  saveContent = () => {
    const obj = {};
    obj.content = convertToRaw(this.state.editorState.getCurrentContent());
    obj.title = this.title.current.textContent;
    obj.id = this.props.id;
    this.props.onSave(obj);
  };

  render() {
    const { editorState, title} = this.state;
    return (
      <Grid container>
        <Grid item xs md sm>
          <Card className="note">
            <CardContent>
              <p contentEditable="true" className="editor-title" ref={this.title}>{title}</p>
              <Editor
                initialEditorState={editorState}
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="editor"
                onEditorStateChange={this.onEditorStateChange}
              />
            </CardContent>
            <CardActions className="editor-buttons">
              <Button onClick={e => this.saveContent(e)} variant="extendedFab" aria-label="Delete" className="editor-button">
                <SaveIcon className="editor-icon"/>
                Save
              </Button>
              <Button onClick={e => this.clearEditor(e)} variant="extendedFab" aria-label="Delete" className="editor-button">
                <DeleteSweepIcon className="editor-icon"/>
                Clear
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    );
  }
};


Note.propTypes = {
  initialData: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  title: PropTypes.string,
  id: PropTypes.string.isRequired
};
