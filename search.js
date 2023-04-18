
function search(){
    var word = document.getElementById('search-word').value;
    if(!word){
      alert('入力してください');
    }else{
      location.href="./search.html?word="+word;
    }
  }
//**window onload */
      var query = location.search;
      var value = query.split('=');
      var word = decodeURIComponent(value[1]);
const username = localStorage.getItem('username');
const password = localStorage.getItem('password');
const role = localStorage.getItem('role');
if(!username||!password||!role){
  location.href="./login.html";
}
document.getElementById('username').innerText = username;
const userinfo = JSON.stringify({'username':username,'password':password,'role':role});
const url = "https://script.google.com/macros/s/AKfycbxvS9JmRMQXRle4fh_tbYzd3_nOwVRadU2Ab0lj23sBtJkChT38rnqpMIDqVjgmN18S/exec";
var surl =url+'?page=search&userinfo='+userinfo+'&word='+word;
  console.log(surl);
  fetch(surl , {
method: "GET",
}).then(response => response.text())
.then(text => {
    console.log(text);
    if(text=='["notfound"]'){
        alert('該当書誌なし');
    }else{
var res = JSON.parse(text);
console.log(res);
var lend = document.getElementById("search-div");
var lendp = document.getElementById('search-p');
for(i=0;i<res.length;i++){

let content = document.createElement('div');
let title = document.createElement('p');
let contributer = document.createElement('p');
let deadline = document.createElement('p');

content.classList.add('content');
title.classList.add('title');
contributer.classList.add('contributer');
deadline.classList.add('deadline');

title.id= res[i][3];

title.innerText = res[i][0];
contributer.innerText = res[i][1];
deadline.innerText = res[i][4];

title.setAttribute('onclick', 'book(this.id)');

content.appendChild(title);
content.appendChild(contributer);
content.appendChild(deadline);
lend.appendChild(content);
}
lendp.innerHTML='検索結果'+res.length+'冊';
document.getElementById('search-word').value=word;
    }
})
function book(isbn){
    location.href = "./bookinfo.html?isbn="+isbn;
  }