'use strict';

function hideOnClickOutside(selector, classElement, className) {
  console.clear();
  var outsideClickListener = function outsideClickListener(event) {
    if (!$(event.target).closest(selector).length) {
      if ($(classElement).hasClass(className)) {
        $(classElement).removeClass(classElement);
        removeClickListener();
      }
    }
  };
  var removeClickListener = function removeClickListener() {
    document.removeEventListener('click', outsideClickListener);
  };

  document.addEventListener('click', outsideClickListener);
}