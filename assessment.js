'use strict'
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided =document.getElementById('tweet-area');

function removeAllChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
        }
    }

function createAssesmentResult(element,message) {
    // 診断結果表示エリアの作成
    const h3 = document.createElement('h3'); //h3タグを作る
    h3.innerText = '診断結果'; //h3タグに'診断結果'の文字列を設定
    element.appendChild(h3); //result-areaにh3変数を設定
    
    const p = document.createElement('p');
    p.innerText = message;
    element.appendChild(p);
}

assessmentButton.onclick = ()　=> {
    let userName = userNameInput.value;
    if(userName.length === 0) {
        return;
    }


// すでにある診断結果を削除
    removeAllChildren(resultDivided);
    
    const result = assessment(userName);
// h3 タグと p タグを作る
    createAssesmentResult(resultDivided,result);

    removeAllChildren(tweetDivided);

//aタグを作る
    const a = document.createElement('a');
    const href = 'https://twitter.com/intent/tweet?button_hashtag=' + 
    encodeURIComponent('あなたのいいところ') +
    '&ref_src=twsrc%5Etfw';
    a.setAttribute('href',href);
    a.setAttribute('class','twitter-hashtag-button');
    a.setAttribute('data-text',result);
    a.innerText = 'Tweet #あなたのいいところ';

//aタグをHTMLとして追加
    tweetDivided.appendChild(a);

//scriptタグを作る
const script = document.createElement('script');
script.setAttribute('src','https://platform.twitter.com/widgets.js');

//scriptタグをHTMLとして追加
    tweetDivided.appendChild(script);
}

userNameInput.onkeydown = event => {
    if(event.key === 'Enter') {
        assessmentButton.onclick();
    }
};


const answers = [
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
    '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */

function assessment(userName) {
var Number = 0;
    // 繰り返しの条件
    for (let i = 0; i < userName.length; i++) {
    // 名前一文字ずつのナンバーをすべて足してNumberに代入
        Number += userName.charCodeAt(i)
    }
    /** Numberの数を結果数(16)で割ると余りが0〜15になり、
        16個の結果(0から数える)のいずれかに割り当てられる */
    let index = Number % answers.length;
    // 余りを結果番号に割りあて、結果内の{userName}を入力されたものに書き換える
    return answers[index].replace(/\{userName\}/g, userName);
}

/** テストコード
 * console.assert(
 * 確認したいこと,
 * エラーだった場合、コンソールに表示したいエラー文)
 */

console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  );
