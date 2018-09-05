import {db} from './db.js';
import {network} from './network.js';



export const controller = {
    save: function (link, obj) {
        return new Promise(function (resolve, reject) {
            network.getPageContent(link, 0).then(res => {
                var pagelength = network.getPageLength(res);
                db.savePage(network.getName(link), network.getPathWithoutPageNo(link), pagelength).then(async (ress) => {

                    if (ress != 0) {
                        var d = 1 / pagelength;
                        obj.setState({
                            progress: 0
                        });
                        for (var i = 1; i <= pagelength; i++) {
                            obj.setState({
                                progress: d * i
                            });
                            await network.getPageContent(link, i).then(resss => {
                                db.saveEntrys(ress, i, network.getEntrys(resss));
                            });

                        }
                    }

                    obj.setState({
                        progress: 0
                    });
                    if (obj.state.change != 0 && obj.state.change != 4)
                        obj.child.getContent(obj.child);
                    resolve();
                });

            });
        });

    },
    getEntrys: function (pageid, pageno) {
        return  db.getEntrys(pageid, pageno);
    },
    getPages: function () {
        return  db.getPages();

    },
    getPagesC: function () {
        return  db.getPagesC();

    },
    getPagesN: function () {
        return  db.getPagesN();

    },
    updateStayingPage: function (pageid, no) {
        db.updateStayingPage(pageid, no);
    }


}