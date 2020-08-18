import React from 'react'
import './CommentBody.css'
import api from '../../../constants/api'
import {Container , Row, Col } from 'reactstrap'
import { StreamApp, NotificationDropdown, FlatFeed, LikeButton, Activity, CommentList, CommentField, StatusUpdateForm } from 'react-activity-feed';
import {Button} from 'reactstrap'
import 'react-activity-feed/dist/index.css';
import stream from 'stream-js'
let route='/comment'

class CommentBody extends React.Component{
constructor(props){
    super(props);
    this.state = {
        data:null,
     isActive: true,
     loading:true,
     token: null,
     user:null,
    }
this.state.data=props.data
this.state.user=props.userItem
console.log('token', props.data)

}
  async componentDidMount(){
     



  }

 render(){
if(this.state.data==null){
    return(<h1>DATA NULL</h1>)
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
    <StatusUpdateForm
      feedGroup="timeline"
      userId="user"/>
    <FlatFeed
      options={ {reactions: { recent: true } } }
      notify
      Activity={(props) =>
          <Activity {...props}
            Footer={() => (
              <div style={ {padding: '8px 16px'} }>
               
                <CommentField
                  activity={props.activity}
                  onAddReaction={props.onAddReaction} />
                <CommentList activityId={props.activity.id} />
              </div>
            )}
          />
        }
      />

  </StreamApp>
  </Col>
  <Col></Col>
  </Row>

  </Container>
)

}



}

export default CommentBody;