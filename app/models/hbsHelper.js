module.exports.register = function (Handlebars) {
    Handlebars.registerHelper('ternery', function(string1, string2, yes, no) {
        if (string1==string2) return yes;
        else return no;
      });
};