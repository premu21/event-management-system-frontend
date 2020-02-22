import React, { Component } from 'react';
import { Input, FormGroup, Label, FormFeedback, InputGroup, InputGroupAddon } from 'reactstrap';

class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      date: "",
      time:"",
      venue:"",
      fees:"",
      photo:"",
      video:"",
    }
  }

  handleChange = (event) => {
    const field = event.target.name;
    this.setState({
      [field]: event.target.value
    })
  }

  handleSubmit = (event) => {
    const { title, description,time, venue, fees, photo, video} = this.state;
    event.preventDefault();
    const data = {
      'title': title,
      'description': description,
      'times': time,
      'venue': venue,
      'fee': fees,
      'photo': photo,
      'video': video,
      'user_id': '1'
    }
    fetch('http://127.0.0.1/api/event',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json()).catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response)); 
  }

  render() {
    return (
      <div>
        <div className="text-center">
          <h4>Event Registration</h4>
        </div>
        <hr />

        <div className="jumbotron" style={{ margin: "5%" }}>
          <form onSubmit={this.handleSubmit}>

            <div className="form-group">
              <label>Title:</label>
              <Input
                className="form-input"
                name="title"
                type="text"
                placeholder="Enter event title"
                onChange={this.handleChange}
                value={this.state.title }
              />
            </div>

            <div className="form-group">
            <Label className="form-label poppins-font">Description</Label>
              <Input
                className="form-input"
                name="description"
                type="text"
                placeholder="Enter event description"
                onChange={this.handleChange}
                value={this.state.description }
              />
            </div>

            <div className="form-group">
            <Label className="form-label poppins-font">Event Date</Label>
               <Input
                className="form-input"
                name="date"
                type="text"
                placeholder="Enter date in the format mm.dd.yyyy"
                onChange={this.handleChange}
                value={this.state.date }
              />
            </div>
            <div className="form-group">
            <Label className="form-label poppins-font">Time</Label>
               <Input
               className="form-input"
               name="time"
               type="text"
               placeholder="Enter Time"
               onChange={this.handleChange}
               value={this.state.time }
             />
            </div>
            <div className="form-group">
            <Label className="form-label poppins-font">Venue</Label>
               <Input
               className="form-input"
               name="venue"
               type="text"
               placeholder="Enter Venue"
               onChange={this.handleChange}
               value={this.state.venue }
             />
            </div>

            <div className="form-group">
            <Label className="form-label poppins-font">Fees</Label>
               <Input
               className="form-input"
               name="fees"
               type="text"
               placeholder="Enter Fees"
               onChange={this.handleChange}
               value={this.state.fees }
             />
            </div>
            <div className="form-group">
            <Label className="form-label poppins-font">Photo</Label>
               <Input
               className="form-input"
               name="photo"
               type="text"
               placeholder="Enter Photo"
               onChange={this.handleChange}
               value={this.state.photo }
             />
            </div>
            <div className="form-group">
            <Label className="form-label poppins-font">Video</Label>
               <Input
               className="form-input"
               name="video"
               type="text"
               placeholder="Enter Video"
               onChange={this.handleChange}
               value={this.state.video }
             />
            </div>

            <button type="submit" className="btn btn-primary">Add Event</button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddEvent;
