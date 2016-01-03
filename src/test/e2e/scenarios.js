'use strict';
/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /home when location hash/fragment is empty', function() {
    browser.get('/');
    expect(browser.getLocationAbsUrl()).toMatch("/home");
  });


  describe('home', function() {

    beforeEach(function() {
      browser.get('/#/home');
      browser.sleep(5000);
    });


    it('should display our introduction text', function() {
        var expectedText = "['As a software developer', " +
                            "'I want to build a website', " +
                            "'So that I can show my skills']";
        
        var expected = new RegExp(expectedText);
        expect(element.all(by.css('[ng-view] p')).getText()).toMatch(expected);
    });

  });


  describe('about', function() {

    beforeEach(function() {
      browser.get('/#/about');
      browser.sleep(5000);
    });


      it('should display our "about" text', function() {
          var expectedText = "['As a stakeholder', " +
                              "'I want to view the current behaviour of the site', " +
                              "'So that I can review progress to date.']";

          var expected = new RegExp(expectedText);
          expect(element.all(by.css('[ng-view] p')).getText()).toMatch(expected);
      });

  });
});
