// Generated by CoffeeScript 2.7.0
(function() {
  Take(["Reaction", "Symbol", "SVG"], function(Reaction, Symbol, SVG) {
    return Symbol("ColorContainer", ["colorContainer"], function(svgElement) {
      var scope;
      return scope = {
        setup: function() {
          return Reaction("Background:Set", function(v) {
            var c, current, i, j, l, len, len1, ref, ref1, ref2, results;
            l = (ref = v.split(", ")[2]) != null ? ref.split("%")[0] : void 0;
            l /= 100;
            l = (l / 2 + .8) % 1;
            ref1 = svgElement.querySelectorAll("[fill]");
            for (i = 0, len = ref1.length; i < len; i++) {
              c = ref1[i];
              current = SVG.attr(c, "fill");
              if (current !== "none" && current !== "transparent") {
                SVG.attr(c, "fill", `hsl(227, 4%, ${l * 100}%)`);
              }
            }
            ref2 = svgElement.querySelectorAll("[stroke]");
            results = [];
            for (j = 0, len1 = ref2.length; j < len1; j++) {
              c = ref2[j];
              current = SVG.attr(c, "stroke");
              if (current !== "none" && current !== "transparent") {
                results.push(SVG.attr(c, "stroke", `hsl(227, 4%, ${l * 100}%)`));
              } else {
                results.push(void 0);
              }
            }
            return results;
          });
        }
      };
    });
  });

}).call(this);
