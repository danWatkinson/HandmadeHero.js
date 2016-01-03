'use strict';

var cameraService;

describe('HandmadeHero.CameraService module', function() {
    beforeEach(module('HandmadeHero.Camera'));
    beforeEach(inject(function (_cameraService_) {
        cameraService = _cameraService_;
    }));

    it('initialises at [2500, 2500, 500]', function() {
        expect( cameraService ).toEqual( {
            x: 2500,
            y: 2500,
            z: 500
        } );
    });
});

