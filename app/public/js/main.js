
/** set up all th required javascript paths for libraries and plugins **/

requirejs.config({
  baseUrl: "/js/",
  paths: {
    jquery: [ 
        'vendor/jquery/jquery-2.1.0.min',
    	'//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min'
    ],
    modernizr: 'vendor/modernizr/modernizr',
    bootstrap: 'vendor/bootstrap/bootstrap.min',
    underscore: 'vendor/underscore/underscore-min',
    dust: 'vendor/dust/dust-core.min',
    jquery_ui: [
    	'vendor/jquery/jquery-ui',
        'https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min'
    ],
    jquery_dropdown: 'vendor/jquery/jquery.dropdown',
    validator: 'vendor/validator/validator.min',
    validator_ext: 'vendor/validator/validator.ext',
    d3: 'vendor/d3/d3.min',
    socket: 'vendor/socket/socket.io-1.3.4',
    menu_user: 'menu/user',
    helper: 'helper'
  }
});