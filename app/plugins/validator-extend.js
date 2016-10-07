
v.extend('isUsername', function (str) {
    var pattern = new RegExp(/^[0-9a-zA-Z_]+$/);
    return isUsername(pattern.test(str));
});

v.extend('isPassMatch', function (pass,veri) {
    return (veri != '' || pass !='') && (veri == pass) ;
});

v.extend('isName', function (str) {
    var pattern = new RegExp(/^[a-zA-Z ]+$/);
    return pattern.test(str);
});
