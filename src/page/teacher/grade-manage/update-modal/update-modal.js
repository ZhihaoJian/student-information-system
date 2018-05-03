import React from 'react';
import {Input,Modal,Form} from 'antd';

const FormItem = Form.Item;

class UpdateModal extends React.Component{

    handleOk(){
        const data = this.props.form.getFieldsValue();
        const newData = {...(this.props.data[0]),...data};
        this.props.handleOk(false,newData);
    }

    handleCancel(){
        this.props.handleCancel(false);
    }

    render(){
        const {getFieldDecorator} = this.props.form;
        const data = this.props.data;
        return data && data.length > 0?(
            <div>
                <Modal title="更新成绩"
                    visible={this.props.visible}
                    destroyOnClose={true}
                    onOk={this.handleOk.bind(this)}
                    confirmLoading={this.props.confirmLoading}
                    onCancel={this.handleCancel.bind(this)}
                    >
                        <Form>
                            <FormItem label='学号' >
                                {
                                    getFieldDecorator('studentID',{
                                        initialValue:data[0].studentID
                                    })(
                                        <Input disabled />
                                    )
                                }
                            </FormItem>
                            <FormItem label='姓名' >
                                {
                                    getFieldDecorator('name',{
                                        initialValue:data[0].name
                                    })(
                                        <Input disabled  />
                                    )
                                }
                            </FormItem>
                            <FormItem label='学年' >
                                {
                                    getFieldDecorator('year',{
                                        initialValue:data[0].year
                                    })(
                                        <Input   />
                                    )
                                }
                            </FormItem>
                            <FormItem label='学期' >
                                {
                                    getFieldDecorator('term',{
                                        initialValue:data[0].term
                                    })(
                                        <Input    />
                                    )
                                }
                            </FormItem>
                            <FormItem label='课程'>
                                {
                                    getFieldDecorator('lesson',{
                                        initialValue:data[0].lesson
                                    })(
                                        <Input    />
                                    )
                                }
                            </FormItem>
                            <FormItem label='成绩' >
                                {
                                    getFieldDecorator('grade',{
                                        initialValue:data[0].grade
                                    })(
                                        <Input    />
                                    )
                                }
                            </FormItem>
                            <FormItem label='绩点' >
                                {
                                    getFieldDecorator('gradePoint',{
                                        initialValue:data[0].gradePoint
                                    })(
                                        <Input    />
                                    )
                                }
                            </FormItem>
                        </Form>
                    </Modal>
            </div>
        ):null
        
    }
}

export default UpdateModal = Form.create()(UpdateModal);