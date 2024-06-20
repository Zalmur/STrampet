// Generated by CoffeeScript 2.7.0
(function() {
  Take(["Registry", "ScopeCheck"], function(Registry, ScopeCheck) {
    return Registry.add("ScopeProcessor", function(scope) {
      var runtimeLimit, warmup;
      ScopeCheck(scope, "warmup");
      runtimeLimit = 300; // ms
      warmup = function(fn, time, step) {
        var msg, runtime, start;
        if (fn == null) {
          return;
        }
        start = performance.now();
        while (time <= 0) {
          fn(time, step);
          time += step;
          runtime = performance.now() - start;
          if (runtime > runtimeLimit) {
            console.log(`Warning: Warmup took longer than ${runtimeLimit}ms — aborting.`);
            return;
          }
        }
        msg = `@warmup took ${Math.round(runtime)}ms`;
        if (runtime > runtimeLimit / 3) {
          msg += " — please simplify your function or reduce the warmup duration";
        }
        return console.log(msg);
      };
      return scope.warmup = function(duration) { // duration: seconds
        warmup(scope._ms, -duration, 1 / 1000);
        warmup(scope._tick, -duration, 1 / 60);
        return warmup(scope._rawTick, -duration, 1 / 60);
      };
    });
  });

}).call(this);