DOMhelp = {
  // Find the last sibling of the current node
  lastSibling: function(node) {
    var tempObj = node.parentNode.lastChild;
    while (tempObj.nodeType != 1 && tempObj.previousSibling != null) {
      tempObj = tempObj.previousSibling;
    }
    return (tempObj.nodeType == 1) ? tempObj : false;
  },

  // Find the first sibling of the current node
  firstSibling: function(node) {
    var tempObj = node.parentNode.firstChild;
    while (tempObj.nodeType != 1 && tempObj.nextSibling != null) {
      tempObj = tempObj.nextSibling;
    }
    return (tempObj.nodeType == 1) ? tempObj : false;
  },

  // Retrieve the content of the first text node sibling of the current node
  getText: function(node) {
    if (!node.hasChildNodes()) {
      return false;
    }
    var reg = /^\s+$/;
    var tempObj = node.firstChild;
    while (
      (tempObj.nodeType != 3 && tempObj.nextSibling != null) ||
      reg.test(tempObj.nodeValue)
    ) {
      tempObj = tempObj.nextSibling;
    }
    return (tempObj.nodeType == 3 )? tempObj.nodeValue : false;
  },

  // Set the content of thie first text node of the current node
  setText: function(node, txt) {
    if (!node.hasChildNodes()) {
      return false;
    }
    var reg = /^\s+$/;
    var tempObj = node.firstChild;
    while (
      (tempObj.nodeType != 3 && tempObj.nextSibling != null) ||
      reg.test(tempObj.nodeValue)
    ) {
      tempObj = tempObj.nextSibling;
    }
    if (tempObj.nodeType == 3) {
      tempObj.nodeValue = txt;
    } else {
      return false;
    }
  },

  // Find the next or previous sibling that is an element and not a text node or link break
  closestSibling: function(node, direction) {
    var tempObj;
    if (direction == -1 && node.previousSibling != null) {
      tempObj = node.previousSibling;
      while (tempObj.nodeType != 1 && tempObj.previousSibling != null) {
        tempObj = tempObj.previousSibling;
      }
    } else if (direction == 1 && node.nextSibling != null) {
      tempObj = node.nextSibling;
      while (tempObj.nodeType != 1 && tempObj.nextSibling != null) {
        tempObj = tempObj.nextSibling;
      }
    }
    return tempObj.nodeType == 1 ? tempObj : false;
  },

  // Create a new link containing the given text
  createLink: function(to, txt) {
    var tempObj = document.createElement("a");
    tempObj.appendChild(document.createTextNode(txt));
    tempObj.setAttribute("href", to);
    return tempObj;
  },

  // Create a new element containing the given text
  createTextElm: function(elm, txt) {
    var tempObj = document.createElement(elm);
    tempObj.appendChild(document.createTextNode(txt));
    return tempObj;
  },

  // Simulate a debugging console to avoid the need for alerts
  initDebug: function() {
    if (DOMhelp.debug) {
      DOMhelp.stopDebug();
    }
    DOMhelp.debug = document.createElement("div");
    DOMhelp.debug.setAttribute("id", DOMhelp.debugWindowId);
    document.body.insertBefore(DOMhelp.debug, document.body.firstChild);
  },

  setDebug: function(bug) {
    if (!DOMhelp.debug) {
      DOMhelp.initDebug();
    }
    DOMhelp.debug.innerHTML = bug + "\n";
  },

  stopDebug: function() {
    if (DOMhelp.debug) {
      DOMhelp.debug.parentNode.removeChild(DOMhelp.debug);
      DOMhelp.debug = null;
    }
	},
	
	getTarget:function (e) {
		var target = window.event?window.event.srcElement:e?e.target:null;
		if(!target){
			return false;
		}
		if(target.nodeName.toLowerCase() !='a'){
			target = target.parentNode;
		}
		return target;
	},

	stopBuggle:function () {
		if(window.event && window.event.cancelBubble){
			window.event.cancelBubble = true;
		}
		if(e && e.stopPropagation){
			e.stopPropagation();
		}
	},

	stopDefault:function (e) {
		if(window.event&&window.event.returnValue){
			window.event.cancelBubble = true;
		}
		if(e&&e.preventDefault){
			e.preventDefault();
		}
	},

	cancelClick:function (e) {
		if(window.event&&window.event.cancelBubble&&window.event.returnValue){
			window.event.cancelBubble = true;
			window.event.returnValue = true;
			return ;
		}
		if(e && e.stopPropagation && e.preventDefault){
			e.stopPropagation();
			e.preventDefault();
		}
	}
};
