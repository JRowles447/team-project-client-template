import React from 'react';
import {createNewEvent} from '../server.js'

export default class CreateList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "value": "",
      "user": this.props.user,
      "eventName": "",
      "org": "",
      "org_link": "",
      "image": "",
      "time": "",
      "location": "",
      "description": "",
      "category": ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Called when the user clicks the 'post' button.
   * Triggers the `onPost` prop if the post isn't empty, and clears
   * the component.
   */
  handlePost(e) {
    // Prevent the event from "bubbling" up the DOM tree.
    e.preventDefault();
    // Trim whitespace from beginning + end of description.
    var statusUpdateText = this.state.value.trim();
    if (statusUpdateText !== "") {
      /* TODO: How do we send the post to the server + update the EventFeed? */
      // Reset Event entry form (necessary?).
      this.setState({value: ""});
    }
  }

  /**
 * Called when the user types a character into the description box.
 * @param e An Event object.
 */
handleChange(e) {
  // Prevent the event from "bubbling" up the DOM tree.
  e.preventDefault();
  // e.target is the React Virtual DOM target of the input event -- the
  // <textarea> element. The textarea's `value` is the entire contents of
  // what the user has typed in so far.
  const name = e.target.name;
  this.setState({
    [name]: e.target.value
  });
}

  render() {
    return (
      <div>
        <h1 className="event-page-title">{this.props.title}</h1>
      <div className="col-md-9">
        <span className="red">&nbsp;</span>
        <span className="black">Event Title:</span>
        <br />
        <input type="text" className="form-control" placeholder="Event Title" size={10} required="required" value={this.state.eventName} onChange={(e) => this.handleChange(e)} />
        <br />

        <span className="red">&nbsp;</span>
        <span className="black">Location:</span>
        <br />
        <input type="text" className="form-control" placeholder="Venue Name" size={10} required="required" />
        <br />
        <span className="red">&nbsp;</span>
        <span className="black">Organization：</span>
        <br />
        <input type="text" className="form-control" placeholder="Organization" size={10} />
        <br />
          <span className="red">&nbsp;</span>
          <span className="black">Organization Link：</span>
          <br />
          <input type="text" className="form-control" placeholder="Organization Link" size={10} />
          <br />
        <div className="DateAndTime">
          <span className="red">&nbsp;</span>
          <span className="black">Date &amp; Time: </span>
          <input type="date" className="form-control form-control-xxx" placeholder="Ex: 10/18/2016" style={{width: 200}} required="required" />
          <input type="time" className="form-control form-control-xxx" placeholder="From" style={{width: 140}} required="required" />
          <h>-</h>
          <input type="time" className="form-control form-control-xxx" placeholder="To" style={{width: 140}} required="required" />
        </div>
        <br /><span className="red" />
        <span className="black">Upload Image:</span>
        <font className="grey" size={1}>Your Image must be JPG or PNG and not exceed ? MB</font>
        <br /><img src="img/uploadImage.jpg" style={{width: "10%"}} /><br />

        <br />
        <input type="file" id="filehooser" />
        <br />
        <span className="black">Event Description:</span>
        <br />
        <textarea id="postbox" rows={10} cols={100} name="post" value={this.state.description} onChange={(e) => this.handleChange(e)} />
        {console.log(this.state)}
        <br />
      </div>
    </div>
    )
  }
}
