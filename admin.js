
const username = localStorage.getItem('username');
const password = localStorage.getItem('password');
const mastername = localStorage.getItem('master-name');
const masterpass = localStorage.getItem('master-pas');
const role = localStorage.getItem('role');
if(!username||!password||!role||!mastername||!masterpass){
  location.href="./login.html";
}
document.getElementById('username').innerText = username;

function modal(func){
    document.getElementById("confArea").className = "modalBg2";
    document.getElementById('label').innerHTML = "ユーザー名の入力方法";
    document.getElementById('select').id= func;
}
function load(func){
    document.getElementById("confArea").className = "modalBg2 modalBgClose2";
    var val = document.getElementById(func).value;
    console.log(val);
    if(val=="cam"){
    document.getElementById('interactive').classList.add("center");
    document.getElementById("modalArea").className = "modalBg";
Quagga.init({
inputStream: { type : 'LiveStream' },
  decoder: {
    readers: [{
      format: 'ean_reader',
      config: {}
    }]
  }
}, (err) => {
  if(!err) {
    Quagga.start();
  }
});

Quagga.onDetected((result) => {
var code = result.codeResult.code;
if(code[0]==2&&code.length==13||code[0]==3&&code.length==13){
document.getElementById("modalArea").className = "modalNoDisp";
Quagga.stop();
if(func=="borrowf"){
  var usercode = Math.floor(code/10);
  location.href="./lend.html?user="+usercode;
}else if(func=="backf"){
  alert("現在利用できません");
}
}else{}
});
    }else if(val=="hum"){
        var usercode = prompt("ユーザーコードを入力してください","");
        if(!usercode){
            alert("入力してください");
        }else{
        if(func=="borrowf"){
          location.href="./lend.html?user="+usercode;
        }else if(func=="backf"){
          alert('現在利用できません');
        }
    }
    }
}