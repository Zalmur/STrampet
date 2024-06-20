// Generated by CoffeeScript 2.7.0
(function() {
  Take([], function() {
    var channel, finishSetup, id, inbox, listeners, offerHandshake, outbox, port, timeoutID;
    if (window === window.top) { // This logic needs to mirror the logic for Mode.embed
      Make("ParentData", null); // Make sure you check Mode.embed before using ParentData, hey?
      return;
    }
    channel = new MessageChannel();
    port = channel.port1;
    port.start();
    inbox = {};
    outbox = {};
    listeners = [];
    id = window.location.pathname.replace(/^\//, "") + window.location.hash;
    // API ###########################################################################################
    finishSetup = function() {
      finishSetup = null;
      return Make("ParentData", {
        send: function(k, v) {
          if (outbox[k] !== v) {
            outbox[k] = v;
            return port.postMessage(`${k}:${v}`);
          }
        },
        get: function(k) {
          return inbox[k];
        },
        // Currently only used by Nav so that we can run a resize whenever the outer context changes
        listen: function(cb) {
          listeners.push(cb);
          return cb(inbox);
        }
      });
    };
    // RECEIVING #####################################################################################
    port.addEventListener("message", function(e) {
      var cb, i, k, len, results, v;
      if (e.data === "INIT") {
        return typeof finishSetup === "function" ? finishSetup() : void 0;
      } else {
        [k, v] = e.data.split(":");
        if ((k != null) && (v != null)) {
          inbox[k] = v;
          results = [];
          for (i = 0, len = listeners.length; i < len; i++) {
            cb = listeners[i];
            results.push(cb(inbox));
          }
          return results;
        } else {
          return console.log("ParentData received an unprocessable message:", e.data);
        }
      }
    });
    // HANDSHAKE #####################################################################################
    timeoutID = null;
    window.addEventListener("message", function(e) {
      if (e.data === "Handshake Received") {
        clearTimeout(timeoutID);
        return window.top.postMessage(`Channel:${id}`, "*", [channel.port2]);
      }
    });
    offerHandshake = function() {
      window.top.postMessage("Handshake", "*");
      // Offer handshakes again every 100ms until the parent accepts
      return timeoutID = setTimeout(offerHandshake, 100);
    };
    return offerHandshake();
  });

}).call(this);