import React from 'react';
import { Upload, Icon, message,Breadcrumb,List } from 'antd';
import {connect} from 'react-redux';
import {loadUploadedFileList,downloadFile} from '../../redux/upload.redux';
const Dragger = Upload.Dragger;

@connect(
    state=>state.uploadReducers,
    {loadUploadedFileList,downloadFile}
)
class FileManage extends React.Component{

    componentDidMount(){
        this.props.loadUploadedFileList();
    }

    handleDownloadFile(name){
        this.props.downloadFile(name);
    }

    render(){
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

        return(
            <div className='file-manage__wrapper'>
             <Breadcrumb style={{marginBottom:20}} >
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
                {
                    this.props.fileList.length > 0 ? (
                        <React.Fragment>
                            <div style={{ margin: '16px 0',fontWeight:'bold' }}>已上传的文件</div>
                            <List
                                dataSource={this.props.fileList}
                                renderItem={item => (<List.Item><a onClick={this.handleDownloadFile.bind(this,item)} >{item}</a></List.Item>)}
                            />
                        </React.Fragment>
                    ):(
                        <div style={{ margin: '16px 0',fontWeight:'bold' }}>暂未上传任何文件</div>
                    )
                }
            </div>
        )
    }
}

export default FileManage;