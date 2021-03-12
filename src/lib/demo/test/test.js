(function () {
    'use strict';
    let adArr = []; // 包含需要清除的广告节点
    const domain = document.domain; // 获取当前页面域名

    const pushEle = (likeArr) => { // 用于把类数组中的元素放入arr
        let length = likeArr.length;
        for (let i = 0; i < length; i++) {
            adArr.push(likeArr[i]);
        }
    }
    switch (domain) {
        case 'www.1kkk.com':
            let id1 = document.getElementById('HMRichBox');
            // let id2 = document.getElementById('hhtvalue');
            // let id3 = document.getElementById('videorich');
            let class1 = document.getElementsByClassName('detail-ad');
            let class2 = document.getElementsByClassName('yddiv');
            // id1.children[4].click();
            // adArr.push(id1);
            // adArr.push(id2);
            // adArr.push(id3);
            pushEle(class1);
            pushEle(class2);
            break;
    }
    console.log(adArr);
    adArr.forEach(element => {
        if (element instanceof HTMLElement) {
            element.style.position = 'fixed';
            element.style.top = '-500px';
        }
    });
})();