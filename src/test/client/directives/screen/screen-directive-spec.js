'use strict';


describe('HandmadeHero.Screen.ScreenDirective', function() {
    
    var element,
        buffer,
        mockRenderingService = {
            initialise: jasmine.createSpy()
        };

    beforeEach(module('HandmadeHero.Screen.ScreenDirective'));

    beforeEach(module(function($provide) {
        $provide.service('renderingService', function() {
            return mockRenderingService;
        });
    }));
    
    beforeEach(inject(function($compile, $rootScope) {
        element = $compile('<canvas screen id="bob"></canvas>')($rootScope);
    }));

    describe('the screen directive', function() {
        
        describe('should add another canvas inside the screen canvas', function() {

            beforeEach(function() {
                buffer = element.find('canvas');
            });

            it('should have _buffer appended to its id', function() {
                expect(buffer.attr('id')).toEqual('bob_buffer');
            });
            
            it('should be hidden', function() {
                expect(buffer.attr('ng-hide')).toEqual('true');
            });
        });
        
        it('should call initialise against the renderingService providing the id of the screen element', function() {
            expect(mockRenderingService.initialise).toHaveBeenCalledWith('bob');
        });
        
    });
});
