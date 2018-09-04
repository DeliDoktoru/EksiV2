const Realm = require('realm');
var util = require('util'),
  events = require('events');
const entry = {
  name: 'entry',
  properties: {
    id: 'int',
    pageid: 'int',
    pageno: 'int',
    content: 'string'
  }
};

const page = {
  name: 'page',
  properties: {
    id: 'int',
    pagename: 'string',
    link: 'string',
    pagelength: 'int',
	stayingpage:'int'

  }
};


var db = exports.db = function () {
  events.EventEmitter.call(this);

}

util.inherits(db, events.EventEmitter);


function getOptions() {
  return { schema: [page, entry], schemaVersion: 6 };
}
function openDb() {
  return Realm.open(getOptions());
}

function getMaxEntryId(pageidx) {
  return new Promise(function (resolve, reject) {
    openDb().then(realm => {
      var a = (realm.objects('entry').filtered('pageid ="' + pageidx + '"').sorted('id', true))[0];
      if (a == null)
        resolve(1);
      else
        resolve(a.id + 1);
    });
  });
}
function getParsedPages(Pages) {
  var array = [];

  for (var i = 0; i < Pages.length; i++) {
    var a = {};
    a.key = Pages[i].id + "";
    a.pagename = Pages[i].pagename;
    a.link = Pages[i].link;
    a.pagelength = Pages[i].pagelength;
	a.stayingpage=Pages[i].stayingpage;
    array.push(a);
  }
  return array;
}
function getParsedEntrys(Entrys) {
  var array = [];

  for (var i = 0; i < Entrys.length; i++) {
    var a = {};
    a.key = Entrys[i].id + "";
    a.pageid = Entrys[i].pageid;
    a.pageno = Entrys[i].pageno;
    a.content = Entrys[i].content;
   
    array.push(a);
  }
  return array;
}
function getMaxPageId() {
  return new Promise(function (resolve, reject) {
    openDb().then(realm => {
      var a = (realm.objects('page').sorted('id', true))[0];
      if (a == null)
        resolve(1);
      else
        resolve(a.id + 1);
    });
  });
}
async function saveEntry(pageidx, pagenox, contentx) {
  await getMaxEntryId(pageidx).then(res => {
    openDb().then(realm => {
      realm.write(() => {
        realm.create('entry', { id: res, pageid: pageidx, pageno: pagenox, content: contentx });
      });
    });
  });
}
db.prototype.saveEntrys = async function (pageidx, pagenox, array) {
  for (var i = 0; i < array.length; i++)
    await saveEntry(pageidx, pagenox, array[i]);

}
//return page of id
db.prototype.savePage = function (namex, linkx, pagelengthx) {
  return new Promise(function (resolve, reject) {
    getMaxPageId().then(res => {
     openDb().then(realm => {
		  if(realm.objects('page').filtered('link ="' + linkx + '"').length==0)
		  {realm.write(() => {
          var p = res;
          realm.create('page', { id: p, pagename: namex, link: linkx, pagelength: pagelengthx ,stayingpage:1});
          resolve(p);
		  });}
		  else
			 resolve(0); 
				
      });
    });
  });
}
// not ready !
db.prototype.getPage = function (linkx) {
  return new Promise(function (resolve, reject) {
    openDb().then(realm => {
      resolve(realm.objects('page').filtered('link ="' + linkx + '"'));
    });
  });
}
db.prototype.getPages = function (linkx) {
  return new Promise(function (resolve, reject) {
    openDb().then(realm => {
      resolve(getParsedPages(Array.from(realm.objects('page'))));
    });
  });
}
db.prototype.getPagesC = function (linkx) {
  return new Promise(function (resolve, reject) {
    openDb().then(realm => {
      resolve(getParsedPages(Array.from(realm.objects('page').filtered('stayingpage !=1 && stayingpage!=null'))));
    });
  });
}
db.prototype.getPagesN = function (linkx) {
  return new Promise(function (resolve, reject) {
    openDb().then(realm => {
      resolve(getParsedPages(Array.from(realm.objects('page').filtered('stayingpage =1 || stayingpage=null'))));
    });
  });
}
// not ready !
db.prototype.getEntry = function (pageidx, idx) {
  return new Promise(function (resolve, reject) {
    openDb().then(realm => {
      resolve(realm.objects('entry').filtered('pageid ="' + pageidx + '" AND id="' + idx + '"'));
    });
  });
}
db.prototype.getEntrys = function (pageidx, pagenox) {
  return new Promise(function (resolve, reject) {
    openDb().then(realm => {
      resolve(getParsedEntrys(Array.from(realm.objects('entry').filtered('pageid ="' + pageidx + '" AND pageno="' + pagenox + '"'))));
    });
  });
}
db.prototype.getMissingEntrys= function (pageidx){
	var array=[];
	return new Promise(function (resolve, reject) {
    openDb().then(realm => {
	var l=Array.from(realm.objects('page').filtered('pageid ="' + pageidx + '"'))[0].pagelength;
     for(var i=0;i<l;i++)
	 {
		 if(realm.objects('entry').filtered('pageid ="' + pageidx + '" AND pageno="' + l + '"').length==0 )
			 array.push(i);
	 }
	 resolve(array);
    });
  });
}

db.prototype.updateStayingPage=function(pageidx,no){
	openDb().then(realm => {
		let a=realm.objects('page').filtered('id ="' + pageidx + '"');
    realm.write(() => {
      a[0].stayingpage=no;
    });
  });
	
}

db.prototype.getPageLink=function(pageidx){
	return new Promise(function (resolve, reject) { 
	 openDb().then(realm => {
		 resolve(Array.from(realm.objects('page').filtered('id ="' + pageidx + '"'))[0].link);
		 
	 });
	
	});
}
// not ready !
db.prototype.updatePage=function(pageidx,pagelengthx){
	return new Promise(function (resolve, reject) { 
	 openDb().then(realm => {
		 let obj=realm.objects('page').filtered('id ="' + pageidx + '"');
		 realm.write(() => {
			 obj.pagelength=pagelengthx;
			 resolve();
        
      });
		 
	 });
	
	})
	
}
db.prototype.deleteDb = function () {
  openDb().then(realm => {
    realm.write(() => {
      realm.deleteAll();
    });
  });
}
db.prototype.test = function () {
  return Realm.path();
}
