const getParamsFromUrl = (url) => {
    var result = {};
    const pm = unescape(url).split('?');
    const params = pm[1].split('&');

    for(var i=0; i<params.length; i++){
        var param = params[i].split('=');
        var key = param[0];
        var value = param[1];

        result[key] = value;
    }

    return result;
};

var welcomeLbl = document.getElementById('welcomeLbl');
var signoutBtn = document.getElementById('signoutBtn');

window.onload = function(){
    const params = getParamsFromUrl(location.href);
    var username = decodeURI(params['username'], 'UTF-8');
    var name = decodeURI(params['name'], 'UTF-8');

    welcomeLbl.innerHTML = name + '(' + username + ')님 환영합니다!';
};

signoutBtn.addEventListener('click', async function(){
    history.back();
});