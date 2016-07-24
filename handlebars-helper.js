'use strict';

var HandlebarsLayouts = require('handlebars-layouts');
var moment = require('moment');

module.exports = function (Handlebars) {
    Handlebars.registerHelper(HandlebarsLayouts(Handlebars));

    // dang ky rivetData helper block cho handlebars ở đây

    // rivetData helper, bat buoc key trong meta data cua content phai la 'rivetData'
    Handlebars.registerHelper('rivetData', obj => {
        if (obj.data.root.rivetData)
            return JSON.stringify(obj.data.root.rivetData);
        else
            return '{}';
    });

    Handlebars.registerHelper('json', function (obj) {
        return JSON.stringify(obj);
    });

    Handlebars.registerHelper('removeIndex', function (url) {
        return url.replace('index.html', '');
    });

    Handlebars.registerHelper('formatDate', function (context, options) {
        var format = options.hash.format || "YYYY-MM-DD";

        if (context === "now") {
            context = new Date();
        }

        return moment(context).format(format);
    });
    function buildList(data, isSub) {
        let dt = data;
        var html = (isSub) ? '<div>' : ''; // Wrap with div if true
        html += '<ul>';
        for (var item in dt) {
            html += `<li ${(typeof dt[item].id !== 'undefined') ? 'id=' + dt[item].id : ''}>`;
            if (typeof (dt[item].sub) === 'object') { // An array will return 'object'
                if (isSub) {
                    //console.log('dt item =====================',dt[item]);
                    html += '<a href="' + dt[item].link + '">' + dt[item].name + '</a>';
                } else {
                    if (typeof dt !== 'undefined' && dt) {
                        html += dt[item].id // No submenu
                    }
                    //html += dt[item].id;
                }
                html += buildList(dt[item].sub, isSub); // Submenu found. Calling recursively same method (and wrapping it in a div)
            } else {
                if (typeof dt !== 'undefined' && dt) {
                    html += dt[item].id // No submenu
                }

            }
            html += '</li>';
        }
        html += '</ul>';
        html += (isSub) ? '</div>' : '';
        return html;
    }
    Handlebars.registerHelper('nav', obj => {
        //console.log('obj =====================',obj);
        return buildList(obj.data, true);
    });

    /**
     * take item number of array
     */
    Handlebars.registerHelper('eachBefore', function (context, options) {
        let ret='';
        let itemsNumber =  options.hash['items'];
        for (var i = 0, j = context.length; i < j && i< itemsNumber; i++) {
            ret = ret + options.fn(context[i]);                
        }
        return ret;
    });


};

