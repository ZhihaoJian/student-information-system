import React from 'react';
import { Col, Row, Input, Table, Popconfirm ,Breadcrumb,Button} from 'antd';
import { connect } from 'react-redux';
import AddUserModal from './add-user-modal/add-user-modal';
import { loadRegistedUserInfo,addNewUser, deleteRegisterUser } from '../../../redux/admin/loadData.redux';
import './register-user.scss';
const Search = Input.Search;


@connect(
    state => state.loadData,
    { loadRegistedUserInfo, deleteRegisterUser,addNewUser }
)
class RegisterUser extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            visible:false
        }
    }

    componentDidMount() {
        this.props.loadRegistedUserInfo();
    }

    handleSearch(value) {
        this.props.loadRegistedUserInfo(value);
    }

    handleDeleteUser(id) {
        this.props.deleteRegisterUser(id);
    }

    handleAddUser(visible,newData){
        this.setState({visible});
        this.props.addNewUser(newData);
    }

    render() {

        const columns = [
            {
                title: '识别号',
                dataIndex: 'id',
                align: 'center',
                key: 'id',
            },
            {
                title: '用户名',
                dataIndex: 'name',
                align: 'center',
                key: 'name',
            },
            {
                title: '密码',
                dataIndex: 'password',
                key: 'password',
                align: 'center'
            },
            {
                title: '角色',
                dataIndex: 'role',
                align: 'center',
                key: 'role',
                render:(text)=>{
                    if(text === 'admin'){
                        return '管理员'
                    }else if(text === 'student'){
                        return '学生';
                    }else{
                        return '教师';
                    }
                }
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                align: 'center',
                key: 'createTime',
                render: (date) => {
                    const newDate = (new Date(Number.parseInt(date, 10))).toDateString();
                    return <span>{newDate}</span>
                }
            },  
            {
                title: '操作',
                dataIndex: 'opera',
                align: 'center',
                key: 'opera',
                render: (text, record) => {
                    return (
                        <Popconfirm title="确定要删除该用户?" onConfirm={this.handleDeleteUser.bind(this, record._id)} okText="确定" cancelText="不">
                            <a >删除</a>
                        </Popconfirm>
                    )
                }
            }
        ]

        return (
            <div className='register-user__wrapper' >
                <Row>
                    <Col span={24}>
                        <Breadcrumb >
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>管理</Breadcrumb.Item>
                            <Breadcrumb.Item>注册用户管理</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row style={{ margin: '12px 0' }}>
                    <Col span={6} >
                        <Search
                            className='search-input'
                            placeholder="输入用户检索"
                            onSearch={value => this.handleSearch(value)}
                        />
                    </Col>
                    <Col span={2} offset={16} >
                        <Button type='primary' onClick={()=>this.setState({visible:true})} style={{height:50,float:'right',overflow:'hidden'}} >新增用户</Button>
                    </Col>
                </Row>
                <Table
                    style={{marginTop:20}}
                    bordered
                    loading={this.props.loading}
                    rowKey={'_id'}
                    columns={columns}
                    dataSource={this.props.data}
                />
                <AddUserModal 
                    maxID={this.props.maxID}
                    visible={this.state.visible}
                    handleCancel={visible=>this.setState({visible})}
                    handleOk={(visible,newData)=>this.handleAddUser(visible,newData)}
                />
            </div>
        )
    }
}

export default RegisterUser;