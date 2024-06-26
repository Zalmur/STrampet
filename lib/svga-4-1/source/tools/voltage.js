// Generated by CoffeeScript 2.7.0
(function() {
  Take("Ease", function(Ease) {
    var Voltage, renderHSLString, renderString;
    Voltage = function(voltage, alpha = 1) {
      var h;
      switch (false) {
        // Pass-through for string values
        case typeof voltage !== "string":
          return voltage;
        // Schematic — black
        case voltage !== Voltage.black:
          return renderString(0, 0, 0, alpha);
        // Schematic — white
        case voltage !== Voltage.white:
          return renderString(255, 255, 255, alpha);
        // Legacy Electric
        case voltage !== Voltage.electric:
          return renderString(0, 218, 255, alpha);
        // Magnetic
        case voltage !== Voltage.magnetic:
          return renderString(141, 2, 155, alpha);
        // Inert
        case voltage !== Voltage.inert:
          return renderHSLString(184, 9, 50, alpha);
        // Zero voltage
        case voltage !== Voltage.zero:
          return renderString(0, 0, 0, alpha);
        default:
          // Normal — green to blue
          h = Ease.linear(voltage, Voltage.min, Voltage.max, 51, 180);
          return renderHSLString(h, 100, 50, alpha);
      }
    };
    Voltage.black = 101;
    Voltage.white = -101;
    Voltage.inert = -1;
    Voltage.ground = 0;
    Voltage.zero = 0;
    Voltage.min = 1;
    Voltage.med = 50;
    Voltage.max = 100;
    Voltage.electric = 1000;
    Voltage.magnetic = 1001;
    renderString = function(r, g, b, a) {
      if (a >= .99) {
        return `rgb(${r},${g},${b})`;
      } else {
        return `rgba(${r},${g},${b},${a})`;
      }
    };
    renderHSLString = function(h, s, l, a) {
      if (a >= .99) {
        return `hsl(${h},${s}%,${l}%)`;
      } else {
        return `hsla(${h},${s}%,${l}%,${a})`;
      }
    };
    return Make("Voltage", Voltage);
  });

}).call(this);
