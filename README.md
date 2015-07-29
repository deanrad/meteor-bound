# deanius:bound [![Build Status](https://secure.travis-ci.org/deanius/meteor-bound.png?branch=master)](https://travis-ci.org/deanius/meteor-bound)

Allow `console.bound.log` as an alternative to `console.log.bind(console)`, and generalize to all objects.

## Installation

```
    meteor add deanius:bound
```

## Background
Good Functional Programming (FP) style, as well as the usage of `Promise.then`, `Tracker.autorun`, etc., demand an easier way to refer to the methods of an object without breaking their `this` bindings. The current technique, `console.log.bind(console)`, is neither DRY, nor fun to type repeatedly.

Since we don't have any syntax to help yet, such as `console->log`, we may as well have a way to refer to methods of `console`, automagically bound to `console`, and that's what this package achieves.

## Usage

While this breaks:
```js
[1,2,3].forEach(console.log) //TypeError: Illegal invocation
```

this does not:

```js
[1,2,3].forEach(console.bound.log) // :) :)
```

In general,

```js
oldStyle = obj.methodName
newStyle = obj.bound.methodName
assert.equal(newStyle(), obj.methodName())
assert.notEqual(oldStyle(), obj.methodName())
```

## Description

Any time you want to reference a function on an object (aka *method*),
you run into the problem that it may not work if it refers to `this` in its definition. `console.log` is one prime example.

We may want to log each value in an array
```js
// works
[1,2,3].forEach(function(val){ console.log(val); })

//does not - stupid "this" binding !!!
[1,2,3].forEach(console.log) //TypeError: Illegal invocation
```

Or, we may want to log the value a Promise resolves with:

```js
// works
Promise.resolve(2).then(function(val){ console.log(val); })

//does not - stupid "this" binding !!!
Promise.resolve(2).then(console.log) //TypeError: Illegal invocation
```

Standard functional programming says we ought to be generally able to substitute `console.log` for `function(val){ console.log(val); }` in any place that a function is passed. But the dynamic nature of `this` in JavaScript necessitates taking other measures.

I'm proposing that methods refered to as `obj.bound.method` be equivalent to obj.method.bind(obj). In my opinion, it reads nicely `obj.bound.foo` means, "The `obj`-bound method `foo`".

While it is extra functionality added to all objects, I consider it more an overcoming of a language short-coming. Perhaps it should be confined to my primary use case of patching `console` statements in debugging, but I welcome any input.
