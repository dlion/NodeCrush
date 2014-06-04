var assert    = require('assert'),
    NodeCrush = require('../lib/nodecrush');

describe('NodeCrush', function() {

  describe('#exists()', function() {
    it('should return true if hash exists', function(done) {
      NodeCrush.exists("CPvuR5lRhmS0", function(err, res) {
        assert.ifError(err);
        assert.equal(res, true);
        assert.notEqual(res, null);
        done();
      });
    });
  });

  describe('#info()', function() {
    it('should return an info object', function(done) {
      NodeCrush.info("CPvuR5lRhmS0", function(err, res) {
        assert.ifError(err);
        assert.notEqual(res, null);
        done();
      });
    });
  });

  describe('#infoList()', function() {
    it('should return an info object', function(done) {
      NodeCrush.infoList(["CPvuR5lRhmS0", "BCpvuR5lRhmS1"], function(err, res) {
        assert.ifError(err);
        assert.notEqual(res, null);
        done();
      });
    });
  });

  describe('#status()', function() {
    it('should return a status', function(done) {
      NodeCrush.status("CPvuR5lRhmS0", function(err, res) {
        assert.ifError(err);
        assert.notEqual(res, null);
        done();
      });
    });
  });


  describe('#statusList()', function() {
    it('should return a status object', function(done) {
      NodeCrush.statusList(["CPvuR5lRhmS0", "BCpvuR5lRhmS1"], function(err, res) {
        assert.ifError(err);
        assert.notEqual(res, null);
        done();
      });
    });
  });


  describe('#flags()', function() {
    it('should return an object of flags', function(done) {
      NodeCrush.status("CPvuR5lRhmS0", function(err, res) {
        assert.ifError(err);
        assert.notEqual(res, null);
        done();
      });
    });
  });
});


