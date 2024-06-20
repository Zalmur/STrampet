// Generated by CoffeeScript 2.7.0
(function() {
  Take(["Registry", "GUI", "Input", "RAF", "SVG", "TRS", "Tween"], function(Registry, {
      ControlPanel: GUI
    }, Input, RAF, SVG, TRS, Tween) {
    return Registry.set("Control", "switch", function(elm, props) {
      var bgc, blueBG, handlers, height, input, isActive, label, labelFill, lightBG, lightFill, lightTrack, normalTrack, orangeBG, scope, strokeWidth, thumb, thumbSize, tickBG, toClicked, toClicking, toHover, toNormal, toggle, track, trackWidth;
      // An array to hold all the change functions that have been attached to this slider
      handlers = [];
      strokeWidth = 2;
      thumbSize = GUI.thumbSize;
      trackWidth = thumbSize * 2;
      isActive = false;
      height = thumbSize;
      normalTrack = "hsl(227, 45%, 24%)";
      lightTrack = "hsl(92, 46%, 57%)";
      lightFill = "hsl(220, 10%, 92%)";
      labelFill = props.fontColor || lightFill;
      SVG.attrs(elm, {
        ui: true
      });
      track = SVG.create("rect", elm, {
        x: strokeWidth / 2,
        y: strokeWidth / 2,
        width: trackWidth - strokeWidth,
        height: thumbSize - strokeWidth,
        strokeWidth: strokeWidth,
        fill: normalTrack,
        stroke: normalTrack,
        rx: thumbSize / 2
      });
      thumb = TRS(SVG.create("circle", elm, {
        cx: thumbSize / 2,
        cy: thumbSize / 2,
        strokeWidth: strokeWidth,
        fill: lightFill,
        r: thumbSize / 2 - strokeWidth / 2
      }));
      label = SVG.create("text", elm, {
        textContent: props.name,
        x: trackWidth + GUI.labelMargin,
        y: (props.fontSize || 16) + GUI.unit / 16,
        fontSize: props.fontSize || 16,
        fontWeight: props.fontWeight || "normal",
        fontStyle: props.fontStyle || "normal",
        textAnchor: "start",
        fill: labelFill
      });
      toggle = function() {
        isActive = !isActive;
        TRS.abs(thumb, {
          x: isActive ? thumbSize : 0
        });
        SVG.attrs(track, {
          fill: isActive ? lightTrack : normalTrack
        });
        return props.click(isActive);
      };
      // Setup the thumb stroke color for tweening
      bgc = blueBG = {
        r: 34,
        g: 46,
        b: 89
      };
      lightBG = {
        r: 133,
        g: 163,
        b: 224
      };
      orangeBG = {
        r: 255,
        g: 196,
        b: 46
      };
      tickBG = function(_bgc) {
        bgc = _bgc;
        return SVG.attrs(thumb, {
          stroke: `rgb(${bgc.r | 0},${bgc.g | 0},${bgc.b | 0})`
        });
      };
      tickBG(blueBG);
      // Input event handling
      toNormal = function(e, state) {
        return Tween(bgc, blueBG, .2, {
          tick: tickBG
        });
      };
      toHover = function(e, state) {
        if (!state.touch) {
          return Tween(bgc, lightBG, 0, {
            tick: tickBG
          });
        }
      };
      toClicking = function(e, state) {
        return Tween(bgc, orangeBG, 0, {
          tick: tickBG
        });
      };
      toClicked = function(e, state) {
        return Tween(bgc, lightBG, .2, {
          tick: tickBG
        });
      };
      input = Input(elm, {
        moveIn: toHover,
        dragIn: function(e, state) {
          if (state.clicking) {
            return toClicking();
          }
        },
        down: toClicking,
        up: toHover,
        moveOut: toNormal,
        dragOut: toNormal,
        click: function() {
          toClicked();
          toggle();
          return void 0;
        }
      });
      return scope = {
        height: height,
        input: input,
        isActive: function() {
          return isActive;
        },
        setValue: function(v = null) {
          if ((v == null) || v !== isActive) {
            return toggle();
          }
        },
        attach: function(props) {
          if (props.change != null) {
            handlers.push(props.change);
          }
          if (props.active) {
            return RAF(toggle, true);
          }
        },
        _highlight: function(enable) {
          if (enable) {
            SVG.attrs(track, {
              fill: isActive ? "url(#MidHighlightGradient)" : "url(#DarkHighlightGradient)"
            });
            SVG.attrs(thumb, {
              fill: "url(#LightHighlightGradient)"
            });
            return SVG.attrs(label, {
              fill: "url(#LightHighlightGradient)"
            });
          } else {
            SVG.attrs(track, {
              fill: isActive ? lightTrack : normalTrack
            });
            SVG.attrs(thumb, {
              fill: lightFill
            });
            return SVG.attrs(label, {
              fill: labelFill
            });
          }
        }
      };
    });
  });

}).call(this);