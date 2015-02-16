'use strict';

describe('<%= name %>', function() {
    var $element;

    beforeEach(function() {
        $element = $('<div id="element"></div>');

        $('body').append($element);
    });

    afterEach(function () {
        $element.remove();
    });

    it('should be chainable', function() {
        $element.<%= nameCamelCased %>().addClass('chainable');
        expect($element.hasClass('chainable')).toBe(true);
    });

    it('should lowercase all letters', function() {
        $element.html('Lorem Ipsum');
        $element.<%= nameCamelCased %>({
            upperCase: false
        });
        expect($element.html()).toBe('lorem ipsum');
    });

    it('should uppercase all letters', function() {
        $element.html('Lorem Ipsum');
        $element.<%= nameCamelCased %>({
            upperCase: true
        });
        expect($element.html()).toBe('LOREM IPSUM');
    });
});
