import React, { Fragment }from 'react';
import { Card, Row, Col, Tag, Progress } from "antd";
import { 
    FlagOutlined, 
    UploadOutlined,
    DownloadOutlined,
    UserOutlined,
    LineChartOutlined,
    FundProjectionScreenOutlined,
    HistoryOutlined,
    FieldTimeOutlined
} from "@ant-design/icons";
import DataCard from "./DataCard";
import HomeChart from "./HomeChart";
import TableCard from "./TableCard";
import './style.less';


const { $http } = React;
const TaskColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '任务名',
      dataIndex: 'taskName',
      key: 'taskName',
      render: (text) => {
        return (
          <Fragment>
            <FundProjectionScreenOutlined style={{color: '#1890ff', fontSize: "14px"}}/>
            <span className="ml_5">{text}</span>
          </Fragment>
        );
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => {
        return (
          <React.Fragment>
            <HistoryOutlined style={{color: '#1DA57A', fontSize: "14px"}}/>
            <span className="ml_5">{text}</span>
          </React.Fragment>
        );
      }
    },
    {
      title: '任务时间',
      dataIndex: 'taskTime',
      key: 'taskTime',
      render: (text) => {
        return (
          <React.Fragment>
            <FieldTimeOutlined style={{color: '#FFB801', fontSize: "14px"}}/>
            <span className="ml_5">{text}</span>
          </React.Fragment>
        );
      }
    },
    {
      title: '完成状态',
      dataIndex: 'taskStatus',
      key: 'taskStatus',
      render: (text, record) => {
        const status = record.taskStatus;
        switch (status) {
          case 0:
            return <Tag color="#1890ff">未开始</Tag>;
          case 1:
            return <Tag color="#1DA57A">进行中</Tag>;
          case 2:
            return <Tag color="#FFB801">已完成</Tag>;
          default:
            break;
        };
      }
    }
];
class Home extends React.Component {
    state = {
      cardData: [],
      chartData: {}, 
      chartProgress: [],
      taskTableData: []
    };
    getCardData = () => {
      $http.get('/home/getCardData')
          .then(response => {
            const { data } = response;
            this.setState({cardData: data});
          })
          .catch(error => {
            console.log(error);
          });
    };
    getChartData = () => {
      $http.get('/home/getChartData')
          .then(response => {
            const { data } = response;
            this.setState({chartData: data});
          })
          .catch(error => {
            console.log(error);
          });
    };
    getChartProgress = () => {
      $http.get('/home/getChartProgress')
          .then(response => {
            const { data } = response;
            this.setState({chartProgress: data});
          })
          .catch(error => {
            console.log(error);
          });
    };
    getTaskTableData = () => {
      $http.get('/home/getTaskTableData')
          .then(response => {
            const { data } = response;
            this.setState({taskTableData: data});
          })
          .catch(error => {
            console.log(error);
          });
    };
    componentDidMount() {
      this.getCardData();
      this.getChartData();
      this.getChartProgress();
      this.getTaskTableData();
    };
    render() { 
        const { cardData, chartData, chartProgress, taskTableData } = this.state;
        return (  
            <div className="home">
                {/* card */}
                <div className="home_header">
                    <Row gutter={16}>
                      {
                        cardData.map((item, index) => {
                          return (
                            <Col span={6} key={index}>
                                <DataCard
                                    title={item.title}
                                    color={item.color}
                                    smallName={item.smallName}
                                    number={item.number}
                                    bigName={item.bigName}
                                    numName={item.numName}
                                    icon={
                                      index === 0 ? 
                                      <FlagOutlined /> 
                                      : 
                                      index === 1 ? 
                                      <UploadOutlined /> 
                                      : 
                                      index === 2 ? 
                                      <DownloadOutlined /> : <UserOutlined />
                                    }>
                                </DataCard>
                            </Col>
                          );
                        })
                      }
                    </Row>
                </div>
                {/* 图表 */}
                <div className="home_chart">
                    <Card 
                        title={<LineChartOutlined style={{color: '#1DA57A', fontSize: '20px'}}/>}
                        extra={<Tag color="#009688">增长量</Tag>}>
                        <Row gutter={16}>
                            <Col span={16}>
                                <HomeChart 
                                  visitData={chartData.visitData}
                                  uploadData={chartData.uploadData}
                                  downloadData={chartData.downloadData}>
                                </HomeChart>
                            </Col>
                            <Col span={8}>
                                {
                                  chartProgress.map((item, index) => {
                                    return (
                                      <div className="chart_progress" key={index}>
                                          <p className="chart_title">{item.chart_title}</p>
                                          <p className="progress_title">{item.progress_title}</p>
                                          <Progress percent={item.value} strokeWidth={12}></Progress>
                                      </div>
                                    );
                                  })
                                }
                            </Col>
                        </Row>
                    </Card>
                </div>
                {/* 表格 */}
                <div className="home_table">
                    <Row gutter={24}>
                        <Col span={24}>
                            <TableCard
                                title="学习计划"
                                columns={TaskColumns}
                                dataSource={taskTableData}>
                            </TableCard>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    };
};
export default Home;