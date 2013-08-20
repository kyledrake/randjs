describe('Rand', function() {
  it('returns random byte', function() {
    var rand = new Rand();
    assert.equal('number', typeof(rand.getByte()));
  });
  
  it('changes random bytes', function() {
    var rand = new Rand();
    var testArray = [10, 20, 30, 40, 50];
    var origTestArray = [10, 20, 30, 40, 50];
    rand.nextBytes(testArray);
    assert.equal(testArray.length, 5);
    assert.notEqual(testArray, origTestArray);
  });
  
  describe('legacy', function() {
    it('flushes the pool after arcfour init (getByte)', function() {
      var rand = new Rand();
      rand.getLegacyByte();
      
      var zeroArray = true;
      for(var i=0;i<rand.pool.length;i++) {
        if(rand.pool[i] != 0) {
          zeroArray = false;
        }
      }
      
      assert.equal(zeroArray, true);
    });
    
    it('mixes time (as 32-bit integer) into pool', function() {
      var rand = new Rand();
      rand.initPool();
      
      var origPool = [];
      for(var i=rand.pptr;i<rand.pptr+3;i++) {
        origPool[i] = rand.pool[i];
      }

      var origPool = rand.pool.dup;
      rand.seedTime();
      
      for(var i=(rand.pptr-3);i<rand.pptr;i++) {
        console.log(i+':'+origPool[i]);
        console.log(rand.pool[i]);
        //assert.notEqual(origPool[i],rand.pool[i])
      }
    });
  });
});