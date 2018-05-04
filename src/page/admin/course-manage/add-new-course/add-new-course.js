import React from 'react';
import { Modal, Form, Input, InputNumber, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class AddNewCourse extends React.Component {

    handleOk() {
        const data = this.props.form.getFieldsValue();
        this.props.handleOk(false, data);
    }

    render() {

        const { getFieldDecorator } = this.props.form;

        return (
            <Modal
                title='新增课程 '
                visible={this.props.visible}
                destroyOnClose={true}
                onOk={this.handleOk.bind(this)}
                maskClosable={false}
                onCancel={() => this.props.handleCancel()}
            >
                <Form>
                    <FormItem label='课程编号'>
                        {getFieldDecorator('courseID', {
                            rules: [{ required: true }]
                        })(
                            <Input placeholder='请输入课程' />
                        )}
                    </FormItem>
                    <FormItem label='课程名称'>
                        {
                            getFieldDecorator('courseName', {
                                rules: [{ required: true }]
                            })(
                                <Input placeholder='请输入课程名称' />
                            )
                        }
                    </FormItem>
                    <FormItem label='学分'>
                        {
                            getFieldDecorator('point', {
                                rules: [{ required: true }]
                            })(
                                <InputNumber min={1} max={5} />
                            )
                        }
                    </FormItem>
                    <FormItem label='所属专业'>
                        {
                            getFieldDecorator('major', {
                                rules: [{ required: true }]
                            })(
                                <Select>
                                    <Option value="电子信息科学与技术（应用电子、智能控制与机器人）">电子信息科学与技术（应用电子、智能控制与机器人）</Option>
                                    <Option value="计算机科学与技术（网络工程、数字媒体技术）">计算机科学与技术（网络工程、数字媒体技术）</Option>
                                    <Option value="软件工程（商业应用软件、移动互联软件）">软件工程（商业应用软件、移动互联软件）</Option>
                                    <Option value="物联网工程">物联网工程</Option>
                                    <Option value="信息管理与信息系统（金融信息管理）">信息管理与信息系统（金融信息管理）</Option>
                                    <Option value="金融学专业">金融学专业</Option>
                                    <Option value="投资学专业">投资学专业</Option>
                                    <Option value="德语专业（涉外翻译方向）">德语专业（涉外翻译方向）</Option>
                                    <Option value="德语专业（国际经济与贸易方向）">德语专业（国际经济与贸易方向）</Option>
                                    <Option value="日语专业（国际经济与贸易方向）">日语专业（国际经济与贸易方向）</Option>
                                    <Option value="英语专业（涉外翻译方向）">英语专业（涉外翻译方向）</Option>
                                    <Option value="商务英语专业（国际经济与贸易方向）">商务英语专业（国际经济与贸易方向）</Option>
                                    <Option value="英语（“3+1”中英学分互认国际班）">英语（“3+1”中英学分互认国际班）</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label='课程类型'>
                        {
                            getFieldDecorator('courseType', {
                                rules: [{ required: true }]
                            })(
                                <Select>
                                    <Option value="专业基础">专业基础</Option>
                                    <Option value="公共必修">公共必修</Option>
                                    <Option value="公共选修">公共选修</Option>
                                    <Option value="专业必修">专业必修</Option>
                                    <Option value="专业选修">专业选修</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

export default AddNewCourse = Form.create()(AddNewCourse);