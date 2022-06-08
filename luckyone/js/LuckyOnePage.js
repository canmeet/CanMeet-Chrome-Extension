// window.onload = setPhoto;
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

// 設定事件
//$("#refreshButton").on("click", refreshLuckyOne);

async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

function refreshLuckyOne() {

    let currentURL = $(location).attr('href');
    let meetID =currentURL.split("/")[3];
    console.log(meetID);

    let test_authorization = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmNAYS5jb20iLCJlbWFpbCI6ImFiY0BhLmNvbSIsImlhdCI6MTY1NDQyOTUxMX0.2oHg_B3uakU-aOsIe4BUaPEP_Gq55bJP_ZiUCK02mU4";
    let test_meetID = "213as";

    chrome.cookies.get(
        { url: 'https://canmeet.github.io/login/', name: 'Authorization' },
        (res) => {
            
            
            // 透過ajax向指定的api url發起request
            $.ajax(`https://canmeet.herokuapp.com/v1/meet/lucky?meetId=${test_meetID}`, {
                type: 'GET',  // http method
                // dataType: "json",
                // data: JSON.stringify({  }),
                headers: {
                    "Authorization": test_meetID
                },

                success: function (data, status, xhr) {
                    // 將id=luckuser的物件的src改成接收到的圖片位置
                    $('#luckyuser').attr('src', data.luckyUser.photo);
                },
                error: function (e) {
                    console.log(JSON.stringify(e))
                }
            });

        },
    )


}


function refreshLuckyOne() {

    getCurrentTab().then((res) => {
        let currentURL = $(location).attr('href');
        let meetID =currentURL.split("/")[3];
        console.log(meetID);

        let test_authorization = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmNAYS5jb20iLCJlbWFpbCI6ImFiY0BhLmNvbSIsImlhdCI6MTY1NDQyOTUxMX0.2oHg_B3uakU-aOsIe4BUaPEP_Gq55bJP_ZiUCK02mU4";
        let test_meetID = "213as";

        chrome.cookies.get(
            { url: 'https://canmeet.github.io/login/', name: 'Authorization' },
            (res) => {
                
                
                // 透過ajax向指定的api url發起request
                $.ajax(`https://canmeet.herokuapp.com/v1/meet/lucky?meetId=${test_meetID}`, {
                    type: 'GET',  // http method
                    // dataType: "json",
                    // data: JSON.stringify({  }),
                    headers: {
                        "Authorization": test_meetID
                    },
    
                    success: function (data, status, xhr) {
                        // 將id=luckuser的物件的src改成接收到的圖片位置
                        $('#luckyuser').attr('src', data.luckyUser.photo);
                    },
                    error: function (e) {
                        console.log(JSON.stringify(e))
                    }
                });
    
            },
        )
    })


}