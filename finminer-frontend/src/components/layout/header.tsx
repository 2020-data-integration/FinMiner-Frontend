/**
 * 布局：全局header
 */

import * as React from "react";
import {Link} from "react-router-dom";
import {Layout, Menu} from "antd";
import {ReactNode} from "react";
import {RouteList} from "../../config/routes/index.route";

const {Header} = Layout;


export class PageHeader extends React.Component {
  render(): ReactNode {
    return (
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal">
            {RouteList.map((route) =>
                <Menu.Item key={route.name}><Link to={route.path} >{route.name}</Link></Menu.Item>
            )}
          </Menu>
        </Header>

    );
  }
}

