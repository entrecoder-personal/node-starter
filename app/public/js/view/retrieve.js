
define([
  'jquery',
  'validator',
  'validator_ext',
  'helper'
], function ($,v,v_ext,h) {
  'use strict';

  $("input#password").focus();
  $("#retrieve").submit(function(e) {
      var pw_error=false;
      if ( !v.isLength( v.trim($("input#password").val()),6) ) {
          inputError($("input#password"),'Password must be at least 6 characters');
          pw_error = true;
          return false;
      }
      if ( !v.isAscii($("input#password").val()) ) {
          inputError($("input#password"),'Password has invalid chracters');
          pw_error = true;
          return false;
      }
      if ( !v.isPassMatch($("input#password").val(), $("input#passwordv").val()) ){
          inputError($("input#passwordv"),'Re-type doesn\'t match your password');
          pw_error = true;
          return false;
      }
      if(pw_error){
          e.preventDefault(); 
          return false;
      }
  })
});
