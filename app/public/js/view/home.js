
define([
  'jquery',
  'menu_user'
], function ($,um) {
  'use strict';

	$("#account").userMenu({
		menuOffset: "#nav",
	    menuSelector: "#account-edit",
	    menuSelected: function (invokedOn, selectedMenu) {
			//return false;
	    }
	});
	
  
}); 

