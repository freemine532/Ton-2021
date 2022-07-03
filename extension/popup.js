// Initialize button with user's preferred color
// let changeColor = document.getElementById("changeColor");
//
// chrome.storage.sync.get("color", ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (document.getElementById("changeColor").innerText !='Done'){
    chrome.storage.sync.get(() => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackgroundColor,
      });
      document.getElementById("changeColor").innerText = 'Done';
    });
  }else {
    chrome.storage.sync.get(() => {
      document.getElementById("changeColor").innerText = 'Find HRAs';
    });
  }
});


function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}