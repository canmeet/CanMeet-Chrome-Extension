
window.onload = () => {
    setPhoto();
        setContent();
    
};
$(document).ready(function () {
    $("#btn_logo").click(function () {
        window.location.replace("../LoggedInIndex.html");
    });
    $("#btn_QA").click(function () {
        window.open("https://candied-football-f4f.notion.site/Canmeet-Q-A-ba85f0004771463b892949841bebf919");
    });
    $(".firstBtn").click(function () {
        handleSelection(2);
    });
    $(".secondBtn").click(function () {
        handleSelection(3);
    });
    $(".thirdBtn").click(function () {
        handleSelection(4);
    });
    $("#btn_logo").click(function (){
        window.location.replace("../LoggedInIndex.html");
    })
});

// var topicInter;
let timeInter = null;
// var leftTime = 35;

function setPhoto() {
    chrome.cookies.get(
        { url: 'https://canmeet.github.io/login/', name: 'Authorization' },
        (res) => {
            $.ajax('https://canmeet.herokuapp.com/v1/user/info/photo', {
                type: 'GET',  // http method
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

function setContent() {
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
                    $.ajax(`https://canmeet.herokuapp.com/v1/topic/state?meetId=${meetId}`, {
                        type: 'GET',  // http method
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": res.value
                        },

                        success: function (data, status, xhr) {
                            if (data.state == 0) {
                                //非投票階段
                                window.location.replace("./ShowResult.html");
                            } else {
                                //投票階段
                                $('#current_team').text(data.groupName);
                                // document.getElementById("groupNameArea").style.visibility = "visible";
                                if (data.mySelect == 2) {
                                    $(".firstBtn").attr('id', 'darkMenuButton');
                                    $(".secondBtn").attr('id', 'whiteMenuButton');
                                    $(".thirdBtn").attr('id', 'whiteMenuButton');
                                } else if (data.mySelect == 3) {
                                    $(".firstBtn").attr('id', 'whiteMenuButton');
                                    $(".secondBtn").attr('id', 'darkMenuButton');
                                    $(".thirdBtn").attr('id', 'whiteMenuButton');
                                } else if (data.mySelect == 4) {
                                    $(".firstBtn").attr('id', 'whiteMenuButton');
                                    $(".secondBtn").attr('id', 'whiteMenuButton');
                                    $(".thirdBtn").attr('id', 'darkMenuButton');
                                }
                                // console.log(JSON.stringify(data));
                                $('#processState').text(data.votedCount + "/" + data.totalCount);
                                $("#barArea").css("width", data.styleWidth);

                                
                                // let leftTime = Math.sign(MyGetTimeS(data.endTime, getCurrentTime()));
                                // if (leftTime <= 0) {
                                //     clearIm();

                                //     window.location.href("./ShowResult.html");
                                // } else {
                                //     myleftTime = Math.sign(MyGetTimeS(data.endTime, getCurrentTime()));
                                //     topicInter = setInterval(myInter(), 1000);
                                // }
                                if(timeInter == null){
                                    timeInter = setInterval(frame, 1000);
                                }
                                
                                function frame() {
                                    if (Math.sign(MyGetTimeS(data.endTime, getCurrentTime())) <0) {
                                        clearInterval(timeInter);
                                        window.location.replace("./ShowResult.html");
                                    } else {
                                        $("#timeArea").text(MyGetTimeS(data.endTime, getCurrentTime()));
                                        setContent();
                                    }
                                }

                            }
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

var DateInitFromStr = function (inStr) {
    // 这个函数是支持你现在提供的2种数据格式的，包括了'2020-07-08 13:24:27'和'2020-07-01'
    // 对于'2020-07-01'，等效于'2020-07-01 00:00:00.000'
    return (new Date(inStr));

}
var MyGetTimeS = function (inDStr1, inDStr2) {
    let D1 = DateInitFromStr(inDStr1);
    let D2 = DateInitFromStr(inDStr2);
    return ((D1.getTime() - D2.getTime()) / 1000);
}
function getCurrentTime() {
    var date = new Date();//当前时间
    var month = zeroFill(date.getMonth() + 1);//月
    var day = zeroFill(date.getDate());//日
    var hour = zeroFill(date.getHours());//时
    var minute = zeroFill(date.getMinutes());//分
    var second = zeroFill(date.getSeconds());//秒

    //当前时间
    var curTime = date.getFullYear() + "-" + month + "-" + day
        + " " + hour + ":" + minute + ":" + second;

    return curTime;
}

/**
 * 补零
 */
function zeroFill(i) {
    if (i >= 0 && i <= 9) {
        return "0" + i;
    } else {
        return i;
    }
}

function handleSelection(sele){
    getCurrentTab().then((res) => {
        tab = res;
        let tabUrl = JSON.stringify([tab.url]);

        let meetId = tabUrl.substring(26, 38);
        chrome.cookies.get(
            { url: 'https://canmeet.github.io/login/', name: 'Authorization' },
            (res) => {
                if (res.value != null) { // logged in
                    $.ajax(`https://canmeet.herokuapp.com/v1/topic/select?meetId=${meetId}&topicSelect=${sele}`, {
                        type: 'GET',  // http method
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": res.value
                        },

                        success: function (data, status, xhr) {
                            if(data.state!=1){
                                //非投票階段
                                window.location.replace("./showResult.html");
                            }else{
                                //投票階段
                                if (sele == 2) {
                                    $(".firstBtn").attr('id', 'darkMenuButton');
                                    $(".secondBtn").attr('id', 'whiteMenuButton');
                                    $(".thirdBtn").attr('id', 'whiteMenuButton');
                                } else if (sele == 3) {
                                    $(".firstBtn").attr('id', 'whiteMenuButton');
                                    $(".secondBtn").attr('id', 'darkMenuButton');
                                    $(".thirdBtn").attr('id', 'whiteMenuButton');
                                } else if (sele == 4) {
                                    $(".firstBtn").attr('id', 'whiteMenuButton');
                                    $(".secondBtn").attr('id', 'whiteMenuButton');
                                    $(".thirdBtn").attr('id', 'darkMenuButton');
                                }
                               
                            }
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