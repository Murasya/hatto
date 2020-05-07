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
  timestamp=new Date(),
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
    timestamp: qAndA.timestamp,
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
          doc.data().timestamp,
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
    timestamp: qAndA.timestamp,
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
          doc.data().timestamp,
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
          <img src="images/タブバー_新アイコン/analysis_アイコン.png"></img>
          <span>分析</span>
        </div>
        <div @click="goHome">
          <img src="images/タブバー_新アイコン/home_アイコン.png"></img>
          <span>ホーム</span>
        </div>
        <div @click="goArchive">
          <img src="images/タブバー_新アイコン/archives_アイコン.png"></img>
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