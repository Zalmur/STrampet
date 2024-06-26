// Generated by CoffeeScript 2.7.0
(function() {
  Take(["Mode", "Nav"], function(Mode, Nav) {
    if (!Mode.nav) {
      return;
    }
    
    // This only works in Safari and Mobile Safari
    // On Mobile Safari, it fights a bit with touchmove.
    // One of them will win and overwrite the other. Not a big deal.
    window.addEventListener("gesturestart", function(e) {
      if (Nav.eventInside(e)) {
        e.preventDefault();
        return Nav.startScale();
      }
    });
    return window.addEventListener("gesturechange", function(e) {
      if (Nav.eventInside(e)) {
        e.preventDefault();
        return Nav.scale(e.scale);
      }
    });
  });

}).call(this);
