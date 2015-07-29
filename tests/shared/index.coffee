describe "#bound", ->
  it "patches Object.prototype", ->
    assert.property Object.prototype, "bound"

  it "should return an object with keys for existing methods", ->
    obj = {a: 1, b: -> @a}
    bound = obj.bound
    assert.sameMembers Object.keys(bound), []
    assert.isFunction bound.b
    assert.equal bound.a, undefined

  it "should fix the context for methods defined on it", ->
    obj = {a: 1, b: -> @a}

    # the normal way leaves you too detached
    detachedB = obj.b
    assert.equal undefined, detachedB()

    # going through 'bound' is the  raison dêtre of this package
    boundDetachedB = obj.bound.b
    assert.equal 1, boundDetachedB()

    # and of course, it stays bound
    obj.a = 2
    assert.equal 2, boundDetachedB()

  it "should work on the console object (browser dependant)", ->
    detached = console.log
    if Meteor.isClient
      assert.throws ->
        detached("foo") # fails in Chrome

    detachedLog = console.bound.log
    detachedLog("yay no error")
