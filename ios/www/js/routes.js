angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

	//安卓环境下，tab默认是在最上方的，调至最下方;
	//标题栏默认是居左的，调至居中;
	if(navigator.userAgent.match( /Android/i )){
	  $ionicConfigProvider.tabs.position('bottom');
	  $ionicConfigProvider.navBar.alignTitle('center');
	}
   
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
	//欢迎页面
  .state('mkWelcome', {
    url: '/mkWelcome',
    templateUrl: 'templates/mkWelcome/mkWelcome.html',
    controller: 'mkWelcomeCtrl'
  })
	//注册
    .state('mkSignUp', {
      url: '/mkSignUp',
      templateUrl: 'templates/mkSignUp.html',
      controller: 'mkSignUpCtrl'
    })
	//登录
    .state('mkSignIn', {
      url: '/mkSignIn',
      templateUrl: 'templates/mkSignIn.html',
      controller: 'mkSignInCtrl'
    })
//====================================
    .state('tabsController', {
      url: '/tab',
      abstract:true,
      templateUrl: 'templates/tabsController.html'
    })
	
//====================================	
	//现场直播
    .state('tabsController.mkLive', {
      url: '/mkLive/:mkLiveId',
      views: {
        'tab1': {
          templateUrl: 'templates/mkLive.html',
          controller: 'mkLiveCtrl'
        }
      }
    })
	
    .state('tabsController.mkLiveList', {
      url: '/mkLiveList',
      views: {
        'tab1': {
          templateUrl: 'templates/mkLiveList.html',
          controller: 'mkLiveListCtrl'
        }
      }
    })
	
	//首页
    .state('tabsController.Home', {
      url: '/home',
      views: {
        'tab1': {
          templateUrl: 'templates/mkHome.html',
          controller: 'HomeCtrl'
        }
      }
    })
	//动态
    .state('tabsController.Dynamic', {
      url: '/dynamic',
      views: {
        'tab2': {
          templateUrl: 'templates/mkDynamics.html',
          controller: 'DynamicCtrl'
        }
      }
    })
	//消息
    .state('tabsController.Message', {
      url: '/message',
      views: {
        'tab4': {
          templateUrl: 'templates/mkMessage.html',
          controller: 'MessageCtrl'
        }
      }
    })
	//设置
    .state('tabsController.Profile', {
      url: '/profile',
      views: {
        'tab5': {
          templateUrl: 'templates/mkProfile.html',
          controller: 'ProfileCtrl'
        }
      }
    })
	//用户发布的视频
    .state('tabsController.UserVideo', {
      url: '/uservideo/:userId',
      views: {
        'tab5': {
          templateUrl: 'templates/mkUserVideo.html',
          controller: 'UserVideoCtrl'
        }
      }
    })
	//用户的收藏
    .state('tabsController.UserFavorite', {
      url: '/userfavorite/:userId',
      views: {
        'tab5': {
          templateUrl: 'templates/mkUserFavorite.html',
          controller: 'UserFavoriteCtrl'
        }
      }
    })
	//用户评论
    .state('tabsController.UserComment', {
      url: '/usercomment/:userId',
      views: {
        'tab5': {
          templateUrl: 'templates/mkUserComment.html',
          controller: 'UserCommentCtrl'
        }
      }
    })
	//用户的动态
    .state('tabsController.UserDynamic', {
      url: '/userdynamic/:userId',
      views: {
        'tab5': {
          templateUrl: 'templates/mkUserDynamic.html',
          controller: 'UserDynamicCtrl'
        }
      }
    })
	//用户浏览记录
    .state('tabsController.UserViewHistory', {
      url: '/userviewhistory/:userId',
      views: {
        'tab5': {
          templateUrl: 'templates/mkUserViewHistory.html',
          controller: 'UserViewHistoryCtrl'
        }
      }
    })
	//修改资料
    .state('tabsController.UpdateProfile', {
      url: '/updateprofile/:userId',
      views: {
        'tab5': {
          templateUrl: 'templates/mkUpdateProfile.html',
          controller: 'UpdateProfileCtrl'
        }
      }
    })
	
	
	//视频列表
    .state('tabsController.Video', {
      url: '/videos/:mkAllKeyword:mkCurrentKeyword',
      views: {
        'tab1': {
          templateUrl: 'templates/mkVideos.html',
          controller: 'VideoCtrl'
        }
      }
    })
	//话题列表
    .state('tabsController.Topic', {
      url: '/topic',
      views: {
        'tab1': {
          templateUrl: 'templates/mkTopics.html',
          controller: 'TopicCtrl'
        }
      }
    })
	//医师列表
    .state('tabsController.Doctor', {
      url: '/doctor',
      views: {
        'tab1': {
          templateUrl: 'templates/mkDoctors.html',
          controller: 'DoctorCtrl'
        }
      }
    })
	//视频详情
    .state('tabsController.VideoDetail', {
      url: '/video/:videoId',
      views: {
        'tab1': {
          templateUrl: 'templates/mkVideoDetail.html',
          controller: 'VideoDetailCtrl'
        }
      }
    })
	//视频详情
    .state('VideoDetail2', {
      url: '/video2/:videoId',
      templateUrl: 'templates/mkVideoDetail2.html',
      controller: 'VideoDetailCtrl'
    })
	//话题详情
    .state('tabsController.TopicDetail', {
      url: '/topic/:topicId',
      views: {
        'tab1': {
          templateUrl: 'templates/mkTopicDetail.html',
          controller: 'TopicDetailCtrl'
        }
      }
    })
  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/tab/home');
  $urlRouterProvider.otherwise('/mkWelcome');

});
