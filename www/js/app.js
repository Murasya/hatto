// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBida9QeFpWHZcexb8Wby3XYRMCNib-BaY",
  authDomain: "noteapp-90076.firebaseapp.com",
  databaseURL: "https://noteapp-90076.firebaseio.com",
  projectId: "noteapp-90076",
  storageBucket: "noteapp-90076.appspot.com",
  messagingSenderId: "880930415021",
  appId: "1:880930415021:web:b8b953caf0be5d7fba8124",
  measurementId: "G-7XR2D45DM6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.firestore();

function QAndA(
  questions=[],
  answers=[],
  tags=[],
  uid="",
  public=false,
  memo="",
  timestamp=firebase.firestore.FieldValue.serverTimestamp(),
  complete=false,
  category=[],
  success="",
  id=""
) {
  this.questions = questions;
  this.answers = answers;
  this.tags = tags;
  this.uid = uid;
  this.public = public;
  this.memo = memo;
  this.timestamp = timestamp;
  this.complete = complete;
  this.category = category;
  this.success = success;
  this.id = id;
}

function User(
  uid="",
  email="",
  birthday=new Date(),
  sex="",
  occupation="",
) {
  this.uid = uid;
  this.email = email;
  this.birthday = birthday;
  this.sex = sex;
  this.occupation = occupation;
}

function setNewData(qAndA) {
  var id = "";
  db.collection("questionAndAnswer").add({
    questions: qAndA.questions,
    answers: qAndA.answers,
    tags: qAndA.tags,
    uid: qAndA.uid,
    public: qAndA.public,
    memo: qAndA.memo,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    complete: qAndA.complete,
    category: qAndA.category,
    success: qAndA.success
  }).then(function(docRef) {
    console.log('Document written with ID: ', docRef.id);
    id = docRef.id;
  }).catch(function(error) {
    console.log('Error adding document: ', error);
    id = error;
  })
  return id;
}

function getQuestionAndAnswer(limit = 100) {
  var user = firebase.auth().currentUser;
  var array = [];
  db.collection("questionAndAnswer")
    .where("uid", "==", user.uid)
    .where("complete", "==", true)
    .orderBy("timestamp", "desc")
    .limit(limit)
    .get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var qAndA = new QAndA(
          doc.data().questions,
          doc.data().answers,
          doc.data().tags,
          doc.data().uid,
          doc.data().public,
          doc.data().memo,
          doc.data().timestamp.toDate(),
          doc.data().complete,
          doc.data().category,
          doc.data().success,
          doc.id,
        );
        array.push(qAndA);
      });
  });
  return array;
}

function updateData(qAndA) {
  db.collection("questionAndAnswer").doc(qAndA.id).set({
    questions: qAndA.questions,
    answers: qAndA.answers,
    tags: qAndA.tags,
    uid: qAndA.uid,
    public: qAndA.public,
    memo: qAndA.memo,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    complete: qAndA.complete,
    category: qAndA.category,
    success: qAndA.success
  }).then(function() {
    console.log("Document successfully updated!");
  });
}

function getIncomplete() {
  var user = firebase.auth().currentUser;
  var array = [];
  db.collection("questionAndAnswer")
    .where("uid", "==", user.uid)
    .where("complete", "==", false)
    .orderBy("timestamp", "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var qAndA = new QAndA(
          doc.data().questions,
          doc.data().answers,
          doc.data().tags,
          doc.data().uid,
          doc.data().public,
          doc.data().memo,
          doc.data().timestamp.toDate(),
          doc.data().complete,
          doc.data().category,
          doc.data().success,
          doc.id,
        );
        array.push(qAndA);
      });
  });
  return array;
}

function deleteData(id) {
  db.collection("questionAndAnswer").doc(id).delete().then(function() {
    console.log("Document successfully deleted!");
  }).catch(function(error) {
    console.log("Error removing document: ", error);
  });
}

function createFeedback(text) {
  var uid = firebase.auth().currentUser;
  db.collection("feedback").add({
    uid: uid,
    text: text,
  }).then(function(doc) {
    console.log('Document written with ID: ', doc.id);
  }).catch(function(error) {
    console.log('Error adding document: ', error);
  });
}

function setNewUser(user) {
  db.collection("user").add({
    uid: user.uid,
    email: user.email,
    sex: user.sex,
    occupation: user.occupation,
    birthday: user.birthday,
  }).then(function(doc) {
    console.log('Document written with ID: ', doc.id);
  }).catch(function(error) {
    console.log('Error adding document: ', error);
  });
}

Vue.component("skip-modal", {
  template: `
    <div class="skip_modal" @click="$emit('close')">
      <h1>本当にスキップしますか？</h1>
      <span>このアプリについて理解するため、<br>チュートリアルの実施を推奨しています。</span>
      <div>
        <button class="yes" @click="goNext">はい</button>
        <button class="no" @click="$emit('close')">いいえ</button>
      </div>
    </div>
  `,
  methods: {
    goNext: function() {
      document.getElementById("myNavigator").pushPage("check_tutorial.html");
    }
  }
});

Vue.component("my-toolbar", {
  template: `
    <div class="toolbar_wrapper">
      <div class="toolbar">
        <div @click="goAnalyze">
          <img src="images/タブバー_新アイコン/analysis_アイコン.png" height="30px"></img>
          <span>分析</span>
        </div>
        <div @click="goHome">
          <img src="images/タブバー_新アイコン/home_アイコン.png" height="30px"></img>
          <span>ホーム</span>
        </div>
        <div @click="goArchive">
          <img src="images/タブバー_新アイコン/archives_アイコン.png" height="30px"></img>
          <span>アーカイブ</span>
        </div>
      </div>
    </div>
  `,
  methods: {
    goAnalyze: function() {
      document.getElementById("myNavigator").resetToPage("analyze.html");
    },
    goHome: function() {
      document.getElementById("myNavigator").resetToPage("index.html");
    },
    goArchive: function() {
      document.getElementById("myNavigator").resetToPage("myRecode.html");
    }
  }
});


// admob
var admobid = {};
if( /(android)/i.test(navigator.userAgent) ) {
    admobid = { // for Android
        banner: 'ca-app-pub-8657757436017103/9164014047',
        interstitial: 'ca-app-pub-8657757436017103/7896320985',
        rewardvideo: '',
    };
} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
    admobid = { // for iOS
        banner: 'ca-app-pub-8657757436017103/4710791389',
        interstitial: 'ca-app-pub-8657757436017103/8342914632',
        rewardvideo: '',
    };
} else {
    admobid = { // for Windows Phone
        banner: '',
        interstitial: '',
        rewardvideo: '',
    };
}

function initialization() {
  if(!AdMob) return;

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
      isTesting: false, // テストするときはtrue
      bgColor: 'black', // 背景色
      // autoShow: true // 自動再生
  });

  $(document).on('onAdFailLoad', function(e){
      // 広告表示に失敗した時の処理
      if(typeof e.originalEvent !== 'undefined') e = e.originalEvent;
      var data = e.detail || e.data || e;
      alert('error: ' + data.reason );  
  });

  AdMob.createBanner({
    adId: admobid.banner,
    position: AdMob.AD_POSITION.TOP_CENTER,
    autoShow: false
  });
  AdMob.prepareInterstitial({
    adId: admobid.interstitial,
    autoShow: false,
  });
}
initialization();

function sBanner() {
  if(AdMob) AdMob.showBanner(AdMob.AD_POSITION.TOP_CENTER);
}
function hBanner() {
  if(AdMob) AdMob.hideBanner();
}
function sInt() {
  if(AdMob) AdMob.showInterstitial();
}