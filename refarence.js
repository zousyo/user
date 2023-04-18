const SHEET_NAME = PropertiesService.getScriptProperties().getProperty('sheetname')
const ss = SpreadsheetApp.openById(SHEET_NAME);
function setname(){
  var name = "master";
  var mail = "master";
  var master = name+"mas";
  PropertiesService.getDocumentProperties().setProperty(name,mail);
  PropertiesService.getDocumentProperties().setProperty(master,name);
}
function doGet(e) {
  Logger.log(e);
  var userinfo = JSON.parse(e.parameter.userinfo);
  var username = userinfo.username;
  var password = userinfo.password;
  var checkmail = PropertiesService.getDocumentProperties().getProperty(username);
  var userversion = e.parameter.version;
  Logger.log(checkmail);
  var page = e.parameter.page;
  if(password==checkmail&&username&&password){
    Logger.log('passed mail check');
  var version = Number(PropertiesService.getDocumentProperties().getProperty('version'));
  if(!page){
    page="index";
  }
  switch(page){
    case "index":
    var code = getUserInfo(username).usercode;
    var userinfo = index(code);
    var data = ContentService.createTextOutput(JSON.stringify(userinfo)).setMimeType(ContentService.MimeType.JSON);
    break;

    case "search":
    var word = e.parameter.word;
    var getfunc = searchall(word);
    var data = ContentService.createTextOutput(JSON.stringify(getfunc)).setMimeType(ContentService.MimeType.JSON);
    break;

    case "getuserinfo":
    var userf = getUserInfo(e.parameter.userkey);
    var data = ContentService.createTextOutput(JSON.stringify(userf)).setMimeType(ContentService.MimeType.JSON);
    break;

    case "newer":
    var newerinfo = JSON.parse(e.parameter.newer);
    var newname = newerinfo.name;
    var newmail = newerinfo.mail;
    var newfunc = newmail(newmail,newname);
    var data = ContentService.createTextOutput(newfunc).setMimeType(ContentService.MimeType.TEXT);
    break;

    case "easybookinfo":
    var info = getEasyBook(e.parameter.key);
    var data =ContentService.createTextOutput(JSON.stringify(info)).setMimeType(ContentService.MimeType.JSON);
    break;

    case "getbookinfo":
    var isbn = e.parameter.isbn;
    var infofunc = bookinfo(isbn);
    var data = ContentService.createTextOutput(JSON.stringify(infofunc)).setMimeType(ContentService.MimeType.JSON);
    break;

    case "reserve":
    var isbn = e.parameter.isbn;
    var code = getUserInfo(username).usercode;
    var resfunc = reserve(isbn,code);
    var data = ContentService.createTextOutput(resfunc).setMimeType(ContentService.MimeType.TEXT);
    break;

    case "login":
    var data = ContentService.createTextOutput('success').setMimeType(ContentService.MimeType.TEXT);
    break;

    case "lent":
        var master = username+"mas";
    var check = PropertiesService.getDocumentProperties().getProperty(master);
    if(check==username){
    var isbn = JSON.parse(e.parameter.isbn);
    var lentid = e.parameter.lentid;
    var lentcode = getUserInfo(lentid).usercode;
    var lentfunc = lent(isbn,lentcode);
    var data = ContentService.createTextOutput(lentfunc).setMimeType(ContentService.MimeType.JSON);
    }else{
      var data = ContentService.createTextOutput('blocked-m').setMimeType(ContentService.MimeType.TEXT);
    }
    break;

    case "back":
    break;

    case "add":
    var master = username+"mas";
    var check = PropertiesService.getDocumentProperties().getProperty(master);
    if(check==username){
    var values = e.parameter.values;
    var addfunc = add(values);
    var data = ContentService.createTextOutput(addfunc).setMimeType(ContentService.MimeType.TEXT);
    }else{
      var data = ContentService.createTextOutput('blocked-m').setMimeType(ContentService.MimeType.TEXT);
    }
  }
  }else{
    Logger.log('failed mail check');
    switch(page){
      case "login":
      Logger.log("username="+username);
      Logger.log("password="+password);
      var msheet = ss.getSheetByName('user');
      var row = search(msheet,username);
      Logger.log(row[0]);
      Logger.log(row[1]);
      if(row[1].length<1){
        Logger.log('nomail');
        var resa ='nomail';
      }else{
        var cname = msheet.getRange(row[1][0],6).getValue();
        var crole = msheet.getRange(row[1][0],4).getValue();
        var user = msheet.getRange(row[1][0],1).getValue();
        Logger.log(cname);
        if(password==cname){
          if(userinfo.role=="admin"&&crole=="admin"){
            PropertiesService.getDocumentProperties().setProperty(user+'mas',user);
            Logger.log('admin');
          }
  PropertiesService.getDocumentProperties().setProperty(user,password);
          var resa = 'success';
        }else{
          var resa = 'noname';
        }
      }
      var data = ContentService.createTextOutput(resa).setMimeType(ContentService.MimeType.TEXT);
      break;

      case "cmail":
      var name = PropertiesService.getDocumentProperties().getProperty(e.parameter.cmail);
      var data = ContentService.createTextOutput(name).setMimeType(ContentService.MimeType.TEXT);
      break;

      case "rmail":
      var funcs = registermail(e.parameter.cmail,e.paramer.pass);
      var data = ContentService.createTextOutput(funcs).setMimeType(ContentService.MimeType.TEXT);
      break;

       default:
       var data = ContentService.createTextOutput('blocked').setMimeType(ContentService.MimeType.TEXT);
    }
    }
  return data;
  }


function newmail(mail,name){
  PropertiesService.getDocumentProperties().setProperty(mail,name);  
  var year = Number(new Date().getFullYear().toString().slice(-2));
  var month = new Date().getMonth()+1;
  var day = new Date().getDate();
  var date = year*10000+month*100+day;
  var rondom =Math.floor(Math.random()*100000)+1;
  var id = date*100000+rondom;
      PropertiesService.getDocumentProperties().setProperty(name+'ID',id);
  var text ='<p>下のページからメールアドレスの認証をしてください。</p><br><a href="https://zousyo.github.io/user/cmail.html?mail='+mail+'">開く</a>';
      var option ={ htmlBody: text,name:'蔵書管理'};
  MailApp.sendEmail(mail,'メールアドレスの認証－蔵書管理','メールアドレスの認証',option);
  return 'success';
}

function registermail(mail,pass){
  var name = PropertiesService.getDocumentProperties().getProperty(mail);
  var id = PropertiesService.getDocumentProperties().getProperty(name+'ID');
      var sheetm = ss.getSheetByName('user');
      var add = [name,mail,name+"mana","user",id,pass];
    sheetm.appendRow(add);
      PropertiesService.getDocumentProperties().setProperty(name,mail);
  PropertiesService.getDocumentProperties().deleteProperty(mail);
  PropertiesService.getDocumentProperties().deleteProperty(name+"ID");
  return 'success';
}

function add(values){
  Logger.log(values);
  var str = JSON.stringify(values);
  var data = JSON.parse(JSON.parse(makearray(str)));
  Logger.log(data.isbn);
  var sheet = ss.getSheetByName('list');
  var check = search(sheet,data.isbn);
    Logger.log(check);
  if(check=="1,"){
    var add = [data.isbn,data.title,data.author,"可",data.categorie,data.publish,data.descript,data.volumeurl,data.imageLinks];
    sheet.appendRow(add);
    var res='success';
  }else{
    var res = 'already';
  }
  return res
}

function index(username){
  var lent = JSON.parse(PropertiesService.getDocumentProperties().getProperty(username+"le"));
  if(!lent){
    lent = "";
  }
  var reserve = JSON.parse(PropertiesService.getDocumentProperties().getProperty(username+"re"));
  if(!reserve){
    reserve = "";
  }
  var users = ss.getSheetByName('user');
  var row = Number(search(users,username)[1]);
  var usercode = users.getRange(row,5).getValue();
  var res = [lent,reserve,usercode];
  return res
}

function bookinfo(isbn){
  var sheet = ss.getSheetByName('list');
  var searchf = search(sheet,isbn);
  var row =Number(searchf[1]);
  Logger.log(row);
  var info = sheet.getRange(row,1,1,9).getDisplayValues();
  Logger.log(info);
  return info
}

function reserve(isbn,username){
  //**get Data */
  var list = ss.getSheetByName('list');
  var row  = search(list,isbn)[1];
  var title = list.getRange(row,2).getValue();
  var auter = list.getRange(row,3).getValue();
  let d = new Date();
  var line = Utilities.formatDate(d, 'Asia/Tokyo', 'yyyy/MM/dd');

  var reserve = username+"re";
  var property = PropertiesService.getDocumentProperties().getProperty(reserve);

  if(!property){
  var array = [];
  array.push([title,auter,isbn,line]);

  //**set property */
  PropertiesService.getDocumentProperties().setProperty(reserve,JSON.stringify(array));
  var res = "success";
  }else{
    var parr = JSON.parse(property);
    var before =[];
    var check = [];
    for(i=0;i<parr.length;i++){
    before.push(parr[i]);
    check.push(parr[i].includes(isbn));
    }
        //**重複チェック */
    if (check.includes(true)) {
    var res = 'already';
}else{
    before.push([title,auter,isbn,line]);
    //**set property */
    PropertiesService.getDocumentProperties().setProperty(reserve,JSON.stringify(before));
    var sheet = ss.getSheetByName('reserve');
    var add = [username,title,auter,isbn];
    sheet.appendRow(add);
  var res = 'success';
}
  }
return res;
}

function lent(isbnarr,username){
  var times = isbnarr.length;
  //**get Data */
  var list = ss.getSheetByName('list');
  for (i=0;i<times;i++){
  var isbn = isbnarr[i];
  var row  = search(list,isbn)[1];
  var title = list.getRange(row,2).getValue();
  var auter = list.getRange(row,3).getValue();
  var checkl = list.getRange(row,4).getValue();
  if(checkl=="可"){
  let d = new Date();
      d.setDate(d.getDate() + 7);
  var line = Utilities.formatDate(d, 'Asia/Tokyo', 'yyyy/MM/dd');

  var lent = username+"le";
  var property = PropertiesService.getDocumentProperties().getProperty(lent);
  console.log(property);

  if(!property){
  var array = [];
  array.push([title,auter,isbn,line]);

  //**set property */
  PropertiesService.getDocumentProperties().setProperty(lent,JSON.stringify(array));
  var res = "success";
  }else{
    var parr = JSON.parse(property);
    var before =[];
    var check = [];
    for(i=0;i<parr.length;i++){
    before.push(parr[i]);
    check.push(parr[i].includes(isbn));
    }
        //**重複チェック */
    if (check.includes(true)) {
    var res = 'already';
}else{
  list.getRange(row,4).setValue('貸出中');
    before.push([title,auter,isbn,line]);
    //**set property */
    PropertiesService.getDocumentProperties().setProperty(lent,JSON.stringify(before));
        var sheet = ss.getSheetByName('lent');
        var user = getUserInfo(username).username;
    var add = [user,title,auter,isbn];
    sheet.appendRow(add);
  var res = 'success';
}
  }
  //**予約の削除 */
  var reserve = username+"re";
  var stres = PropertiesService.getDocumentProperties().getProperty(reserve);
  var pares = JSON.parse(stres);
  var rescheck = [];
  for(i=0;i<pares.length;i++){
    rescheck.push(pares[i].includes(isbn));
  }
  console.log(rescheck);
  if(rescheck.includes(true)){
    var num = rescheck.indexOf(true);
    pares.splice(num,1);
    console.log('pares:'+JSON.stringify(pares));
    PropertiesService.getDocumentProperties().setProperty(reserve,JSON.stringify(pares));
  }
  console.log(res);
  }else{
    var res = "cant"
  }
  }
return res;
}

function searchall(word){
  var list = ss.getSheetByName('list');
  var searchf = search(list,word);
  if(searchf=="1,"){
    var res = ["notfound"];
  }else{
    var res = [];
    for(i=0;i<searchf[1].length;i++){
  var row = searchf[1][i];
  var title = list.getRange(row,2).getValue();
  var auter = list.getRange(row,3).getValue();
  var lent = list.getRange(row,4).getValue();
  var categorie = list.getRange(row,5).getValue();
  var isbn = list.getRange(row,1).getValue();
  res.push([title,auter,lent,isbn,categorie]);
    }
  }
  console.log(res);
  return res;
}

function makearray(first){
   var second = first.replace("$","\n");
    while(second !==first){
      first = first.replace("$","\n");
      second = second.replace("$","\n");;
    }

   var third = second.replace('＆','&');
    while(third !== second) {
      second = second.replace('＆','&');
      third = third.replace('＆','&');
    }

   var fourth = third.replace('？','?');
    while(fourth !== third) {
      third = third.replace('？','?');
      fourth = fourth.replace('？','?');
    }

  return fourth
  }

function getUserInfo(info){
  var sheet = ss.getSheetByName('user');
  var row = search(sheet,info)[1];
  var usercode = sheet.getRange(row,5).getValue();
  var username = sheet.getRange(row,1).getValue();
  var mananame = sheet.getRange(row,3).getValue();
  var usermail = sheet.getRange(row,2).getValue();
  var userrole = sheet.getRange(row,4).getValue();
  var res = {"usercode":usercode,"username":username,"managename":mananame,"usermail":usermail,"role":userrole};
  console.log(res);
  return res
}
function getEasyBook(key){
  var sheet = ss.getSheetByName('list');
  var row = search(sheet,key)[1];
  var title = sheet.getRange(row,2).getValue();
  var isbn = sheet.getRange(row,1).getValue();
  var auter = sheet.getRange(row,3).getValue();
  var res = {"title":title,"isbn":isbn,"auter":auter};
  return res
}

//**検索　シート,検索ワード→[あり1or無し0,ヒット列] quote:con-date-beta */
function search(sheet,searchW){
  if (searchW == null || searchW == '') {
    return 0;
  } else {
    let ranges = sheet.createTextFinder(searchW).findAll(); // キーワードによる検索を実施
    let targetRows = []; // 検索にヒットしたレコード行の格納先
    // 検索にヒットしたRangeとレコード行を格納
    for (let i = 0; i < ranges.length; i++) {
      targetRows.push(ranges[i].getRow());
    }
    // 1行に複数個ヒットした場合の重複行番号排除
    targetRows = targetRows.filter(function(x, i, self) {
      return self.indexOf(x) === i;
    });
    targetRows
    var res=[1,targetRows];
    Logger.log(res);
    return res;
  }
}
