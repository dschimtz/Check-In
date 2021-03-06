import React from 'react';
import axios from "axios";
import '../App.css';

export default class CheckIn extends React.Component {

  constructor() {
    super();
    this.state = {isChecked: false};
    //this.handleChecked = this.handleChecked.bind(this);
    this.handleChecked = this.handleChecked.bind(this); // set this, because you need get methods from CheckBox 
  }

  SubmitCheckIn(name, pid, reason, noPID) {
    //if form empty, don't submit
    // if noPID = true, make sure name and reason are there
    // if noPID = false, make sure name and PID and reason are there
    if (noPID === true && (name === "" || reason === "")) {
      alert("Please enter name and reason for visit");
    }
    else if (noPID === false && (name === "" || pid === "" || reason === "")) {
      alert("Please enter name, PID, and reason for visit");
    } else {

      var today = new Date();
      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      var time = today.getHours() + ":" + today.getMinutes();

      const item = {
        name: name, // add name input field, make blank=false
        PID: pid,
        date: date,
        timeIn: time,
        timeOut: '00:00', // leave empty
        reason: reason,
        staff: "",
        checkedIn: true,
        hasPID: !noPID
      };

      // need to figure out how to send authorization token in http requests 
      //axios.post('/api/checkins/', item);

      axios({ method: 'POST', url: '/api/checkins/', headers: {authorization: localStorage.token}, data: { 
        name: name,
        PID: pid,
        date: date,
        timeIn: time,
        timeOut: '00:00',
        reason: reason,
        staff: "",
        checkedIn: true,
        hasPID: !noPID
      } });

      // navigate back to home
      this.props.history.push('');
    }
  }

  handleChecked() {
    this.setState({isChecked: !this.state.isChecked});
  }

  render() {
    return (
      <div class="checkin">
        <h2>Check In</h2>
        <form onSubmit={() => { this.SubmitCheckIn(document.getElementById("name").value, document.getElementById("pid").value, document.getElementById("reason").value, document.getElementById("noPID").checked) }}>
          <div class="textbox">
            <label>
              Name:
                  <input type="text" name="name" id="name" />
            </label>
          </div>
          <div class="textbox">
            <label>
              PID:
                  <input type="text" name="pid" id="pid" disabled={this.state.isChecked} />
            </label><br></br>
            <input type="checkbox" id="noPID" class="noPID" onChange = {this.handleChecked}/>
            <label id="noPIDLabel" for="noPID"> Check if you are a non-UNC student or do not have a PID</label>
            {/* <p>(Scanner can be used to input PID)</p> */}
          </div>
          <div class="textbox">
            <label>
              Reason:
                  <input type="text" name="reason" id="reason" />
            </label>
          </div>
          <button class="check-in">Submit</button>
        </form>
      </div>
    );
  }
}