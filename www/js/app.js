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
  var uid = firebase.auth().currentUser;
  var array = [];
  db.collection("questionAndAnswer").where("uid", "==", uid).where("complete", "==", true).orderBy("timestamp", "desc").limit(limit).get().then((querySnapshot) => {
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
  var uid = firebase.auth().currentUser;
  var array = [];
  db.collection("questionAndAnswer").where("uid", "==", uid).where("complete", "==", false).orderBy("timestamp", "desc").get().then((querySnapshot) => {
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