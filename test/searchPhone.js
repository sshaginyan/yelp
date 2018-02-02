const assert = require('assert');

const Yelp = require('../src');
const APIKEY = 'ScnPBTnP4OThFS0w8uEypvBgGwFLe_0LTVf4oBmeye_YYHXnaLYwS_45XmgcwYVpYz_Y5znlAxr0pUKSUOPzMxk3zc16ZQ9XAgdHANw_ivDgDnPxNbN-3j1LqwvVWHYx';

describe('Yelp API', function() {
  describe('searchPhone', function() {
    it('should return a list of businesses based on the provided phone number.', function(done) {
      const yelp = new Yelp(APIKEY);
      yelp.searchPhone({
        phone: '13236608060'
      })
        .then(data => {
          assert.ok(Object.keys(data).indexOf('total') > -1);
          assert.ok(Object.keys(data).indexOf('businesses') > -1);
          assert.ok(Number.isInteger(data.total));
          assert.ok(Array.isArray(data.businesses));
          done();
        });
    });
  });

  describe('searchTransaction', function() {
    it('should return a list of businesses which support certain transactions.', function(done) {
      const yelp = new Yelp(APIKEY);
      yelp.searchTransaction({
        latitude: '37.787789124691',
        longitude: '-122.399305736113',
        location: '123 Second St San Francisco CA 94105'
      })
        .then(data => {
          assert.ok(Object.keys(data).indexOf('total') > -1);
          assert.ok(Object.keys(data).indexOf('businesses') > -1);
          assert.ok(Number.isInteger(data.total));
          assert.ok(Array.isArray(data.businesses));
          done();
        });
    });
  });

  describe('matchesBest', function() {
    it('should only return one business that is matched best.', function(done) {
      const yelp = new Yelp(APIKEY);
      yelp.matchesBest({
        name: 'Boulevard',
        address1: '1 Mission St',
        city: 'San Francisco',
        state: 'CA',
        country: 'US'
      })
        .then(data => {
          assert.ok(Object.keys(data).indexOf('businesses') > -1);
          assert.ok(Array.isArray(data.businesses));
          assert.ok(data.businesses.length === 1);
          done();
        });
    });
  });

   describe('matchesLookup', function() {
    it('should return up to 10 businesses that is the best match based on the information provided.', function(done) {
      const yelp = new Yelp(APIKEY);
      yelp.matchesLookup({
        name: 'Boulevard',
        address1: '1 Mission St',
        city: 'San Francisco',
        state: 'CA',
        country: 'US'
      })
        .then(data => {
          assert.ok(Object.keys(data).indexOf('businesses') > -1);
          assert.ok(Array.isArray(data.businesses));
          done();
        });
    });
   });

  describe('businesses', function() {
    it('should return detailed business content.', function(done) {
      const yelp = new Yelp(APIKEY);
      yelp.businesses('gary-danko-san-francisco', {
        locale: 'en_US'
      })
        .then(data => {

          assert.ok(typeof data == 'object' && data.constructor == Object);
          done();
        });
    });
  });

  describe('businessReviews', function() {
    it('should return up to three review excerpts for a given business ordered by Yelp\'s default sort order.', function(done) {
      const yelp = new Yelp(APIKEY);
      yelp.businessReviews('gary-danko-san-francisco', {
        locale: 'en_US'
      })
        .then(data => {
          assert.ok(typeof data == 'object' && data.constructor == Object);
          assert.ok(Object.keys(data).indexOf('reviews') > -1);
          done();
        });
    });
  });

  describe('autocomplete', function() {
    it('should return autocomplete suggestions for search keywords, businesses and categories, based on the input text.', function(done) {
      const yelp = new Yelp(APIKEY);
      yelp.autocomplete({
        text: 'Mitchell\'s Ice Cream',
        latitude: '37.744183',
        longitude: '-122.422776',
        locale: 'en_US'
      })
        .then(data => {
          assert.ok(typeof data == 'object' && data.constructor == Object);
          done();
        });
    });
  });

});
