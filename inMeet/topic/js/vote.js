
window.onload = setPhoto;
$(document).ready(function() {
    $(".firstBtn").click(function(){
        alert("美食");
    }); 
    $(".secondBtn").click(function(){
        window.location.replace("./ShowResult.html");
    }); 
    $(".thirdBtn").click(function(){
        alert("3");
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
