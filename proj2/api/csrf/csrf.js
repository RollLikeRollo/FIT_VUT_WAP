/**
 * @file csrf.js
 * @description Editor code and rendering of malicious iframe
 * @author Jan Zboril <xzbori20@stud.fit.vutbr.cz>
 * @date 2023
 * FIT VUT Brno
 * WAP project 2
 */

/**
 * Load the editor and render the malicious iframe on the page load
 */
window.onload = async function () { 
    update(document.getElementById('editing').value);
};

/**
 * Takes text (HTML code) from the editor and renders it in the iframe
 */
function renderFrame() {
    var editorHTML = document.getElementById('editing').value;
    var iframe = document.getElementById('malicious-iframe');
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(editorHTML);
    iframe.contentWindow.document.close();
}

/**
 *  Scrolling in the editor
 *  From https://css-tricks.com/creating-an-editable-textarea-that-supports-syntax-highlighted-code/
 */
function sync_scroll(element) {
    /* Scroll result to scroll coords of event - sync with textarea */
    let result_element = document.querySelector("#highlighting");
    // Get and set x and y
    result_element.scrollTop = element.scrollTop;
    result_element.scrollLeft = element.scrollLeft;
}

/**
 * Editor logic
 *  From https://css-tricks.com/creating-an-editable-textarea-that-supports-syntax-highlighted-code/
 * @param {*} text the textarea content - the editor
 */
function update(text) {

    renderFrame();


    let result_element = document.querySelector("#highlighting-content");
    // Handle final newlines (see article)
    if(text[text.length-1] == "\n") {
      text += " ";
    }
    // Update code
    result_element.innerHTML = text.replace(new RegExp("&", "g"), "&amp;").replace(new RegExp("<", "g"), "&lt;"); /* Global RegExp */
    // result_element.innerHTML = text.replace(new RegExp("&", "g"), "&").replace(new RegExp("<", "g"), "<"); /* Global RegExp */
    // Syntax Highlight
    Prism.highlightElement(result_element);
  }
  
  function sync_scroll(element) {
    /* Scroll result to scroll coords of event - sync with textarea */
    let result_element = document.querySelector("#highlighting");
    // Get and set x and y
    result_element.scrollTop = element.scrollTop;
    result_element.scrollLeft = element.scrollLeft;
  }
  
  function check_tab(element, event) {
    let code = element.value;
    if(event.key == "Tab") {
      /* Tab key pressed */
      event.preventDefault(); // stop normal
      let before_tab = code.slice(0, element.selectionStart); // text before tab
      let after_tab = code.slice(element.selectionEnd, element.value.length); // text after tab
      let cursor_pos = element.selectionStart + 1; // where cursor moves after tab - moving forward by 1 char to after tab
      element.value = before_tab + "\t" + after_tab; // add tab char
      // move cursor
      element.selectionStart = cursor_pos;
      element.selectionEnd = cursor_pos;
      update(element.value); // Update text to include indent
    }
  }