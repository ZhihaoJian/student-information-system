import React from 'react';
import { Row, Col, Table, Input,Breadcrumb } from 'antd';
import {connect} from 'react-redux';
import {loadTeacherInfo,deleteTecherInfo} from '../../../redux/admin/loadData.redux';
import './teacher-info.scss';
const Search = Input.Search;

@connect(
    state=>state.loadData,
    {loadTeacherInfo,deleteTecherInfo}
)
class TeacherInfo extends React.Component{

    handleSearch(value){
        this.props.loadTeacherInfo(value);        
    }

    componentDidMount(){
        this.props.loadTeacherInfo();
    }   

    handleDelete(id){
        this.props.deleteTecherInfo(id);
    }

    render(){

        const columns = [
            {
                title:'职工号',
                dataIndex:'teacherNum',
                key:'teacherNum',
                align:'center'
            },{
                title:'姓名',
                dataIndex:'teacherName',
                key:'teacherName',
                align:'center'
            },
            {
                title:'性别',
                dataIndex:'gender',
                key:'gender',
                align:'center',
                render:(text)=>(text === 'female' ? <span>女</span> : <span>男</span>)
            },{
                title:'专业',
                dataIndex:'major',
                key:'major',
                align:'center'
            },{
                title:'联系方式',
                dataIndex:'tel',
                key:'tel',
                align:'center'
            },{
                title:'所属部门',
                dataIndex:'department',
                key:'department',
                align:'center'
            },
            {
                title:'操作',
                dataIndex:'opera',
                key:'opera',
                align:'center',
                render:(text,record)=>(<span><a onClick={this.handleDelete.bind(this,record._id)} >删除</a></span>)
            }
        ]

        return(
            <div className='teacher-info__wrapper'>
                <Row>
                    <Col span={24}>
                    <Breadcrumb >
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>管理</Breadcrumb.Item>
                        <Breadcrumb.Item>教师信息管理</Breadcrumb.Item>
                    </Breadcrumb>
                    </Col>
                    </Row>
                <Row style={{ margin: '20px 0' }} >
                    <Col span={6}>
                        <Search
                            className='search-input'
                            placeholder="输入学生学号检索"
                            onSearch={value => this.handleSearch(value)}
                        />
                    </Col>
                </Row>
                <Table
                    rowKey={'_id'}
                    loading={this.props.loading}
                    columns={columns}
                    dataSource={this.props.data}
                />
            </div>
        )
    }
}

export default TeacherInfo;