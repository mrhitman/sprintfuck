import React, { Component, createRef } from 'react';
import { Button, Col, Container, FormControl, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import PlanListItem, { PlanItem } from './PlanListItem';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { PLAN } from '../../store/plan/types';

interface ItemValues {
  category: string;
  description: string;
}

interface PlanListState {
  plan: PlanItem[];
  addItem: (values: ItemValues) => void;
  deleteItem: (id: string) => void;
  cloneItem: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
}


class PlanList extends Component<{} & PlanListState> {
  protected categoryRef = createRef<any>();
  protected descriptionRef = createRef<any>();

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
              <FormControl ref={this.descriptionRef} onKeyPress={this.handleEnter} />
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
            {this.props.plan.length ? (
              <ListGroup variant="flush">
                {this.props.plan
                  .sort((a, b) => b.order - a.order)
                  .map((item) => (
                    <PlanListItem
                      key={item.id}
                      {...item}
                      onDelete={this.props.deleteItem}
                      onIncrement={this.props.increment}
                      onDecrement={this.props.decrement}
                      onClone={this.props.cloneItem}
                    />
                  ))}
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
      this.props.addItem({
        category: this.categoryRef.current.value,
        description: this.descriptionRef.current.value
      });
    }
  };
}

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = (dispatch: Dispatch) => ({
  addItem: (values: ItemValues) => dispatch({ type: PLAN.ADD, payload: values }),
  deleteItem: (id: string) => dispatch({ type: PLAN.REMOVE, payload: id }),
  cloneItem: (id: string) => dispatch({ type: PLAN.CLONE, payload: id }),
  increment: (id: string) => dispatch({ type: PLAN.ITEM_INC, payload: id }),
  decrement: (id: string) => dispatch({ type: PLAN.ITEM_DEC, payload: id })
});

export default connect<PlanListState>(mapStateToProps, mapDispatchToProps)(PlanList);
