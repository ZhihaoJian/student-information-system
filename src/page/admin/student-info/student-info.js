import React from 'react';
import { Input,Row,Col,Breadcrumb,Popconfirm  } from 'antd';
import {connect} from 'react-redux';
import {Table} from 'antd';
import {loadStudentInfo,deleteStudentArchive} from '../../../redux/admin/loadData.redux';
import './student-info.scss';
const Search = Input.Search;

@connect(
    state=>state.loadData,
    {loadStudentInfo,deleteStudentArchive}
)
class StudentInfo extends React.Component {
    
    componentDidMount(){
        this.props.loadStudentInfo();
    }

    handleSearch(value){
        this.props.loadStudentInfo(value);
    }

    handleDeleteGrade(id){
        this.props.deleteStudentArchive(id);
        this.props.loadStudentInfo();
    }

    render() {

        const columns = [
            {
             title: '学号',
             dataIndex: 'studentID',
             align:'center',
             key: 'studentID',
           },
           {
            title: '姓名',
            dataIndex: 'realName',
            align:'center',
            key: 'realName',
          },
          {
            title: '联系电话',
            dataIndex: 'tel',
            align:'center',
            key: 'tel',
          },
          {
            title: '性别',
            dataIndex: 'gender',
            align:'center',
            key: 'gender',
          },
          {
            title: '身份证号',
            dataIndex: 'idCardNumber',
            align:'center',
            key: 'idCardNumber',
          },
          {
            title: '籍贯',
            dataIndex: 'origin',
            align:'center',
            key: 'origin',
          },
          {
            title: '父母姓名',
            dataIndex: 'parentName',
            align:'center',
            key: 'parentName',
          },
          {
            title: '父母联系方式',
            dataIndex: 'parentTel',
            align:'center',
            key: 'parentTel',
          },
          {
            title: '家庭住址',
            dataIndex: 'address',
            align:'center',
            key: 'address',
          },
          {
            title: '生日',
            dataIndex: 'birthday',
            align:'center',
            key: 'birthday',
          },
          {
            title: '学历',
            dataIndex: 'education',
            align:'center',
            key: 'education',
          },
          
          {
            title: '所在班级',
            dataIndex: 'class',
            align:'center',
            key: 'class',
          },
          {
            title: '获奖情况',
            dataIndex: 'awardInfo',
            align:'center',
            key: 'awardInfo',
          },
          {
            title: '入学年份',
            dataIndex: 'enterYear',
            align:'center',
            key: 'enterYear',
          },
          {
            title: '政治面貌',
            dataIndex: 'politicalStatus',
            align:'center',
            key: 'politicalStatus',
          },
          {
            title: '惩处',
            dataIndex: 'punish',
            align:'center',
            key: 'punish',
          },
          {
            title: '操作',
            dataIndex: 'opera',
            align: 'center',
            key: 'opera',
            render: (text, record) => {
                return (
                    <span>
                        <Popconfirm title="确定要删除记录?" onConfirm={this.handleDeleteGrade.bind(this, record._id)} okText="确定" cancelText="不">
                            <a >删除</a>
                        </Popconfirm>
                    </span>
                )
            }
        }
        ];

        return (
            <div className='student-info__wrapper'>
                <Row>
                    <Col span={24}>
                    <Breadcrumb>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>管理</Breadcrumb.Item>
                        <Breadcrumb.Item>学生信息管理</Breadcrumb.Item>
                    </Breadcrumb>
                    </Col>
                </Row>
                <Row style={{margin:'12px 0'}} >
                    <Col span={6} >
                        <Search
                            className='search-input'
                            placeholder="输入学号检索"
                            onSearch={value => this.handleSearch(value)}
                        />
                    </Col>
                </Row>
               <Table
                    style={{marginTop:20}}
                    bordered
                    rowKey={'_id'}
                    loading={this.props.loading}
                    columns={columns}
                    dataSource={this.props.data}
               />
            </div>
        )
    }
}

export default StudentInfo;