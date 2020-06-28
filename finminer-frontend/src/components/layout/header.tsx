/**
 * 布局：全局header
 */

import * as React from "react";
import {Link, withRouter} from "react-router-dom";
import {Layout, Menu} from "antd";
import {ReactNode} from "react";
import {RouteList} from "../../config/routes/index.route";

const {Header,Content} = Layout;


class PageHeader extends React.Component<any, any> {
  render(): ReactNode {
    return (
        <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%'}}>
          <div className="logo" />
          <Menu theme="dark"
                mode="horizontal"
                selectedKeys={this.props.location.pathname.split("/")[1]}
          >
            {RouteList.map((route) =>
                <Menu.Item key={route.key}><Link to={route.path}>{route.name}</Link></Menu.Item>
            )}
          </Menu>
        </Header>
        <Content style={{ marginTop: 64}}>
        </Content>
        </Layout>


    );
  }
}

export default withRouter(PageHeader)
