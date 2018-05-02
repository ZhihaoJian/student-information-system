import React from 'react';
import './home.scss';
import {Breadcrumb,Avatar,Calendar, Badge} from 'antd';

class AdminHome extends React.Component{

    getListData(value) {
        let listData;
        switch (value.date()) {
          case 8:
            listData = [
              { type: 'warning', content: 'This is warning event.' },
              { type: 'success', content: 'This is usual event.' },
            ]; break;
          case 10:
            listData = [
              { type: 'warning', content: 'This is warning event.' },
              { type: 'success', content: 'This is usual event.' },
              { type: 'error', content: 'This is error event.' },
            ]; break;
          case 15:
            listData = [
              { type: 'warning', content: 'This is warning event' },
              { type: 'success', content: 'This is very long usual event。。....' },
              { type: 'error', content: 'This is error event 1.' },
              { type: 'error', content: 'This is error event 2.' },
              { type: 'error', content: 'This is error event 3.' },
              { type: 'error', content: 'This is error event 4.' },
            ]; break;
          default:
        }
        return listData || [];
      }

    dateCellRender(value) {
        const listData = this.getListData(value);
        return (
          <ul className="events">
            {
              listData.map(item => (
                <li key={item.content}>
                  <Badge status={item.type} text={item.content} />
                </li>
              ))
            }
          </ul>
        );
      }

      monthCellRender(value) {
        const num = this.getMonthData(value);
        return num ? (
          <div className="notes-month">
            <section>{num}</section>
            <span>Backlog number</span>
          </div>
        ) : null;
      }

      getMonthData(value) {
        if (value.month() === 8) {
          return 1394;
        }
      }

    render(){
        return(
            <div className='home__wrapper' >
                <div>
                    <Breadcrumb>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>工作台</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className='user-info' >
                        <div className='avatar' >
                            <Avatar style={{width:100,height:100}} size='large' src='https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png' />
                        </div>
                        <div className='information' >
                            <div className='say-hello' >早安, 简智濠，祝你开心每一天!</div>
                            <div className='user-job-desc'>前端开发工程师</div>
                        </div>
                    </div>
                    <div className='to-do-list__wrapper' >
                        <div className='to-do-list__title' >以下是您的待办事项, 请注意期限</div>
                        <Calendar dateCellRender={this.dateCellRender.bind(this)} monthCellRender={this.monthCellRender.bind(this)} />
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminHome;