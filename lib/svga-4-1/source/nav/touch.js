// Generated by CoffeeScript 2.7.0
(function() {
  Take(["Mode", "Nav", "TouchAcceleration"], function(Mode, Nav, TouchAcceleration) {
    var cloneTouches, distTouches, dragging, lastTouches, touchEnd, touchMove, touchStart;
    if (!Mode.nav) {
      return;
    }
    lastTouches = null;
    dragging = false;
    touchStart = function(e) {
      dragging = false;
      TouchAcceleration.move({
        x: 0,
        y: 0 // Stop any momentum scrolling
      });
      if (Nav.eventInside(e)) {
        e.preventDefault();
        return cloneTouches(e);
      }
    };
    touchMove = function(e) {
      var a, b;
      if (Nav.eventInside(e)) {
        e.preventDefault();
        if (e.touches.length !== lastTouches.length) {

        // noop
        } else if (e.touches.length > 1) {
          a = distTouches(lastTouches);
          b = distTouches(e.touches);
          Nav.by({
            z: (b - a) / 200
          });
        } else {
          dragging = true;
          TouchAcceleration.move({
            x: e.touches[0].clientX - lastTouches[0].clientX,
            y: e.touches[0].clientY - lastTouches[0].clientY
          });
        }
        return cloneTouches(e);
      }
    };
    touchEnd = function(e) {
      if (dragging) {
        dragging = false;
        return TouchAcceleration.up();
      }
    };
    // We are safe to use passive: false, because we only do nav when standalone
    window.addEventListener("touchstart", touchStart, {
      passive: false
    });
    window.addEventListener("touchmove", touchMove, {
      passive: false
    });
    window.addEventListener("touchend", touchEnd);
    cloneTouches = function(e) {
      var t;
      lastTouches = (function() {
        var i, len, ref, results;
        ref = e.touches;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          t = ref[i];
          results.push({
            clientX: t.clientX,
            clientY: t.clientY
          });
        }
        return results;
      })();
      return void 0;
    };
    return distTouches = function(touches) {
      var a, b, dx, dy;
      a = touches[0];
      b = touches[1];
      dx = a.clientX - b.clientX;
      dy = a.clientY - b.clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };
  });

}).call(this);
