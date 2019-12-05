import React from "react";
import axios from 'axios';
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
  Col
} from "reactstrap";

const url = "http://fa19-cs411-005.cs.illinois.edu:3000/";

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      usernameField: '',
      phoneField: ''
    }
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePhone = this.updatePhone.bind(this);
    this.submit = this.submit.bind(this);
  }

  updateUsername(event) {
    this.setState({ usernameField: event.target.value });
  }

  updatePhone(event) {
    this.setState({ phoneField: event.target.value });
  }

  adduser() {
    const { usernameField, phoneField } = this.state;

    console.log(usernameField)
    console.log(phoneField)

    axios.post(url + `user`, {
      _id: usernameField,
      favorite: [],
      phone: phoneField
    });
  }

  submit() {
    this.adduser();
  }

  render() {
    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Sign up with credentials</small>
              </div>
              <Form role="form">
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input onChange={this.updateUsername} placeholder="username" type="text" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input onChange={this.updatePhone} placeholder="phone number" type="text" />
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <Button onClick={this.submit} className="mt-4" color="primary" type="button">
                    Create account
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

export default Register;
