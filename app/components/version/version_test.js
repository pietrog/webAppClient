'use strict';

describe('parap.version module', function() {
  beforeEach(module('parap.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
