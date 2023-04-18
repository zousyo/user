function search(){
    var word = document.getElementById('search-word').value;
    if(!word){
      alert('入力してください');
    }else{
      location.href="./search.html?word="+word;
    }
  }

  //**window onload */
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');
      const role = localStorage.getItem('role');
      if(!username||!password||!role){
        location.href="./login.html";
      }
      document.getElementById('username').innerText = username;
      const userinfo = JSON.stringify({'username':username,'password':password,'role':role});
  const url = "https://script.google.com/macros/s/AKfycbxvS9JmRMQXRle4fh_tbYzd3_nOwVRadU2Ab0lj23sBtJkChT38rnqpMIDqVjgmN18S/exec";
  var furl =url+'?page=index&userinfo='+userinfo;
        console.log(furl);
        fetch(furl , {
  method: "GET",
}).then(response => response.text())
.then(text => {
  var res = JSON.parse(text);
  console.log(res);
  var lendp = document.getElementById('lend-p');
  var lend = document.getElementById("lend-div");
  for(i=0;i<res[0].length;i++){

    let content = document.createElement('div');
    let title = document.createElement('p');
    let contributer = document.createElement('p');
    let deadline = document.createElement('p');

    content.classList.add('content');
    title.classList.add('title');
    contributer.classList.add('contributer');
    deadline.classList.add('deadline');

    title.id= res[0][i][2];

    title.innerText = res[0][i][0];
    contributer.innerText = res[0][i][1];
    deadline.innerText = res[0][i][3];

    title.setAttribute('onclick', 'book(this.id)');

    content.appendChild(title);
    content.appendChild(contributer);
    content.appendChild(deadline);
    lend.appendChild(content);
  }
  lendp.innerHTML='貸出中'+res[0].length+'冊';

  
  var reservep = document.getElementById('reserve-p');
  var reserve = document.getElementById("reserve-div");
    for(i=0;i<res[1].length;i++){

    let rcontent = document.createElement('div');
    let title = document.createElement('p');
    let contributer = document.createElement('p');
    let deadline = document.createElement('p');

    rcontent.classList.add('content');
    title.classList.add('title');
    contributer.classList.add('contributer');
    deadline.classList.add('deadline');

    title.id= res[1][i][2];

    title.innerText = res[1][i][0];
    contributer.innerText = res[1][i][1];
    deadline.innerText = res[1][i][3];

    title.setAttribute('onclick', 'book(this.id)');

    rcontent.appendChild(title);
    rcontent.appendChild(contributer);
    rcontent.appendChild(deadline);
    reserve.appendChild(rcontent);
  }
  reservep.innerHTML='予約中'+res[1].length+'冊';
  localStorage.setItem('usercode',res[2]);
})

  function book(isbn){
    location.href = "./bookinfo.html?isbn="+isbn;
  }

  function modalClose(){
     document.getElementById("modalArea").className = "modalNoDisp";
   }