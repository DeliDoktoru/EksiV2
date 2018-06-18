var db = require('./db.js').db.prototype;
var network = require('./network.js').network.prototype;
var util = require('util'),
    events = require('events');
var controller = exports.controller = function () {
    events.EventEmitter.call(this);

}
util.inherits(network, events.EventEmitter);

controller.prototype.update=function(pageid,obj){
	return new Promise(function(resolve, reject){
		db.getPageLink(pageid).then((res)=>{
			network.getPageContent(res, 0).then((ress)=>{
				var pagelength=network.getPageLength(ress);
				
				
			});
		});
	});
}
controller.prototype.save = function (link,obj) {
    return new Promise(function (resolve, reject) {
    network.getPageContent(link, 0).then(res => {
       var pagelength=network.getPageLength(res);   
        db.savePage(network.getName(link), network.getPathWithoutPageNo(link),pagelength ).then(async (ress) => {
			
			if(ress!=0)
			{ var d=1/pagelength;
            obj.setState({ progress:0 });
            for(var i=1;i<=pagelength;i++) {
                obj.setState({ progress:d*i });
                await network.getPageContent(link, i).then(resss => {
                    db.saveEntrys(ress, i, network.getEntrys(resss));
                });

            }  }
			
			obj.setState({ progress:0 });
			if(obj.state.change!=0 && obj.state.change!=4)
			obj.child.getContent(obj.child);
			 resolve();
        });

    });
});

}
controller.prototype.getEntrys = function (pageid, pageno) {
    return new Promise(function (resolve, reject) {
        db.getEntrys(pageid, pageno).then(res=>{
            resolve(res);

        });
       
    });
}
controller.prototype.getPages=function(){
    return new Promise(function (resolve, reject){
        db.getPages().then(res=>{
            resolve(res);

        });
    });

}
controller.prototype.getPagesC=function(){
    return new Promise(function (resolve, reject){
        db.getPagesC().then(res=>{
            resolve(res);

        });
    });

}
controller.prototype.getPagesN=function(){
    return new Promise(function (resolve, reject){
        db.getPagesN().then(res=>{
            resolve(res);

        });
    });

}
controller.prototype.updateStayingPage=function(pageid,no){
        db.updateStayingPage(pageid,no);
}


