var http = require('react-native-http-master');
var HTMLParser = require('fast-html-parser');


export const network = {
    getName: function (link) {
        return getPath(link).substr(0, getPath(link).search("--")).replaceAll("/", "").replaceAll("-", " ");
    },
    getPageNo: function (link) {
        var d = parseInt(link.substr(link.search("p=") + 2, link.length));
        return d ? d : 1;
    },
    getPathWithoutPageNo: function (link) {
        if (link.search("p=") != -1)
            return getPath(link.substr(0, link.search("p=") - 1));
        else
            return getPath(link);
    },
    getPageLength: function (data) {
        var a = HTMLParser.parse(data).querySelector('.pager').rawAttrs;
        var b = 'data-pagecount="';
        var c = a.substr(a.search(b) + b.length, a.length - 1);
        return parseInt(c.slice(0, -1));
    },
    getEntrys: function (data) {
        var list = HTMLParser.parse(data).querySelector('#entry-item-list');
        if (list == null)
            return [];
        var root = list.querySelectorAll('.content');
        var array = [];
        for (var i = 0; i < root.length; i++)
            array.push(root[i].text);
        return array;
    },
    getPageContent: function (link, no) {
        var a = getOptions(link, no);
        return new Promise(function (resolve, reject) {

            http.get(a, (res) => {
                var data = '';

                res.on('data', function (buf) {
                    data += buf
                })

                res.on('end', () => {
                    resolve(data);
                })
            });
        });

    }


}



String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function getPath(link) {
    return link.replace("https://eksisozluk.com", "").replace("http://eksisozluk.com", "");
}

function getPathWithoutPageNo(link) {
    if (link.search("p=") != -1)
        return getPath(link.substr(0, link.search("p=") - 1));
    else
        return getPath(link);
}

function setPageNo(link, no) {
    return link + "?p=" + no;
}

function getOptions(link, no) {
    if (no == null || no == 0)
        return {
            host: 'www.eksisozluk.com',
            path: getPathWithoutPageNo(link)
        };
    else
        return {
            host: 'www.eksisozluk.com',
            path: setPageNo(getPathWithoutPageNo(link), no)
        };
}