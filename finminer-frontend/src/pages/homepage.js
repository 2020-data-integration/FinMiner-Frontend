import React from "react";
import '../App.css';
import { Tabs,Card,Carousel,Row,Col,Typography} from 'antd';
import {Link} from 'react-router-dom';
import tsIcon from "../images/Background.jpg";
import GDP from "../images/GDP.png";
import StockMap from "../images/stockMap.png";
import KLine from "../images/Kline.png";
import perfer from "../images/perfer.png";
import DefenseImg from "../images/defenseImg.png";
import '../App.css';
const { TabPane } = Tabs;
const { Meta } = Card;
const { Title, Paragraph, Text } = Typography;
class Homepage extends React.Component {


    handleClick(event){
        this.props.history.push("/charts");
    }
    componentDidMount() {
    }


    render() {
        return (
            <div className="App">
                <header className="App-header">
                </header>
                <body>
                <div className="ti">
                    <img src={tsIcon} className="background" alt="" />
                    <div className="vcenter"><h1>FinMiner<br/></h1></div>
                    <div className="center"><h1>在线股票分析<br/>收获您的财富密码</h1></div>
                </div>
                <div>
                    <div className="detail">通过数据量了解</div>
                    <Carousel autoplay className="sli" autoplaySpeed={1800}>
                        <div><h1>多种数据源<div className="content"><br/>Tushare数据<br/>国家统计局<br/>BaoStock数据</div></h1></div>
                        <div><h1>知识图谱节点数据量<div className="content"><br/>
                            公司数据：3829个<br/>
                            高管数据：59929人<br/>
                            概念数据：359条<br/>
                            持股者数据：62288个<br/></div></h1></div>
                        <div><h1>知识图谱关系数据量<div className="content"><br/>关系数据量
                            持股关系：757450条<br/>
                            高管就职关系：150842条<br/>
                            公司概念关系：19085条<br/></div></h1></div>
                        <div><h1>时序数据量<div className="content">公告数量：58943条<br/>
                            业绩快报数量：11933条<br/>
                            日线股价信息数量：3983042条（日更新3000+）<br/></div></h1></div>
                    </Carousel>
                    <div style={{textAlign:'center'}}>
                    <Link to='/dashboard'>
                        <button className="getInfo" >
                            查看行情信息
                        </button>
                    </Link>
                    </div>
                </div>
                <div>
                <Card
                    style={{width: '45%',marginTop:'5%',marginLeft:'3%', display:'inline-block',boxShadow:'0px 5px 20px #999',textAlign:'center'}}
                    cover={<img src={GDP}  alt="" style={{height:350}} />}
                >
                    <Meta title={<Link to='/charts'>
                        <button className="getInfo" >
                            地域GDP可视化以及对应省份排名
                        </button>
                    </Link>}/>
                </Card>
                <Card
                    style={{ width: '45%',marginTop:'5%',marginLeft:'3%',display:'inline-block',boxShadow:'0px 5px 20px #999',textAlign:'center'}}
                    cover={<img src={perfer} alt="" style={{height:350}} />}
                >
                    <Meta title={<Link to='/defense'>
                        <button className="getInfo" >
                            查看投资推荐
                        </button>
                    </Link>}/>
                </Card>
                </div>
                <div>
                    <div className="detail">股票知识</div>
                    <Tabs tabPosition="left" type="card"  style={{margin:'3%',boxShadow:'0px 5px 20px #999',height:630}}>
                        <TabPane tab={<div><h1>防守点推荐规则</h1><img src={DefenseImg}  alt="" style={{height:130,width:250}} /></div>} key="1">
                            <div style={{fontSize:'280%',margin:20}}>介绍</div>
                            <div className="ConTent" style={{margin:20}}>
                                防守点：B日比A日涨幅2%以上，成交量增长20%以上，则A日为防守点。<br/><br/>
                                涨幅=(现价-上一个交易日收盘价)/上一个交易日收盘价*100%<br/><br/>
                                规则：在B日后，又出现一个防守点，则在该点买入，在买入后，上涨超过3%或下跌超过5%，则卖出<br/><br/>
                                <Link to='/defense'>投资推荐</Link>：在K线图中直观的展现防守点,若当前股价低于K线图中的防守点，则推荐买入如下图所示：<br/><br/>
                                <img src={KLine}  alt="" style={{height:250,width:750}} /><br/>
                            </div>
                        </TabPane>
                        <TabPane tab={<div><h1>知识图谱</h1><img src={StockMap}  alt="" style={{height:130,width:250}} /></div>} key="2">
                                <div style={{fontSize:'280%',margin:20}}>介绍</div>
                            <div className="ConTent" style={{margin:20}}>
                                基于某支股票的知识图谱，可以查询任意多个主体之间的关系网络，如企业与企业、企业与自然人、自然人与自然人之间的关系，并支持某个主体的展开。因此可以辅助用户在多源异构的大数据中发现其中的关系。<br/><br/>如果想要进一步进行关系挖掘，可以点击中心结点所连接的其他结点进行展开，会形成更为复杂的知识图谱。<br/><br/>
                                风险事件可以通过结点和边在知识图谱中传导。通过对上市公司自身属性和他所连接的其他持股人，概念等信息的分析，可以更为准确地对风险事件的传导进行分析。并且当某支股票处于风险状态时，和其有一定关系的其他公司理应被优先考虑以辅助用户未雨绸缪，做出风险预警措施。<br/><br/>
                                节点模型：高管(Manager)、公司(Company)、概念(Concept)、持股者(Holder)<br/><br/>
                                关系模型：工作于(work_in)、持股(hold_stock)、属于某概念(in_concept)<br/><br/>
                                <Link to='/dashboard'>
                                    点击了解数据详情
                                </Link>
                                </div>
                        </TabPane>
                        <TabPane tab={<div><h1>夏普率</h1><img src={perfer}  alt="" style={{height:130,width:250}} /></div>} key="3">
                            <div style={{fontSize:'280%',margin:20}}>介绍</div>
                            <div className="ConTent" style={{margin:20}}>
                                现代投资理论的研究表明,风险的大小在决定组合的表现上具有基础性的作用。风险调整后的收益率就是一个可以同时对收益与风险加以考虑的综合指标,以期能够排除风险因素对绩效评估的不利影响。夏普比率就是一个可以同时对收益与风险加以综合考虑的三大经典指标之一。<br/><br/>
                                夏普比率，又叫夏普指数，衡量的是一项投资在对其调整风险后，相对于无风险资产的表现。它的定义是投资收益与无风险收益之差的期望值，再除以投资标准差。它代表投资者额外承受的每一单位风险所获得的额外收益。<br/><br/>
                                计算公式：投资组合预期报酬率/标准差。<br/><br/>
                                举例而言，假如国债的回报是3%，而您的投资组合预期回报是15%，您的投资组合的标准偏差是6%，那么用15%－3%,可以得出12%（代表您超出无风险投资的回报），再用12%÷6%＝2，代表投资者风险每增长1%，换来的是2%的多余收益。<br/><br/>
                                对夏普率进行计算排序，得到<Link to='/defense'>推荐投资股票列表</Link>。
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
                </body>
            </div>

        );

    }
}
export default Homepage;
