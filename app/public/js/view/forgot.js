define([
  'jquery',
  'validator',
  'validator_ext',
  'helper'
], function ($,v,v_ext,h) {
    'use strict';

    $("#email").focus();
    $("#forgot").submit(function(e) {
    	var forgot_error=false;
        
        if( !v.isEmail( v.trim($("input#email").val()) ) ){
          inputError($("input#email"),'Enter your email');
          forgot_error=true;
        } 

        if(forgot_error){
            e.preventDefault();
            return false;
        }
    })
});