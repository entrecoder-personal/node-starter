
var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");

$(document).ajaxSend(function(e, xhr, options) {
	xhr.setRequestHeader(header, token);
});

function inputSuccess(field,msg) {
  field.nextAll('err').remove();
  field.nextAll('span').remove();
  field.after('<span class="good md pc">'+msg+'</span>');
}

function inputError(field,msg) {
  field.addClass('err-field');
  field.nextAll('span').remove();
  field.after('<span class="err md pc">'+msg+'</span>');
}

function inputWarning(field,msg) {
  field.addClass('err-field');
  field.nextAll('span').remove();
  field.after('<span class="warn md pc">'+msg+'</span>');
}

function inputClear(field) {
  field.nextAll('span').remove();
}