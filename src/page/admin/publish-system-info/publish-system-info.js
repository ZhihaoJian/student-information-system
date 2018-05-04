import React from 'react';
import Editor from '../../../component/editor/editor';
import {  Breadcrumb, Card } from 'antd';
import { doPublishInfo, getSystemInfo } from '../../../redux/admin/publish-system-info.redux';
import { connect } from 'react-redux';
import './publish-system-info.scss';

@connect(
    state => state.publishInfoReducer,
    { doPublishInfo, getSystemInfo }
)
class PublishSystemInfo extends React.Component {

    componentDidMount() {
        this.props.getSystemInfo();
    }

    handlePublish(htmlContent) {
        const content = htmlContent.replace(/<(?:.|\n)*?>/gm, '');
        this.props.doPublishInfo(content);
        this.props.getSystemInfo();
    }

    render() {
        const infoList = this.props.data;
        return (
            <div>
                <Breadcrumb style={{ marginBottom: 20 }} >
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>管理</Breadcrumb.Item>
                    <Breadcrumb.Item>信息发布</Breadcrumb.Item>
                </Breadcrumb>
                <Editor
                    handlePublish={(htmlContent) => this.handlePublish(htmlContent)}
                />
                <div className='history-info' >
                    <h3>以下是您所发布的历史消息</h3>
                    {
                        infoList && infoList.length > 0 ? infoList.map((item, index) => (
                            <Card key={index} title={'发布于 ' + (new Date(Number.parseInt(item.createTime, 10)).toDateString())} bordered={false}>
                                <p>{item.content}</p>
                            </Card>
                        )) : '暂无消息'
                    }
                </div>
            </div>
        )
    }
}

export default PublishSystemInfo;