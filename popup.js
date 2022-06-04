let injectFile = document.getElementById('inject-file');
let injectFunction = document.getElementById('inject-function');

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}
var myAuthorization = null;


chrome.cookies.get(
  { url: 'https://canmeet.github.io/login/', name: 'Authorization' },
  (res) => {
    //alert(JSON.stringify(res.value));
    myAuthorization = res.value;
  },
)


let tab = null;
getCurrentTab().then((res) => {
  tab = res;
  let tabUrl = JSON.stringify([tab.url]);

  if (tabUrl.substring(2, 26) === 'https://meet.google.com/' && tabUrl.substring(26, 30) !== '"]') {
    // In Google Meet
    // let googleMeetId = tabUrl.substring(26, 39);
    // alert(tabUrl.substring(26, 39));
    chrome.cookies.get(
      { url: 'https://canmeet.github.io/login/', name: 'Authorization' },
      (res) => {

        if (res.value != null) { // logged in
          myAuthorization = res.value;
          window.location.replace("/inMeet/LoggedInIndex.html");


        }
      },
    )
    setTimeout(() => {
      // not login
      if (myAuthorization == null) {
        alert("not login")
      }
    }, 390)



  } else {
    // Not in Google Meet
    alert("false");
    if (myAuthorization === null) {
      // not login

    } else {
      // logged in

    }
  }

})




injectFile.addEventListener('click', async () => {

  // chrome.scripting.executeScript({
  //   target: { tabId: tab.id },
  //   files: ['content-script.js']
  // });


});

function showAlert(givenName) {
  // alert(`Hello, ${givenName} `);


}



injectFunction.addEventListener('click', async () => {
  let tab = await getCurrentTab();
  alert([tab.url])
  let name = 'World';
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: showAlert,
    args: [tab.url]
  });
});





