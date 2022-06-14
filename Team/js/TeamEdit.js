
// 網頁載入時設定照片
window.onload = setPhoto;


// 設定點擊事件
$("#btn_QA").on("click", helpClicked);
$("#refreshButton").on("click", refreshLuckyOne);
$("#btn_logo").on("click", logoclicked);
$("#btn_TopicGenerator").on("click", logoclicked);
$("#btn_OrderGenerator").on("click", logoclicked);
$("#btn_LuckyOneGenerator").on("click", luckyoneclicked);
$("#btn_userprofile").on("click", avatarclicked);
$(".btn_deletemember").on("click", deletemember);
$("#btn_canceled").on("click", backtoteamlist);




function logoclicked() {
    console.log("logo got clicked!");
    window.location.replace("/inMeet/LoggedInIndex.html");  
}

// avatarclicked：點擊後進到個人資料編輯界面
function avatarclicked() {
    window.location.href="https://github.com/canmeet/canmeet.github.io/tree/main/edit_profile/edit_profile.html";  
    window.open("https://github.com/canmeet/canmeet.github.io/tree/main/edit_profile/edit_profile.html");
}

// luckyoneclicked：點擊後進到幸運兒界面
function luckyoneclicked() {
    window.location.replace("/luckyone/LuckyOnePage.html");  
}

// backtoteamlist：點擊後回到小組列表
function backtoteamlist() {
    window.location.replace("/luckyone/LuckyOnePage.html");    // 待修改
}

function helpClicked() {
    window.location.href="https://candied-football-f4f.notion.site/Canmeet-Q-A-ba85f0004771463b892949841bebf919";  
    window.open("https://candied-football-f4f.notion.site/Canmeet-Q-A-ba85f0004771463b892949841bebf919");
}

async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}


// setPhoto：設置小組編輯頁面被打開時應該要設定好的內容
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


    let test_token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYWNrQGFiYy5jb20iLCJlbWFpbCI6ImphY2tAYWJjLmNvbSIsImlhdCI6MTY1NDk3MTA1N30.y6m32iGO2WGE1O8BCtU_l65DZN42FqdXbtsDhwnIrYg";
    let test_groupID = "crg-edsg-cye";
    
    chrome.cookies.get(
        { url: 'https://canmeet.github.io/login/', name: 'Authorization' },
        (res) => {
            //alert(JSON.stringify(res.value));
            // myAuthorization = res.value;

            $.ajax(`https://canmeet.herokuapp.com/v1/group/info?meetId=${test_groupID}`, {
                type: 'GET',  // http method
                // dataType: "json",
                // data: JSON.stringify({  }),
                headers: {
                    "Content-Type": "application/json",
                    //"Authorization": res.value
                    "Authorization": test_token
                },

                success: function (data, status, xhr) {
                    // alert(JSON.stringify(data.photoUrl))
                    $('#GroupName').attr('value', data.groupId);
                    $('#MeetID').attr('value', data.meetId);
                    
                    for (var i = 0; i < data.memberAmount; i++){
                        console.log(data.photoArray[i]);
                        var member_object=`<div class='member'><button class='btn_deletemember'><img src='/luckyone/img/cross.png' class='img_deletemember' alt='' style='width: 15px;height: 15px;'></button><img src='${data.photoArray[i]}' class='userphoto' ></div>`;
                        
                        $("div#memberlist").append(member_object);
                    }
                },  
                error: function (e) {
                    // $('#myid').html('登入失敗, Status Code: ' + e.status + ', data: ' + JSON.stringify(e.responseJSON));
                    console.log(JSON.stringify(e))
                }
            });

        },
    )



}

// 攔截表單
$("form").submit( function (e){
    console.log("submit");
});




// deletemember：刪除使用者
function deletemember() {
    $(this).parent().remove();

}