'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定したHTML要素の子要素をすべて削除する関数．
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
};


//assessmentButton.onclick = function() {

userNameInput.onkeydown = (event) => {
    if (event.key === 'Enter') {
    assessmentButton.onclick();
    }
};

assessmentButton.onclick = () => {
    const username = userNameInput.value;
    if (username.length === 0) {
        return;
    }
    //診断結果の削除
    removeAllChildren(resultDivided);
    //診断結果の表示
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild (header);
    //診断結果（説明の表示）
    const　paragraph = document.createElement('p');
    const result = assessment(username);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    //tweet-areaの削除
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
    + encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw"';
    anchor.setAttribute('href',hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text',result);
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDivided.appendChild(anchor);

    //widgets.jsの読み込み
    const script = document.createElement('script');
    script.setAttribute('src','https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
}

var answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
    '{userName}のいいところは優しさです．{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒されています 。　',
]

/**
 * 名前の文字列を渡すと診断結果を返す
 * @param {string} username ユーザーの名前
 * @return {string} 診断結果
 */

function assessment(username) {
    //診断処理を実行
        //全文字のコード番号取得し，それを足し合わせる
        let sum0fcharCode = 0;
        for (let i = 0; i <username.length; i++ ) {
            sum0fcharCode = sum0fcharCode + username.charCodeAt(i);
        }
        //診断結果の決定
        let index = sum0fcharCode % answers.length;
        let result = answers[index];
        //{username}を置き換える
        result = result.replace(/\{userName\}/g, username);
    return result;
}

console.assert(
    assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  console.assert(
    assessment('太郎') === assessment('太郎'),
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );



 /* userNameInput.onkeydown = (event) => {
    if (event.key === 'Enter') {
        assessmentButton.onclick();
    }
};
*/
