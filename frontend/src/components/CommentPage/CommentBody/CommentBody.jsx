import React from "react";
import "./CommentBody.css";
import { Container, Row, Col } from "reactstrap";
import {
  StreamApp,
  NotificationDropdown,
  FlatFeed,
  Activity,
  CommentList,
  CommentField,
  StatusUpdateForm,
} from "react-activity-feed";
import "react-activity-feed/dist/index.css";
import DEBUG from '../../../constants/debug';

/*
Fetched Comment feed 
*/

class CommentBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isActive: true,
      loading: true,
      token: null,
      user: null,
    };
    this.state.data = props.data;
    this.state.user = props.userItem;
    /* 
    -------------------
    DEBUG. CHECK TOKEN
    -------------------
    */
    if (DEBUG) {
      console.log("CommentBody Token Received : ", props.data);
    }
  }
  async componentDidMount() {}

  render() {
    if (this.state.data == null) {
      return (<p style={{color:'white'}}>unable to fetch <pre style={{color:'white'}}>:(((</pre> </p>);
    }

    return (
      <Container fluid>
        <Row lg="auto">
          <Col></Col>
          <Col className="comment-div" lg="6">
            <StreamApp
              apiKey="cacwd7veh7pg"
              appId="89736"
              token={this.state.data}
            >
              <NotificationDropdown notify />
              <StatusUpdateForm feedGroup="timeline" userId="user" />
              <FlatFeed
                options={{ reactions: { recent: true } }}
                notify
                Activity={(props) => (
                  <Activity
                    {...props}
                    Footer={() => (
                      <div style={{ padding: "8px 16px" }}>
                        <CommentField
                          activity={props.activity}
                          onAddReaction={props.onAddReaction}
                        />
                        <CommentList activityId={props.activity.id} />
                      </div>
                    )}
                  />
                )}
              />
            </StreamApp>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
}

export default CommentBody;
