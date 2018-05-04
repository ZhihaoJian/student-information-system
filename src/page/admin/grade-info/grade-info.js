import React from 'react';
import { Row, Col, Table, Input, Breadcrumb,Popconfirm } from 'antd';
import {connect} from 'react-redux';
import {loadGradeInfo,deleteGrade} from '../../../redux/admin/loadData.redux';
import './grade-info.scss';

const Search = Input.Search;

@connect(
    state=>state.loadData,
    {loadGradeInfo,deleteGrade}
)
class GradeInfo extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            keyword:''
        }
    }

    handleDeleteGrade(id) {
        this.props.deleteGrade(id);
    }

    componentDidMount(){
        this.props.loadGradeInfo();
    }

    handleSearch(value){
        this.setState({keyword:value});
        this.props.loadGradeInfo(value);        
    }

    render() {

        const columns = [
            {
                title: '学号',
                dataIndex: 'studentID',
                align: 'center',
                key: 'studentID'
            },
            {
                title: '姓名 ',
                dataIndex: 'name',
                align: 'center',
                key: 'name'
            },
            {
                title: '学年',
                dataIndex: 'year',
                align: 'center',
                key: 'year'
            },
            {
                title: '学期',
                dataIndex: 'term',
                align: 'center',
                key: 'term'
            },
            {
                title: '课程',
                dataIndex: 'lesson',
                align: 'center',
                key: 'lesson'
            },
            {
                title: '成绩',
                dataIndex: 'grade',
                align: 'center',
                key: 'grade'
            },
            {
                title: '绩点',
                dataIndex: 'gradePoint',
                align: 'center',
                key: 'gradePoint'
            },
            {
                title: '操作',
                dataIndex: 'opera',
                align: 'center',
                key: 'opera',
                render: (text, record) => {
                    return (
                        <Popconfirm title="确定要删除当前成绩?" onConfirm={this.handleDeleteGrade.bind(this, record._id)} okText="确定" cancelText="不">
                            <a >删除</a>
                        </Popconfirm>
                    )
                }
            }
        ]

        const searchedColumns = [
            {
                title: '学年',
                dataIndex: 'year',
                align: 'center',
                key: 'year'
            },
            {
                title: '学期',
                dataIndex: 'term',
                align: 'center',
                key: 'term'
            },
            {
                title: '课程',
                dataIndex: 'lesson',
                align: 'center',
                key: 'lesson'
            },
            {
                title: '成绩',
                dataIndex: 'grade',
                align: 'center',
                key: 'grade'
            },
            {
                title: '绩点',
                dataIndex: 'gradePoint',
                align: 'center',
                key: 'gradePoint'
            },
            {
                title: '操作',
                dataIndex: 'opera',
                align: 'center',
                key: 'opera',
                render: (text, record) => {
                    return (
                        <span>
                            {/* <a style={{marginRight:10}} onClick={this.handleVisible.bind(this,record._id)} >修改</a> */}
                            <Popconfirm title="确定要删除当前成绩?" onConfirm={this.handleDeleteGrade.bind(this, record._id)} okText="确定" cancelText="不">
                                <a >删除</a>
                            </Popconfirm>
                        </span>
                    )
                }
            }
        ]

        return (
            <div className='grade-info__wrapper'>
                <Row>
                    <Col span={24}>
                        <Breadcrumb >
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>管理</Breadcrumb.Item>
                            <Breadcrumb.Item>成绩信息管理</Breadcrumb.Item>
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
                {
                    this.state.keyword ? (
                        <React.Fragment>
                            <p>学号：{this.state.keyword}</p>
                            <p>姓名：{this.props.studentName}</p>
                        </React.Fragment>
                    ):null
                }
                <Table
                    bordered
                    loading={this.props.loading}
                    rowKey={'_id'}
                    columns={!!this.state.keyword ? searchedColumns : columns }
                    dataSource={this.props.data}
                />
            </div>
        )
    }
}

export default GradeInfo;