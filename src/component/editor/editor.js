import React from 'react';
import LzEditor from 'react-lz-editor';
import { Button } from 'antd';

class Editor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            htmlContent: ``,
            responseList: []
        }
        this.receiveHtml = this.receiveHtml.bind(this);
    }

    shouldComponentUpdate() { return false; }

    handlePublish() {
        this.props.handlePublish(this.state.htmlContent);
    }

    receiveHtml(content) {
        this.setState({
            htmlContent: content,
            responseList: []
        });
    }

    render() {
        return (
            <React.Fragment>
                <LzEditor
                    active={true}
                    importContent={this.state.htmlContent}
                    cbReceiver={this.receiveHtml.bind(this)}
                />
                <div style={{ marginTop: 20 }} >
                    <Button type='primary' size='large' onClick={this.handlePublish.bind(this)} >发布</Button>
                </div>
            </React.Fragment>
        )
    }
}

export default Editor;