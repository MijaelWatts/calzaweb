import React, {Component} from 'react';
// import * as firebase from 'firebase';
import MESSAGE_CONSTANTS from '../config_files/message_constants.json';
import Modal from './Modal';

// Your firebase web setup here
// SINCE THIS SETUP IS IN THE HEADER, THIS IS PASSED TO ALL THE APP
// const config = {
//   apiKey: "AIzaSyB3K29Aj7ySitbNmctTnoXq0z03ku6ssqw",
//   authDomain: "login-project-35552.firebaseapp.com",
//   databaseURL: "https://login-project-35552.firebaseio.com",
//   storageBucket: "login-project-35552.appspot.com",
//   messagingSenderId: "338943979739"
// };
// firebase.initializeApp(config);

// const JSON1 = [
//   {col1: '1', col2: 'vmijael.lopezm@gmail.com', col3: 'Mijael', col4: 'León', col5: 'GTO', col6: '17-01-2017'},
//   {col1: '2', col2: 'salvador.bermudez@gmail.com', col3: 'Salvador', col4: 'León', col5: 'GTO', col6: '17-01-2017'}
// ]

function Button(props) {
  console.log("Button props: ", props);
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

// function Table(props) {
//   console.log("props: ", props);

//   if(props.jsonToDisplay) {
    // const rows = props.jsonToDisplay.map((jsonToDisplay) =>
    //   <tr key={ jsonToDisplay.franchisee001.acceso }>
    //     <td>{ jsonToDisplay.franchisee001.acceso }</td>
    //     <td>{ jsonToDisplay.franchisee001.acceso }</td>
    //     <td>{ jsonToDisplay.franchisee001.acceso }</td>
    //     <td>{ jsonToDisplay.franchisee001.acceso }</td>
    //     <td>{ jsonToDisplay.franchisee001.acceso }</td>
    //     <td>{ jsonToDisplay.franchisee001.acceso }</td>
    //     <td>
    //       <div className="btn-group btn-group-sm">
    //         <button type="button" className="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    //           <span className="glyphicon glyphicon-pencil"></span>
    //           &nbsp;
    //           <span className="caret"></span>
    //         </button>
    //         <ul className="dropdown-menu">
    //           <li><a href="#"> { MESSAGE_CONSTANTS.EDIT } </a></li>
    //           <li><a href="#"> { MESSAGE_CONSTANTS.DELETE } </a></li>
    //         </ul>
    //       </div>
    //     </td>
    //   </tr>
    // );

//     return(
//       <table className="table">
//         <thead>
//           <tr>
//             <th>{ MESSAGE_CONSTANTS.TH_COL1 }</th>
//             <th>{ MESSAGE_CONSTANTS.TH_COL2 }</th>
//             <th>{ MESSAGE_CONSTANTS.TH_COL3 }</th>
//             <th>{ MESSAGE_CONSTANTS.TH_COL4 }</th>
//             <th>{ MESSAGE_CONSTANTS.TH_COL5 }</th>
//             <th>{ MESSAGE_CONSTANTS.TH_COL6 }</th>
//             <th>{ MESSAGE_CONSTANTS.TH_COL7 }</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td> { props.jsonToDisplay.franchisee001.id } </td>
//             <td> { props.jsonToDisplay.franchisee001.usuario } </td>
//             <td> { props.jsonToDisplay.franchisee001.encargado } </td>
//             <td> { props.jsonToDisplay.franchisee001.ciudad } </td>
//             <td> { props.jsonToDisplay.franchisee001.estado } </td>
//             <td> { props.jsonToDisplay.franchisee001.acceso } </td>
//             <td>  </td>
//           </tr>
//         </tbody>
//         <tfoot>
//           <tr>
//             <th>2</th>
//             <th> { MESSAGE_CONSTANTS.USERS_REGISTERED } </th>
//             <th></th>
//             <th></th>
//             <th></th>
//             <th></th>
//             <th></th>
//           </tr>
//         </tfoot>
//       </table>
//     );
//   } else {
//     return null;
//   }

// }

class Register extends Component {
  constructor(props) {
    super(props);

    console.log("Register props: ", props);

    // this.state = ({
    //   franchisees : null
    // });
    // this.getFranchisees  = this.getFranchisees.bind(this);

    // this.getFranchisees();
  }

  // getFranchisees() {
    // const userId = 'mG9ZNLIg2Wf25t6wyrLHhQFBIWo2';
    // console.log("======= getFranchisees =======")

    // Create reference
    // const dbRefObject = firebase.database().ref().child('sysadmin');

    // Sync object changes
    // dbRefObject.on('value', snap => {
    //   this.setState({
    //     franchisees : snap.val()
    //   });
    //   console.log("  this.state.franchisees: ", this.state.franchisees);
    // });

    // dbRefObject.on('child_added', snap => console.log("  child_added evt: ", snap.val()));

    // child_changed 
    // child_removed
  // }

  render() {
    return(
      <div className="App-padding-leftright-p2">
        <Button userId={ this.props.userId } />
        {/*<Table jsonToDisplay={ this.state.franchisees } />*/}
      </div>
    );
  }

}

export default Register;
