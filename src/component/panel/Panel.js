import React, {Component} from 'react';
import * as firebase from 'firebase';
import Modal from './Modal';
import MESSAGE_CONSTANTS from '../../config/message_constants.json';
import CONSTANTS from '../../config/constants.json';

let usersIds = []; // This is set general for our method deleteUser within the class can work.

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

/**
 * Create and display the table with all the loaded users.
 * objArray holds the info of each user.
 * usersIds holds the ids of each user.
 * The map() function helps to display each row of the table.
 * The return() function displays the whole table.
 *
 * @ props - Holds the usersData of each registered user
 */
function Table(props) {
  let objArray = [];

  usersIds = Object.keys(props.usersData);

  usersIds.forEach( (id) => {
    objArray.push(props.usersData[id]);
  });

  // props.deleteUser(index) calls the method deleteUser within the Register class.
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
          <th>{ MESSAGE_CONSTANTS.TH_01 }</th>
          <th>{ MESSAGE_CONSTANTS.TH_02 }</th>
          <th>{ MESSAGE_CONSTANTS.TH_03 }</th>
          <th>{ MESSAGE_CONSTANTS.TH_04 }</th>
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

class Panel extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      usersData : null
    });

    this.deleteUser = this.deleteUser.bind(this);
  }

  /**
   * Gets users to display in the table
   */
  componentWillMount () {
    firebase.database().ref(CONSTANTS.REFERENCE1 + this.props.userId).on('value', (snapshot) => {
      this.setState({
        usersData : snapshot.val(),
      });
    });
  }

  /**
   * Delete a user from the DB
   * usersIds is filled within the JSX Table.
   * @param index - The row of the table that we want to delete.
   */
  deleteUser(index) {
    firebase.database().ref(CONSTANTS.REFERENCE3 + usersIds[index]).remove();
    firebase.database().ref(CONSTANTS.REFERENCE2 + usersIds[index]).remove();
    firebase.database().ref(CONSTANTS.REFERENCE1 + this.props.userId + '/' + usersIds[index]).remove();
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

export default Panel;
