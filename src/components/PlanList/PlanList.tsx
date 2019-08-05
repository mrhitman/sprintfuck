import React, { Component } from 'react';
import { Button, Col, Container, FormControl, InputGroup, Row } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

export class PlanList extends Component {
  public render() {
    return (
      <Container className="planlist-panel">
        <Row>
          <Col xs={5}>
            <InputGroup>
              <FormControl />
            </InputGroup>
          </Col>
          <Col xs={6}>
            <InputGroup>
              <FormControl />
              <InputGroup.Append>
                <InputGroup.Text>+</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Col>
          <Col xs={1}>
            <Button variant="outline-warning">
              <FaStar size="13" />
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default PlanList;
