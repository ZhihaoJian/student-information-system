import React from 'react';
import { Input, Modal, Form, DatePicker } from 'antd';
import './add-punish.scss';
const FormItem = Form.Item;

class AddPunishModal extends React.Component {

    handleOk() {
        const data = this.props.form.getFieldsValue();
        this.props.handleOk(false, data);
    }

    handleCancel() {
        this.props.handleCancel(false);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal title="新增处分"
                maskClosable={false}
                destroyOnClose={true}
                visible={this.props.visible}
                onOk={this.handleOk.bind(this)}
                onCancel={this.handleCancel.bind(this)}
            >
                <Form>
                    <FormItem label='学号' >
                        {
                            getFieldDecorator('studentID', {
                                rules: [{ required: true }]
                            })(
                                <Input placeholder='请输入学号' />
                            )
                        }
                    </FormItem>
                    {/* <FormItem label='姓名' >
                                {
                                    getFieldDecorator('name',{
                                        rules:[{required:true}]
                                    })(
                                        <Input   placeholder='请输入姓名' />
                                    )
                                }
                            </FormItem> */}
                    <FormItem label='处分日期' >
                        {
                            getFieldDecorator('punishDate', {
                                rules: [{ required: true }]
                            })(
                                <DatePicker placeholder="选择处分日期" />
                            )
                        }
                    </FormItem>
                    <FormItem label='处分详情' >
                        {
                            getFieldDecorator('punishDetail', {
                                rules: [{ required: true }]
                            })(
                                <Input placeholder='请输入处分详情' />
                            )
                        }
                    </FormItem>
                    <FormItem label='处分结果'>
                        {
                            getFieldDecorator('punishResult', {
                                rules: [{ required: true }]
                            })(
                                <Input />
                            )
                        }
                    </FormItem>
                </Form>
            </Modal>
        )

    }
}

export default AddPunishModal = Form.create()(AddPunishModal);