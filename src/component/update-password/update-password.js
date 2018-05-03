import React from 'react';
import { Form, Button, Input,Breadcrumb,Col,Row } from 'antd';
import './update-password.scss';
import {updatePwd,reset} from '../../redux/updatePwd.redux';
import {connect} from 'react-redux';
const FormItem = Form.Item;

@connect(
    state=>state.updatePwdReducers,
    {updatePwd,reset}
)
class UpdatePassword extends React.Component {

    handleUpdatePwd() {
        const data = this.props.form.getFieldsValue();
        if(data.newPwd === data.confirmPwd){
            this.props.updatePwd(data);
        }
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('newPwd')) {
          callback('两次密码输入不一致!');
        } else {
          callback();
        }
      }

    componentWillUnmount(){
        this.props.reset();
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='update-pwd__wrapper' >
                <Row>
                    <Col span={24} >
                        <Breadcrumb style={{marginBottom:20}} >
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>设置</Breadcrumb.Item>
                            <Breadcrumb.Item>更新密码</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <div className='update-pwd-form' >
                    <Form style={{width:800}} >  
                        <FormItem label='旧密码' >
                            {
                                getFieldDecorator('oldPwd', {
                                    rules: [{ required: true }]
                                })(
                                    <Input  type='password' />
                                )
                            }
                        </FormItem>
                        <FormItem label='新密码' >
                            {
                                getFieldDecorator('newPwd', {
                                    rules: [{ required: true }]
                                })(
                                    <Input  type='password' />
                                )
                            }
                        </FormItem>
                        <FormItem label='确认密码' >
                            {
                                getFieldDecorator('confirmPwd', {
                                    rules: [
                                        { required: true },
                                        {
                                            validator:this.compareToFirstPassword
                                        }
                                    ]
                                })(
                                    <Input  type='password' />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            <Button type='primary'  style={{ width: '100%' }} onClick={this.handleUpdatePwd.bind(this)} >确认修改</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
    }
}

export default UpdatePassword = Form.create()(UpdatePassword);