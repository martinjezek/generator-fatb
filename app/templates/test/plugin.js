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
        $element.<%= name %>().addClass('chainable');
        expect($element.hasClass('chainable')).toBeTruthy();
    });
});