/**
 * 布局：全局header
 */

import * as React from "react";
import {Link, Route} from "react-router-dom";
import {Layout, Menu} from "antd";
import {ReactNode} from "react";
import {RouteList} from "../../config/routes/index.route";

const {Header,Content} = Layout;


export class PageHeader extends React.Component<any, any> {
  render(): ReactNode {
    return (
        <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%'}}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal">
            {RouteList.map((route) =>
                <Menu.Item key={route.name}><Link to={route.path}>{route.name}</Link></Menu.Item>
            )}
          </Menu>
        </Header>
        <Content style={{ marginTop: 64}}>
          {RouteList.map((route)=>
              <Route exact path={route.path} component={route.component}/>
          )}
        </Content>
        </Layout>


    );
  }
}

