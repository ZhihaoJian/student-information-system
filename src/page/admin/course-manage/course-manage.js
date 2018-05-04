import React from 'react';
import { Button, Breadcrumb, Row, Col, Input, Table, Popconfirm } from 'antd';
import AddNewCourse from './add-new-course/add-new-course';
import { loadCourseList, deleteCourse, addCourse, updateCourse } from '../../../redux/course/course.redux';
import UpdateCourse from './update-course/update-course';
import { connect } from 'react-redux';

const Search = Input.Search;

@connect(
    state => state.couseListReducers,
    { loadCourseList, deleteCourse, addCourse, updateCourse }
)
class CourseManage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            updateCourseVisible: false,
            addCourseModalVisible: false
        }
    }

    componentDidMount() {
        this.props.loadCourseList();
    }

    handleSearch(value) {
        this.props.loadCourseList(value);
    }

    handleAddCourse(visible, newData) {
        this.setState({ addCourseModalVisible: visible });
        this.props.addCourse(newData);
    }

    handleDelete(id) {
        this.props.deleteCourse(id);
    }

    handleUpdate(visible, data) {
        this.setState({ updateCourseVisible: visible });
        this.props.updateCourse(data);
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
            },
            {
                title: '操作',
                dataIndex: 'opera',
                align: 'center',
                key: 'opera',
                render: (text, record) => (
                    <span>
                        <a style={{ marginRight: '10px' }}
                            onClick={() => this.setState({
                                updateCourseVisible: true,
                                data: this.props.data.filter(item => item._id === record._id)
                            })} >修改</a>
                        <Popconfirm title="确定要删除该课程?" onConfirm={this.handleDelete.bind(this, record._id)} okText="确定" cancelText="不">
                            <a>删除</a>
                        </Popconfirm>
                    </span>
                )
            }
        ]

        return (
            <div>
                <Row>
                    <Col span={24}>
                        <Breadcrumb>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>管理</Breadcrumb.Item>
                            <Breadcrumb.Item>课程管理</Breadcrumb.Item>
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
                    <Col span={2} offset={16} >
                        <Button
                            type='primary'
                            style={{ float: 'right', overflow: 'hidden' }}
                            onClick={() => this.setState({ addCourseModalVisible: true })} >新增课程</Button>
                    </Col>
                </Row>
                <AddNewCourse
                    visible={this.state.addCourseModalVisible}
                    handleCancel={() => this.setState({ addCourseModalVisible: false })}
                    handleOk={(visible, newData) => this.handleAddCourse(visible, newData)}
                />
                <UpdateCourse
                    data={this.state.data}
                    visible={this.state.updateCourseVisible}
                    handleCancel={() => this.setState({ updateCourseVisible: false })}
                    handleUpdate={(visible, data) => this.handleUpdate(visible, data)}
                />
                <div style={{ marginTop: 20 }} >
                    <Table
                        rowKey='_id'
                        columns={columns}
                        bordered
                        dataSource={this.props.data}
                    />
                </div>
            </div>
        )
    }
}

export default CourseManage;