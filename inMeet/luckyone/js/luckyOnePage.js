
// 網頁載入時設定照片
// window.onload = setPhoto;
// window.onload = setLuckData;
window.onload = ()=>{
    setLuckData();
    setPhoto();
}

// 設定點擊事件
$("#btn_QA").on("click", helpClicked);
$("#refreshButton").on("click", refreshLuckyOne);
$("#btn_logo").on("click", logoclicked);
$("#btn_TopicGenerator").on("click", ()=>{
    window.location.replace("/inMeet/topic/ShowResult.html");
});
$("#btn_OrderGenerator").on("click", logoclicked);
$("#btn_userprofile").on("click", avatarclicked);




function logoclicked() {
    console.log("logo got clicked!");
    window.location.replace("/inMeet/LoggedInIndex.html");
}

// avatarclicked：點擊後進到個人資料編輯界面
function avatarclicked() {
    window.location.href="https://canmeet.github.io/edit_profile/";  
    window.open("https://canmeet.github.io/edit_profile/");
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



function setLuckData() {

    getCurrentTab().then((res) => {
        tab = res;
        let tabUrl = JSON.stringify([tab.url]);
        let meetId = tabUrl.substring(26, 38);
        console.log(meetId);


        // let test_authorization = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmNAYS5jb20iLCJlbWFpbCI6ImFiY0BhLmNvbSIsImlhdCI6MTY1NDQyOTUxMX0.2oHg_B3uakU-aOsIe4BUaPEP_Gq55bJP_ZiUCK02mU4";
        // let test_meetID = "213as";

        chrome.cookies.get(
            { url: 'https://canmeet.github.io/login/', name: 'Authorization' },
            (res) => {


                // 透過ajax向指定的api url發起request
                $.ajax(`https://canmeet.herokuapp.com/v1/meet/lucky?meetId=${meetId}`, {
                    type: 'GET',  // http method
                    // dataType: "json",
                    // data: JSON.stringify({  }),
                    headers: {
                        "Authorization": res.value
                    },

                    success: function (data, status, xhr) {
                        // 將id=luckuser的物件的src改成接收到的圖片位置
                        $('#luckyuser').attr('src', data.luckyUser.photo);
                        $('#userid').html(data.luckyUser.name);
                        $('#refresh_hint').html(data.generateTime + "&nbsp<b>" + data.generatorName + "</b>&nbsp" + "重新產生了幸運兒");
                        $('#current_team').text(data.groupName);
                    },
                    error: function (e) {
                        console.log(JSON.stringify(e))
                    }
                });

            },
        )
    })

}


function refreshLuckyOne() {

    getCurrentTab().then((res) => {
        tab = res;
        let tabUrl = JSON.stringify([tab.url]);
        let meetId =tabUrl.substring(26, 38);
        console.log(meetId);


        // let test_authorization = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmNAYS5jb20iLCJlbWFpbCI6ImFiY0BhLmNvbSIsImlhdCI6MTY1NDQyOTUxMX0.2oHg_B3uakU-aOsIe4BUaPEP_Gq55bJP_ZiUCK02mU4";
        // let test_meetID = "213as";

        chrome.cookies.get(
            { url: 'https://canmeet.github.io/login/', name: 'Authorization' },
            (res) => {
                
                
                // 透過ajax向指定的api url發起request
                $.ajax(`https://canmeet.herokuapp.com/v1/meet/lucky/draw?meetId=${meetId}`, {
                    type: 'GET',  // http method
                    // dataType: "json",
                    // data: JSON.stringify({  }),
                    headers: {
                        "Authorization": res.value
                    },
    
                    success: function (data, status, xhr) {
                        // 將id=luckuser的物件的src改成接收到的圖片位置
                        $('#luckyuser').attr('src', data.luckyUser.photo);
                        $('#userid').html(data.luckyUser.name);
                        $('#refresh_hint').html(data.generateTime+"&nbsp<b>"+data.generatorName+"</b>&nbsp"+"重新產生了幸運兒");
                    },
                    error: function (e) {
                        console.log(JSON.stringify(e))
                    }
                });
    
            },
        )
    })

}