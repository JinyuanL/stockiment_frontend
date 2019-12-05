import React from "react";
import axios from 'axios';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";

import UserHeader from "components/Headers/UserHeader.jsx";

const animals = ['duck', 'cow', 'lizard', 'cat', 'dog', 'fish', 'horse'];

function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele !== value;
  });
}
const url = "http://fa19-cs411-005.cs.illinois.edu:3000/";

const defaultUser = 'Zhaojie Tang';

class Profile extends React.Component {
  constructor (props) {
    super(props);

    this.addTicker = this.addTicker.bind(this);
    this.removeTicker = this.removeTicker.bind(this);
    this.updateRemoveField = this.updateRemoveField.bind(this);
    this.updateAddField = this.updateAddField.bind(this);
    this.getListOfFavs = this.getListOfFavs.bind(this);
    this.updateUserId = this.updateUserId.bind(this);

    this.state = {
      listOfAllStocks: [],
      listOfFavs: [],
      userId: 'Zhaojie Tang',
      phone: '5307609085',
      addField: '',
      removeField: ''
    }
  }
  componentDidMount() {
    this.getUser();
    this.getAllStockTickers();
    this.getListOfFavs();
  }

  updateUserId(event) {
    this.setState({ userId: event.target.value });
  }

  getUser() {
    axios.get(url + `stocks`)
      .then((response) => {
        this.setState({ listOfAllStocks: response.data });
      })
  }
  getAllStockTickers() {
    axios.get(url + `stocks`)
      .then((response) => {
        this.setState({ listOfAllStocks: response.data });
      })
  }

  getListOfFavs() {
    axios.get(url + `user/${this.state.userId}`)
      .then((response) => {
        this.setState({ listOfFavs: response.data });
      })
  }

  addNewTickerToRemote(newTicker) {
    axios.put(url + `user/${this.state.userId}`, {
      stock: newTicker
    });
  }

  removeNewTickerFromRemote(removedTicker) {
    axios.delete(url + `user/${this.state.userId}/${removedTicker}`);
  }

  renderListOfAllStocks() {
    const { listOfAllStocks } = this.state;

    return (
      <>
        {listOfAllStocks.map(ticker => (
          <div>{ticker.Symbol}</div>
        ))}
      </>
    );
  }

  renderListOfFavs() {
    const { listOfFavs } = this.state;
    return (
      <>
        {listOfFavs.map(ticker => (
          <div>{ticker}</div>
        ))}
      </>
    );
  }

  updateRemoveField(event) {
    console.log("updateRemoveField" + event.target.value)
    this.setState({ removeField: event.target.value });
  }

  updateAddField(event) {
    console.log("updateAddField" + event.target.value)
    this.setState({ addField: event.target.value });
  }

  removeTicker(event) {
    console.log("removeTicker has been called" + event.target.innerText)
    const newListOfFavs = arrayRemove(this.state.listOfFavs, this.state.removeField);
    this.setState({ listOfFavs: newListOfFavs }, this.removeNewTickerFromRemote(this.state.removeField));
  }

  addTicker(event) {
    console.log("addTicker has been called" + event.target.innerText);
    var newListOfFavs = this.state.listOfFavs;
    newListOfFavs.push(this.state.addField);
    this.setState({ listOfFavs: newListOfFavs }, this.addNewTickerToRemote(this.state.addField));
  }

  render() {
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={require("assets/img/theme/duck.gif")}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>

                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <br />
                      <br />
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h3>
                      Anonymous { animals[Math.floor(Math.random() * animals.length)] }
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      Champaign, United States
                    </div>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      Corn field invader
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      University of Why is this here
                    </div>
                    <hr className="my-4" />
                    <p>
                      Here is something I haven't gotten the time to remove yet
                    </p>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      Show more
                    </a>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My account</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        Settings
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              UserId
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue= {this.state.userId}
                              onChange={this.updateUserId}
                              id="input-username"
                              placeholder="1"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              phone number
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-email"
                              placeholder= {this.state.phone}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <Button
                            color="primary"
                            size="sm"
                            onClick={this.getListOfFavs}
                          >get favs</Button>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Description */}
                    <h6 className="heading-small text-muted mb-4">My Favorite Tickers</h6>
                    <div className="pl-lg-4">
                      <FormGroup>
                        <label>I am subscribed to this list of tickers</label>
                        { this.renderListOfFavs() }
                        <Input
                          className="form-control-alternative"
                          id="input-removeFav"
                          placeholder="ticker"
                          type="text"
                          onChange={this.updateRemoveField}
                        />
                        <Button
                          color="primary"
                          size="sm"
                          onClick={this.removeTicker}
                          >Remove this ticker</Button>
                      </FormGroup>
                    </div>
                    <hr className="my-4" />
                    {/* Description */}
                    <h6 className="heading-small text-muted mb-4">All avaliable tickers</h6>
                    <div className="pl-lg-4">
                      <FormGroup>
                        <label>I can sub to any of the following tickers</label>
                        {this.renderListOfAllStocks()}
                        <Input
                          className="form-control-alternative"
                          id="input-addNewFav"
                          placeholder="ticker"
                          type="text"
                          onChange={this.updateAddField}
                        />
                        <Button
                          color="primary"
                          size="sm"
                          onClick={this.addTicker}
                          >Add this ticker</Button>
                      </FormGroup>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Profile;
