import React from 'react';
import { List } from 'antd';

class DownloadAbleFileList extends React.Component {

    handleDownloadFile(item) {
        this.props.handleDownloadFile(item);
    }

    render() {
        return this.props.fileList.length > 0 ? (
            <React.Fragment>
                <div style={{ margin: '16px 0', fontWeight: 'bold' }}>已上传的文件</div>
                <List
                    dataSource={this.props.fileList}
                    renderItem={item => (<List.Item><a onClick={this.handleDownloadFile.bind(this, item)} >{item}</a></List.Item>)}
                />
            </React.Fragment>
        ) : (
                <div style={{ margin: '16px 0', fontWeight: 'bold' }}>暂未上传任何文件</div>
            )
    }
}

export default DownloadAbleFileList;