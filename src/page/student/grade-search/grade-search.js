import React from 'react';
import { Breadcrumb, Table, Input, Col, Row } from 'antd';
import { connect } from 'react-redux';
import { loadGradeInfo, reset, searchGradeInfo } from '../../../redux/student/loadData.redux';
const Search = Input.Search;

@connect(
    state => state.studentReducers,
    { loadGradeInfo, reset, searchGradeInfo }
)
class GradeSearch extends React.Component {

    componentDidMount() {
        this.props.loadGradeInfo();
    }

    componentWillUnmount() {
        this.props.reset();
    }

    handleSearch(value) {
        if (value) {
            this.props.searchGradeInfo(value);
        } else {
            this.props.loadGradeInfo();
        }
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
            }
        ]


        return (
            <div>
                <Breadcrumb >
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>成绩查询</Breadcrumb.Item>
                </Breadcrumb>
                {/* <Row style={{ margin: '20px 0' }} >
                    <Col span={6}>
                        <Search
                            className='search-input'
                            placeholder="输入检索内容,暂不支持成绩、绩点检索"
                            onSearch={value => this.handleSearch(value)}
                        />
                    </Col>
                </Row> */}
                <div style={{ marginTop: '20px' }} >
                    <Table
                        bordered
                        loading={this.props.loading}
                        rowKey={'_id'}
                        columns={columns}
                        dataSource={this.props.data}
                    />

                </div>
            </div>
        )
    }
}

export default GradeSearch;