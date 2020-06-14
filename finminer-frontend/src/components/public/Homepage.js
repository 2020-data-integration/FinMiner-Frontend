import React from 'react';
import Slider from 'infinite-react-carousel';
import tsIcon from "../../images/Background.jpg";
import '../../App.css';

export function Cover()  {
        return (
            <div className="ti">
                <img src={tsIcon} className="background" alt="" />
                <div className="vcenter"><h1>FinMiner<br/></h1></div>
                <div className="center"><h1>在线股票分析<br/>收获您的财富密码</h1></div>
            </div>
        )

}

export function  Wrapper (){
        return (
            <div>
                <div className="detail">通过可视化了解行业详情</div>
                <Slider dots className="sli">
                <div><h1>多种数据源<div className="content"><br/>华尔街见闻<br/>东方财富网<br/>...</div></h1></div>
                <div><h1>可视化展示<br/>....<br/>...</h1></div>
                <div><h1>啥啥啥</h1></div>
                </Slider>
                <button className="getInfo">
                    查看行情信息
                </button>
            </div>
        )

}
