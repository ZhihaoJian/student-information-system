import React from 'react';
import {Form,Row,Col,Breadcrumb,Input,Select,Button} from 'antd';
import {loadMyInfo,reset,updateMyInfo} from '../../../redux/student/loadData.redux';
import {connect} from 'react-redux';
const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;

@connect(
    state=>state.studentReducers,
    {loadMyInfo,reset,updateMyInfo}
)
class Archive extends React.Component{

    componentDidMount(){
        this.props.loadMyInfo();
    }

    componentWillUnmount(){
        this.props.reset();
    }

    handleUpdate(){
        const data = this.props.form.getFieldsValue();
        this.props.updateMyInfo(data);
    }

    render(){
        const {getFieldDecorator} = this.props.form;
        const data = this.props.data;
        return data && data.length > 0 ?  (
            <div>
                <Row>
                    <Col span={24}>
                    <Breadcrumb>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>管理</Breadcrumb.Item>
                        <Breadcrumb.Item>学生信息管理</Breadcrumb.Item>
                    </Breadcrumb>
                    </Col>
                </Row>
                <div style={{marginTop:20}} >
                    <Form>
                        <FormItem label='学号' >
                            {getFieldDecorator('id',{
                                initialValue:data[0].studentID
                            })(
                                <Input disabled size='large' />
                            )}
                        </FormItem>
                        <FormItem label='姓名' >
                            {getFieldDecorator('realName',{
                                initialValue:data[0].realName
                            })(
                                <Input size='large' placeholder='请输入您的真实姓名' />
                            )}
                        </FormItem>
                        <FormItem label='联系电话' >
                            {getFieldDecorator('tel',{
                                initialValue:data[0].tel
                            })(
                                <Input size='large' type='tel' placeholder='请填写您的真实联系方式' />
                            )}
                        </FormItem>
                        <FormItem label='性别' >
                            {getFieldDecorator('gender',{
                                initialValue:data[0].gender || '男'
                            })(
                                <Select size='large' >
                                    <Option value="男">男</Option>
                                    <Option value="女">女</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label='班级' >
                            {getFieldDecorator('class',{
                                initialValue:data[0].class
                            })(
                                <Input size='large' placeholder='请如实填写您的班级' />
                            )}
                        </FormItem>
                        <FormItem label='入学年份' >
                            {getFieldDecorator('enterYear',{
                                initialValue: (new Date(data[0].enterYear)).getFullYear()
                            })(
                                <Input placeholder='请填写您的入学年份'size='large' />
                            )}
                        </FormItem>
                        <FormItem label='获奖情况' >
                            {getFieldDecorator('awardInfo',{
                                initialValue:data[0].awardInfo
                            })(
                                <TextArea placeholder='请填写您的获奖情况，若无则不填' autosize={true} />
                            )}
                        </FormItem>
                        <FormItem label='政治面貌'>
                            {getFieldDecorator('politicalStatus',{
                                initialValue:data[0].politicalStatus
                            })(
                                <Select size='large' >
                                    <Option value="群众">群众</Option>
                                    <Option value="团员">团员</Option>
                                    <Option value="党员">党员</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label='惩处'>
                            {getFieldDecorator('punish',{
                                initialValue:data[0].punish
                            })(
                                <Input size='large' disabled/>
                            )}
                        </FormItem>
                        <Button size='large' type='primary' onClick={this.handleUpdate.bind(this)} >保存</Button>
                    </Form>
                </div>
            </div>
        ):null
    }
}

export default Archive = Form.create()(Archive);