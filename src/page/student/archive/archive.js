import React from 'react';
import { Form, Row, Col, Breadcrumb, Input, Select, Button, DatePicker } from 'antd';
import { loadMyInfo, reset, updateMyInfo } from '../../../redux/student/loadData.redux';
import { connect } from 'react-redux';
import moment from 'moment';
import './archive.scss';
const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;

@connect(
    state => state.studentReducers,
    { loadMyInfo, reset, updateMyInfo }
)
class Archive extends React.Component {

    componentDidMount() {
        this.props.loadMyInfo();
    }

    componentWillUnmount() {
        this.props.reset();
    }

    handleUpdate() {
        const data = this.props.form.getFieldsValue();
        this.props.updateMyInfo(data);
    }

    checkID = (rule, value, callback) => {
        if (!/^(\d{6})(18|19|20)?(\d{2})([01]\d)([0123]\d)(\d{3})(\d|X)?$/.test(value)) {
            callback('不是正确的身份证号码格式');
        } else {
            callback();
        }
    }

    checkPhoneNumber = (rule, value, callback) => {
        if (!/^((1[3-8][0-9])+\d{8})$/.test(value)) {
            callback('不是正确的手机号码格式');
        } else {
            callback();
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const data = this.props.data;
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 21 }
        }
        return data && data.length > 0 ? (
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
                <div className='archive-form'>
                    <Form layout='horizontal' >
                        <FormItem label='学号'  {...formItemLayout} >
                            {getFieldDecorator('id', {
                                initialValue: data[0].studentID
                            })(
                                <Input disabled />
                            )}
                        </FormItem>
                        <FormItem label='姓名' {...formItemLayout}  >
                            {getFieldDecorator('realName', {
                                initialValue: data[0].realName
                            })(
                                <Input placeholder='请输入您的真实姓名' />
                            )}
                        </FormItem>
                        <FormItem label='联系电话'  {...formItemLayout} >
                            {getFieldDecorator('tel', {
                                rules: [{
                                    validator: this.checkPhoneNumber
                                }],
                                initialValue: data[0].tel
                            })(
                                <Input type='tel' placeholder='请填写您的真实联系方式' />
                            )}
                        </FormItem>
                        <FormItem label='身份证' {...formItemLayout}  >
                            {getFieldDecorator('idCardNumber', {
                                rules: [
                                    {
                                        validator: this.checkID
                                    }],
                                initialValue: data[0].idCardNumber,
                            })(
                                <Input placeholder='请输入身份证号码' />
                            )}
                        </FormItem>
                        <FormItem label='籍贯' {...formItemLayout}  >
                            {getFieldDecorator('origin', {
                                initialValue: data[0].origin,
                            })(
                                <Input placeholder='请输入籍贯' />
                            )}
                        </FormItem>
                        <FormItem label='性别' {...formItemLayout}  >
                            {getFieldDecorator('gender', {
                                initialValue: data[0].gender || '男'
                            })(
                                <Select  >
                                    <Option value="男">男</Option>
                                    <Option value="女">女</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label='家庭住址' {...formItemLayout}  >
                            {getFieldDecorator('address', {
                                initialValue: data[0].address,
                            })(
                                <Input placeholder='请输入家庭住址' />
                            )}
                        </FormItem>
                        <FormItem label='父母姓名' {...formItemLayout}  >
                            {getFieldDecorator('parentName', {
                                initialValue: data[0].parentName,
                            })(
                                <Input placeholder='请输入父母姓名' />
                            )}
                        </FormItem>
                        <FormItem label='父母联系方式' {...formItemLayout}  >
                            {getFieldDecorator('parentTel', {
                                rules: [{
                                    validator: this.checkPhoneNumber
                                }],
                                initialValue: data[0].parentTel,
                            })(
                                <Input type='tel' placeholder='请输入父母联系方式' />
                            )}
                        </FormItem>
                        <FormItem label='出生日期' {...formItemLayout}  >
                            {getFieldDecorator('birthday', {
                                initialValue: moment((new Date(data[0].birthday || null)), 'YYYY/MM/DD'),
                            })(
                                <DatePicker />
                            )}
                        </FormItem>
                        <FormItem label='班级' {...formItemLayout}  >
                            {getFieldDecorator('class', {
                                initialValue: data[0].class
                            })(
                                <Select>
                                    <Option value="商业软件1班">商业软件1班</Option>
                                    <Option value="外语1班">外语1班</Option>
                                    <Option value="金融2班">金融2班</Option>
                                    <Option value="国贸3班">国贸3班</Option>
                                    <Option value="法律1班">法律1班</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label='入学年份' {...formItemLayout}  >
                            {getFieldDecorator('enterYear', {
                                initialValue: (new Date(data[0].enterYear)).getFullYear()
                            })(
                                <Input placeholder='请填写您的入学年份' />
                            )}
                        </FormItem>
                        <FormItem label='学历' {...formItemLayout}  >
                            {getFieldDecorator('education', {
                                initialValue: data[0].education || '本科'
                            })(
                                <Select>
                                    <Option value="本科">本科</Option>
                                    <Option value="硕士">硕士</Option>
                                    <Option value="研究生">研究生</Option>
                                    <Option value="博士">博士</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label='获奖情况' {...formItemLayout}  >
                            {getFieldDecorator('awardInfo', {
                                initialValue: data[0].awardInfo
                            })(
                                <TextArea placeholder='请填写您的获奖情况，若无则不填' autosize={true} />
                            )}
                        </FormItem>
                        <FormItem label='政治面貌' {...formItemLayout} >
                            {getFieldDecorator('politicalStatus', {
                                initialValue: data[0].politicalStatus || '群众'
                            })(
                                <Select>
                                    <Option value="群众">群众</Option>
                                    <Option value="团员">团员</Option>
                                    <Option value="党员">党员</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label='惩处' {...formItemLayout} >
                            {getFieldDecorator('punish', {
                                initialValue: data[0].punish
                            })(
                                <Input disabled />
                            )}
                        </FormItem>
                        <FormItem wrapperCol={{ offset: 3 }} >
                            <Button size='large' type='primary' onClick={this.handleUpdate.bind(this)} >保存</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        ) : null
    }
}

export default Archive = Form.create()(Archive);