webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports) {

// Object.assign
if (!Object.assign) {
  Object.assign = function (obj) {
    [].slice.call(arguments, 1).forEach(function (item) {
      Object.keys(item).forEach(function (key) {
        obj[key] = item[key];
      });
    });
    return obj;
  };
}

/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate) {(function (root) {

  // Store setTimeout reference so promise-polyfill will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var setTimeoutFunc = setTimeout;

  function noop() {}
  
  // Polyfill for Function.prototype.bind
  function bind(fn, thisArg) {
    return function () {
      fn.apply(thisArg, arguments);
    };
  }

  function Promise(fn) {
    if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
    if (typeof fn !== 'function') throw new TypeError('not a function');
    this._state = 0;
    this._handled = false;
    this._value = undefined;
    this._deferreds = [];

    doResolve(fn, this);
  }

  function handle(self, deferred) {
    while (self._state === 3) {
      self = self._value;
    }
    if (self._state === 0) {
      self._deferreds.push(deferred);
      return;
    }
    self._handled = true;
    Promise._immediateFn(function () {
      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
      if (cb === null) {
        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
        return;
      }
      var ret;
      try {
        ret = cb(self._value);
      } catch (e) {
        reject(deferred.promise, e);
        return;
      }
      resolve(deferred.promise, ret);
    });
  }

  function resolve(self, newValue) {
    try {
      // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
        var then = newValue.then;
        if (newValue instanceof Promise) {
          self._state = 3;
          self._value = newValue;
          finale(self);
          return;
        } else if (typeof then === 'function') {
          doResolve(bind(then, newValue), self);
          return;
        }
      }
      self._state = 1;
      self._value = newValue;
      finale(self);
    } catch (e) {
      reject(self, e);
    }
  }

  function reject(self, newValue) {
    self._state = 2;
    self._value = newValue;
    finale(self);
  }

  function finale(self) {
    if (self._state === 2 && self._deferreds.length === 0) {
      Promise._immediateFn(function() {
        if (!self._handled) {
          Promise._unhandledRejectionFn(self._value);
        }
      });
    }

    for (var i = 0, len = self._deferreds.length; i < len; i++) {
      handle(self, self._deferreds[i]);
    }
    self._deferreds = null;
  }

  function Handler(onFulfilled, onRejected, promise) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.promise = promise;
  }

  /**
   * Take a potentially misbehaving resolver function and make sure
   * onFulfilled and onRejected are only called once.
   *
   * Makes no guarantees about asynchrony.
   */
  function doResolve(fn, self) {
    var done = false;
    try {
      fn(function (value) {
        if (done) return;
        done = true;
        resolve(self, value);
      }, function (reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      });
    } catch (ex) {
      if (done) return;
      done = true;
      reject(self, ex);
    }
  }

  Promise.prototype['catch'] = function (onRejected) {
    return this.then(null, onRejected);
  };

  Promise.prototype.then = function (onFulfilled, onRejected) {
    var prom = new (this.constructor)(noop);

    handle(this, new Handler(onFulfilled, onRejected, prom));
    return prom;
  };

  Promise.all = function (arr) {
    var args = Array.prototype.slice.call(arr);

    return new Promise(function (resolve, reject) {
      if (args.length === 0) return resolve([]);
      var remaining = args.length;

      function res(i, val) {
        try {
          if (val && (typeof val === 'object' || typeof val === 'function')) {
            var then = val.then;
            if (typeof then === 'function') {
              then.call(val, function (val) {
                res(i, val);
              }, reject);
              return;
            }
          }
          args[i] = val;
          if (--remaining === 0) {
            resolve(args);
          }
        } catch (ex) {
          reject(ex);
        }
      }

      for (var i = 0; i < args.length; i++) {
        res(i, args[i]);
      }
    });
  };

  Promise.resolve = function (value) {
    if (value && typeof value === 'object' && value.constructor === Promise) {
      return value;
    }

    return new Promise(function (resolve) {
      resolve(value);
    });
  };

  Promise.reject = function (value) {
    return new Promise(function (resolve, reject) {
      reject(value);
    });
  };

  Promise.race = function (values) {
    return new Promise(function (resolve, reject) {
      for (var i = 0, len = values.length; i < len; i++) {
        values[i].then(resolve, reject);
      }
    });
  };

  // Use polyfill for setImmediate for performance gains
  Promise._immediateFn = (typeof setImmediate === 'function' && function (fn) { setImmediate(fn); }) ||
    function (fn) {
      setTimeoutFunc(fn, 0);
    };

  Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
    if (typeof console !== 'undefined' && console) {
      console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
    }
  };

  /**
   * Set the immediate function to execute callbacks
   * @param fn {function} Function to execute
   * @deprecated
   */
  Promise._setImmediateFn = function _setImmediateFn(fn) {
    Promise._immediateFn = fn;
  };

  /**
   * Change the function to execute on unhandled rejection
   * @param {function} fn Function to execute on unhandled rejection
   * @deprecated
   */
  Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
    Promise._unhandledRejectionFn = fn;
  };
  
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Promise;
  } else if (!root.Promise) {
    root.Promise = Promise;
  }

})(this);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12).setImmediate))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var FORWARD = -1;
var BACK = 1;

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    // 宽度
    width: {
      default: '100%'
    },
    // 高度
    height: {
      default: '100%'
    },
    // 列表数据
    dataList: {
      default: []
    },
    // 滑动距离阈值
    swipSpanThreshold: {
      default: 6
    },
    // 滑动阈值
    swipThreshold: {
      default: 50
    },
    // 动画时长
    duration: {
      default: 400
    },
    // first和last拉不动的比率
    pullRatio: {
      default: 2
    },
    // 是否循环滚动
    isLoop: {
      default: true
    },
    // 默认滚动索引
    index: {
      default: 0
    },
    // 是否显示页脚
    isShowPager: {
      default: true
    },
    // 是否显示loading
    isShowLoading: {
      default: true
    },
    // 自动播放间隔
    autoPlayTimeout: {
      // 默认为0,表示禁用自动播放
      default: 0
    }
  },
  data: function data() {
    return {
      // 禁用动画
      notrans: false,
      // 滚动索引
      currentIndex: this.index,
      // 滑动值
      currentTranslate: 0,
      // 缓存数据
      prevData$: null,
      nextData$: null
    };
  },

  computed: {
    prevData: {
      set: function set(data) {
        this.prevData$ = data;
      },
      get: function get() {
        var dataList = this.dataList,
            prevData$ = this.prevData$,
            currentIndex = this.currentIndex;

        // 是否有缓存数据

        if (prevData$) {
          this.prevData$ = null;
          return prevData$;
        }

        var index = currentIndex - 1;
        // 第一帧前面
        if (index < 0) {
          // 不能循环滚动
          if (!this.isLoop) {
            return;
          }
          index = dataList.length - 1;
        }
        return dataList[index];
      }
    },
    currentData: function currentData() {
      return this.dataList[this.currentIndex];
    },

    nextData: {
      set: function set(data) {
        this.nextData$ = data;
      },
      get: function get() {
        var dataList = this.dataList,
            nextData$ = this.nextData$,
            currentIndex = this.currentIndex;

        // 是否有缓存数据

        if (nextData$) {
          this.nextData$ = null;
          return nextData$;
        }

        var index = currentIndex + 1;
        // 最后一帧后面
        if (index === dataList.length) {
          // 不能循环滚动
          if (!this.isLoop) {
            return;
          }
          index = 0;
        }
        return dataList[index];
      }
    },
    _class: function _class() {
      return [{ notrans: this.notrans }, { 'pi-loading': this.isShowLoading }];
    },
    _style: function _style() {
      return {
        width: this.width,
        height: this.height
      };
    },
    _wrapStyle: function _wrapStyle() {
      return {
        transform: 'translate3d(' + this.currentTranslate + ',0,0)',
        transitionDuration: this.duration / 1000 + 's'
      };
    }
  },
  watch: {
    currentData: function currentData() {
      // 重置scrollTop
      var currentItem = this.$refs.currentItem;

      if (currentItem) {
        var wrapEl = currentItem.firstElementChild;
        wrapEl && (wrapEl.scrollTop = 0);
      }
    }
  },
  mounted: function mounted() {
    this.startInter();
  },

  methods: {
    __touchstart: function __touchstart(evt) {
      // 如果正在作动画,不作响应
      if (this.isAnimating) {
        return;
      }

      var touch = evt.targetTouches ? evt.targetTouches[0] : evt;

      // 记录触摸开始位置
      this.startX = touch.pageX;
      this.startY = touch.pageY;

      // 重置swipSpan
      this.swipSpan = 0;
      // 重置手指拖拽移动
      this.isMoving = false;
      // 禁用动画
      this.notrans = true;

      // 停止定时器
      this.stopInter();
    },
    __touchmove: function __touchmove(evt) {
      // 如果正在作动画,不作响应
      if (this.isAnimating) {
        evt.preventDefault();
        evt.stopPropagation();
        return;
      }

      var touch = evt.targetTouches ? evt.targetTouches[0] : evt;
      // x轴滑动距离
      var swipSpanX = touch.pageX - this.startX;
      var absX = Math.abs(swipSpanX);
      // y轴滑动距离
      var swipSpanY = touch.pageY - this.startY;
      var absY = Math.abs(swipSpanY);

      // x轴滑动距离大于y轴 y轴滑动距离小于阈值, 说明的确是左右滑动
      if (this.isMoving || absY < absX || absY < this.swipSpanThreshold) {
        evt.preventDefault();
        evt.stopPropagation();

        // 不能循环滚动
        if (!this.isLoop) {
          var currentIndex = this.currentIndex;
          // 第一张图或最后一张图

          if (currentIndex === 0 && swipSpanX > 0 || currentIndex === this.dataList.length - 1 && swipSpanX < 0) {
            // 模拟拉不动操作体验
            swipSpanX /= this.pullRatio;
          }
        }

        // 位移
        this.currentTranslate = (this.swipSpan = swipSpanX) + 'px';
        // 已经满足滚动条件,且正在手指拖动
        this.isMoving = true;
      }
    },
    __touchend: function __touchend() {
      // 如果正在作动画,不作响应
      if (this.isAnimating) {
        return;
      }

      var swipSpan = this.swipSpan,
          swipThreshold = this.swipThreshold,
          currentIndex = this.currentIndex;

      var direction = void 0;

      // 向左
      if (swipSpan < -swipThreshold) {
        // 不能循环滚动
        if (!this.isLoop) {
          // 不是最后一帧
          currentIndex !== this.dataList.length - 1 && (direction = FORWARD);
        } else {
          direction = FORWARD;
        }
      }
      // 向右
      else if (swipSpan > swipThreshold) {
          // 不能循环滚动
          if (!this.isLoop) {
            // 不是第一帧
            currentIndex !== 0 && (direction = BACK);
          } else {
            direction = BACK;
          }
        }
      // 滚动
      swipSpan && this.slide(direction);

      // 开始定时器
      this.startInter();
    },
    __pagerClick: function __pagerClick(index) {
      this.slideToIndex(index);
    },
    __wrapClick: function __wrapClick() {
      this.$emit('click', this.currentIndex);
    },


    // 滚动
    slide: function slide(direction, index) {
      var _this = this;

      // 开启动画
      this.notrans = false;
      // 判断滚动方向
      switch (direction) {
        // 向左
        case FORWARD:
        // 向右
        case BACK:
          {
            // 动画状态
            this.isAnimating = true;
            // 作动画
            this.currentTranslate = this.$el.offsetWidth * direction + 'px';

            // index值为undefined
            index === undefined && (index = this.currentIndex - direction);

            // 复位
            setTimeout(function () {
              // 复位(更新内容)
              _this.reset(index);
              // 触发slide事件
              _this.$emit('slide', index, direction);
            }, this.duration);
            break;
          }
        // 没有direction值(说明滑动没有超过swipSpanThreshold)
        default:
          {
            this.currentTranslate = 0;
          }
      }
    },

    // 复位
    reset: function reset(index) {
      // 禁用动画
      this.notrans = true;
      // 复位
      this.currentTranslate = 0;

      // 计算index
      var count = this.dataList.length;
      if (index < 0) {
        index = count - 1;
      }
      if (index === count) {
        index = 0;
      }
      // 更新index(更新内容)
      this.currentIndex = index;

      // 重置isAnimating
      this.isAnimating = false;
    },

    // 滑动到第几帧
    slideToIndex: function slideToIndex(index) {
      var dataList = this.dataList,
          currentIndex = this.currentIndex;
      // index不符合条件

      if (typeof index !== 'number' || index < 0 || index >= dataList.length || index === currentIndex) {
        return;
      }

      // 滑动方向
      var direction = void 0;
      // 向左
      if (index > currentIndex) {
        direction = FORWARD;
        this.nextData = dataList[index];
      }
      // 向右
      else {
          direction = BACK;
          this.prevData = dataList[index];
        }
      // 滑动操作
      this.slide(direction, index);
    },

    // 开始定时器
    startInter: function startInter() {
      var _this2 = this;

      var autoPlayTimeout = this.autoPlayTimeout;

      if (autoPlayTimeout) {
        this.inter = setInterval(function () {
          _this2.slide(FORWARD);
        }, autoPlayTimeout);
      }
    },

    // 停止定定时器
    stopInter: function stopInter() {
      clearInterval(this.inter);
    },

    // 获取图片样式
    imgStyle: function imgStyle(data) {
      return data && { backgroundImage: 'url(' + data + ')' };
    }
  }
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n@charset \"UTF-8\";\n/*loading样式*/\n.loading:before, .pi-carousel.pi-loading .pi-item:before {\n  content: '';\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 40px;\n  height: 40px;\n  margin-left: -20px;\n  margin-top: -20px;\n  border-radius: 40px;\n  /*如.loading元素中还有transform,:before内容将挡不住*/\n  z-index: -1;\n  /*圆环用border生成*/\n  border: 3px solid rgba(136, 136, 136, 0.2);\n  border-left: 3px solid #888888;\n  /*动画*/\n  -webkit-animation: ani_circle 0.8s linear infinite;\n          animation: ani_circle 0.8s linear infinite;\n}\n\n/*旋转动画*/\n@-webkit-keyframes ani_circle {\n0% {\n    -webkit-transform: rotateZ(0deg);\n            transform: rotateZ(0deg);\n}\n100% {\n    -webkit-transform: rotateZ(360deg);\n            transform: rotateZ(360deg);\n}\n}\n@keyframes ani_circle {\n0% {\n    -webkit-transform: rotateZ(0deg);\n            transform: rotateZ(0deg);\n}\n100% {\n    -webkit-transform: rotateZ(360deg);\n            transform: rotateZ(360deg);\n}\n}\n.pi-carousel {\n  overflow: hidden;\n  position: relative;\n  /*没有动画*/\n  /*loading*/\n}\n.pi-carousel.notrans .pi-wrap {\n    -webkit-transition: none;\n    transition: none;\n}\n.pi-carousel .pi-wrap {\n    width: 300%;\n    height: 100%;\n    margin-left: -100%;\n    -webkit-transition: -webkit-transform ease;\n    transition: -webkit-transform ease;\n    transition: transform ease;\n    transition: transform ease, -webkit-transform ease;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n            flex-direction: row;\n}\n.pi-carousel .pi-item {\n    height: 100%;\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n            flex: 1;\n    overflow: hidden;\n}\n.pi-carousel .pi-item .pi-img {\n      background: center center no-repeat;\n      background-size: contain;\n      width: 100%;\n      height: 100%;\n}\n.pi-carousel .pi-pager {\n    position: absolute;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    text-align: center;\n    font-size: 0;\n    line-height: 20px;\n}\n.pi-carousel .pi-pager > span {\n      border: 3px solid #bbb;\n      border-radius: 50%;\n      margin: 0 2px;\n}\n.pi-carousel .pi-pager > span.selected {\n        border-color: #555;\n}\n", "", {"version":3,"sources":["/Users/soneway/Sites/github/vue-plugin/src/component/PiCarousel.vue"],"names":[],"mappings":";AAAA,iBAAiB;AACjB,aAAa;AACb;EACE,YAAY;EACZ,mBAAmB;EACnB,UAAU;EACV,SAAS;EACT,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,kBAAkB;EAClB,oBAAoB;EACpB,yCAAyC;EACzC,YAAY;EACZ,eAAe;EACf,2CAA2C;EAC3C,+BAA+B;EAC/B,MAAM;EACN,mDAA2C;UAA3C,2CAA2C;CAAE;;AAE/C,QAAQ;AACR;AACE;IACE,iCAAyB;YAAzB,yBAAyB;CAAE;AAC7B;IACE,mCAA2B;YAA3B,2BAA2B;CAAE;CAAE;AAJnC;AACE;IACE,iCAAyB;YAAzB,yBAAyB;CAAE;AAC7B;IACE,mCAA2B;YAA3B,2BAA2B;CAAE;CAAE;AAEnC;EACE,iBAAiB;EACjB,mBAAmB;EACnB,QAAQ;EACR,WAAW;CAAE;AACb;IACE,yBAAiB;IAAjB,iBAAiB;CAAE;AACrB;IACE,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,2CAA2B;IAA3B,mCAA2B;IAA3B,2BAA2B;IAA3B,mDAA2B;IAC3B,qBAAc;IAAd,sBAAc;IAAd,cAAc;IACd,+BAAoB;IAApB,8BAAoB;IAApB,4BAAoB;YAApB,oBAAoB;CAAE;AACxB;IACE,aAAa;IACb,oBAAQ;IAAR,gBAAQ;YAAR,QAAQ;IACR,iBAAiB;CAAE;AACnB;MACE,oCAAoC;MACpC,yBAAyB;MACzB,YAAY;MACZ,aAAa;CAAE;AACnB;IACE,mBAAmB;IACnB,QAAQ;IACR,SAAS;IACT,UAAU;IACV,mBAAmB;IACnB,aAAa;IACb,kBAAkB;CAAE;AACpB;MACE,uBAAuB;MACvB,mBAAmB;MACnB,cAAc;CAAE;AAChB;QACE,mBAAmB;CAAE","file":"PiCarousel.vue","sourcesContent":["@charset \"UTF-8\";\n/*loading样式*/\n.loading:before, .pi-carousel.pi-loading .pi-item:before {\n  content: '';\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 40px;\n  height: 40px;\n  margin-left: -20px;\n  margin-top: -20px;\n  border-radius: 40px;\n  /*如.loading元素中还有transform,:before内容将挡不住*/\n  z-index: -1;\n  /*圆环用border生成*/\n  border: 3px solid rgba(136, 136, 136, 0.2);\n  border-left: 3px solid #888888;\n  /*动画*/\n  animation: ani_circle 0.8s linear infinite; }\n\n/*旋转动画*/\n@keyframes ani_circle {\n  0% {\n    transform: rotateZ(0deg); }\n  100% {\n    transform: rotateZ(360deg); } }\n\n.pi-carousel {\n  overflow: hidden;\n  position: relative;\n  /*没有动画*/\n  /*loading*/ }\n  .pi-carousel.notrans .pi-wrap {\n    transition: none; }\n  .pi-carousel .pi-wrap {\n    width: 300%;\n    height: 100%;\n    margin-left: -100%;\n    transition: transform ease;\n    display: flex;\n    flex-direction: row; }\n  .pi-carousel .pi-item {\n    height: 100%;\n    flex: 1;\n    overflow: hidden; }\n    .pi-carousel .pi-item .pi-img {\n      background: center center no-repeat;\n      background-size: contain;\n      width: 100%;\n      height: 100%; }\n  .pi-carousel .pi-pager {\n    position: absolute;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    text-align: center;\n    font-size: 0;\n    line-height: 20px; }\n    .pi-carousel .pi-pager > span {\n      border: 3px solid #bbb;\n      border-radius: 50%;\n      margin: 0 2px; }\n      .pi-carousel .pi-pager > span.selected {\n        border-color: #555; }\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 10 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5), __webpack_require__(10)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(11);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(15)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(8),
  /* template */
  __webpack_require__(14),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/soneway/Sites/github/vue-plugin/src/component/PiCarousel.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] PiCarousel.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d083b4a6", Component.options)
  } else {
    hotAPI.reload("data-v-d083b4a6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "pi-carousel",
    class: _vm._class,
    style: (_vm._style),
    on: {
      "touchstart": _vm.__touchstart,
      "touchmove": _vm.__touchmove,
      "touchend": _vm.__touchend
    }
  }, [_c('div', {
    staticClass: "pi-wrap",
    style: (_vm._wrapStyle),
    on: {
      "click": _vm.__wrapClick
    }
  }, [_c('div', {
    staticClass: "pi-item"
  }, [(_vm.prevData) ? _vm._t("default", [_c('div', {
    staticClass: "pi-img",
    style: (_vm.imgStyle(_vm.prevData))
  })], {
    itemData: _vm.prevData,
    index: _vm.currentIndex - 1
  }) : _vm._e()], 2), _vm._v(" "), _c('div', {
    ref: "currentItem",
    staticClass: "pi-item"
  }, [(_vm.currentData) ? _vm._t("default", [_c('div', {
    staticClass: "pi-img",
    style: (_vm.imgStyle(_vm.currentData))
  })], {
    itemData: _vm.currentData,
    index: _vm.currentIndex
  }) : _vm._e()], 2), _vm._v(" "), _c('div', {
    staticClass: "pi-item"
  }, [(_vm.nextData) ? _vm._t("default", [_c('div', {
    staticClass: "pi-img",
    style: (_vm.imgStyle(_vm.nextData))
  })], {
    itemData: _vm.nextData,
    index: _vm.currentIndex + 1
  }) : _vm._e()], 2)]), _vm._v(" "), (_vm.isShowPager) ? _c('div', {
    staticClass: "pi-pager"
  }, [_vm._t("pager", _vm._l((_vm.dataList), function(_, index) {
    return _c('span', {
      class: {
        selected: index === _vm.currentIndex
      },
      on: {
        "click": function($event) {
          _vm.__pagerClick(index)
        }
      }
    })
  }), {
    dataList: _vm.dataList
  })], 2) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-d083b4a6", module.exports)
  }
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("10ca1f40", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d083b4a6\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./PiCarousel.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d083b4a6\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./PiCarousel.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(61)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(25),
  /* template */
  __webpack_require__(52),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/soneway/Sites/github/vue-plugin/src/view/Carousel.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Carousel.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-416e0e50", Component.options)
  } else {
    hotAPI.reload("data-v-416e0e50", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__component_PiCarousel_vue__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__component_PiCarousel_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__component_PiCarousel_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_request__ = __webpack_require__(36);
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    PiCarousel: __WEBPACK_IMPORTED_MODULE_0__component_PiCarousel_vue___default.a
  },
  mounted: function mounted() {
    this.initImgs();
    this.initEvent();
  },

  methods: {
    initImgs: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var carousel, imgs;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                carousel = this.$refs.carousel;
                _context.next = 3;
                return __WEBPACK_IMPORTED_MODULE_1__lib_request__["a" /* default */].getImgs();

              case 3:
                imgs = _context.sent;

                if (imgs) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt('return', console.log('网络请求失败'));

              case 6:
                carousel.dataList = imgs;

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function initImgs() {
        return _ref.apply(this, arguments);
      }

      return initImgs;
    }(),
    initEvent: function initEvent() {
      var _this = this;

      var carousel = this.$refs.carousel;
      carousel.$on('slide', function () {
        var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(index, direction) {
          var _carousel$dataList, imgs;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!(index === carousel.dataList.length - 1 && direction === -1)) {
                    _context2.next = 5;
                    break;
                  }

                  _context2.next = 3;
                  return __WEBPACK_IMPORTED_MODULE_1__lib_request__["a" /* default */].getImgs();

                case 3:
                  imgs = _context2.sent;

                  imgs.length && (_carousel$dataList = carousel.dataList).push.apply(_carousel$dataList, _toConsumableArray(imgs));

                case 5:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this);
        }));

        return function (_x, _x2) {
          return _ref2.apply(this, arguments);
        };
      }());
    }
  }
});

/***/ }),
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_es6_object__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__lib_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_promise_polyfill__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_promise_polyfill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_promise_polyfill__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_regenerator_runtime_runtime__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_regenerator_runtime_runtime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_regenerator_runtime_runtime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_third_vue_runtime_min__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_third_vue_runtime_min___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__lib_third_vue_runtime_min__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__view_Carousel_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__view_Carousel_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__view_Carousel_vue__);







__WEBPACK_IMPORTED_MODULE_4__view_Carousel_vue___default.a.el = '#root';
// pc触摸事件兼容
if (!('ontouchend' in document)) {
  var scriptEl = document.createElement('script');
  scriptEl.src = 'https://soneway.github.io/js/desktouch.js';
  document.head.appendChild(scriptEl);
}

/* harmony default export */ __webpack_exports__["default"] = (new __WEBPACK_IMPORTED_MODULE_3__lib_third_vue_runtime_min___default.a(__WEBPACK_IMPORTED_MODULE_4__view_Carousel_vue___default.a));

/***/ }),
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// 获取uid函数
var getUid = function () {
  var uid = 0;
  return function () {
    return ++uid;
  };
}();

// 获取?或者&号
function getSymbol(url) {
  return url.indexOf('?') < 0 ? '?' : '&';
}

// 判断是否为function函数
function isFunction(fn) {
  return typeof fn === 'function';
}

// 加载js函数
var getScript = function () {
  var headEl = document.head;
  var jsReg = /(\.js)$/;

  return function (url, fn) {
    var isJs = jsReg.test(url);
    var scriptEl = document.createElement('script');

    // type
    scriptEl.type = 'text/javascript';

    // onload
    scriptEl.onload = function () {
      isFunction(fn) && fn();
      isJs || headEl.removeChild(scriptEl);
    };

    // onerror
    scriptEl.onerror = function (err) {
      isFunction(fn) && fn(err);
    };

    // 请求
    scriptEl.src = url;
    headEl.appendChild(scriptEl);
  };
}();

// get数据函数
function get(opts) {
  // 配置项
  opts = Object.assign({}, get.defaults, opts);
  var _opts = opts,
      url = _opts.url,
      data = _opts.data;
  // callback可用于统计

  var _opts2 = opts,
      success = _opts2.success,
      error = _opts2.error,
      callback = _opts2.callback;

  // url判断

  if (!url) {
    return console.error('请求的url不能为空');
  }

  // 回调函数名
  var cbName = 'jsonpcb' + getUid();

  // 将回调函数添加到全局变量
  window[cbName] = function (rs) {
    // 回调
    isFunction(success) && success(rs);
    isFunction(callback) && callback(opts, rs);
    // 释放回调函数
    window[cbName] = null;
  };

  // url中添加callback
  Object.assign(data || (data = {}), {
    callback: cbName
  });

  // 拼接data
  if (data) {
    url += getSymbol(url) + Object.keys(data).map(function (item) {
      return item + '=' + encodeURIComponent(data[item]);
    }).join('&');
  }

  // 发起请求
  getScript(url, function (err) {
    // js加载出错
    if (err) {
      // 回调
      isFunction(error) && error(err);
      isFunction(callback) && callback(opts);
      // 释放回调函数
      window[cbName] = null;
    }
  });
}
// get数据默认配置项
get.defaults = {};

// post数据函数
var post = function () {
  // 回调函数对象
  var msgcb = {};
  var bodyEl = document.body;
  // 临时元素
  var tmpEl = document.createElement('div');

  // 绑定消息事件
  window.addEventListener('message', function (evt) {
    var data = evt.data;

    // data转对象

    (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' || (data = JSON.parse(data || null) || {});

    // 回调函数
    var callback = msgcb[data.id];
    isFunction(callback) && callback(data.rs);
  });

  return function (opts) {
    // 配置项
    opts = Object.assign({}, post.defaults, opts);
    var _opts3 = opts,
        success = _opts3.success,
        error = _opts3.error,
        callback = _opts3.callback,
        formSelector = _opts3.formSelector,
        url = _opts3.url,
        method = _opts3.method,
        data = _opts3.data,
        enctype = _opts3.enctype;

    // iframe元素

    var ifrId = 'postifr' + getUid();
    tmpEl.innerHTML = '<iframe name="' + ifrId + '" style="display: none;"></iframe>';
    var ifrEl = tmpEl.childNodes[0];
    bodyEl.appendChild(ifrEl);

    // form元素
    var formEl = void 0;
    // 页面中已存在的form提交
    if (formSelector) {
      formEl = document.querySelector(formSelector);
      // 请求url中添加callback信息
      var _formEl = formEl,
          action = _formEl.action;

      formEl.action = action + getSymbol(action) + 'msgcb=' + ifrId;
    }
    // 动态生成的form提交
    else {
        // 请求url
        var _action = url + getSymbol(url) + 'msgcb=' + ifrId;
        // 数据添加到form的input
        var inputHtml = data && Object.keys(data).map(function (key) {
          return '<input type="hidden" name="' + key + '" value="' + data[key] + '"/>';
        }).join('');
        tmpEl.innerHTML = '<form style="display: none;" method="' + method + '" action="' + _action + '">' + inputHtml + '</form>';
        formEl = tmpEl.childNodes[0];
      }
    // target
    formEl.target = ifrId;
    // enctype
    enctype && (formEl.enctype = enctype);

    // message事件响应函数
    msgcb[ifrId] = function (rs) {
      // 回调
      isFunction(success) && success(rs);
      isFunction(callback) && callback(opts, rs);
      // 释放回调函数
      msgcb[ifrId] = null;

      // 删除节点
      bodyEl.removeChild(ifrEl);
      formSelector || bodyEl.removeChild(formEl);
    };

    // iframe onload事件,主要处理请求失败
    ifrEl.onload = function () {
      // 延迟运行
      setTimeout(function () {
        // 如果回调还在,说明没有成功回调,即发生错误
        if (msgcb[ifrId]) {
          // 回调
          isFunction(error) && error();
          isFunction(callback) && callback(opts);
          // 释放回调函数
          msgcb[ifrId] = null;

          // 删除节点
          bodyEl.removeChild(ifrEl);
          formSelector || bodyEl.removeChild(formEl);
        }
      }, 100);
    };

    // 提交
    formSelector || bodyEl.appendChild(formEl);
    formEl.submit();
  };
}();
// post数据默认配置项
post.defaults = {
  method: 'POST'
};

/* harmony default export */ __webpack_exports__["a"] = ({
  // 加载js函数
  getScript: getScript,
  // get数据函数
  get: get,
  // post数据函数
  post: post
});

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__jsonp__ = __webpack_require__(35);


// 获取图片数据
var getImgs = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var rs, articles;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return get('/iflow/api/v1/channel/100?method=new');

          case 2:
            rs = _context.sent;

            if (rs) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('return');

          case 5:
            articles = rs.data.articles || {};
            return _context.abrupt('return', Object.keys(articles).map(function (key) {
              var images = articles[key].images[0] || {};
              return images.url;
            }).filter(function (item) {
              return !!item;
            }));

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getImgs() {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }



var origin = 'https://m.uczzd.cn';

// get请求函数,对应jsonp
function get(pathname, data) {
  return new Promise(function (resolve) {
    __WEBPACK_IMPORTED_MODULE_0__jsonp__["a" /* default */].get({
      url: origin + pathname,
      data: data,
      success: function success(rs) {
        resolve(rs);
      },
      error: function error() {
        resolve();
      }
    });
  });
}

// post请求函数
function post(opts) {}

/* harmony default export */ __webpack_exports__["a"] = ({
  get: get,
  post: post,
  getImgs: getImgs
});

/***/ }),
/* 37 */,
/* 38 */,
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n@charset \"UTF-8\";\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\nbody {\n  overflow-x: hidden;\n  /*可继承*/\n  color: #333;\n  font-size: 14px;\n  font-family: helvetica, sans-serif;\n  -webkit-text-size-adjust: none;\n  /*禁止选中文本*/\n  -webkit-user-select: none;\n          user-select: none;\n  /*部分浏览器点选时会有淡蓝色框,这样可以去掉*/\n  -webkit-tap-highlight-color: transparent;\n  /*禁止保存图片*/\n  -webkit-touch-callout: none;\n  /*滚动平滑*/\n  -webkit-overflow-scrolling: touch;\n}\ninput, textarea, select {\n  font-size: inherit;\n}\ninput, textarea {\n  -webkit-user-select: text;\n          user-select: text;\n}\nimg, input {\n  vertical-align: middle;\n}\nimg {\n  border: none;\n}\na {\n  outline: none;\n  color: inherit;\n  text-decoration: none;\n  cursor: pointer;\n}\nli {\n  list-style: none;\n}\ni {\n  font-style: normal;\n}\n.wrapper {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n}\n", "", {"version":3,"sources":["/Users/soneway/Sites/github/vue-plugin/src/view/Carousel.vue"],"names":[],"mappings":";AAAA,iBAAiB;AACjB;EACE,UAAU;EACV,WAAW;EACX,uBAAuB;CAAE;AAE3B;EACE,mBAAmB;EACnB,OAAO;EACP,YAAY;EACZ,gBAAgB;EAChB,mCAAmC;EACnC,+BAA+B;EAC/B,UAAU;EACV,0BAAkB;UAAlB,kBAAkB;EAClB,yBAAyB;EACzB,yCAAyC;EACzC,UAAU;EACV,4BAA4B;EAC5B,QAAQ;EACR,kCAAkC;CAAE;AAEtC;EACE,mBAAmB;CAAE;AAEvB;EACE,0BAAkB;UAAlB,kBAAkB;CAAE;AAEtB;EACE,uBAAuB;CAAE;AAE3B;EACE,aAAa;CAAE;AAEjB;EACE,cAAc;EACd,eAAe;EACf,sBAAsB;EACtB,gBAAgB;CAAE;AAEpB;EACE,iBAAiB;CAAE;AAErB;EACE,mBAAmB;CAAE;AAEvB;EACE,mBAAmB;EACnB,QAAQ;EACR,SAAS;EACT,OAAO;EACP,UAAU;CAAE","file":"Carousel.vue","sourcesContent":["@charset \"UTF-8\";\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box; }\n\nbody {\n  overflow-x: hidden;\n  /*可继承*/\n  color: #333;\n  font-size: 14px;\n  font-family: helvetica, sans-serif;\n  -webkit-text-size-adjust: none;\n  /*禁止选中文本*/\n  user-select: none;\n  /*部分浏览器点选时会有淡蓝色框,这样可以去掉*/\n  -webkit-tap-highlight-color: transparent;\n  /*禁止保存图片*/\n  -webkit-touch-callout: none;\n  /*滚动平滑*/\n  -webkit-overflow-scrolling: touch; }\n\ninput, textarea, select {\n  font-size: inherit; }\n\ninput, textarea {\n  user-select: text; }\n\nimg, input {\n  vertical-align: middle; }\n\nimg {\n  border: none; }\n\na {\n  outline: none;\n  color: inherit;\n  text-decoration: none;\n  cursor: pointer; }\n\nli {\n  list-style: none; }\n\ni {\n  font-style: normal; }\n\n.wrapper {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0; }\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrapper"
  }, [_c('pi-carousel', {
    ref: "carousel",
    attrs: {
      "isShowPager": true,
      "isLoop": true,
      "autoPlayTimeout": 0,
      "duration": 400
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-416e0e50", module.exports)
  }
}

/***/ }),
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(39);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("f6dc8a32", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-416e0e50\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Carousel.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-416e0e50\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Carousel.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ })
],[30]);
//# sourceMappingURL=carousel.js.map