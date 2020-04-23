var admobid = {};

// TODO: replace the following ad units with your own
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
  admobid = { // for Windows Phone, deprecated
    banner: '',
    interstitial: '',
    rewardvideo: '',
  };
}

function initApp() {
  if (! AdMob ) { alert( 'admob plugin not ready' ); return; }
  else { console.log("admob OK"); }

  console.log("admob ready");
  // this will create a banner on startup
  AdMob.createBanner( {
    adId: admobid.banner,
    position: AdMob.AD_POSITION.BOTTOM_CENTER,
    isTesting: true, // TODO: remove this line when release
    overlap: false,
    offsetTopBar: false,
    bgColor: 'black',
    success: function() {
      alert('success to create banner');
    },
    error: function() {
      alert('failed to create banner');
    }
  } );

  // this will load a full screen ad on startup
  AdMob.prepareInterstitial({
    adId: admobid.interstitial,
    isTesting: true, // TODO: remove this line when release
    autoShow: true
  });
}

// if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
//     document.addEventListener('deviceready', initApp, false);
// } else {
//     initApp();
// }
initApp();
