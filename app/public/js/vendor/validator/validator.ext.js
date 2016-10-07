
define(["validator"], function(v) {

    v.extend('isUsername', function (str) {
        var pattern = new RegExp(/^[0-9a-zA-Z_]+$/);
        return pattern.test(str);
    });

    v.extend('isName', function (str) {
        var pattern = new RegExp(/^[a-zA-Z_ ]+$/);
        return pattern.test(str);
    });

    v.extend('isPassMatch', function (pass,veri) {
        return (veri != '' || pass !='') && (veri == pass) ;
    });
        
    return v;
    
});

