// TODO: Migrate this class to JSON

import {Component} from 'react';

class VersionConstants extends Component {

	static get VERSIONS() {
		return [
			{
				version: '0.0.5',
				description: ['Registro de email y password de usuario para autenticación.', 'Registro de users, bridge y users-data.', 'Animaciones de mensajes al agregar un nuevo usuario.', 'Boton para limpiar input boxes agregado.', 'Habilitación / Deshabilitación del boton para limpiar input boxes.', 'Limpiar input boxes al cerrar el modal.', 'Remover cualquier mensaje del modal al cerrarlo.']
			},
			{
				version: '0.0.4',
				description: ['Creación de botón de agregar usuario.', 'Mostrar modal para registrar usuario', 'Migrar modal a un componente por separado.', 'Ligera validación para agregar nuevo usuario', 'Hacer que el modal sólo se cierre al pulsar el botón cerrar (X).']
			},
			{
				version: '0.0.3',
				description: ['Sincronización simple con firebase para obtener datos de firebase y mostrarlos en tabla.', 'Creación de login.', 'Puente entre login y panel.', 'Cierre de sesión implementado']
			},
			{
				version: '0.0.2',
				description: ['Header sincronizado con firebase.', 'Cambio a versionamiento automatizado.', 'Constantes cambiadas de clase a archivo JSON.', 'Sincronización simple con firebase para obtener usuario logueado y mostrarlo en Header.']
			},
			{
				version: '0.0.1',
				description: ['React shell creado.', 'Header shell creado.', 'Footer shell creado.', 'Versions shell creado.', 'Versionamiento automatizado creado a base de objetos JSON.', 'Funcionalidad toggle para vista de versiones.', 'Archivo de constantes creado.']
			}
		]
	}

}

export default VersionConstants;

// [
//     {
//       "version"    : "0.1.0",
//       "cptn"       : ["CPTN-1134", "CPTN-1135", "CPTN-1205"],
//       "description": ["Migrate React app to New Architecture", "Analyze Migration Plans", "Migrate PFGFooter"]
//     },
//     {
//       "version"    : "0.0.8",
//       "cptn"       : ["CPTN-1132", "CPTN-1133"],
//       "description": ["Create filter for dynamic table without pagination", "Enhanced filter for dynamic table"]
//     },
//     {
//       "version"    : "0.0.7",
//       "cptn"       : ["CPTN-1143", "CPTN-1144", "CPTN-1147", "CPTN-1148", "CPTN-1149"],
//       "description": ["Isolate 'Excel Button' to class Component", "Automated version", "Isolate Table to class Component", "Get Disbursements in Table via WS", "Create agile doc of Dynamic Table"]
//     },
//     {
//       "version"    : "0.0.6",
//       "cptn"       : ["CPTN-1089", "CPTN-1090", "CPTN-1128", "CPTN-1138"],
//       "description": ["Add Edit Button", "Display Modal after Clicking on Edit Button", "Enhance Footer and Versions Code", "Isolate Versions Component"]
//     },
//     {
//       "version"    : "0.0.5",
//       "cptn"       : ["CPTN-1065", "CPTN-1066", "CPTN-1067"],
//       "description": ["Create Button 'Export to Excel'", "Get the JSON to be Exported", "Handle the Json and Export It to Excel"]
//     },
//     {
//       "version"    : "0.0.4",
//       "cptn"       : [""],
//       "description": ["Refactor and Comment Code"]
//     },
//     {
//       "version"    : "0.0.3",
//       "cptn"       : ["CPTN-1062"],
//       "description": ["Toggle between Pending and Processed"]
//     },
//     {
//       "version"    : "0.0.2",
//       "cptn"       : ["CPTN-1060"],
//       "description": ["Add Events to Disbursements Dropdown"]
//     },
//     {
//       "version"    : "0.0.1",
//       "cptn"       : ["CPTN-1058"],
//       "description": ["Generate Disbursement Table Dynamically"]
//     },
//     {
//       "version"     : "0.0.0",
//       "cptn"        : ["CPTN-1046"],
//       "description" : ["Create Garnishment Shell in React"]
//     }
// ]




// import React, { Component } from 'react';
// // import reactLogo from '../img/logo.svg';
// import messages from 'src/app-config/messages.json!';
// import versions from 'src/app-config/versions.json!';
// import wsconfig from 'src/app-config/wsconfig.json!';

// function Footer(props) {
//   const lastVersion = versions[0].version ;

//   return(
//     <div className="margin-top-p5">
//       <footer>
//         <div className="bg-gray-lighter text-center text-muted footer-rowcontainer">
//           <p>&copy; { messages.GARNISHMENT } </p>
//           {/* <img src={reactLogo} className="App-logo margin-top-m1" alt="logo"/> */}
//         </div>
//         <div className="text-center text-muted footer-rowcontainer">
//           <p><a onClick={ props.onClick }> { messages.VERSION_WORD +" "+ lastVersion } </a></p>
//         </div>
//       </footer>
//     </div>
//   );
// }

// function Version(props) {
//   const version = props.version
//   const li = [];

//   for(let i = 0; i < version.cptn.length; i++) {
//     let linkRef = (wsconfig.JIRA_URL + version.cptn[i]);

//     li.push(
//       <li key={version.cptn[i]}>
//           <a href={linkRef} target="_blank">
//             { version.description[i] } ({ version.cptn[i] })
//           </a>
//       </li>
//     );
//   }

//   return(
//     <div className="panel panel-primary">
//       <div className="panel-heading">
//         <h2 className="panel-title">{ messages.VERSION_WORD +" "+ version.version }</h2>
//       </div>
//       <div className="panel-body">
//         { li }
//       </div>
//     </div>
//   );
// }

// function Panel() {
//   const version = versions.map( (version, index) =>
//     <Version key={index} version={ versions[index] } />
//   );

//   return(
//     <div className="container">
//       <div className="page-header" id="title">
//           <h1> { messages.VERSION_WORD +" "+ messages.INFO_WORD } </h1>
//       </div>
//       {version}
//     </div>
//   );
// }

// function ShowVersion(props) {
//   if(props.showVersion){
//     return <Panel />
//   } else {
//     return null;
//   }
// }

// class PFGFooter extends Component {
//   constructor(props){
//     super(props);
//     this.state = {showVersion: false};
//     this.toggleShowVersion = this.toggleShowVersion.bind(this);
//   }

//   toggleShowVersion() {
//     this.setState({showVersion: !this.state.showVersion});
//   }

//   render() {
//     return (
//       <div>
//         <Footer onClick={ this.toggleShowVersion } />
//         <ShowVersion showVersion={ this.state.showVersion } />
//       </div>
//     );
//   }
// }

// export default PFGFooter;