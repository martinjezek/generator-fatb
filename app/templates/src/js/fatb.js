'use strict';

+function ($) {

    /*!
     * <%= nameUpperCase %> CLASS DEFINITION
     * ================<%
        for (var x = 0; x <= nameUpperCase.length; x++) {
            %>=<%
        }%>
     */

    var <%= nameUcFirst %> = function (element, options) {
        var self = this;

        self.options = options;
        self.$<%= nameCamelCased %> = $(element);

        self.myMethod(self, self.$<%= nameCamelCased %>.html(), function(param) {
            self.$<%= nameCamelCased %>.html(param);
        });
    };

    // Method /myMethod/
    // this is public myMethod only for demo showcase, change it to yours or add another one, callback is just for example of usage
    //
    <%= nameUcFirst %>.prototype.myMethod = function (obj, param, callback) {
        var self = _self(obj);

        if (self.options.upperCase) {
            param = param.toUpperCase();
        } else {
            param = param.toLowerCase();
        }

        if (typeof callback === 'function') {
            callback(param);
        } else {
            return param;
        }
    };

    /*!
     * <%= nameUpperCase %> DEFAULTS
     * ========<%
        for (var x = 0; x <= nameUpperCase.length; x++) {
            %>=<%
        }%>
     */

    <%= nameUcFirst %>.DEFAULTS = {
        upperCase: false
    };

    /*!
     * <%= nameUpperCase %> PLUGIN DEFINITION
     * =================<%
        for (var x = 0; x <= nameUpperCase.length; x++) {
            %>=<%
        }%>
     */

    var old = $.fn.<%= nameCamelCased %>;

    $.fn.<%= nameCamelCased %> = function (option, optionExt, optionExt2) {
        return this.each(function () {
            var $this = $(this);
            var data  = $this.data('<%= nameCamelCased %>');

            if (!data) {
                // extend default options
                var options = $.extend(true, {}, <%= nameUcFirst %>.DEFAULTS, option);
                $this.data('<%= nameCamelCased %>', (data = new <%= nameUcFirst %>(this, options)));
            }
            if (typeof option == 'string') {
                if (optionExt2 !== undefined) {
                    data[option].call($this, data, optionExt, optionExt2);
                } else if (optionExt !== undefined) {
                    data[option].call($this, data, optionExt);
                } else {
                    data[option].call($this, data);
                }
            }
        });
    };

    $.fn.<%= nameCamelCased %>.Constructor = <%= nameUcFirst %>;

    /*!
     * <%= nameUpperCase %> PLUGIN SELF GETTER
     * ==================<%
        for (var x = 0; x <= nameUpperCase.length; x++) {
            %>=<%
        }%>
     */

    var _self = function(obj) {
        if (obj !== undefined) {
            if (obj.data !== undefined) {
                if (obj.data.self !== undefined) {
                    return obj.data.self;
                } else {
                    return obj.data;
                }
            } else {
                return obj;
            }
        } else {
            return null;
        }
    };

    /*!
     * <%= nameUpperCase %> NO CONFLICT
     * ===========<%
        for (var x = 0; x <= nameUpperCase.length; x++) {
            %>=<%
        }%>
     */

    $.fn.<%= nameCamelCased %>.noConflict = function () {
        $.fn.<%= nameCamelCased %> = old;
        return this;
    };

}(jQuery);
