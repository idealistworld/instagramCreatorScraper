function getAccounts() {
  var hrefList = document.querySelectorAll(".x1i10hfl");
  var listToImport = [];
  for (var x = 0; x < hrefList.length; x++) {
    listToImport.push(hrefList[x].getAttribute("href"));
  }

  // Convert /p/ URLs to full links
  var convertedList = listToImport.map(url => {
    if (url.startsWith("/p/")) {
      return `https://www.instagram.com${url}`;
    }
    return url;
  });

  chrome.storage.local.set({ "urlList": convertedList }).then(() => {
    alert(listToImport.length + " links imported.");
  });
}

function clearAccounts() {
  chrome.storage.local.set({ "urlList": [] }).then(() => {
    alert("Content cleared.");
  });
}

function downloadContent(fileName = 'link_list.csv') {
  chrome.storage.local.get(["urlList"], (result) => {
    var filteredList = result.urlList.filter(url => url.includes("instagram.com"));
    var csvPayload = filteredList.join('\n');
    const blob = new Blob([csvPayload], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', fileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
}

function prependDivWithButton() {
  var keypad1 = document.createElement("div");
  keypad1.innerHTML = "<style> @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200;0,6..12,300;0,6..12,400;0,6..12,500;0,6..12,600;0,6..12,700;0,6..12,800;1,6..12,200;1,6..12,300;1,6..12,400;1,6..12,500;1,6..12,600;1,6..12,700;1,6..12,800&display=swap'); .page-insert {background-color: black !important; font-family: 'Nunito Sans', sans-serif !important; margin-top: 100px; height: 250px; display: flex; flex-direction: column; align-items: center; justify-content: center;} button {background-color: white; color: black; font-weight: 900; border-radius: 20px;} input {background-color: black; color: white; border-radius: 20px}</style><div class='page-insert'><div><button id='data-rip'>Get Page Data</button><button id='clear-content'>Clear Content</button><button id='download-content'>Download Content</button></div></div>";
  document.body.prepend(keypad1);
  document.getElementById("data-rip").addEventListener("click", getAccounts);
  document.getElementById("clear-content").addEventListener("click", clearAccounts);
  document.getElementById("download-content").addEventListener("click", downloadContent);
}

prependDivWithButton();