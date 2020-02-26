// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBida9QeFpWHZcexb8Wby3XYRMCNib-BaY",
  authDomain: "noteapp-90076.firebaseapp.com",
  databaseURL: "https://noteapp-90076.firebaseio.com",
  projectId: "noteapp-90076",
  storageBucket: "noteapp-90076.appspot.com",
  messagingSenderId: "880930415021",
  appId: "1:880930415021:web:7ed0475b985c108cba8124",
  measurementId: "G-CKZJPJ9S2J"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

document.addEventListener('init', function(event) {
  var page = event.target;
  var navigator = document.querySelector('#myNavigator');

  if (page.id === 'index') {
    page.querySelector('#login').onclick = function() {
      navigator.pushPage('account.html', {data: {title: 'アカウント'}})
    };
    page.querySelector('#analyze').onclick = function() {
      navigator.pushPage('analyze.html', {data: {title: '分析'}})
    };
  } else if (page.id === 'account') {
    page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
  }
});

ons.ready(function() {
  // Admobプラグイン使えるか検証
  //if (! AdMob) { console.log( 'admob plugin not ready' ); return; }
  //else { console.log( 'Admob OK' ); }         // デバッグ用
  
  //initialization();
});

var admobid = {};
if( /(android)/i.test(navigator.userAgent) ) {
    admobid = { // for Android
        banner: 'ca-app-pub-3940256099942544/6300978111',
        interstitial: 'ca-app-pub-3940256099942544/1033173712',
        rewardvideo: 'ca-app-pub-3940256099942544/5224354917',
    };
} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
    admobid = { // for iOS
        banner: 'ca-app-pub-3940256099942544/2934735716',
        interstitial: 'ca-app-pub-3940256099942544/4411468910',
        rewardvideo: 'ca-app-pub-3940256099942544/1712485313',
    };
} else {
    admobid = { // for Windows Phone
        banner: 'ca-app-pub-6869992474017983/8878394753',
        interstitial: 'ca-app-pub-6869992474017983/1355127956',
        rewardvideo: '',
    };
}

function initialization() {
  // 初期化
  AdMob.getAdSettings(
      function(info){
        console.log('adId: ' + info.adId + '\n' + 'adTrackingEnabled: ' + info.adTrackingEnabled);
      }, 
      function(){
        console.log('failed to get user ad settings');
      }
  );

  // オプションの設定
  AdMob.setOptions({
      //adId: admobid.banner, // admobのID
      position: AdMob.AD_POSITION.BOTTOM_CENTER, // 動画が出る位置
      isTesting: true, // テストするときはtrue
      bgColor: 'black', // 背景色
      // autoShow: true // 自動再生
  });

  $(document).on('onAdFailLoad', function(e){
      // 広告表示に失敗した時の処理
      if(typeof e.originalEvent !== 'undefined') e = e.originalEvent;
      var data = e.detail || e.data || e;
      alert('error: ' + data.reason );  
  });
}

function prepareInt(){
  AdMob.prepareInterstitial({
      adId:admobid.interstitial,
      autoShow: $('#autoshow').prop('checked')
  });
}