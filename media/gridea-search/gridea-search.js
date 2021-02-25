//获取url参数
function getParam(url, param) {
    if (url.indexOf('?') > -1) {
        var urlSearch = url.split('?');
        var paramList = urlSearch[1].split('&');
        for (var i = paramList.length - 1; i >= 0; i--) {
            var tep = paramList[i].split('=');
            if (tep[0] == param) {
                return tep[1];
            }
        }
    }
};
//原生js Ajax 异步GET请求
function ajax(obj) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', obj.url, true);
    xhr.send(null);
    xhr.onreadystatechange = function () {
        //异步请求：响应状态为4，数据加载完毕
        if (xhr.readyState == 4)
            callback();
    };
    function callback() {
        if (xhr.status == 200) {
            obj.success(xhr.responseText);
        } else {
            obj.error(xhr.status);
        }
    };
}

//模糊搜索
function fuzzySearch(data, phrase) {
    var options = {
        isCaseSensitive: false,
        shouldSort: true,
        includeMatches: true,
        // threshold: 0.8,
        includeScore: true,
        // location: 0,
        // distance: 1000,
        maxPatternLength: 32,
        minMatchCharLength: 4,
        keys: [
            'title', 'tags.name'
        ]
    };
    var fuse = new Fuse(data, options);
    var fuzzyResult = fuse.search(phrase);
    return fuzzyResult;
}

//检查缓存是否最新
function checkCache() {
    var infosCache = JSON.parse(localStorage.getItem('InfosCache'));
    var contentsCache = JSON.parse(localStorage.getItem('ContentsCache'));
    if (infosCache && contentsCache) {
        var cachedTime = infosCache.utils.now.toString();
        var updateTime = document.getElementById('gridea-search-form').getAttribute('data-update');
        if (cachedTime === updateTime) {
            return true;
        }
    }
    localStorage.removeItem('InfosCache');
    localStorage.removeItem('ContentsCache');
    return false;
}

//获取博客全文api
function getContents(callback) {
    if (checkCache()) {
        var contentsCache = JSON.parse(localStorage.getItem('ContentsCache'));
        callback(contentsCache);
    } else {
        ajax({
            url: '/api-content/index.html',
            success: function (data) {
                callback(JSON.parse(data));
                localStorage.setItem('ContentsCache', data);
            }
        });
    }
}
//获取博客信息api
function getInfos(callback) {
    if (checkCache()) {
        var infosCache = JSON.parse(localStorage.getItem('InfosCache'));
        callback(infosCache);
    } else {
        ajax({
            url: '/api-info/index.html',
            success: function (data) {
                callback(JSON.parse(data));
                localStorage.setItem('InfosCache', data);
            }
        });
    }
}
//根据一段文本调用模糊搜索
function searchBy(phrase, callback) {
    var result = '';
    var getFuzzyResult = function (data) {
        result = fuzzySearch(data.posts, phrase);
        callback(result);
    }
    //根据全文内容获取搜索结果
    getContents(getFuzzyResult);
}
//显示无搜索结果
function showNoResult() {
    var resultDIV = document.getElementById('gridea-search-result');
    var noResult = resultDIV.getElementsByClassName('no-result')[0];
    noResult.style.display = 'block';
    resultDIV.innerHTML = noResult.outerHTML;
}
//根据URL参数执行搜索
function searchByParam(resultHandler) {
    var phrase = getParam(window.location.href, 'q');
    if (phrase === '' || typeof (phrase) === 'undefined') {
        showNoResult();
    } else {
        searchBy(decodeURI(phrase), resultHandler);
    }
}
//获取搜索结果列表模板的URL
function getTemplateURL() {
    var scripts = document.getElementsByTagName('script');
    var templateURL = '';
    for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].type === 'text/ejs') {
            templateURL = scripts[i].src;
            return templateURL;
        }
    }
}
//渲染搜索结果列表
function renderResult(searchedInfos) {
    if (searchedInfos.posts.length > 0) {
        ajax({
            url: getTemplateURL(),
            success: function (data) {
                var resultDIV = document.getElementById('gridea-search-result');
                resultDIV.innerHTML = ejs.compile(data)(searchedInfos);
            }
        });
    } else {
        showNoResult();
    }
}
//搜索结果关键字高亮
function keywordsHighlight(searchedContent) {
    var searchedPostContent = searchedContent.item.content; //搜索结果内容预览
    return '';
}
//循环匹配搜索到的内容与展示信息
function getResult(infos, searchedContents) {
    var searchedInfos = JSON.parse(JSON.stringify(infos)); //对象深拷贝
    searchedInfos.posts = [];

    for (var i = 0; i < searchedContents.length; i++) {
        if (searchedContents[i].score < 0.2) {
            for (var j = 0; j < infos.posts.length; j++) {
                if (searchedContents[i].item.link === infos.posts[j].link) {
                    searchedInfos.posts.push(infos.posts[j]);
                }
            }
        }
    }
    return searchedInfos;
}
//主方法
function grideaSearch() {
    var resultHandler = function (searchedContents) {
        getInfos(function (infos) {
            var searchedInfos = getResult(infos, searchedContents);
            renderResult(searchedInfos);
        });
    };
    searchByParam(resultHandler);
}
window.onload = function () {
    grideaSearch();
    cajax("5e89c8868a84ab008cdbd254");
}