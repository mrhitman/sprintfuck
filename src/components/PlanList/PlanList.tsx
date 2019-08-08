import { DateTime } from "luxon";
import React, { Component } from "react";
import { Button, Col, Container, FormControl, InputGroup, ListGroup, Row } from "react-bootstrap";
import { FaEllipsisH, FaStar } from "react-icons/fa";
import uuid from "uuid";

interface PlanItem {
  id: string;
  category: string;
  description: string;
  order: number;
  amount: number;
  is_favorite: boolean;
  created_at: DateTime;
}

interface PlanListState {
  items: PlanItem[];
}

export class PlanList extends Component<{}, PlanListState> {
  public state = {
    items: [
      {
        id: uuid(),
        category: "work",
        description: "do pomidoro",
        order: 1,
        is_favorite: false,
        amount: 1,
        created_at: DateTime.local()
      }
    ]
  };

  public render() {
    return (
      <Container className="planlist-panel">
        <Row>
          <Col xs={3}>
            <InputGroup>
              <FormControl />
            </InputGroup>
          </Col>
          <Col xs={8}>
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
        <Row>
          <Col>
            <ListGroup variant="flush">
              {this.state.items.map(item => (
                <ListGroup.Item className="planlist-item" style={{ borderBottom: '1px solid rgba(75%, 75%, 75%, 1)' }}>
                  <Row>
                    <Col xs={3}>{item.category}</Col>
                    <Col xs={6}>{item.description}</Col>
                    <Col xs={1}>{item.created_at.toFormat("HH:mm")}</Col>
                    <Col xs={1}>
                      <Button variant="outline-info">{item.amount}</Button>
                    </Col>
                    <Col xs={1}>
                      <Button variant="outline-info">
                        <FaEllipsisH size="13" />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default PlanList;
