import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  NavItem,
  NavLink
} from "reactstrap";

const url = "http://fa19-cs411-005.cs.illinois.edu:3000/";

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      usernameField: '',
      allUsers: []
    }
    this.updateUsername = this.updateUsername.bind(this);
    this.submit = this.submit.bind(this);
  }

  updateUsername(event) {
    this.setState({ usernameField: event.target.value });
  }

  componentDidMount() {
    axios.get(url + `user`)
      .then((response) => {
        this.setState({ allUsers: response.data });
      });
  }

  submit() {
    var { allUsers, usernameField } = this.state;
    var result = allUsers.filter(individual => individual._id === usernameField).length;
    console.log(result);

    if (result > 0) {
      //navigate to dashboard
    } else {
      console.log("error");
    }
  }

  render() {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Sign in with userId</small>
              </div>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input onChange={this.updateUsername} placeholder="userid" type="text" />
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                    <NavLink className="nav-link-icon" to="/" tag={Link}>
                      <Button onClick={this.submit} className="my-4" color="primary" type="button">
                        Sign in
                      </Button>
                    </NavLink>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Create new account</small>
              </a>
            </Col>
          </Row>
        </Col>
      </>
    );
  }
}

export default Login;
