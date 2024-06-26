// Generated by CoffeeScript 2.7.0
(function() {
  (function() {
    var WrapText;
    // This is a basic text-wrapping utility that works fine for monospace,
    // but does not account for text metrics with variable width fonts.
    return Make("WrapText", WrapText = function(string, maxLineLength) {
      var currentLine, currentWord, i, j, len, line, lineLength, lines, words;
      if (!((string != null) && string.length > 0)) {
        return [];
      }
      lines = [];
      currentLine = 0;
      lineLength = 0;
      words = string.split(" ");
      while (words.length > 0) {
        currentWord = words.shift();
        // If there's already stuff on the current line,
        // and the current word would push us past the right edge,
        // start a new line
        if ((lines[currentLine] != null) && lineLength + currentWord.length > maxLineLength) {
          currentLine++;
        }
        // If the current line is empty, set it up
        if (!lines[currentLine]) {
          lines[currentLine] = [];
          lineLength = 0;
        }
        // Add the current word to the current line
        lines[currentLine].push(currentWord);
        // Update the length of the current line
        lineLength += currentWord.length;
        if (lines[currentLine].length > 1) {
          // Also count spaces between words
          lineLength += 1;
        }
      }
      for (i = j = 0, len = lines.length; j < len; i = ++j) {
        line = lines[i];
        lines[i] = line.join(" ");
      }
      return lines;
    });
  })();

}).call(this);
