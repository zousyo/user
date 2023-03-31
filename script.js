function search(){
    var word = document.getElementById('search-word').value;
    alert(word);
  }
  var lendp = document.getElementById('lend-p');
  var lend = document.getElementById("lend-div");
  var res = [[['貸出中書誌１','著者',1423,'期限'],['貸出中書誌２','著者',1321,'期限']],[['予約中書誌１','著者','isbn','予約日'],['予約中書誌２','著者','isbn','予約日'],['予約中書誌３','著者','isbn','予約日']]];
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

    title.setAttribute('onclick', 'cllend(this.id)');

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

    title.setAttribute('onclick', 'clreserve(this.id)');

    rcontent.appendChild(title);
    rcontent.appendChild(contributer);
    rcontent.appendChild(deadline);
    reserve.appendChild(rcontent);
  }
  reservep.innerHTML='予約中'+res[1].length+'冊';

  function cllend(isbn){
    alert(isbn);
  }
  function clreserve(isbn){
    alert(isbn);
  }