window.onload = ()=>{
    setPhoto();
    setGroupName();
}
$("#topicBtn").on("click", topicClicked);
$('#luckyBtn').on("click", luckyClicked);
$("#btn_QA").on("click", helpClicked);
function setPhoto() {


    chrome.cookies.get(
        { url: 'https://canmeet.github.io/login/', name: 'Authorization' },
        (res) => {
            //alert(JSON.stringify(res.value));
            // myAuthorization = res.value;

            $.ajax('https://canmeet.herokuapp.com/v1/user/info/photo', {
                type: 'GET',  // http method
                // dataType: "json",
                // data: JSON.stringify({  }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": res.value
                },

                success: function (data, status, xhr) {
                    // alert(JSON.stringify(data.photoUrl))
                    $('#myPhoto').attr('src',data.photoUrl);
                },
                error: function (e) {
                    // $('#myid').html('登入失敗, Status Code: ' + e.status + ', data: ' + JSON.stringify(e.responseJSON));
                    console.log(JSON.stringify(e))
                }
            });

        },
    )

    
}

async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}


function setGroupName() {
    getCurrentTab().then((res) => {
        tab = res;
        let tabUrl = JSON.stringify([tab.url]);


        // In Google Meet
        // let googleMeetId = tabUrl.substring(26, 39);
        // alert(tabUrl.substring(26, 39));
        let meetId = tabUrl.substring(26, 38);
        chrome.cookies.get(
            { url: 'https://canmeet.github.io/login/', name: 'Authorization' },
            (res) => {

                if (res.value != null) { // logged in

                    // window.location.replace("/inMeet/LoggedInIndex.html");
                    // window.location.replace("/inMeet/CheckMeetId.html");
                    $.ajax(`https://canmeet.herokuapp.com/v1/meet/group-name?meetId=${meetId}`, {
                        type: 'GET',  // http method
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": res.value
                        },

                        success: function (data, status, xhr) {
                            $('#current_team').text(data.groupName);
                            document.getElementById("groupNameArea").style.visibility="visible";
                        },
                        error: function (e) {
                            // $('#myid').html('登入失敗, Status Code: ' + e.status + ', data: ' + JSON.stringify(e.responseJSON));
                            console.log(JSON.stringify(e))

                        }
                    });


                }
            },
        )
    })

}

function topicClicked(){
    window.location.replace("./topic/Vote.html");
}

function luckyClicked() {
    window.location.replace("./luckyone/LuckyOnePage.html");
}

function helpClicked() {
    window.location.href = "https://candied-football-f4f.notion.site/Canmeet-Q-A-ba85f0004771463b892949841bebf919";
    window.open("https://candied-football-f4f.notion.site/Canmeet-Q-A-ba85f0004771463b892949841bebf919");
}