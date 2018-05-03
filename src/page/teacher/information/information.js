import React from 'react';
import {Breadcrumb,Card} from 'antd';
import {connect} from 'react-redux';
import {getSystemInfo,resetReducersState} from '../../../redux/teacher/loadData.redux';
@connect(
    state=>state.teacherReducers,
    {getSystemInfo,resetReducersState}
)
class Information extends React.Component{

    componentDidMount(){
        this.props.getSystemInfo();
    }
    componentWillUnmount(){
        this.props.resetReducersState();
    }

    render(){
        return(
            <div className='information__warpper' >
                <Breadcrumb >
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>系统消息</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{marginTop:20}} >
                    {
                        this.props.data && this.props.data.length > 0 ? this.props.data.map((item,index)=>(
                            <Card key={index} title={(new Date(Number.parseInt(item.createTime,10)).toDateString())} style={{marginTop:20}} >
                                {item.content}
                            </Card>
                        )):'暂无消息'
                    }
                </div>
            </div>
        )
    }
}

export default Information;