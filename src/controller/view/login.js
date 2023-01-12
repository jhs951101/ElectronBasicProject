const axios = require('axios');

const get = async (originalUrl, data) => {
    var result = null;

    var url = originalUrl;
    var first = true;

    for(var key in data){
        var conn = '&';

        if (first){
            conn = '?';
        }

        url += (conn + key + "=" + data[key]);
        first = false;
    }

    const response = await axios.get(url);

    if(response.status == 200){
        result = response.data;
    }

    return result;
};

const post = async (originalUrl, data) => {
    var result = null;

    const response = await axios.post(
        originalUrl,
        JSON.stringify(data),
        { headers: { 'Content-Type': 'application/json'} }
        );

    if(response.status == 200){
        result = response.data;
    }

    return result;
};

const setParamsToUrl = (url, params) => {
    var result = url;
    var first = true;

    if(params != null){
        for(var key in params){
            var ch = '';

            if(first){
                ch = "?";
                first = false;
            }
            else{
                ch = "&";
            }

            result += (ch + key + "=" + encodeURI(encodeURI(params[key]), 'UTF-8'));
        }
    }

    return result;
};

var usernameTbox = document.getElementById('usernameTbox');
var passwordTbox = document.getElementById('passwordTbox');
var loginBtn = document.getElementById('loginBtn');
var signupBtn = document.getElementById('signupBtn');

loginBtn.addEventListener('click', async function(){

    const username = usernameTbox.value;
    const password = passwordTbox.value;

    if(!username){
        alert('아이디를 입력하십시오.');
    }
    else if(!password){
        alert('비밀번호를 입력하십시오.');
    }
    else {
        const response = await post(
            'https://tails1101.cafe24.com/test/signin_post_json.php',
            {
                username: username,
                password: password,
            }
        );

        if(response == null){
            alert('통신 중 오류가 발생하였습니다');
        }
        else{
            if(response.success){
                const userinfo = {
                    username: username,
                    name: response.name,
                };

                location.href = setParamsToUrl('userinfo.html', userinfo);
            }
            else{
                alert('아이디 또는 비밀번호가 일치하지 않습니다');
            }
        }
    }
});

signupBtn.addEventListener('click', async function(){
    //location.href = setParamsToUrl('signup.html', null);
});