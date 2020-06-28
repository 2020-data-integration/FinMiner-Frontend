import React from "react";
import '../App.css';
import { Tabs,Card,Carousel,Row,Col,Typography} from 'antd';
import {Link} from 'react-router-dom';
import tsIcon from "../images/Background.jpg";
import GDP from "../images/GDP.png";
import Detail from "../images/Detail.png";
import StockMap from "../images/stockMap.png";
import KLine from "../images/Kline.png";
import MAP from "../images/Map.png";
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
                    cover={<img src={Detail} alt="" style={{height:350}} />}
                >
                    <Meta title={<Link to='/dashboard'>
                        <button className="getInfo" >
                            查看行情信息
                        </button>
                    </Link>}/>
                </Card>
                </div>
                <div>
                    <div className="detail">股票知识</div>
                    <Tabs tabPosition="left" type="card"  style={{margin:'3%',boxShadow:'0px 5px 20px #999'}}>
                        <TabPane tab={<div><h1>防守点规则</h1><img src={Detail}  alt="" style={{height:150,width:300}} /></div>} key="1">

                        </TabPane>
                        <TabPane tab={<div><h1>知识图谱</h1><img src={StockMap}  alt="" style={{height:150,width:300}} /></div>} key="2">
                                <div style={{fontSize:'280%',margin:20}}>介绍</div>
                            <div className="ConTent">
                                基于某支股票的知识图谱，可以查询任意多个主体之间的关系网络，如企业与企业、企业与自然人、自然人与自然人之间的关系，并支持某个主体的展开。因此可以辅助用户在多源异构的大数据中发现其中的关系。<br/>如果想要进一步进行关系挖掘，可以点击中心结点所连接的其他结点进行展开，会形成更为复杂的知识图谱。如下所示：<br/>
                                <Paragraph><img src={MAP}  alt="" style={{height:350,width:480,textAlign:'center'}} /></Paragraph>
                                风险事件可以通过结点和边在知识图谱中传导。通过对上市公司自身属性和他所连接的其他持股人，概念等信息的分析，可以更为准确地对风险事件的传导进行分析。并且当某支股票处于风险状态时，和其有一定关系的其他公司理应被优先考虑以辅助用户未雨绸缪，做出风险预警措施。
                                </div>
                        </TabPane>
                        <TabPane tab={<div><h1>K线图</h1><img src={KLine}  alt="" style={{height:150,width:300}} /></div>} key="3">
                            Content of Tab 3
                        </TabPane>
                    </Tabs>
                </div>
                <div className="Knowledge">
                    <Row>
                        <Col span={6} order={4}>
                            1 col-order-4
                        </Col>
                        <Col span={6} order={3}>
                            2 col-order-3
                        </Col>
                        <Col span={6} order={2}>
                            3 col-order-2
                        </Col>
                        <Col span={6} order={1}>
                            4 col-order-1
                        </Col>
                    </Row>,
                </div>
                </body>
            </div>

        );

    }
}
export default Homepage;
