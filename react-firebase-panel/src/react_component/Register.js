import React, {Component} from 'react';
import * as firebase from 'firebase';
import MESSAGE_CONSTANTS from '../config_files/message_constants.json';
import Modal from './Modal';

/**
 * TODO: Comments here...
 */
function Button(props) {
  return(
    <div>
      <button className="btn btn-info App-float-right" type="button" id="dropdownMenu1" aria-haspopup="true" aria-expanded="true" data-toggle="modal" data-target="#myModal">
        <span className="glyphicon glyphicon-plus" />
        &nbsp;
        { MESSAGE_CONSTANTS.ADD_USER }
      </button>

      <div id="myModal" className="modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
        <Modal userId={props.userId} />
      </div>
    </div>
  );
}

/**
 * Based on the props.usersData tells whether to display or not the table.
 */
function DisplayTable(props) {
  if(props.usersData) {
    return (<Table usersData={ props.usersData } />)
  } else {
    return (null);
  }
}

/**
 * TODO: change the for using the actual values from the DB
 */
function Table(props) {

  const objArray = [
    {
      "city" : "Leon",
      "email" : "elyon.systems.mijael@gmail.com",
      "name" : "VictorLopez",
      "state" : "Gto"
      }
  ];

  const rows = objArray.map((obj, index) =>
    <tr key={ index }>
      <td>{ index + 1 }</td>
      <td>{ obj.email }</td>
      <td>{ obj.name }</td>
      <td>{ obj.city }</td>
      <td>{ obj.state }</td>
      <td>
        <button type="button" className="btn btn-danger">
          <span className="glyphicon glyphicon-trash"></span> 
        </button>
      </td>
    </tr>
  );

  setTimeout(() => {
    console.log("usersData: ", props.usersData);
  }, 3000);

  

  return(
    <table className="table">
      <thead>
        <tr>
          <th>{ MESSAGE_CONSTANTS.TH_COL1 }</th>
          <th>{ MESSAGE_CONSTANTS.TH_COL2 }</th>
          <th>{ MESSAGE_CONSTANTS.TH_COL3 }</th>
          <th>{ MESSAGE_CONSTANTS.TH_COL4 }</th>
          <th>{ MESSAGE_CONSTANTS.TH_COL5 }</th>
          <th>{ MESSAGE_CONSTANTS.DELETE }</th>
        </tr>
      </thead>
      <tbody>
        { rows }
      </tbody>
      <tfoot>
        <tr>
          <th>0</th>
          <th> { MESSAGE_CONSTANTS.USERS_REGISTERED } </th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </tfoot>
    </table>
  );
}

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      usersData : null
    });

    this.getUsersData(props.userId);
  }

  /**
   * Gets users to display in the table
   * TODO: Get users Data into an array [{}, {}] use Object.key(usersData)
   */
  getUsersData(userId) {
    firebase.database().ref('/users-data/' + userId).once('value').then((snapshot) => {
      this.setState({
        usersData : snapshot.val()
      });
    });
  }


  render() {
    return(
      <div className="App-padding-leftright-p2">
        <Button userId={ this.props.userId } />
        <DisplayTable usersData={ this.state.usersData } />
      </div>
    );
  }

}

export default Register;
