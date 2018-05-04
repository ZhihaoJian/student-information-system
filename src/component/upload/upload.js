import React from 'react';
import { Upload, Icon, message, Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import { loadUploadedFileList, downloadFile } from '../../redux/upload.redux';
import DownloadAbleFileList from '../downloadable-filelist/downloadable-filelist';
const Dragger = Upload.Dragger;

@connect(
    state => state.uploadReducers,
    { loadUploadedFileList, downloadFile }
)
class FileManage extends React.Component {

    componentDidMount() {
        this.props.loadUploadedFileList();
    }

    handleDownloadFile(name) {
        this.props.downloadFile(name);
    }

    render() {
        const _this = this;
        const props = {
            name: 'files',
            multiple: true,
            action: '/uploads',
            onChange(info) {
                const status = info.file.status;
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    message.success(`${info.file.name} 上传成功`);
                    _this.props.loadUploadedFileList();
                } else if (status === 'error') {
                    message.error(`${info.file.name} 上传失败 `);
                }
            },
        };

        return (
            <div className='file-manage__wrapper'>
                <Breadcrumb style={{ marginBottom: 20 }} >
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>设置</Breadcrumb.Item>
                    <Breadcrumb.Item>文件上传</Breadcrumb.Item>
                </Breadcrumb>
                <Dragger {...props}  >
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">点击此处或者拖拽文件到此处上传</p>
                    <p className="ant-upload-hint">支持单个或批量上传。 严格禁止上传内部文件</p>
                </Dragger>
                <DownloadAbleFileList 
                    fileList={this.props.fileList} 
                    handleDownloadFile={(item)=>this.handleDownloadFile(item)}
                />
            </div>
        )
    }
}

export default FileManage;