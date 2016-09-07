
'use strict';

var HandlebarsLayouts = require('handlebars-layouts');
var moment = require('moment');
var util = require('util');
var helpers = require('handlebars-helpers')();
module.exports = function (Handlebars) {
    Handlebars.registerHelper(helpers);
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
    Handlebars.registerHelper('lookupCategory', function(obj, childPath) {
        var chunks = childPath.split('.');
        var count = 0;
        var node = obj;
        chunks.some(function(name) {
            count++;
            var fullCategoryName = chunks.slice(0, count).join('.');
            var found = node.children.some(function(childNode) {
                if (childNode.category == fullCategoryName) {
                    node = childNode;
                    return true;
                }
                return false;
            });

            if (!found) {
                node = undefined;
                return true;
            }
            return false;
        });

        return node;
    });

    Handlebars.registerHelper('indexOfFiles', function(files, slug) {
        return files.filter(x => x.slug == slug);
    });

    /**
     * Lookup nested object
     */
    Handlebars.registerHelper('lookupEx', function(obj, propertyPath) {
        var props = propertyPath.split('.');
        var current = obj;
        while (props.length) {
            if (typeof current !== 'object') return undefined;
            current = current[props.shift()];
        }
        return current;
    });

    /**
     * take item number of array
     */
    Handlebars.registerHelper('eachBefore', function (context, options) {
        //let ret = '';
        let fn = options.fn,
            inverse = options.inverse,
            i = 0,
            ret = '',
            data;

         if (util.isFunction(context)) { context = context.call(this); }

        let extend = function (obj/* , ...source */) {
            for (let i = 1; i < arguments.length; i++) {
                for (let key in arguments[i]) {
                    if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
                        obj[key] = arguments[i][key];
                    }
                }
            }

            return obj;
        }
        let createFrame = function (object) {
            let frame = extend({}, object);
            frame._parent = object;
            return frame;
        }

        if (options.data) {
            data = createFrame(options.data);
        }

        function execIteration(field, index, last) {
            if (data) {
                data.key = field;
                data.index = index;
                data.first = index === 0;
                data.last = !!last;
            }

            ret = ret + fn(context[field], {
                data: data,
                blockParams: [context[field], field]
            });
        }

        if (context && typeof context === 'object') {
            if (util.isArray(context)) {
                let itemsNumber = options.hash['items'];
                for (let j = context.length; i < j && i< itemsNumber ; i++) {
                    if (i in context) {
                        execIteration(i, i, i === context.length - 1);
                    }
                }
            } else {
                let priorKey;

                for (let key in context) {
                    if (context.hasOwnProperty(key)) {
                        // We're running the iterations one step out of sync so we can detect
                        // the last iteration without have to scan the object twice and create
                        // an itermediate keys array.
                        if (priorKey !== undefined) {
                            execIteration(priorKey, i - 1);
                        }
                        priorKey = key;
                        i++;
                    }
                }
                if (priorKey !== undefined) {
                    execIteration(priorKey, i - 1, true);
                }
            }
        }

        if (i === 0) {
            ret = inverse(this);
        }
        
        return ret;
    });


};

