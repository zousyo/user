      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');
      const role = localStorage.getItem('role');
      var query = location.search;
      var value = query.split('=');
      var data = decodeURIComponent(value[1]);
      if(!username||!password||!role){
        location.href="./login.html";
      }
      const userinfo = JSON.stringify({'username':username,'password':password,'role':role});
  const url = "https://script.google.com/macros/s/AKfycbxvS9JmRMQXRle4fh_tbYzd3_nOwVRadU2Ab0lj23sBtJkChT38rnqpMIDqVjgmN18S/exec";
  var furl =url+'?page=getbookinfo&userinfo='+userinfo+'&isbn='+data;
        console.log(furl);
        fetch(furl , {
  method: "GET",
}).then(response => response.text())
.then(text => {
    console.log(text);
    var array = JSON.parse(text)[0];
    document.getElementById('title').innerText=array[1];
    document.getElementById('detail').innerText=array[6];
    document.getElementById('auter').innerText=array[2];
    document.getElementById('categorie').innerText=array[4];
    document.getElementById('pdate').innerText=array[5];
    document.getElementById('url').innerText=array[7];
    document.getElementById('isbn').innerText=array[0];
    document.getElementById('rent').innerText=array[3];
    console.log(array[8]);
    if(!array[8]){
      document.getElementById('bookimage').src="./unbook.png";
    }else{
        document.getElementById('bookimage').src=array[8];
    }
})

function reserve(){
    var rurl = url+'?page=reserve&userinfo='+userinfo+'&isbn='+data;
    var confirm = window.confirm('予約します');
    if(confirm){
    document.getElementById("runArea").className = 'runBg';
    fetch(rurl , {
        method: "GET",
      }).then(response => response.text())
      .then(text => {
        if(text=="success"){
            alert('予約されました');
            location.href="./index.html";
        }else if(text=="already"){
            alert('すでに予約されています');
            location.href="./index.html";
        }else if(text=="blocked"){
            location.href="./login.html";
        }
      })
    }else{}

}