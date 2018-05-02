import React from 'react';
import { Form, Button, Input,Breadcrumb } from 'antd';
import './update-password.scss';
import {updatePwd,resetState} from '../../../redux/admin/updatePwd.redux';
import {connect} from 'react-redux';
const FormItem = Form.Item;

@connect(
    state=>state.updatePwdReducer,
    {updatePwd,resetState}
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
        this.props.resetState();
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='update-pwd__wrapper' >
                <Breadcrumb style={{marginBottom:20}} >
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>设置</Breadcrumb.Item>
                        <Breadcrumb.Item>更新密码</Breadcrumb.Item>
                    </Breadcrumb>
                <Form>
                    <FormItem label='旧密码' >
                        {
                            getFieldDecorator('oldPwd', {
                                rules: [{ required: true }]
                            })(
                                <Input size='large' type='password' />
                            )
                        }
                    </FormItem>
                    <FormItem label='新密码' >
                        {
                            getFieldDecorator('newPwd', {
                                rules: [{ required: true }]
                            })(
                                <Input size='large' type='password' />
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
                                <Input size='large' type='password' />
                            )
                        }
                    </FormItem>
                    <FormItem>
                        <Button type='primary' size='large' style={{ width: '100%' }} onClick={this.handleUpdatePwd.bind(this)} >确认修改</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default UpdatePassword = Form.create()(UpdatePassword);