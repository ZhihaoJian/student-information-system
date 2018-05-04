import React from 'react';
import DownloadAbleFileList from '../../../component/downloadable-filelist/downloadable-filelist';
import { connect } from 'react-redux';
import { downloadFile,loadUploadedFileList } from '../../../redux/upload.redux';

@connect(
    state => state.uploadReducers,
    { downloadFile,loadUploadedFileList }
)
class DownloadFile extends React.Component {

    componentDidMount() {
        this.props.loadUploadedFileList();
    }

    handleDownloadFile(name) {
        this.props.downloadFile(name);
    }

    render() {
        return (
            <DownloadAbleFileList
                fileList={this.props.fileList}
                handleDownloadFile={(item) => this.handleDownloadFile(item)}
            />
        )
    }
}

export default DownloadFile;