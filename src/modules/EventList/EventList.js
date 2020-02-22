import React, { Component } from "react";
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardDeck,
  CardSubtitle,
  CardBody,
  Row,
  Col,
  Container
} from "reactstrap";
import "./EventList.scss";
class EventList extends Component {
  state = {
    allEventData: [],
    isLoading: true
  };

  setDataInTable = that => {
    this.setState({ isLoading: true });
    fetch("http://127.0.0.1/api/event", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(function(data) {
        that.setState({
          allEventData: data,
          isLoading: false
        });
      })
      .catch(error => console.error("Error:", error));
  };

  componentDidMount = () => {
    const that = this;
    this.setDataInTable(that);
  };

  render() {
    const { allEventData, isLoading } = this.state;
    return (
      <div className="event-dashboard">
        <Container fluid>
          <Row>
            <Col sm="10">
              <h2 className="dashboard-header poppins-font gold-gradient">
                Event Dashboard
              </h2>
            </Col>
            <Col sm="2">
              <Button className="create-event-button primary">Create Event</Button>
            </Col>
          </Row>
          <Row className="event-row">
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              allEventData.map(event => {
                return <EventCard data={event} />;
              })
            )}
          </Row>
        </Container>
      </div>
    );
  }
}

export default EventList;

const EventCard = props => {
  const { data } = props;
  const { title, description, venue, times, fee, photo, video, user_id } = data;
  return (
    <Col sm="4" className="event-col">
      <Card className="event-card">
        <CardImg
          top
          width="100px"
          height="100px"
          src={photo}
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <CardSubtitle>{venue}</CardSubtitle>
          <CardText>{description}</CardText>
        </CardBody>
      </Card>
    </Col>
  );
};
