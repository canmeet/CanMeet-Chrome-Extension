
window.onload = () => {
    window.clearInterval();
    window.clearTimeout();
    setPhoto();
    setContent();
}

$(document).ready(function () {
    $("#regenBtn").click(function () {
        regenClicked();
    });
    $("#btn_logo").click(function () {
        window.location.replace("../LoggedInIndex.html");
    });
    $("#btn_QA").click(function () {
        window.open("https://candied-football-f4f.notion.site/Canmeet-Q-A-ba85f0004771463b892949841bebf919");
    });
    $("#changeQuesBtn").click(function () {
        handleChangeQues();
    });
});

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
                            if (data.state == 1) {
                                //投票階段
                                window.location.replace("./Vote.html");
                            } else {
                                //非投票階段
                                $('#current_team').text(data.groupName);
                                $('#mainTopic').text(data.mainTopic);
                                $('.detailQues1').text(data.detail1);
                                $('.detailQues2').text(data.detail2);
                                $('#regenerate_hint').html(data.lastClickedTime.substring(0, 19) + "&nbsp<b>" + data.lastClickedUserName + "</b>&nbsp" + "重新產生了話題");
                                if (data.lastChangeQuestionName !== '系統') {
                                    $('#change_question_hint').html(data.lastChangeQuestionTime.substring(0, 19) + "&nbsp<b>" + data.lastChangeQuestionName + "</b>&nbsp" + "換了一題");
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

function regenClicked() {
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
                    $.ajax(`https://canmeet.herokuapp.com/v1/topic/regenerate?meetId=${meetId}`, {
                        type: 'GET',  // http method
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": res.value
                        },

                        success: function (data, status, xhr) {
                            if (data.resultCode == 1) {
                                //投票階段
                                window.location.replace("./Vote.html");
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

function handleChangeQues() {
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
                    $.ajax(`https://canmeet.herokuapp.com/v1/topic/change-question?meetId=${meetId}`, {
                        type: 'GET',  // http method
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": res.value
                        },

                        success: function (data, status, xhr) {
                            if (data.resultCode == 1) {
                                $('#mainTopic').text(data.mainTopic);
                                $('.detailQues1').text(data.detail1);
                                $('.detailQues2').text(data.detail2);
                                if (data.lastChangeQuestionName !== '系統') {
                                    $('#change_question_hint').html(data.lastChangeQuestionTime.substring(0, 19) + "&nbsp<b>" + data.lastChangeQuestionName + "</b>&nbsp" + "換了一題");
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