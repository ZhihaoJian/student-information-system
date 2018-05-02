import React from 'react';
import {Input,Modal,Form,InputNumber } from 'antd';
import './add-grade-modal.scss';
const FormItem = Form.Item;

class AddGradeModal extends React.Component{

    handleOk(){
        const data = this.props.form.getFieldsValue();
        this.props.handleOk(false,data);
    }

    handleCancel(){
        this.props.handleCancel(false);
    }

    render(){
        const {getFieldDecorator} = this.props.form;
        return (
            <Modal title="新增成绩"
                destroyOnClose={true}
                visible={this.props.visible}
                onOk={this.handleOk.bind(this)}
                onCancel={this.handleCancel.bind(this)}
                >
                    <Form>
                        <FormItem label='学号' >
                            {
                                getFieldDecorator('studentID',{
                                    rules:[{required:true}]
                                })(
                                    <Input  size='large' placeholder='请输入学生学号'/>
                                )
                            }
                        </FormItem>
                        {/* <FormItem label='姓名' >
                            {
                                getFieldDecorator('name',{
                                    rules:[{required:true}]                                        
                                })(
                                    <Input  size='large' placeholder='请输入学生姓名' />
                                )
                            }
                        </FormItem> */}
                        <FormItem label='学年' >
                            {
                                getFieldDecorator('year',{
                                    rules:[{required:true}]
                                })(
                                    <Input  size='large' placeholder='请输入学年' />
                                )
                            }
                        </FormItem>
                        <FormItem label='学期' >
                            {
                                getFieldDecorator('term',{
                                    rules:[{required:true}]                                        
                                })(
                                    <InputNumber size='large' min={1} max={2} />
                                )
                            }
                        </FormItem>
                        <FormItem label='课程'>
                            {
                                getFieldDecorator('lesson',{
                                    rules:[{required:true}]
                                })(
                                    <Input size='large' placeholder='请输入课程名' />
                                )
                            }
                        </FormItem>
                        <FormItem label='成绩' >
                            {
                                getFieldDecorator('grade',{
                                    rules:[{required:true}]
                                })(
                                    <InputNumber size='large' min={0} max={100} />
                                )
                            }
                        </FormItem>
                        <FormItem label='绩点' >
                            {
                                getFieldDecorator('gradePoint',{
                                    rules:[{required:true}]
                                })(
                                    <InputNumber size='large' min={0.0} max={5.0} />
                                )
                            }
                        </FormItem>
                    </Form>
                </Modal>
        )
        
    }
}

export default AddGradeModal = Form.create()(AddGradeModal);