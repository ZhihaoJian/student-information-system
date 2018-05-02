import React from 'react';
import { Row, Col, Table, Input ,Breadcrumb} from 'antd';
import {connect} from 'react-redux';
import {loadPunishInfo,deletePunishInfo} from '../../../redux/admin/loadData.redux';
import './punish-info.scss';
const Search = Input.Search;

@connect(
    state=>state.loadData,
    {loadPunishInfo,deletePunishInfo}
)
class PunishInfo extends React.Component{

    componentDidMount(){
        this.props.loadPunishInfo();
    }

    handleSearch(value){
        this.props.loadPunishInfo(value);
    }

    handleDelete(id){
        this.props.deletePunishInfo(id);
    }

    render(){
        const columns = [
            {
                title:'姓名',
                dataIndex:'name',
                key:'name',
                align:'center'
            },
            {
                title:'学号',
                dataIndex:'studentID',
                key:'studentID',
                align:'center'
            }
            ,
            {
                title:'处分日期',
                dataIndex:'punishDate',
                key:'punishDate',
                align:'center',
                render:(text)=>(<span>{(new Date(Number.parseInt(text,10)).toDateString())}</span>)
            }
            ,
            {
                title:'处分详情',
                dataIndex:'punishDetail',
                key:'punishDetail',
                align:'center'
            }
            ,
            {
                title:'处分结果',
                dataIndex:'punishResult',
                key:'punishResult',
                align:'center'
            },
            {
                title:'操作',
                dataIndex:'opera',
                key:"opera",
                align:'center',
                render:(text,record) => (<span><a onClick={this.handleDelete.bind(this,record._id)} >删除</a></span>)
            }
        ]

        return(
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

export default PunishInfo;