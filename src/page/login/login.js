import React from 'react';
import { Form, Input, Card, Icon, Button, Radio, message } from 'antd';
import './login.scss';
import { doLogin } from '../../redux/login.redux';
import { connect } from 'react-redux';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;


@connect(
    state => state.login,
    { doLogin }
)
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            role: 'admin'
        }
    }

    componentDidMount() {
        document.title = '学生档案管理系统 - 登录';
    }

    handleSubmit() {
        const data = this.props.form.getFieldsValue();
        if (!data.id || !data.password) {
            message.warn('请填写表单')
            return;
        }
        if (!data.role) {
            message.warn('请选择登录角色');
            return;
        }
        this.props.doLogin(data);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return  (
            <div className='login__wrapper'>
                <div className='login-title' >
                    登录
                </div>
                <Card className='card' bordered={false} >
                    <Form className="login-form">
                        <FormItem>
                            {getFieldDecorator('id', {
                                rules: [{ required: true, message: '请输入您的唯一识别号，例如学号或职工号!' }],
                            })(
                                <Input  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入您的唯一识别号，例如学号或职工号!" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入您的密码!' }],
                            })(
                                <Input  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                            )}
                        </FormItem>
                        <FormItem
                        >
                            {getFieldDecorator('role')(
                                <RadioGroup value={this.state.role} >
                                    <Radio value="admin">管理员</Radio>
                                    <Radio value="teacher">教师</Radio>
                                    <Radio value="student">学生</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                        <Button onClick={this.handleSubmit.bind(this)} type='primary' size='large' className='login-btn' >登录</Button>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Login = Form.create()(Login);