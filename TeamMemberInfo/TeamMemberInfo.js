window.onload = () => {
    setPhoto();
    setGroupName();
    setInfoContent();
}
$("#btn_QA").on("click", helpClicked);
$("#btn_logo").on("click", logoclicked);
$("#TopicGenerator").on("click", ()=>{
    window.location.replace("../inMeet/topic/ShowResult.html");  
});
$("#OrderGenerator").on("click", ()=>{
    window.location.replace("../inMeet/Order/getOrder.html"); 
});
$("#LuckyOneGenerator").on("click", luckyoneclicked);
$("#btn_userprofile").on("click", avatarclicked);

$("#GobackDiv").on("click", () => {
    window.location.replace("../teamlist/teamlist.html");
});
$("#myGroup").on("click", () => {
    window.location.replace("../teamlist/teamlist.html");
});
$("#myPhoto").on("click", () => {
    window.location.href = "https://canmeet.github.io/edit_profile/";
    window.open("https://canmeet.github.io/edit_profile/");
});
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
                            // $('#current_team').text(data.groupName);
                            // document.getElementById("groupNameArea").style.visibility="visible";
                            $('#GroupNameAndID').text(data.groupName + " | " + data.meetId);
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




function logoclicked() {
    console.log("logo got clicked!");
    window.location.replace("../inMeet/LoggedInIndex.html");  
}

// avatarclicked：點擊後進到個人資料編輯界面
function avatarclicked() {
    window.location.href="https://github.com/canmeet/canmeet.github.io/tree/main/edit_profile/edit_profile.html";  
    window.open("https://github.com/canmeet/canmeet.github.io/tree/main/edit_profile/edit_profile.html");
}

// luckyoneclicked：點擊後進到幸運兒界面
function luckyoneclicked() {
    window.location.replace("../inMeet/luckyone/LuckyOnePage.html");  
}

// backtoteamlist：點擊後回到小組列表
function backtoteamlist() {
    window.location.replace("../teamlist/teamlist.html");    // 待修改
}

function helpClicked() {
    window.location.href="https://candied-football-f4f.notion.site/Canmeet-Q-A-ba85f0004771463b892949841bebf919";  
    window.open("https://candied-football-f4f.notion.site/Canmeet-Q-A-ba85f0004771463b892949841bebf919");
}


function setInfoContent() {
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
                    $.ajax(`https://canmeet.herokuapp.com/v1/group/individuals?meetId=${meetId}`, {
                        type: 'GET',  // http method
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": res.value
                        },

                        success: function (data, status, xhr) {
                            // $('#current_team').text(data.groupName);
                            // document.getElementById("groupNameArea").style.visibility="visible";
                            let boxCode = '';
                            for (i = 0; i < data.recordCount; i++) {
                                let singleBox = '';
                                singleBox = `
                                <div class="row row-cols-auto" style="margin-right: 10;">
                                    <div class="col" style="width: 30;">
                                    <div>
                                        <img src="${data.usersResult[i][1]}"
                                            id="MemberPic">
                                    </div>
                                </div>

                                <div class="col">
                                    <div id="singleName">${data.usersResult[i][0]}</div>
                                </div>
                                ${(data.usersResult[i][2]==null)?(`<div></div>`):(`<div id="singleBox">${data.usersResult[i][2]}</div>`)}
                                ${(data.usersResult[i][3]==null)?(`<div></div>`):(`<div id="singleBox">${data.usersResult[i][3]}</div>`)}
                                ${(data.usersResult[i][4]==null)?(`<div></div>`):(`<div id="singleBox">${data.usersResult[i][4]}</div>`)}
                                ${(data.usersResult[i][5]==null)?(`<div></div>`):(`<div id="singleBox">${data.usersResult[i][5]}</div>`)}
                                ${(data.usersResult[i][6]==null)?(`<div></div>`):(`<div id="singleBox">${data.usersResult[i][6]}</div>`)}
                                

                                </div>
                `
                                boxCode = boxCode + singleBox;
                            }
                            $('#IndividualsArea').html(boxCode);

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