import {DateTime} from 'luxon';
import React, {Component, createRef} from 'react';
import {Button, Col, Container, FormControl, InputGroup, ListGroup, Row} from 'react-bootstrap';
import {FaStar} from 'react-icons/fa';
import uuid from 'uuid';
import PlanListItem, {PlanItem} from './PlanListItem';

interface PlanListState {
  items: PlanItem[];
}

export class PlanList extends Component<{}, PlanListState> {
  protected categoryRef = createRef<any>();
  protected descriptionRef = createRef<any>();
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
              <FormControl ref={this.categoryRef}/>
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
              <FaStar size="13"/>
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            {this.state.items.length ? (
              <ListGroup variant="flush">
                {this.state
                  .items
                    .sort((a, b) => b.order - a.order)
                  .map((item) => <PlanListItem
                    key={item.id} {...item} />)}
              </ListGroup>
            ) : (
              <div>There no any items</div>
            )}
          </Col>
        </Row>
      </Container>
    );
  }

  protected handleEnter = (e: any) => {
    if (e.key === 'Enter') {
      this.addItem({
        category: this.categoryRef.current.value,
        description: this.descriptionRef.current.value
      });
    }
  };

  protected isEqualItem = (a: any, b: any) => {
      return a.category === b.category && a.description === b.description
  };

  protected addItem = (values: Partial<PlanItem>) => {
    const items = this.state.items;
    const lastItem = items.reduce((acc, item) => item.order > acc.order ? item : acc);
    if (this.isEqualItem(values, lastItem)) {
      const index = items.indexOf(lastItem);
      items.splice(index, 1);
      this.setState({items: [...items, {...lastItem, amount: lastItem.amount + 1}]});
      return;
    }
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
