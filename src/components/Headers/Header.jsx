/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import axios from 'axios';
// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const url = "http://fa19-cs411-005.cs.illinois.edu:3000/";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      complete: false,
      bullish: [],
      bearish: [],
      priceUpSentimentDown: [],
      priceDownSentimentUp: []
    };
  }

  componentDidMount() {
    this.getHighLow();
  }

  getHighLow() {
    axios.get(url + `bullish`)
      .then((response) => {
        //console.log(response.data);
        this.setState({ bullish: response.data });
      });

    axios.get(url + `bearish`)
      .then((response) => {
        //console.log(response.data);
        this.setState({ bearish: response.data });
      });

    axios.get(url + `priceUpSentimentDown`)
      .then((response) => {
        //console.log(response.data);
        this.setState({ priceUpSentimentDown: response.data });
      });

    axios.get(url + `priceDownSentimentUp`)
      .then((response) => {
        //console.log(response.data);
        this.setState({ priceDownSentimentUp: response.data });
      });
  }

  renderIcon(status) {
    switch (status) {
      case 0:  // UP UP
        return (
          <i class="fas fa-fire"></i>
        );
      case 1: // DOWN DOWN
        return (
          <i class="fas fa-angle-double-down"></i>
        );
      case 2: // PRICE UP , S DOWN
        return (
          <i class="fas fa-exclamation-triangle"></i>
        );
      case 3: // PRICE DOWN , S UP
        return (
          <i class="fas fa-poo"></i>
        );
      default:
        return (
          <i class="fas fa-fire"></i>
        );
    }
  }

  renderHighlightWords(status, stockBoxObject) {
    switch (status) {
      case 0:  // UP UP
        return (
          <>
            <p className="mt-3 mb-0 text-muted text-sm">
              <font style={{ fontSize:'200%', fontWeight:'600' }}>{stockBoxObject.Close.toFixed(2)}</font>
              <font> USD </font>
              <span className="text-success mr-2">
                <i className="fa fa-arrow-up" /> {stockBoxObject.PctChangePrice.toFixed(2) + `%`}
              </span>{""}
            </p>
            <p className="mt-3 mb-0 text-muted text-sm">
              <font style={{ fontSize: '200%', fontWeight: '600' }}>{(stockBoxObject.Sentiment + 1).toFixed(2)}</font>
              <font> PTS </font>
              <span className="text-success mr-2">
                <i className="fa fa-arrow-up" /> {stockBoxObject.PctChangeSentiment.toFixed(2) + `%`}
              </span>{""}
            </p>
          </>
        );
      case 1: // DOWN DOWN
        return (
          <>
            <p className="mt-3 mb-0 text-muted text-sm">
              <font style={{ fontSize: '200%', fontWeight: '600' }}>{stockBoxObject.Close.toFixed(2)}</font>
              <font> USD </font>
              <span className="text-danger mr-2">
                <i className="fas fa-arrow-down" /> {stockBoxObject.PctChangePrice.toFixed(2) + `%`}
                          </span>{""}
            </p>
            <p className="mt-3 mb-0 text-muted text-sm">
              <font style={{ fontSize: '200%', fontWeight: '600' }}>{(stockBoxObject.Sentiment + 1).toFixed(2)}</font>
              <font> PTS </font>
              <span className="text-danger mr-2">
                <i className="fas fa-arrow-down" /> {stockBoxObject.PctChangeSentiment.toFixed(2) + `%`}
                          </span>{""}
            </p>
          </>
        );
      case 2: // PRICE UP , S DOWN
        return (
        <>
            <p className="mt-3 mb-0 text-muted text-sm">
              <font style={{ fontSize: '200%', fontWeight: '600' }}>{stockBoxObject.Close.toFixed(2)}</font>
              <font> USD </font>
              <span className="text-success mr-2">
                <i className="fa fa-arrow-up" /> {stockBoxObject.PctChangePrice.toFixed(2) + `%`}
              </span>{""}
            </p>
            <p className="mt-3 mb-0 text-muted text-sm">
              <font style={{ fontSize: '200%', fontWeight: '600' }}>{(stockBoxObject.Sentiment + 1).toFixed(2)}</font>
              <font> PTS </font>
              <span className="text-danger mr-2">
                <i className="fas fa-arrow-down" /> {stockBoxObject.PctChangeSentiment.toFixed(2) + `%`}
              </span>{""}
            </p>
        </>
        );
      case 3: // PRICE DOWN , S UP
        return (
          <>
            <p className="mt-3 mb-0 text-muted text-sm">
              <font style={{ fontSize: '200%', fontWeight: '600' }}>{stockBoxObject.Close.toFixed(2)}</font>
              <font> USD </font>
              <span className="text-danger mr-2">
                <i className="fas fa-arrow-down" /> {stockBoxObject.PctChangePrice.toFixed(2) + `%`}
              </span>{""}
            </p>
            <p className="mt-3 mb-0 text-muted text-sm">
              <font style={{ fontSize: '200%', fontWeight: '600' }}>{(stockBoxObject.Sentiment + 1).toFixed(2)}</font>
              <font> PTS </font>
              <span className="text-success mr-2">
                <i className="fa fa-arrow-up" /> {stockBoxObject.PctChangeSentiment.toFixed(2) + `%`}
              </span>{""}
            </p>
          </>
        );
      default:
        return (
          <>
            <p className="mt-3 mb-0 text-muted text-sm">
              <span className="text-success mr-2">
                <i className="fa fa-arrow-up" />
                          </span>{" "}
              <span className="text-nowrap"></span>
            </p>
            <p className="mt-3 mb-0 text-muted text-sm">
              <span className="text-success mr-2">
                <i className="fa fa-arrow-up" />
                          </span>{" "}
              <span className="text-nowrap"></span>
            </p>
          </>
        );
    }
  }

  renderDefaultCard() {
    return(
      <Card className="card-stats mb-4 mb-xl-0">
        <CardBody>
          <Row>
            <div className="col">
              <CardTitle
                tag="h5"
                className="text-uppercase text-muted mb-0"
              >
                
              </CardTitle>
              <span className="h2 font-weight-bold mb-0">
                
              </span>
            </div>
            <Col className="col-auto">
              <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                {this.renderIcon(5)}
              </div>
            </Col>
          </Row>
          <p className="mt-3 mb-0 text-muted text-sm">
            <span className="text-success mr-2">
              <i className="fa fa-arrow-up" /> 
                        </span>{" "}
            <span className="text-nowrap"></span>
          </p>
          <p className="mt-3 mb-0 text-muted text-sm">
            <span className="text-success mr-2">
              <i className="fa fa-arrow-up" /> 
                        </span>{" "}
            <span className="text-nowrap"></span>
          </p>
        </CardBody>
      </Card>
    );
  }

  renderCard(status, stockBoxObject) {
    return(
      <Card className="card-stats mb-4 mb-xl-0">
        <CardBody>
          <Row>
            <div className="col">
              <CardTitle
                tag="h5"
                className="text-uppercase text-muted mb-0"
              >
                {
                  status === 0 ? "Daily Winner" :
                  status === 1 ? "Double whammy" :
                  status === 2 ? "Maybe Good" :
                  status === 3 ? "Maybe Bad" : ""
                }
              </CardTitle>
              <span className="h2 font-weight-bold mb-0">
                { stockBoxObject.StockName + ` (` + stockBoxObject.Symbol + `)` }
              </span>
            </div>
            <Col className="col-auto">
              <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                { this.renderIcon(status) }
              </div>
            </Col>
          </Row>
          { this.renderHighlightWords(status, stockBoxObject) }
        </CardBody>
      </Card>
    );
  }

  render() {
    var { bullish, bearish, priceUpSentimentDown, priceDownSentimentUp } = this.state;
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="3">
                  { bullish.length > 0 ? this.renderCard(0, bullish[0]) : this.renderDefaultCard() }
                </Col>
                <Col lg="6" xl="3">
                  { bearish.length > 0 ? this.renderCard(1, bearish[0]) : this.renderDefaultCard()}
                </Col>
                <Col lg="6" xl="3">
                  { priceUpSentimentDown.length > 0 ? this.renderCard(2, priceUpSentimentDown[0]) : this.renderDefaultCard()}
                </Col>
                <Col lg="6" xl="3">
                  {priceDownSentimentUp.length > 0 ? this.renderCard(3, priceDownSentimentUp[0]) : this.renderDefaultCard()}
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;
