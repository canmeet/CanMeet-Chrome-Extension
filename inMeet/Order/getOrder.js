
// 網頁載入時設定照片
// window.onload = setPhoto;
// window.onload = setLuckData;
window.onload = ()=>{
    setOrderData();
    setPhoto();
    setGroupName();
}

// 設定點擊事件
$("#btn_QA").on("click", helpClicked);
$("#refreshButton").on("click", refreshOrder);
$("#btn_logo").on("click", logoclicked);
$("#btn_TopicGenerator").on("click", ()=>{
    window.location.replace("../topic/ShowResult.html");
});
$("#btn_LuckyOneGenerator").on("click", luckyoneclicked);
$("#btn_userprofile").on("click", avatarclicked);
$("#current_team").on("click", ()=>{
    window.location.replace("../../teamlist/teamlist.html");
});




function logoclicked() {
    console.log("logo got clicked!");
    window.location.replace("../LoggedInIndex.html");
}

// avatarclicked：點擊後進到個人資料編輯界面
function avatarclicked() {
    window.location.href="https://github.com/canmeet/canmeet.github.io/tree/main/edit_profile/edit_profile.html";  
    window.open("https://github.com/canmeet/canmeet.github.io/tree/main/edit_profile/edit_profile.html");
}

// luckyoneclicked：點擊後進到幸運兒界面
function luckyoneclicked() {
    window.location.replace("../luckyone/LuckyOnePage.html");  
}

function helpClicked() {
    window.location.href = "https://candied-football-f4f.notion.site/Canmeet-Q-A-ba85f0004771463b892949841bebf919";
    window.open("https://candied-football-f4f.notion.site/Canmeet-Q-A-ba85f0004771463b892949841bebf919");
}

async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}


// setPhoto：設定個人照片
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
                    $('#myPhoto').attr('src', data.photoUrl);
                },
                error: function (e) {
                    // $('#myid').html('登入失敗, Status Code: ' + e.status + ', data: ' + JSON.stringify(e.responseJSON));
                    console.log(JSON.stringify(e))
                }
            });

        },
    )
}



function setOrderData() {

    getCurrentTab().then((res) => {
        tab = res;
        let tabUrl = JSON.stringify([tab.url]);
        let meetId = tabUrl.substring(26, 38);


        //let test_authorization = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGExLmNvbSIsImVtYWlsIjoidGVzdEBhMS5jb20iLCJpYXQiOjE2NTQ0NTIyODd9.-nqPvT8c06MlBJTtkSi-PSsn9GHK8LXo4dYG_OHTC1w";
        //let test_meetID = "waa-kdtd-jbh";

        chrome.cookies.get(
            { url: 'https://canmeet.github.io/login/', name: 'Authorization' },
            (res) => {


                // 透過ajax向指定的api url發起request
                $.ajax(`https://canmeet.herokuapp.com/v1/meet/order?meetId=${meetId}`, {
                    type: 'GET',  // http method
                    // dataType: "json",
                    // data: JSON.stringify({  }),
                    headers: {
                        "Authorization": res.value
                        //"Authorization": test_authorization
                    },

                    success: function (data, status, xhr) {
                        // 將id=luckuser的物件的src改成接收到的圖片位置

                        console.log(typeof data.recordAmount);
                        console.log(data.recordAmount);

                        for (var i = 0; i < data.recordAmount; i++){
                            console.log(data.order[i].photo);
                            console.log(data.order[i].name);
                            var member_object=`<div class="member" id="member${i}"><img src="${data.order[i].photo}" class="userphoto" id="userphoto${i}"><p class="userid" id="userid${i}" style=" display: flex; justify-content: center;">${data.order[i].name}</p></div>`;
                            
                            $("div#memberlist").append(member_object);
                        }

                        $('#refresh_hint').html(data.generateTime.substring(0,10) + " " + data.generateTime.substring(11,19) +"&nbsp<b>"+data.generatorName+"</b>&nbsp"+"重新產生了順序");
                        
                    },
                    error: function (e) {
                        console.log(JSON.stringify(e))
                    }
                });

            },
        )
    })

}


// refreshOrder: 刷新順序

function refreshOrder() {
    console.log("refresh order button got clicked!");

    getCurrentTab().then((res) => {
        tab = res;
        let tabUrl = JSON.stringify([tab.url]);
        let meetId =tabUrl.substring(26, 38);
        console.log(meetId);


        //let test_authorization = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGExLmNvbSIsImVtYWlsIjoidGVzdEBhMS5jb20iLCJpYXQiOjE2NTQ0NTIyODd9.-nqPvT8c06MlBJTtkSi-PSsn9GHK8LXo4dYG_OHTC1w";
        //let test_meetID = "waa-kdtd-jbh";

        chrome.cookies.get(
            { url: 'https://canmeet.github.io/login/', name: 'Authorization' },
            (res) => {
                
                
                // 透過ajax向指定的api url發起request
                $.ajax(`https://canmeet.herokuapp.com/v1/meet/order/draw?meetId=${meetId}`, {
                    type: 'GET',  // http method
                    // dataType: "json",
                    // data: JSON.stringify({  }),
                    headers: {
                        "Authorization": res.value
                        //"Authorization": test_authorization
                    },
                    success: function (data, status, xhr) {
   
                        
                        //console.log("refresh successed!");
                        console.log(data.generateTime);
                        console.log(data.generatorName);
                        console.log(data.description);
                        console.log(data.recordAmount);

                        for (var i = 0; i < data.recordAmount; i++){
                            console.log(data.order[i].photo);
                            console.log(data.order[i].name);

                            
                            $("#userphoto"+i).attr('src', data.order[i].photo);
                            $("#userid"+i).text(data.order[i].name);
                        }

                        $('#refresh_hint').html(data.generateTime.substring(0,10) + " " + data.generateTime.substring(11,19)+"&nbsp<b>"+data.generatorName+"</b>&nbsp"+"重新產生了順序");
                    },
                    error: function (e) {
                        console.log(JSON.stringify(e))
                    }
                });
    
            },
        )
    })

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