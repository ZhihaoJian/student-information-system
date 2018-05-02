import React from 'react';
import {Input,Modal,Form,Select,message } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
class AddUserModal extends React.Component{

    handleOk(){
        const data = this.props.form.getFieldsValue();
        if(!data.password){
            message.error('请填写初始密码');
            return;
        }
        this.props.handleOk(false,data);
    }

    handleCancel(){
        this.props.handleCancel(false);
    }

    render(){
        const {getFieldDecorator} = this.props.form;
        return (
            <Modal title="新增用户"
                destroyOnClose={true}
                visible={this.props.visible}
                onOk={this.handleOk.bind(this)}
                onCancel={this.handleCancel.bind(this)}
                >
                    <Form>
                        <FormItem label='识别号' >
                            {
                                getFieldDecorator('id',{
                                    initialValue:this.props.maxID 
                                })(
                                    <Input  size='large' placeholder='输入账号' disabled/>
                                )
                            }
                        </FormItem>
                        <FormItem label='用户身份' >
                            {
                                getFieldDecorator('role',{
                                    rules:[{required:true}],
                                    initialValue:'student'
                                })(
                                    <Select initialValue="student" allowClear>
                                        <Option value="teacher">教师</Option>
                                        <Option value="student">学生</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label='初始密码' >
                            {
                                getFieldDecorator('password',{
                                    rules:[{required:true}]
                                })(
                                    <Input  size='large' placeholder='输入账号初始密码'/>
                                )
                            }
                        </FormItem>
                    </Form>
                </Modal>
        )
        
    }
}

export default AddUserModal = Form.create()(AddUserModal);