'use strict';

var gameController, 
    mockGameStartupService,
    mockGameLoopService,
    $scope;

describe('HandmadeHero.GameController module', function() {

    beforeEach(module('HandmadeHero.GameController'));

    beforeEach(inject(function($rootScope, $controller) {
        mockGameStartupService = jasmine.createSpy();
        mockGameLoopService = jasmine.createSpy();
        
        $scope = $rootScope.$new();
        $controller('gameController', {$scope: $scope, gameStartupService: mockGameStartupService, gameLoopService: mockGameLoopService});
    }));

    it('calls the gameStartupService', function() {
        expect( mockGameStartupService ).toHaveBeenCalled();
    });

    it('calls the gameLoopService', function() {
        expect( mockGameLoopService ).toHaveBeenCalled();
    });

});

