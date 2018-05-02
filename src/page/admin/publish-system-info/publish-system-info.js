import React from 'react';
import {Button,Breadcrumb,Card } from 'antd';
import LzEditor  from 'react-lz-editor';
import {doPublishInfo,getSystemInfo} from '../../../redux/admin/publish-system-info.redux';
import {connect} from 'react-redux';
import './publish-system-info.scss';

@connect(
    state=>state.publishInfoReducer,
    {doPublishInfo,getSystemInfo}
)
class PublishSystemInfo extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          htmlContent: `<h1>Yankees, Peeking at the Red Sox, Will Soon Get an Eyeful</h1>
                    <p>Whenever Girardi stole a glance, there was rarely any good news for the Yankees. While Girardi’s charges were clawing their way to a split of their four-game series against the formidable Indians, the Boston Red Sox were plowing past the rebuilding Chicago White Sox, sweeping four games at Fenway Park.</p>`,
          responseList: []
        }
        this.receiveHtml=this.receiveHtml.bind(this);
      }

      componentDidMount(){
        this.props.getSystemInfo();
      }

      
      receiveHtml(content) {
        console.log("recieved HTML content", content);
        this.setState({responseList:[]});
      }
      
      handlePublish(){
        this.props.doPublishInfo(this.state.htmlContent);
        this.props.getSystemInfo();        
      }

    render(){
        const infoList = this.props.data;
        return(            <div>

                <Breadcrumb style={{marginBottom:20}} >
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>管理</Breadcrumb.Item>
                        <Breadcrumb.Item>信息发布</Breadcrumb.Item>
                    </Breadcrumb>
                <LzEditor 
                    active={true} 
                    importContent={this.state.htmlContent}
                    cbReceiver={this.receiveHtml} 
                    lang="en"
                />
                <div style={{marginTop:20}} >
                    <Button type='primary' size='large' onClick={this.handlePublish.bind(this)} >发布</Button>
                </div>
                <div className='history-info' >
                    <h3>以下是您所发布的历史消息</h3>
                    {
                        infoList && infoList.length > 0 ? infoList.map((item,index)=>(
                            <Card key={index} title={'发布于 ' + (new Date(Number.parseInt(item.createTime,10)).toDateString())} bordered={false}>
                                <p>{item.content}</p>
                            </Card>
                        )):'暂无消息'
                    }
                </div>
          </div>
        )
    }
}

export default PublishSystemInfo;