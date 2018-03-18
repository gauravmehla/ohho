#! /usr/bin/env node
const inquirer 	= require('inquirer');
const escExit 	= require('esc-exit');
const fs 		= require('fs');
const exec 		= require('child_process').exec;
const meow 		= require('meow');

// Applications warehouse in mac
let appDir 		= '/Applications/';
let appExt 		= '.app';

if( process.platform !== 'darwin' ) {
	console.log('Currently only Mac OSX is supported');
	process.exit();
}

const cli = meow(`
    Usage
      $ ohho <app_name>
 
    Options
      --help 	View help docs
      --version For current version
 
    Examples
      $ ohho google chrome
      $ ohho google 
      $ ohho chrome
      $ ohho Google Chrome
      $ ohho "google chrome"
	
	Run without arguments to use the interactive interface.
	The application name is case insensitive.
`);

function init( apps ) {
	escExit();
	inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

	return inquirer.prompt([{
		name: 'app',
		message: 'Application name:',
		type: 'autocomplete',
		pageSize: 10,
	  	source: function( answers, input) {
	  		if(!input) { input = '' } 	// Default- Show all apps
	  		let returnList = apps ? apps : listApplications( input );
	  		return Promise.resolve().then( () => returnList );
	  	}
	}])
	.then( answer => {
		openApplication( answer.app );
	})
}

function openApplication( app ) {
	exec('open "' + appDir + app + appExt + '"', function (error) {
		console.log('👍  Success');
	  	if (error !== null) { console.log('exec error: ' + error); }
	});
}
function fetchApplications() {
	return new Promise( (resolve, reject) => {
		fs.readdir( appDir , (err, apps) => { resolve( apps ) });
	} );
}

function filterApplications( apps ) {
	return apps
			.filter( app => app.includes( appExt ) )
			.map( app => app.replace( appExt,'') )
}

function listApplications( input ) {
	return fetchApplications()
		.then( apps => filterApplications( apps ).filter( app => app.toLowerCase().includes(input) ) )
}

// Main Function
if( cli.input.length == 0 ) {
	init();
} else {
	// Try to look for application. If found more than one, ask from user.
	listApplications( cli.input.join(' ').toLowerCase() )
		.then( list => { 
			if( list.length === 0 ) { 
				console.log('❗️ ' + cli.input.join(' ') + ' not found on this system.') 
			} else {
				list.length !== 1 ? init(list) : openApplication( list ) 
			}
		})
}