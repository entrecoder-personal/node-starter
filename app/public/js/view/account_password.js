
define([
  'jquery',
  'validator',
  'validator_ext',
  'helper'
], function ($,v,v_ext,h) {
  'use strict';

	$("#cancel").click(function() {
  	window.location.href = '/account';
  	return false;
  })

  $("#account-password").submit(function(e) {
    var pw_error=false;
  	
    if( v.isNull($('input#password-old').val()) ) {
      inputError($("input#password-old"),'Enter existing password');
      pw_error = true;
      return false;
    }

    if( v.isNull($('input#password-new').val()) ) {
      inputError($("input#password-new"),'Enter new passord');
      pw_error = true;
      return false;
    }

    if( v.isNull($('input#password-repeat').val()) ) {
      inputError($("input#password-repeat"),'Enter repeat password');
      pw_error = true;
      return false;
    }

    if ( !v.isLength( v.trim($("input#password-new").val()),6) ) {
      inputError($("input#password-new"),'Password must be at least 6 characters');
      pw_error = true;
      return false;
    }
    if ( !v.isAscii($("input#password-new").val()) ) {
      inputError($("input#password-new"),'Password has invalid chracters');
      pw_error = true;
      return false;
    }
    if ( !v.isPassMatch( $("input#password-new").val(), $("input#password-repeat").val() ) ){
      inputError($("input#password-repeat"),'Re-type doesn\'t match your password');
      pw_error = true;
      return false;
    }
    
    if(pw_error){
        e.preventDefault(); 
        return false;
    }
  })
})
