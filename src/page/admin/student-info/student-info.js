import React from 'react';
import { Input,Row,Col,Breadcrumb  } from 'antd';
import {connect} from 'react-redux';
import {Table} from 'antd';
import {loadStudentInfo} from '../../../redux/admin/loadData.redux';
import './student-info.scss';
const Search = Input.Search;

@connect(
    state=>state.loadData,
    {loadStudentInfo}
)
class StudentInfo extends React.Component {
    
    componentDidMount(){
        this.props.loadStudentInfo();
    }

    handleSearch(value){
        this.props.loadStudentInfo(value);
    }

    render() {

        const columns = [
           {
            title: '姓名',
            dataIndex: 'name',
            align:'center',
            key: 'name',
          },
           {
            title: '学号',
            dataIndex: 'studentID',
            align:'center',
            key: 'studentID',
          },
          {
            title: '学校名称',
            dataIndex: 'college',
            align:'center',
            key: 'college',
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