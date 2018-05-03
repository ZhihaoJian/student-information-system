import React from 'react';
import {Breadcrumb,Table,Popconfirm,Row,Input,Col,Button} from 'antd';
import {connect} from 'react-redux';
import UpdateModal from './update-modal/update-modal';
import AddGradeModal from './add-grade-modal/add-grade-modal';
import {loadGradeInfo,deleteGrade,doUpdateGrade,addGrade,resetReducersState} from '../../../redux/teacher/loadData.redux';
import './grade-manage.scss';
const Search = Input.Search;

@connect(
    state=>state.teacherReducers,
    {loadGradeInfo,deleteGrade,doUpdateGrade,addGrade,resetReducersState}
)
class GradeManage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            visible:false,
            addGradeVisible:false,
            data:[],
            keyword:''
        }
    }

    componentDidMount(){
        this.props.loadGradeInfo();
    }

    componentWillUnmount(){
        this.props.resetReducersState();
    }

    handleDeleteGrade(id) {
        this.props.deleteGrade(id);
        this.props.loadGradeInfo();                
    }

    handleSearch(value){
        this.setState({keyword:value});
        this.props.loadGradeInfo(value);        
    }

    handleVisible(id){
        this.setState({
            visible:true,
            data:this.props.data.filter(item=>item._id === id)
        })
    }

    handleUpdate(visible,newData){
        this.setState({visible});
        this.props.doUpdateGrade(newData);
        this.props.loadGradeInfo();        
    }

    handleAddGrade(visible,data){
        this.setState({addGradeVisible:false});
        this.props.addGrade(data);
        this.props.loadGradeInfo();
    }

    render(){

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
                        <span>
                            <a style={{marginRight:10}} onClick={this.handleVisible.bind(this,record._id)} >修改</a>
                            <Popconfirm title="确定要删除当前成绩?" onConfirm={this.handleDeleteGrade.bind(this, record._id)} okText="确定" cancelText="不">
                                <a >删除</a>
                            </Popconfirm>
                        </span>
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
                            <a style={{marginRight:10}} onClick={this.handleVisible.bind(this,record._id)} >修改</a>
                            <Popconfirm title="确定要删除当前成绩?" onConfirm={this.handleDeleteGrade.bind(this, record._id)} okText="确定" cancelText="不">
                                <a >删除</a>
                            </Popconfirm>
                        </span>
                    )
                }
            }
        ]


        return(
            <div className='grade-manage__wrapper' >
                <Row>
                    <Col span={24}>
                        <Breadcrumb >
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>成绩管理</Breadcrumb.Item>
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
                            style={{float:'right',overflow:'hidden'}}
                            onClick={()=>this.setState({addGradeVisible:true})} >新增成绩
                        </Button>
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
                <UpdateModal 
                    visible={this.state.visible}
                    handleOk={(visible,newData)=>this.handleUpdate(visible,newData)}
                    handleCancel={(visible)=>this.setState({visible})}
                    data={this.state.data}
                />
                <AddGradeModal
                    visible={this.state.addGradeVisible}
                    handleOk={(visible,newData)=>this.handleAddGrade(visible,newData)}
                    handleCancel={(visible)=>this.setState({addGradeVisible:visible})}
                />
            </div>
        )
    }
}

export default GradeManage;