// Generated by CoffeeScript 2.7.0
(function() {
  Take(["DOOM", "Resize", "SVG", "Wait", "SVGReady"], function(DOOM, Resize, SVG, Wait) {
    var Message, foreignObject, inner, outer;
    // This is added to SVG.svg, not GUI.elm, so that it floats above spotlights
    foreignObject = SVG.create("foreignObject", SVG.svg, {
      id: "message"
    });
    outer = DOOM.create("div", foreignObject, {
      id: "message-outer"
    });
    inner = DOOM.create("div", outer, {
      id: "message-inner"
    });
    Resize(function() {
      return SVG.attrs(foreignObject, {
        width: window.innerWidth,
        height: window.innerHeight
      });
    });
    Message = function(html, time = 2) {
      DOOM(inner, {
        innerHTML: html
      });
      DOOM(outer, {
        opacity: 1
      });
      return Wait(time, function() {
        return DOOM(outer, {
          opacity: 0
        });
      });
    };
    // This is used so that spotlights can be prepended before it
    Message.elm = foreignObject;
    return Make("Message", Message);
  });

}).call(this);