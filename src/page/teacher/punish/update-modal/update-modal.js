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
                <Modal title="更新信息"
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
                            <FormItem label='处分日期' >
                                {
                                    getFieldDecorator('punishDate',{
                                        initialValue: (new Date(Number.parseInt(data[0].punishDate,10)).toDateString()) 
                                    })(
                                        <Input   />
                                    )
                                }
                            </FormItem>
                            <FormItem label='处分详情' >
                                {
                                    getFieldDecorator('punishDetail',{
                                        initialValue:data[0].punishDetail
                                    })(
                                        <Input    />
                                    )
                                }
                            </FormItem>
                            <FormItem label='处分结果'>
                                {
                                    getFieldDecorator('punishResult',{
                                        initialValue:data[0].punishResult
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