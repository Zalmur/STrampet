// Generated by CoffeeScript 2.7.0
(function() {
  Take(["Registry", "ScopeCheck", "SVG"], function(Registry, ScopeCheck, SVG) {
    return Registry.add("ScopeProcessor", function(scope) {
      // These functions don't change the DOM — they just control the scope hierarchy.
      ScopeCheck(scope, "attachScope", "detachScope", "detachAllScopes");
      // These functions change both the DOM and scope hierarchy.
      // They're named to be compatable with the SVG tools.
      ScopeCheck(scope, "append", "prepend", "remove", "removeAllChildren");
      scope.attachScope = function(child, prepend = false) {
        var idCounter, tempID;
        child.parent = scope;
        if (child.id == null) {
          child.id = "child" + (scope.children.length || 0);
        }
        if (scope[child.id] != null) {
          tempID = child.id.replace(/\d/g, "");
          idCounter = 1;
          while (scope[tempID + idCounter] != null) {
            idCounter++;
          }
          child.id = tempID + idCounter;
        }
        scope[child.id] = child;
        if (prepend) {
          return scope.children.unshift(child);
        } else {
          return scope.children.push(child);
        }
      };
      scope.detachScope = function(child) {
        var c, i, j, ref;
        ref = scope.children;
        for (i = j = ref.length - 1; j >= 0; i = j += -1) {
          c = ref[i];
          if (c === child) {
            scope.children.splice(i, 1);
          }
        }
        delete scope[child.id];
        if (child.id.indexOf("child") !== -1) {
          delete child.id;
        }
        return delete child.parent;
      };
      scope.detachAllScopes = function() {
        var child, j, len, ref;
        ref = scope.children;
        for (j = 0, len = ref.length; j < len; j++) {
          child = ref[j];
          delete scope[child.id];
          if (child.id.indexOf("child") !== -1) {
            delete child.id;
          }
          delete child.parent;
        }
        return scope.children = [];
      };
      scope.append = function(child) {
        SVG.append(scope.element, child.element);
        return scope.attachScope(child);
      };
      scope.prepend = function(child) {
        SVG.prepend(scope.element, child.element);
        return scope.attachScope(child, true);
      };
      scope.remove = function(child) {
        SVG.remove(scope.element, child.element);
        return scope.detachScope(child);
      };
      return scope.removeAllChildren = function() {
        SVG.removeAllChildren(scope.element);
        return scope.detachAllScopes();
      };
    });
  });

}).call(this);
