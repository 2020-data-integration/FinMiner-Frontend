import React from 'react';
import Slider from 'infinite-react-carousel';
import tsIcon from "../../images/Background.jpg";
import GDP from "../../images/GDP.png";
import StockMapImg from "../../images/stockMap.png";
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
                <Slider className="sli" adaptiveHeight>
                <div><h1>多种数据源<div className="content"><br/>Tushare数据<br/>国家统计局<br/>BaoStock数据</div></h1></div>
                    <div><h1>可视化展示<div className="content"><br/>K线图<br/>知识图谱</div></h1></div>
                <div><h1>啥啥啥</h1></div>
                </Slider>
                <button className="getInfo">
                    查看行情信息
                </button>
            </div>
        )

}

export function  GDPMap (){
    return (
        <div>
            <div className="card">
                <a href="#.">
                    <div className="card-image">
                        <img src={GDP} className="background" alt="" />
                    </div>
                    <div className="card-body">
                        <div className="card-title">
                            <h3>
                                地域GDP以及对应省份排名
                            </h3>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    )

}
export function  StockMap (){
    return (
        <div>
            <div className="card">
                <a href="#.">
                    <div className="card-image">
                        <img src={StockMapImg} className="background" alt="" />
                    </div>
                    <div className="card-body">
                        <div className="card-title">
                            <h3>
                                股票的知识图谱
                            </h3>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    )

}
