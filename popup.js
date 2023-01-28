// let clipboardValue;
let copy_value = ""

function fill_qbis_timelog() {
  let to_fill = {};
  console.log("in fill ");

  try {
    const keys = Object.keys(copy_value);
    console.log(keys);

    keys.forEach(key => {
      if (key.startsWith("Man")) {
        to_fill["1"] = {
          arrive: copy_value[key]["start"],
          lunch: copy_value[key]["lunch"],
          leave: copy_value[key]["end"]
        };
      } else if (key.startsWith("Tis")) {
        to_fill["11"] = {
          arrive: copy_value[key]["start"],
          lunch: copy_value[key]["lunch"],
          leave: copy_value[key]["end"]
        };
      } else if (key.startsWith("Ons")) {
        to_fill["21"] = {
          arrive: copy_value[key]["start"],
          lunch: copy_value[key]["lunch"],
          leave: copy_value[key]["end"]
        };
      } else if (key.startsWith("Tors")) {
        to_fill["31"] = {
          arrive: copy_value[key]["start"],
          lunch: copy_value[key]["lunch"],
          leave: copy_value[key]["end"]
        };
      } else if (key.startsWith("Fre")) {
        to_fill["41"] = {
          arrive: copy_value[key]["start"],
          lunch: copy_value[key]["lunch"],
          leave: copy_value[key]["end"]
        };
      }
    });
  } catch (error) {
    console.error("Error in fill_with_data: ", error);
  }

  try {
    const to_fill_keys = Object.keys(to_fill);
    console.log(to_fill);
    console.log(to_fill_keys);

    to_fill_keys.forEach(index => {
      const day = to_fill[index];

      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
          code: `
            document.querySelectorAll(\`input.Arrive[tabindex="${index}"]\`)[1].value = "${day.arrive}";
            document.querySelectorAll(\`input.Arrive[tabindex="${index}"]\`)[1].dispatchEvent(new Event("change"));
            document.querySelectorAll(\`input.Arrive[tabindex="${index}"]\`)[1].dispatchEvent(new Event("blur"));

            document.querySelectorAll(\`input.Lunch[tabindex="${index}"]\`)[1].value = "${day.lunch}";
            document.querySelectorAll(\`input.Lunch[tabindex="${index}"]\`)[1].dispatchEvent(new Event("change"));
            document.querySelectorAll(\`input.Lunch[tabindex="${index}"]\`)[1].dispatchEvent(new Event("blur"));

            document.querySelectorAll(\`input.Leave[tabindex="${index}"]\`)[1].value = "${day.leave}";
            document.querySelectorAll(\`input.Leave[tabindex="${index}"]\`)[1].dispatchEvent(new Event("change"));
            document.querySelectorAll(\`input.Leave[tabindex="${index}"]\`)[1].dispatchEvent(new Event("blur"));
          `
        });
      });
    });
  } catch (error) {
    console.error("Error in fill_with_data: ", error);
  }
}



function getClipboardText() {
  // create div element for pasting into
  var pasteDiv = document.createElement("div");

  // place div outside the visible area
  pasteDiv.style.position = "absolute";
  pasteDiv.style.left = "-10000px";
  pasteDiv.style.top = "-10000px";

  // set contentEditable mode
  pasteDiv.contentEditable = true;

  // find a good place to add the div to the document
  var insertionElement = document.activeElement; // start with the currently active element
  var nodeName = insertionElement.nodeName.toLowerCase(); // get the element type
  while (nodeName !== "body" && nodeName !== "div" && nodeName !== "li" && nodeName !== "th" && nodeName !== "td") { // if have not reached an element that it is valid to insert a div into (stopping eventually with 'body' if no others are found first)
      insertionElement = insertionElement.parentNode; // go up the hierarchy
      nodeName = insertionElement.nodeName.toLowerCase(); // get the element type
  }

  // add element to document
  insertionElement.appendChild(pasteDiv);

  // paste the current clipboard text into the element
  pasteDiv.focus();
  document.execCommand('paste');

  // get the pasted text from the div
  var clipboardText = pasteDiv.innerText;

  // remove the temporary element
  insertionElement.removeChild(pasteDiv);

  // return the text
  return clipboardText;
}

document.getElementById("AutoFillQbis").addEventListener("click", function() {
  copy_value = JSON.parse(getClipboardText())
  console.log(copy_value)
  fill_qbis_timelog()

});

