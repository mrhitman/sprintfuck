import React, { Component } from 'react';
import { Col, FormControl, InputGroup, Row } from 'react-bootstrap';

export class PlanList extends Component {
  public render() {
    return (
      <React.Fragment>
        <Row>
          <Col>
            <InputGroup>
              <FormControl />
            </InputGroup>
          </Col>
          <Col>
            <InputGroup>
              <FormControl />
            </InputGroup>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default PlanList;
