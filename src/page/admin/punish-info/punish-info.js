import React from 'react';
import { Row, Col, Table, Input, Breadcrumb, Button, Popconfirm } from 'antd';
import { connect } from 'react-redux';
// import { loadPunishInfo, deletePunishInfo } from '../../../redux/admin/loadData.redux';
import { loadPunishInfo, deletePunishInfo, resetReducersState, updatePunishInfo, addPunishInfo } from '../../../redux/teacher/loadData.redux';
import './punish-info.scss';
import AddPunishModal from './add-punish/add-punish';
import UpdateModal from './update-modal/update-modal';
const Search = Input.Search;

@connect(
    state => state.teacherReducers,
    { loadPunishInfo, deletePunishInfo, resetReducersState, updatePunishInfo, addPunishInfo }
)
class PunishInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            addPunishmentVisible: false,
            data: []
        }
    }

    componentDidMount() {
        this.props.loadPunishInfo();
    }

    componentWillUnmount() {
        this.props.resetReducersState();
    }

    handleSearch(value) {
        this.props.loadPunishInfo(value);
    }

    handleDelete(id) {
        this.props.deletePunishInfo(id);
    }

    handleVisible(id) {
        this.setState({
            visible: true,
            data: this.props.data.filter(item => item._id === id)
        })
    }

    handleDeletePunishment(id) {
        this.props.deletePunishInfo(id);
    }

    handleUpdate(visible, newData) {
        this.setState({
            visible
        });
        this.props.updatePunishInfo(newData);
    }

    handleAddPunish(visible, newData) {
        this.setState({
            addPunishmentVisible: visible
        });
        this.props.addPunishInfo(newData);
    }

    render() {
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                align: 'center'
            },
            {
                title: '学号',
                dataIndex: 'studentID',
                key: 'studentID',
                align: 'center'
            }
            ,
            {
                title: '处分日期',
                dataIndex: 'punishDate',
                key: 'punishDate',
                align: 'center',
                render: (text) => (<span>{(new Date(Number.parseInt(text, 10)).toDateString())}</span>)
            }
            ,
            {
                title: '处分详情',
                dataIndex: 'punishDetail',
                key: 'punishDetail',
                align: 'center'
            }
            ,
            {
                title: '处分结果',
                dataIndex: 'punishResult',
                key: 'punishResult',
                align: 'center'
            },
            // {
            //     title: '操作',
            //     dataIndex: 'opera',
            //     key: "opera",
            //     align: 'center',
            //     render: (text, record) => (<span><a onClick={this.handleDelete.bind(this, record._id)} >删除</a></span>)
            // },
            {
                title: '操作',
                dataIndex: 'opera',
                align: 'center',
                key: 'opera',
                render: (text, record) => {
                    return (
                        <span>
                            <a style={{ marginRight: 10 }} onClick={this.handleVisible.bind(this, record._id)} >修改</a>
                            <Popconfirm title="确定要删除该处分?" onConfirm={this.handleDeletePunishment.bind(this, record.studentID)}>
                                <a >删除</a>
                            </Popconfirm>
                        </span>
                    )
                }
            }
        ]

        return (
            <div className='punish-info__wrappper'>
                <Row>
                    <Col span={24}>
                        <Breadcrumb>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>管理</Breadcrumb.Item>
                            <Breadcrumb.Item>处分信息管理</Breadcrumb.Item>
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
                    <Col span={2} offset={16}>
                        <Button
                            type='primary'
                            style={{ float: 'right', overflow: 'hidden' }}
                            onClick={() => this.setState({ addPunishmentVisible: true })} >新增处分
                        </Button>
                    </Col>
                </Row>
                <Table
                    rowKey={'_id'}
                    loading={this.props.loading}
                    columns={columns}
                    dataSource={this.props.data}
                />
                <UpdateModal
                    visible={this.state.visible}
                    data={this.state.data}
                    handleCancel={visible => this.setState({ visible })}
                    handleOk={(visible, newData) => this.handleUpdate(visible, newData)}
                />
                <AddPunishModal
                    visible={this.state.addPunishmentVisible}
                    handleOk={(visible, newData) => this.handleAddPunish(visible, newData)}
                    handleCancel={visible => this.setState({ addPunishmentVisible: visible })}
                />
            </div>
        )
    }
}

export default PunishInfo;