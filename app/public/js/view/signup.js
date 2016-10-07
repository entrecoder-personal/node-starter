
define([
  'jquery',
  'validator',
  'validator_ext',
  'helper'
], function ($,v,v_ext,h) {
  'use strict';

  var typingTimeout;

  function startTypingTimer(input_field)
   {
    if (typingTimeout != undefined) 
        clearTimeout(typingTimeout);
    typingTimeout = setTimeout( function()
    {               
        eval(input_field.attr("onfinishinput"));
    }
    , 500);
   }
    
   function detectInput(field) {
    $(field).on("keypress", function(e){        
        startTypingTimer($(e.target));
    }); 
    $(field).keyup(function(e){
        if(e.keyCode == 8)
            startTypingTimer($(e.target));
    });
    $(field).on('input paste',function(e){
        startTypingTimer($(e.target));
    });
  }

  var signin_error = false;

  /** Validate Username if needed 

  function val_un(){
    if( !v.matches(data.username,'/^[0-9a-zA-Z_]+$/') ){
        inputError($("input#username"),'Enter a valid username (a-z, 0-9 , _)');
        un_error = true;
        return false;
    } 
    var data_user = 'action=checkuser&usr='+ $("input#username").val();
    $.ajax({
        type: "POST",
        url: "/signup",
        data: data_user,
        beforeSend: function(html) {
            
        },
        success: function(data){ // this happen after we get result
                inputSuccess($("input#username"),'Username is available');
                un_error = false;
        },        
        error : function(xhr){
                inputError($("input#username"),xhr.responseText); 
                un_error = true;
        }
    });
  }

  **/

  function val_em() {  
    if(!v.isEmail(v.trim($("input#email").val()))){
        inputError($("input#email"),'Enter a valid email');
        signin_error = true;
        return false;
    }
    
    var data_email = "action=checkemail&eml="+ v.trim($("input#email").val());

    $.ajax({
      type: "POST",
      url: "/signup",
      data: data_email
    })
    .done(function(response) {
      inputSuccess($("input#email"),response);
    })
    .fail(function(response) {
      inputWarning($("input#email"),response.responseText);
    })
    .always(function() {
      //alert( "complete" );
    });
  }

  $("input#fname").focus();

  detectInput("input#email");

  $("#signup").submit(function(e) {

    /** Username Error if needed 
    if($("input#username").val() == '') {
        inputError($("input#username"),'Enter username');
        un_error=true;
    }
    **/

    if( !v.isAlpha(v.trim($("input#fname").val())) ){
        inputError($("input#fname"),'Enter a valid first name (alpha characters)');
        signin_error = true;
    } else {
        inputClear($("input#fname"));
    }

    if( !v.isAlpha(v.trim($("input#lname").val())) ){
        inputError($("input#lname"),'Enter a valid last name (alpha characters)');
        signin_error = true;
    } else {
        inputClear($("input#lname"));
    }

    if(!v.isEmail(v.trim($("input#email").val()))){
        inputError($("input#email"),'Enter a valid email');
        signin_error = true;
    } else {
        inputClear($("input#email"));
    }

    if ( !v.isLength( v.trim($("input#password").val()),6) || !v.isAscii($("input#password").val()) ) {
        inputError($("input#password"),'Password should be 6 to 64 characters');
        signin_error = true;
    } else {
        inputClear($("input#password"));
    }

    if ( !v.equals( $("input#password").val() , $("input#passwordv").val() ) ){
        inputError($("input#passwordv"),'Re-type doesn\'t match your password');
        signin_error = true;
    } else {
        inputClear($("input#passwordv"));
    }

    if(signin_error){
        e.preventDefault();
        signin_error = false;
        return false;
    }
    $('<input type="hidden" name="action" value="register"/>').appendTo("#signup");
  })
}); 
