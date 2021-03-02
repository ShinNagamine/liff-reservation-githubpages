// LIFF ID: LIFF URL "https://liff.line.me/xxx"のxxxに該当する箇所
// ※ LINE Developers内「LIFFアプリ詳細」に記載
//    トップ > (プロバイダー名) > (チャネル名) > LIFF
const LIFF_ID = "1655711108-wvmj8Jna";

$(function () {
	initializeLiff();
})

/**
 * LIFFを初期化する。
 */
function initializeLiff() {
    liff
        .init({
            liffId: LIFF_ID
        })
        .then(() => {
            // Webブラウザからアクセスされた場合は、LINEにログインする
            if (!liff.isInClient() && !liff.isLoggedIn()) {
                window.alert("LINEアカウントにログインしてください。");
                liff.login({redirectUri: location.href});
            }
        })
        .catch((err) => {
            console.log('LIFF Initialization failed ', err);
        });
}

function sendText(text) {
    if (!liff.isInClient()) {
        shareTargetPicker(text);
    } else {
        sendMessages(text);
    }
}

// LINEトーク画面上でメッセージ送信
function sendMessages(text) {
    liff.sendMessages([{
        'type': 'text',
        'text': text
    }]).then(function () {
        liff.closeWindow();
    }).catch(function (error) {
        window.alert('Failed to send message ' + error);
    });
}

// Webブラウザからメッセージ送信
function shareTargetPicker(text) {
    liff.shareTargetPicker([{
        'type': 'text',
        'text': text
    }]).catch(function (error) {
        window.alert('Failed to send message ' + error);
    });
}