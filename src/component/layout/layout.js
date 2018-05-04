import React from 'react';
import Cookies from 'js-cookie';
import { Layout, Menu, Icon } from 'antd';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './layout.scss';
const { Header, Content, Sider, Footer } = Layout;
const { SubMenu } = Menu;

@withRouter
@connect(
    state => state.login
)
class LayoutComponent extends React.Component {

    handlePathName() {
        const path = this.props.location.pathname;
        if (path === '/') {
            return ['/']
        } else if (path === '/register') {
            return ['/register']
        } else if (path === '/login') {
            return ['/login']
        }
    }

    renderSider() {
        const hasId = Cookies.get('id') ? true : false;
        const role = this.props.role;
        let menuJsx;
        if (role === 'admin') {
            menuJsx = (
                <Menu
                    mode="inline"
                    theme='dark'
                    defaultSelectedKeys={['workstation']}
                    defaultOpenKeys={['manage', 'setting']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <Menu.Item key='workstation' > <Link to='/admin/home'>工作台</Link></Menu.Item>
                    <SubMenu key="manage" title={<span><Icon type="user" />管理</span>}>
                        <Menu.Item > <Link to='/admin/studentInfo'>学生信息管理</Link></Menu.Item>
                        <Menu.Item > <Link to='/admin/registerInfo'>用户管理</Link></Menu.Item>
                        <Menu.Item ><Link to='/admin/gradeInfo'>成绩信息管理</Link></Menu.Item>
                        <Menu.Item><Link to='/admin/punishInfo'>处分信息管理</Link></Menu.Item>
                        <Menu.Item><Link to='/admin/courseManage'>课程管理</Link></Menu.Item>
                        <Menu.Item ><Link to='/admin/upload'>文件上传</Link></Menu.Item>
                        <Menu.Item ><Link to='/admin/teacherInfo'>教师信息管理</Link></Menu.Item>
                        <Menu.Item ><Link to='/admin/publishSystemInfo' >发布系统通知</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="setting" title={<span><Icon type="tool" />设置</span>}>
                        <Menu.Item ><Link to='/admin/updatePassword'>更改密码</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            )
        } else if (role === 'teacher') {
            menuJsx = (
                <Menu
                    mode="inline"
                    theme='dark'
                    defaultSelectedKeys={['information']}
                    defaultOpenKeys={['manage', 'setting']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <SubMenu key="manage" title={<span><Icon type="user" />管理</span>}>
                        <Menu.Item key='information' ><Link to='/teacher/information' >相关通知</Link></Menu.Item>
                        <Menu.Item><Link to='/teacher/gradeManage' >成绩管理</Link></Menu.Item>
                        <Menu.Item><Link to='/teacher/punishManage' >奖惩管理</Link></Menu.Item>
                        <Menu.Item><Link to='/teacher/upload' >文件上传</Link></Menu.Item>
                        <Menu.Item><Link to='/teacher/courseQuery' >课程查询</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="setting" title={<span><Icon type="tool" />设置</span>}>
                        <Menu.Item ><Link to='/teacher/updateMyInfo'>修改个人信息</Link></Menu.Item>
                        <Menu.Item><Link to='/teacher/updatePassword'>更改密码</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            )
        } else if (role === 'student') {
            menuJsx = (
                <Menu
                    mode="inline"
                    theme='dark'
                    defaultSelectedKeys={['information']}
                    defaultOpenKeys={['manage', 'setting']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <SubMenu key="manage" title={<span><Icon type="user" />管理</span>}>
                        <Menu.Item key='information'><Link to='/student/information' >相关通知</Link></Menu.Item>
                        <Menu.Item><Link to='/student/gradeSearch' >成绩查询</Link></Menu.Item>
                        <Menu.Item><Link to='/student/archiveManage' >档案信息管理</Link></Menu.Item>
                        <Menu.Item><Link to='/student/courseQuery' >课程查询</Link></Menu.Item>
                        <Menu.Item><Link to='/student/download' >文件下载</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="setting" title={<span><Icon type="tool" />设置</span>}>
                        <Menu.Item><Link to='/student/updatePassword'>更改密码</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            )
        }
        return hasId ? (
            <Sider>
                <div className='logo' >学生档案管理系统</div>
                {menuJsx}
            </Sider>
        ) : (
                <Redirect to='/login' />
            )
    }

    renderHeader() {
        const hasId = Cookies.get('id') ? true : false;
        return hasId ? (
            <Menu
                theme="light"
                mode="horizontal"
                defaultSelectedKeys={this.handlePathName()}
                style={{ lineHeight: '64px' }}
            >
                <Menu.Item key="username">{this.props.name || '用户'}</Menu.Item>
                <Menu.Item key="logout"><Link to='/logout' >登出</Link></Menu.Item>
            </Menu>
        ) : null
    }

    render() {
        const hasId = Cookies.get('id') ? true : false;
        return (
            <Layout style={{ height: '100%' }} >
                {this.renderSider()}
                <Layout>
                    <Header className='header'>
                        {this.renderHeader()}
                    </Header>
                    <Content className='content__wrapper'>
                        <div className='content' >
                            {
                                hasId ? (
                                    <Redirect to={this.props.redirectUrl} />
                                ) : null
                            }
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        ©学生管理系统
                </Footer>
                </Layout>
            </Layout>
        )
    }
}

export default LayoutComponent;