import React from 'react';
import { Row, Col, Form,Breadcrumb,Input ,Button,Select} from 'antd';
import {connect} from 'react-redux';
import {loadTeacherInfo,updateTeacherInfo,resetReducersState} from '../../../redux/teacher/loadData.redux';
const FormItem = Form.Item;
const Option = Select.Option;

@connect(
    state=>state.teacherReducers,
    {loadTeacherInfo,updateTeacherInfo,resetReducersState}
)
class UpdateMyInfo extends React.Component{

    componentDidMount(){
        this.props.loadTeacherInfo();
    }

    componentWillUnmount(){
        this.props.resetReducersState();
    }

    handleUpdate(){
        const data = this.props.form.getFieldsValue();
        this.props.updateTeacherInfo(data);
    }

    checkPhoneNumber = (rule, value, callback) => {
        if (!/^1[3|4|5|7|8][0-9]{9}$/.test(value)) {
          callback('貌似不是正确的电话格式?');
        } else {
          callback();
        }
      }

    render(){
        const {getFieldDecorator} = this.props.form;
        const data = this.props.data;
        return data && data.length > 0 ? (
            <div className='teacher-info__wrapper'>
                <Row>
                    <Col span={24}>
                    <Breadcrumb >
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>管理</Breadcrumb.Item>
                        <Breadcrumb.Item>个人信息修改</Breadcrumb.Item>
                    </Breadcrumb>
                    </Col>
                    </Row>
                <div style={{marginTop:20}} >
                    <Form>
                        <FormItem label='职工号'>
                            {getFieldDecorator('teacherNum',{
                                initialValue:data[0].teacherNum
                            })(
                                <Input disabled size='large' />
                            )}
                        </FormItem>
                        <FormItem label='姓名'>
                            {getFieldDecorator('teacherName',{
                                initialValue:data[0].teacherName
                            })(
                                <Input size='large' placeholder='请输入您的姓名' />
                            )}
                        </FormItem>
                        <FormItem label='性别'>
                            {getFieldDecorator('gender',{
                                initialValue:data[0].gender || '男'
                            })(
                                <Select size='large' >
                                    <Option value="male">男</Option>
                                    <Option value="female">女</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label='所授专业'>
                            {getFieldDecorator('major',{
                                initialValue:data[0].major
                            })(
                                <Select placeholder='请选择您所授专业' size='large'>
                                    <Option value="电子信息科学与技术（应用电子、智能控制与机器人）">电子信息科学与技术（应用电子、智能控制与机器人）</Option>                                   
                                    <Option value="计算机科学与技术（网络工程、数字媒体技术）">计算机科学与技术（网络工程、数字媒体技术）</Option>                                   
                                    <Option value="软件工程（商业应用软件、移动互联软件）">软件工程（商业应用软件、移动互联软件）</Option>                                   
                                    <Option value="物联网工程">物联网工程</Option>                                   
                                    <Option value="信息管理与信息系统（金融信息管理）">信息管理与信息系统（金融信息管理）</Option>                                   
                                    <Option value="金融学专业">金融学专业</Option>                                   
                                    <Option value="投资学专业">投资学专业</Option>                                   
                                    <Option value="德语专业（涉外翻译方向）">德语专业（涉外翻译方向）</Option>                                   
                                    <Option value="德语专业（国际经济与贸易方向）">德语专业（国际经济与贸易方向）</Option>                                   
                                    <Option value="德语专业（国际经济与贸易方向）">德语专业（国际经济与贸易方向）</Option>                                   
                                    <Option value="日语专业（国际经济与贸易方向）">日语专业（国际经济与贸易方向）</Option>                                   
                                    <Option value="英语专业（涉外翻译方向）">英语专业（涉外翻译方向）</Option>                                   
                                    <Option value="英语专业（涉外翻译方向）">英语专业（涉外翻译方向）</Option>                                   
                                    <Option value="商务英语专业（国际经济与贸易方向）">商务英语专业（国际经济与贸易方向）</Option>                                   
                                    <Option value="商务英语专业（国际经济与贸易方向）">商务英语专业（国际经济与贸易方向）</Option>                                   
                                    <Option value="英语（“3+1”中英学分互认国际班）">英语（“3+1”中英学分互认国际班）</Option>                                   
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label='所属学院'>
                            {getFieldDecorator('department',{
                                initialValue:data[0].department
                            })(
                                <Select placeholder='请选择您所属的学院' size='large'>
                                    <Option value="国际学院">国际学院</Option>                                   
                                    <Option value="会计学院">会计学院</Option>                                   
                                    <Option value="信息技术与工程学院">信息技术与工程学院</Option>                                   
                                    <Option value="金融学院">金融学院</Option>                                   
                                    <Option value="外国语学院">外国语学院</Option>                                   
                                    <Option value="旅游学院">旅游学院</Option>                                   
                                    <Option value="电商管理学院">电商管理学院</Option>                                   
                                    <Option value="法学院">法学院</Option>                                   
                                    <Option value="艺术设计学院">艺术设计学院</Option>                                   
                                    <Option value="继续教育学院">继续教育学院</Option>                                   
                                    <Option value="公共体育部">公共体育部</Option>                                   
                                    <Option value="思政课教学部">思政课教学部</Option>                                   
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label='联系方式'>
                            {getFieldDecorator('tel',{
                                rules:[
                                    {   max:11,
                                        validator:this.checkPhoneNumber
                                    }
                                ],
                                initialValue:data[0].tel
                            })(
                                <Input size='large' type='tel' placeholder='请输入您的联系方式' />
                            )}
                        </FormItem>
                        <Button size='large' type='primary' onClick={this.handleUpdate.bind(this)} >保存</Button>
                    </Form>
                </div>
            </div>
        ):null
    }    
}

export default UpdateMyInfo = Form.create()(UpdateMyInfo);