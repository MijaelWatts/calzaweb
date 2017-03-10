import React, {Component} from 'react';
import * as firebase from 'firebase';
import Modal from './Modal';
import MESSAGE_CONSTANTS from '../config_files/message_constants.json';

/**
 * Button for 'Agregar Usuario'
 * Gets the 'userId' throug the 'props' for sending it to the Modal when it's open.
 */
function Button(props) {
  return(
    <div>
      <button className="btn btn-info App-float-right animated fadeIn" type="button" id="dropdownMenu1" aria-haspopup="true" aria-expanded="true" data-toggle="modal" data-target="#myModal" >
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
    return (<Table usersData={ props.usersData } deleteUser={ props.deleteUser } />)
  } else {
    return (null);
  }
}

let usersIds = [];

/**
 * TODO: Generate comments
 */
function Table(props) {
  console.log("Table props: ", props);

  usersIds = Object.keys(props.usersData);
  let objArray = [];

  usersIds.forEach( (id) => {
    objArray.push(props.usersData[id]);
  });

  const rows = objArray.map((obj, index) =>
    <tr key={ index }>
      <td>{ obj.email }</td>
      <td>{ obj.name }</td>
      <td>{ obj.city }</td>
      <td>{ obj.state }</td>
      <td>
        <button type="button" className="btn btn-danger" onClick={ () => { props.deleteUser(index) } }>
          <span className="glyphicon glyphicon-trash"></span> 
        </button>
      </td>
    </tr>
  );

  return(
    <table className="table animated fadeInLeft">
      <thead>
        <tr>
          <th>{ MESSAGE_CONSTANTS.TH_COL1 }</th>
          <th>{ MESSAGE_CONSTANTS.TH_COL2 }</th>
          <th>{ MESSAGE_CONSTANTS.TH_COL3 }</th>
          <th>{ MESSAGE_CONSTANTS.TH_COL4 }</th>
          <th>{ MESSAGE_CONSTANTS.DELETE }</th>
        </tr>
      </thead>
      <tbody>
        { rows }
      </tbody>
      <tfoot>
        <tr>
          <th> { objArray.length } { MESSAGE_CONSTANTS.USERS_REGISTERED } </th>
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
      usersData : null,
      usersId   : null
    });

    this.getUsersData(props.userId);
    this.deleteUser = this.deleteUser.bind(this);
  }

  /**
   * Gets users to display in the table
   */
  getUsersData(userId) {
    firebase.database().ref('/users-data/' + userId).on('value', (snapshot) => {
      this.setState({
        usersData : snapshot.val(),
      });
    });
  }

  /**
   * Delete a user from the DB
   * @param index - The row of the table that we want to delete.
   */
  deleteUser(index) {
    firebase.database().ref('/bridge/' + usersIds[index]).remove();
    firebase.database().ref('/users/' + usersIds[index]).remove();
    firebase.database().ref('/users-data/' + this.props.userId + '/' + usersIds[index]).remove();
  }


  render() {
    return(
      <div className="App-padding-leftright-p2">
        <Button userId={ this.props.userId } />
        <br /><br /><br />
        <DisplayTable usersData={ this.state.usersData } deleteUser={ this.deleteUser } />
      </div>
    );
  }

}

export default Register;
