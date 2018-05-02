import React from 'react';
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom';
import LayoutComponent from './component/layout/layout';
import Login from './page/login/login';
import studentRoute from './page/student/route';
import AdminRoute from './page/admin/route';
import teacherRoute from './page/teacher/route';
import './App.scss';
import Logout from './page/logout/logout';
import PageNotFound from './page/page-not-found/page-not-found';

import 'nprogress/nprogress.css';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { PersistGate } from 'redux-persist/integration/react'
import {store,persistor} from './redux/redux';
import { Provider } from 'react-redux';
import Cookies from 'js-cookie';

class App extends React.Component {
  render() {
    return (
      <Provider store={store} >
        <PersistGate  loading={null} persistor={persistor}>
          <BrowserRouter>
            <LocaleProvider locale={zh_CN}>
              <div className="App">
                <LayoutComponent >
                  <Switch>
                    <Route exact path='/'  render={()=>{
                      let url = '';
                      const hasId = Cookies.get('userid') ? true:false;
                      if(hasId){
                        url = store.getState().login.redirectUrl || '/';
                      }
                      const redirectUrl = hasId ? url : '/login';
                      return <Redirect to={redirectUrl} />
                    }} />
                    <Route path='/login' component={Login} />
                    <Route path='/admin' component={AdminRoute} />
                    <Route path='/teacher' component={teacherRoute} />
                    <Route path='/student' component={studentRoute} />
                    <Route path='/logout' component={Logout} />
                    <Route path='**' component={PageNotFound}/>
                  </Switch>
                </LayoutComponent>
              </div>
            </LocaleProvider>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
