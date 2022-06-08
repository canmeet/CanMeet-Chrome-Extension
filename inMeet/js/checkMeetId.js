window.onload = queryMeetId;

async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }

function queryMeetId() {

    getCurrentTab().then((res) => {
        tab = res;
        let tabUrl = JSON.stringify([tab.url]);


        // In Google Meet
        // let googleMeetId = tabUrl.substring(26, 39);
        // alert(tabUrl.substring(26, 39));
        let meetId =tabUrl.substring(26, 38);
        chrome.cookies.get(
            { url: 'https://canmeet.github.io/login/', name: 'Authorization' },
            (res) => {

                if (res.value != null) { // logged in

                    // window.location.replace("/inMeet/LoggedInIndex.html");
                    // window.location.replace("/inMeet/CheckMeetId.html");
                    $.ajax(`https://canmeet.herokuapp.com/v1/meet/check?meetId=${meetId}`, {
                        type: 'GET',  // http method
                        // dataType: "json",
                        // data: JSON.stringify({"meetId": tabUrl.substring(26, 39) }),
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": res.value
                        },

                        success: function (data, status, xhr) {
                            // alert(JSON.stringify(data.photoUrl))
                            window.location.replace("./LoggedInIndex.html");
                            $('#showRes').html( JSON.stringify(data));
                        },
                        error: function (e) {
                            // $('#myid').html('登入失敗, Status Code: ' + e.status + ', data: ' + JSON.stringify(e.responseJSON));
                            console.log(JSON.stringify(e))
                            
                            if(e.status==404){
                                // 小組尚未創建，詢問是否創建並加入小組
                                window.location.replace("./AskJoinGroup.html");
                                $('#showRes').html( "Erroe!!! " + JSON.stringify(e));

                            } else if(e.status == 401){
                                // 會議ID對應的小組已經被創建，詢問是否加入小組
                                window.location.replace("./AskJoinGroup.html");
                                $('#showRes').html( "Erroe!!! " + JSON.stringify(e));

                            }
                        }
                    });


                }
            },
        )
    })

}