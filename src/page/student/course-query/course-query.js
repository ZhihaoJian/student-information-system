import React from 'react';
import { connect } from 'react-redux';
import { Breadcrumb, Row, Col, Input, Table } from 'antd';
import { loadCourseList, deleteCourse, addCourse, updateCourse } from '../../../redux/course/course.redux';
const Search = Input.Search;

@connect(
    state => state.couseListReducers,
    { loadCourseList, deleteCourse, addCourse, updateCourse }
)
class CourseQuery extends React.Component {

    componentDidMount() {
        this.props.loadCourseList();
    }

    handleSearch(value) {
        this.props.loadCourseList(value);
    }

    render() {

        const columns = [
            {
                title: '课程编号',
                dataIndex: 'courseID',
                align: 'center',
                key: 'courseID'
            },
            {
                title: '课程名称',
                dataIndex: 'courseName',
                align: 'center',
                key: 'courseName'
            },
            {
                title: '学分',
                dataIndex: 'point',
                align: 'center',
                key: 'point'
            },
            {
                title: '所属专业',
                dataIndex: 'major',
                align: 'center',
                key: 'major'
            },
            {
                title: '课程类型',
                dataIndex: 'courseType',
                align: 'center',
                key: 'courseType'
            }
        ]

        return (
            <div>
                <Row>
                    <Col span={24}>
                        <Breadcrumb>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>管理</Breadcrumb.Item>
                            <Breadcrumb.Item>课程查询</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row style={{ margin: '20px 0' }} >
                    <Col span={6}>
                        <Search
                            placeholder='请输入关键字查询'
                            onSearch={(value) => this.handleSearch(value)}
                        />
                    </Col>
                </Row>
                <Table
                    rowKey='_id'
                    columns={columns}
                    bordered
                    dataSource={this.props.data}
                />
            </div>
        )
    }
}

export default CourseQuery;