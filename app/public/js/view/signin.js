
define([
  'jquery',
  'validator',
  'validator_ext',
  'helper'
], function($,v,v_ext,h) {
  'use strict';

  var login_error=false;
  $("#username").focus();

  $("#signin").submit(function(e) {
  
    if( !v.isEmail( v.trim($("input#username").val()) ) ){
      inputError($("input#username"),'Enter your email');
      login_error=true;
    } 

    if( v.isNull( v.trim($("input#password").val())) ){
      inputError($("input#password"),'Enter your password');
      login_error=true;
    } 
    
    if(login_error){
      e.preventDefault(); 
      login_error = false;
      return false;
    }
  })
});
