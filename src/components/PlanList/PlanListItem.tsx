import {DateTime} from "luxon";
import React, {Component} from "react";
import {Button, Col, Dropdown, ListGroup, Row} from "react-bootstrap";
import {FaEllipsisH} from "react-icons/fa";

export interface PlanItem {
  id: string;
  category: string;
  description: string;
  order: number;
  amount: number;
  is_favorite?: boolean;
  created_at: DateTime;
}

interface PlanListItemProps extends PlanItem {
  onDelete: (id: string) => void;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onClone: (id: string) => void;
}

export class PlanListItem extends Component<PlanListItemProps> {
  public render() {
    return (
      <ListGroup.Item className="planlist-item" style={{ borderBottom: '1px solid rgba(75%, 75%, 75%, 1)' }}>
        <Row>
          <Col xs={3}>{this.props.category}</Col>
          <Col xs={6}>{this.props.description}</Col>
          <Col xs={1}>{this.props.created_at.toFormat('HH:mm')}</Col>
          <Col xs={1}>
            <Button variant="outline-info" onClick={this.handleIncrement}>{this.props.amount}</Button>
          </Col>
          <Col xs={1}>
            <Dropdown>
              <Dropdown.Toggle id={`button-${this.props.id}`}>
                <FaEllipsisH size="13" />
              </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={this.handleIncrement}>Increase</Dropdown.Item>
              <Dropdown.Item onClick={this.handleDecrement}>Decrease</Dropdown.Item>
              <Dropdown.Item onClick={this.handleDelete}>Delete</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  }

  protected handleDelete = () => {
    this.props.onDelete(this.props.id);
  }

  protected handleClone = () => {
    this.props.onClone(this.props.id);
  }

  protected handleIncrement = () => {
    this.props.onIncrement(this.props.id);
  }

  protected handleDecrement = () => {
    this.props.onDecrement(this.props.id);
  }
}

export default PlanListItem;
