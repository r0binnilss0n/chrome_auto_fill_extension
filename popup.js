let copy_value = ""

function fill_qbis_timelog() {
  let to_fill = {};

  // First i translate readable to id's to match qbis namings
  try {
    const keys = Object.keys(copy_value);
    keys.forEach(key => {
      if (key.startsWith("Mon")) {
        to_fill["1"] = copy_value[key]
      } else if (key.startsWith("Tue")) {
        to_fill["11"] = copy_value[key]
      } else if (key.startsWith("Wed")) {
        to_fill["21"] = copy_value[key]
      } else if (key.startsWith("Thu")) {
        to_fill["31"] = copy_value[key]
      } else if (key.startsWith("Fri")) {
        to_fill["41"] = copy_value[key]
      }
    });
  } catch (error) {
    console.error("Error in fill_with_data: ", error);
  }

  // Fill day data ( start, lunch, end)
  try {
    const to_fill_keys = Object.keys(to_fill);

    to_fill_keys.forEach(index => {
      const day = to_fill[index];

      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
          code: `
            document.querySelectorAll(\`input.Arrive[tabindex="${index}"]\`)[1].value = "${day.START}";
            document.querySelectorAll(\`input.Arrive[tabindex="${index}"]\`)[1].dispatchEvent(new Event("change"));
            document.querySelectorAll(\`input.Arrive[tabindex="${index}"]\`)[1].dispatchEvent(new Event("blur"));

            document.querySelectorAll(\`input.Lunch[tabindex="${index}"]\`)[1].value = "${day.LUNCH}";
            document.querySelectorAll(\`input.Lunch[tabindex="${index}"]\`)[1].dispatchEvent(new Event("change"));
            document.querySelectorAll(\`input.Lunch[tabindex="${index}"]\`)[1].dispatchEvent(new Event("blur"));

            document.querySelectorAll(\`input.Leave[tabindex="${index}"]\`)[1].value = "${day.END}";
            document.querySelectorAll(\`input.Leave[tabindex="${index}"]\`)[1].dispatchEvent(new Event("change"));
            document.querySelectorAll(\`input.Leave[tabindex="${index}"]\`)[1].dispatchEvent(new Event("blur"));
          `
        });
      });
    });
  } catch (error) {
    console.error("Error in fill_with_data: ", error);
  }

  // Fill in our categories: billable and such
  try {
    const to_fill_keys = Object.keys(to_fill);

    to_fill_keys.forEach(index => {
      const day = to_fill[index];

      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
          code: `
            document.querySelectorAll('.phaseandactivity').forEach(el => {
              if (el.textContent === "Billable hours") {
                el.closest(\'tr\').querySelectorAll(\`input.k-input[tabindex="${index}"]\`)[1].value = "${day["Billable hours"]}";
                el.closest(\'tr\').querySelectorAll(\`input.k-input[tabindex="${index}"]\`)[1].dispatchEvent(new Event("change"));
                el.closest(\'tr\').querySelectorAll(\`input.k-input[tabindex="${index}"]\`)[1].dispatchEvent(new Event("blur"));
              }
              if (el.textContent === "Internal communication") {
                el.closest(\'tr\').querySelectorAll(\`input.k-input[tabindex="${index}"]\`)[1].value = "${day["Internal communication"]}";
                el.closest(\'tr\').querySelectorAll(\`input.k-input[tabindex="${index}"]\`)[1].dispatchEvent(new Event("change"));
                el.closest(\'tr\').querySelectorAll(\`input.k-input[tabindex="${index}"]\`)[1].dispatchEvent(new Event("blur"));
              }
              if (el.textContent === "Business Development") {
                el.closest(\'tr\').querySelectorAll(\`input.k-input[tabindex="${index}"]\`)[1].value = "${day["Business Development"]}";
                el.closest(\'tr\').querySelectorAll(\`input.k-input[tabindex="${index}"]\`)[1].dispatchEvent(new Event("change"));
                el.closest(\'tr\').querySelectorAll(\`input.k-input[tabindex="${index}"]\`)[1].dispatchEvent(new Event("blur"));
              }
              if (el.textContent === "Competence development") {
                el.closest(\'tr\').querySelectorAll(\`input.k-input[tabindex="${index}"]\`)[1].value = "${day["Competence development"]}";
                el.closest(\'tr\').querySelectorAll(\`input.k-input[tabindex="${index}"]\`)[1].dispatchEvent(new Event("change"));
                el.closest(\'tr\').querySelectorAll(\`input.k-input[tabindex="${index}"]\`)[1].dispatchEvent(new Event("blur"));
              }
              if (el.textContent === "DevOps Internt") {
                el.closest(\'tr\').querySelectorAll(\`input.k-input[tabindex="${index}"]\`)[1].value = "${day["DevOps intern"]}";
                el.closest(\'tr\').querySelectorAll(\`input.k-input[tabindex="${index}"]\`)[1].dispatchEvent(new Event("change"));
                el.closest(\'tr\').querySelectorAll(\`input.k-input[tabindex="${index}"]\`)[1].dispatchEvent(new Event("blur"));
              }
              if (el.textContent === "Internal projects") {
                el.closest(\'tr\').querySelectorAll(\`input.k-input[tabindex="${index}"]\`)[1].value = "${day["Internal projects"]}";
                el.closest(\'tr\').querySelectorAll(\`input.k-input[tabindex="${index}"]\`)[1].dispatchEvent(new Event("change"));
                el.closest(\'tr\').querySelectorAll(\`input.k-input[tabindex="${index}"]\`)[1].dispatchEvent(new Event("blur"));
              }
              if (el.textContent === "Malvacom Board") {
                el.closest(\'tr\').querySelectorAll(\`input.k-input[tabindex="${index}"]\`)[1].value = "${day["Malvacom Board"]}";
                el.closest(\'tr\').querySelectorAll(\`input.k-input[tabindex="${index}"]\`)[1].dispatchEvent(new Event("change"));
                el.closest(\'tr\').querySelectorAll(\`input.k-input[tabindex="${index}"]\`)[1].dispatchEvent(new Event("blur"));
              }
              if (el.textContent === "Malvacom Web") {
                el.closest(\'tr\').querySelectorAll(\`input.k-input[tabindex="${index}"]\`)[1].value = "${day["Malvacom Web"]}";
                el.closest(\'tr\').querySelectorAll(\`input.k-input[tabindex="${index}"]\`)[1].dispatchEvent(new Event("change"));
                el.closest(\'tr\').querySelectorAll(\`input.k-input[tabindex="${index}"]\`)[1].dispatchEvent(new Event("blur"));
              }
              if (el.textContent === 'Miljöarbete') {
                el.closest(\'tr\').querySelectorAll(\`input.k-input[tabindex="${index}"]\`)[1].value = "${day["Miljöarbete"]}";
                el.closest(\'tr\').querySelectorAll(\`input.k-input[tabindex="${index}"]\`)[1].dispatchEvent(new Event("change"));
                el.closest(\'tr\').querySelectorAll(\`input.k-input[tabindex="${index}"]\`)[1].dispatchEvent(new Event("blur"));
              }
            });
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

document.getElementById("AutoFillQbis").addEventListener("click", function () {
  copy_value = JSON.parse(getClipboardText())
  fill_qbis_timelog()
});

