import React from "react";
import classnames from "classnames";
import Chart from "chart.js";
import { MonthLine } from '../components/Custom/MonthLine';
import { DayLine } from '../components/Custom/DayLine';
import { WeekLine } from '../components/Custom/WeekLine';
import axios from 'axios';
import { TwitterTweetEmbed } from 'react-twitter-embed';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions
} from "variables/charts.jsx";

import Header from "components/Headers/Header.jsx";

const url = "http://fa19-cs411-005.cs.illinois.edu:3000/";

function getCurrentDate(separator = '') {

  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`
}


class Index extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
    this.state = {
      data: null,
      range: 1,
      currentTicker: 'AAPL',
      dropdownOpen: false,
      tweetList: [],
      listOfAllStocks: [],
    };
  }

  toggleNavs = (e, index) => {
    e.preventDefault();
    this.getNewGraphData(this.state.currentTicker, index)
    let wow = () => {
      console.log(this.state);
    };
    wow.bind(this);
    setTimeout(() => wow(), 1000);
    //this.chartReference.update();
  };

  componentWillMount() {
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }

  getNewTweets() {
    axios.get(url + `tweet`)
      .then((response) => {
        this.setState({ tweetList: response.data });
      });

  }

  getNewGraphData(newCurrentTicker, range) {    
    if (newCurrentTicker === '') {
      return;
    }
    var duration = '';
    var interval = '';
    if (range === 1) {
      duration = 'daily';
      interval = '6mo';
    } else if (range === 2) {
      duration = 'daily';
      interval = '1wk';
    } else {
      duration = 'hourly';
      interval = '1d';
    }
    axios.get(url + `${duration}?symbol=${newCurrentTicker}&interval=${interval}`)
      .then((response) => {
        this.setState({ data: response.data, currentTicker: newCurrentTicker, range: range });
      });
  }
  
  getAllStockTickers() {
    axios.get(url + `stocks`)
      .then((response) => {
        this.setState({ listOfAllStocks: response.data });
      })
  }

  componentDidMount() {
    this.getAllStockTickers();
    this.getNewGraphData(this.state.currentTicker, this.state.range);
    this.getNewTweets();
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  select(event) {
    if (this.state.currentTicker !== event.target.innerText) {
      this.getNewGraphData(event.target.innerText, this.state.range);
    }
  }

  buildDropDownList() {
    const { listOfAllStocks } = this.state;

    return (
      <>
        { listOfAllStocks.map(ticker => (
          <DropdownItem onClick={this.select}>{ ticker.Symbol }</DropdownItem>
        ))}
      </>
    );
  }

  renderInterestingTweetList = ( tweetList ) => (
    <>
      {tweetList.map(tweet => (
        <TwitterTweetEmbed tweetId={tweet.twitterid} />
      ))}
    </>
  );

  renderStockGraph() {
    const { data, range, currentTicker } = this.state;
    if (data === null || currentTicker === null) {
      return (
        <img alt={''} style={{ justifySelf: 'center', alignSelf: 'center', width: "300px", height: "300px" }} src="http://i.imgur.com/0kvtMLE.gif" />
      );
    }
    if (range === 1) {
      return (
        <MonthLine
          data={data}
          ticker={currentTicker}
        />
      );
    } else if (range === 2) {
      return (
        <WeekLine
          data={data}
          ticker={currentTicker}
        />
      );
    } else {
      return (
        <DayLine
          data={data}
          ticker={currentTicker}
        />
      );
    }
  }
  render() {
    const { currentTicker, dropdownOpen, tweetList } = this.state;
    
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Stock Overview
                      </h6>
                      <h2 className="text-white mb-0">{currentTicker}</h2>
                      <Dropdown isOpen={dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                          { currentTicker }
                        </DropdownToggle>
                        <DropdownMenu>
                          { this.buildDropDownList() }
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                    <div className="col">
                      <Nav className="justify-content-end" pills>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: this.state.range === 1
                            })}
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 1)}
                          >
                            <span className="d-none d-md-block">Month</span>
                            <span className="d-md-none">M</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: this.state.range === 2
                            })}
                            data-toggle="tab"
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 2)}
                          >
                            <span className="d-none d-md-block">Week</span>
                            <span className="d-md-none">W</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: this.state.range === 3
                            })}
                            data-toggle="tab"
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 3)}
                          >
                            <span className="d-none d-md-block">Day</span>
                            <span className="d-md-none">D</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    { this.renderStockGraph() }
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Day of { getCurrentDate('-') }
                      </h6>
                      <h2 className="mb-0">Interesting Tweets Today</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  { this.renderInterestingTweetList(tweetList) }
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Index;
