import { DateTime } from 'luxon';
import React, { Component, createRef } from 'react';
import { Button, Col, Container, FormControl, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import uuid from 'uuid';
import PlanListItem, { PlanItem } from './PlanListItem';
import Form from 'react-bootstrap/FormGroup';

interface PlanListState {
  items: PlanItem[];
}

export class PlanList extends Component<{}, PlanListState> {
  protected categoryRef = createRef<any>()
  protected descriptionRef  = createRef<any>();
  public state = {
    items: [
      {
        id: uuid(),
        category: 'work',
        description: 'do pomidoro',
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
              <FormControl ref={this.categoryRef} />
            </InputGroup>
          </Col>
          <Col xs={8}>
            <InputGroup>
              <FormControl ref={this.descriptionRef} onKeyPress={this.handleEnter}/>
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
            {this.state.items.length ? (
              <ListGroup variant="flush">
                {this.state.items.map((item) => <PlanListItem key={item.id} {...item} />)}
              </ListGroup>
            ) : (
              <div>There no any items</div>
            )}
          </Col>
        </Row>
      </Container>
    );
  }

  protected handleEnter = (e: React.SyntheticEvent<HTMLInputElement>) => {
    this.addItem({
      category: this.categoryRef.current.value,
      description: this.descriptionRef.current.value
    });
  }

  protected addItem = (values: Partial<PlanItem>) => {
    this.setState((state) => ({
      items: [
        ...state.items,
        {
          id: uuid(),
          category: values.category!,
          description: values.description!,
          order: state.items.length + 1,
          amount: 1,
          created_at: DateTime.local()
        }
      ]
    }));
  };
}

export default PlanList;
