// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic','ngCordova','ngMessages', 'app.controllers', 'app.routes', 'app.services', 'app.directives','ngSanitize','ionic.utils'])

.run(function($ionicPlatform) {
     $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})


.run(function($rootScope,$ionicLoading,$ionicPopup,$http,$state,$ionicPlatform,$localstorage) {
	var mkHost = "http://medku.com";
	$rootScope.mkHost = "http://medku.com";
	$rootScope.mkToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9tZWRrdS5jb20iLCJpc19ndWVzdCI6MX0.tHELpls39Bj92bq7tUR-mbC97WR3aUD4Dk99W-sgQD0';
 	$rootScope.mkSignInApi = "/api/v1/user/login";
	$rootScope.mkUpdateProfileApi = "/api/v1/user/profile";
	
	$rootScope.mkSuggestedVideoApi = "/api/v1/videos/hot_videos";
	$rootScope.mkSuggestedTopicApi = "/api/v1/user/topics";
	$rootScope.mkSuggestedUserApi = "/api/v1/user/hot_users";
	$rootScope.mkAllUserDynamicApi = "/api/v1/user/activities";
	$rootScope.mkMyMessageApi = "/api/v1/my/messages";
	$rootScope.mkLogoutApi = "/api/v1/user/logout";
	
	$rootScope.mkTopTagApi = "/api/v1/videos/top_tags";
	$rootScope.mkListTagApi = "/api/v1/videos/list_tags";
	
	//mine
	$rootScope.mkMyVideoApi = "/api/v1/my/videos";
	$rootScope.mkMyDynamicApi = "/api/v1/my/activity";
	$rootScope.mkMyCommentApi = "/api/v1/my/comments";
	$rootScope.mkMyViewHistoryApi = "/api/v1/my/history";
	$rootScope.mkMyFavoriteApi = "/api/v1/my/favorites";
	
	$rootScope.mkGetOneTopicApi = "/api/v1/user/topic/";
    $rootScope.mkGetOneDoctorApi = "/api/v1/user/profile/";
	
	
	$rootScope.mkGetLiveListApi = "/api/v1/live_surgeries";
	$rootScope.mkGetOneLiveApi = "/api/v1/live_surgery/";
 
	$rootScope.showMkAlert = function(mkTitle) {
		 var alertPopup = $ionicPopup.alert({
	    	 title: '<i class="icon ion-ios-flame-outline"></i>&nbsp;&nbsp;' + mkTitle,
	    	 cssClass:'mk-sub-font',
	    	 template: '',
	    	 okType:'button-mk-clear',
	    	 okText:'好的'
	  	});
	}
 	$rootScope.mktest = function(){
	 	
     if(window.cordova && window.cordova.plugins.Keyboard) {
       $rootScope.showMkAlert("cordova exist...");
     } else $rootScope.showMkAlert("cordova not exist...");

 	}
	$rootScope.showInDev = function() {
		$rootScope.showMkAlert('暂未开放');
	}
	//处理网络请求时，显示“加载中”。以阻塞用户操作
	$rootScope.showMkLoading = function() {
    	$ionicLoading.show({
      	  template: '加载中...',
		  delay:2000
    	});
  	}
	//处理网络请求后，隐藏“加载中”。以释放用户操作
  	$rootScope.hideMkLoading = function(){
    	$ionicLoading.hide();
  	}
     
     $rootScope.gotoRegister = function(){
    	$state.go('mkSignUp');
     }
     
     $rootScope.gotoLogin = function(){
    	$state.go('mkSignIn');
     }
     
     $rootScope.gotoHome = function(){
    	$state.go('tabsController.Home');
     }
	
	//验证身份的统一逻辑（如果当前页面，就是注册/登录页面，则不能调用这个接口）
	$rootScope.mkAuth = function(){
		if($rootScope.isUserAuthed())
	     {
	     	//$state.go('tabsController.Home');
	     } else {
	     	$state.go('mkSignIn');
	     }
	}
	
	//服务器响应，如果不是200，则统一执行的逻辑
	$rootScope.mkAlertServerError = function(){
		$rootScope.showMkAlert("系统开了会小差,请稍后再试...");
	}
	
	$rootScope.mkAlertApiResponseError = function(){
		$rootScope.showMkAlert("系统返回的数据，不符合规范...");
	}
	
	//get/post请求后，根据响应结果，执行的逻辑
	$rootScope.commonLogic = function(resp,mkSucCallback,mkFailCallback){
 	 	if(resp.status == 200 ){
 	    	if(resp.data.result=='Succeed'){
				//服务器返回200，如果结果是处理成功，则执行成功的逻辑
				mkSucCallback(resp.data);	
			} else {
				//服务器返回200，如果结果是处理失败，则执行失败的逻辑
				mkFailCallback(resp.data);
			}
		} else {
			//如果服务器的状态码不是200,就统一提示：系统异常
			$rootScope.mkAlertServerError();
		}
		$rootScope.hideMkLoading();
	}//end of common logic
	
	//get/post请求后，根据响应结果，执行的逻辑,用于返回的字符串中没有result字段的
	$rootScope.commonLogic2 = function(resp,mkSucCallback,mkFailCallback){
 	 	if(resp.status == 200 ){
			//服务器返回200，如果结果是处理成功，则执行成功的逻辑
			mkSucCallback(resp.data);	
		} else {
			//如果服务器的状态码不是200,就统一提示：系统异常
			$rootScope.mkAlertServerError();
		}
		$rootScope.hideMkLoading();
	}//end of common logic
	
  	$rootScope.getMkRequest = function(mkInterface,someobj,mkSucCallback,mkFailCallback){
		someobj.jwt_token = $rootScope.mkToken;
		$rootScope.showMkLoading();
		$http.get(mkHost + mkInterface,JSON.stringify(someobj)).then(function(resp) {
			$rootScope.commonLogic(resp,mkSucCallback,mkFailCallback);
		});
 	
  	}//end of getMkRequest
	
	
  	$rootScope.postMkRequest = function(mkInterface,someobj,mkSucCallback,mkFailCallback){
		someobj.jwt_token = $rootScope.mkToken;
		$rootScope.showMkLoading();
		$http.post(mkHost + mkInterface,JSON.stringify(someobj)).then(function(resp) {
		 	 $rootScope.commonLogic(resp,mkSucCallback,mkFailCallback);
		}); 			  
  	}//end of postMkRequest 
	
  	$rootScope.getMkRequest2 = function(mkInterface,someobj,mkSucCallback,mkFailCallback){
		someobj.jwt_token = $rootScope.mkToken;
		$rootScope.showMkLoading();
		$http.get(mkHost + mkInterface,JSON.stringify(someobj)).then(function(resp) {
			$rootScope.commonLogic2(resp,mkSucCallback,mkFailCallback);
		});
  	}//end of getMkRequest
	
	
  	$rootScope.postMkRequest2 = function(mkInterface,someobj,mkSucCallback,mkFailCallback){
		someobj.jwt_token = $rootScope.mkToken;
		$rootScope.showMkLoading();
		$http.post(mkHost + mkInterface,JSON.stringify(someobj)).then(function(resp) {
		 	 $rootScope.commonLogic2(resp,mkSucCallback,mkFailCallback);
		}); 	  			  
  	}//end of postMkRequest 
	
 	$rootScope.openTab = function (val){
  	  if(val==1){
   	   		$state.go('tabsController.Video');
 		}
 	   if(val==2){
   			$state.go('tabsController.Topic');
 	   }
 	  if(val==3){
   	   		$state.go('tabsController.Doctor');
 	   }
 	  if(val==4){
   	   		$state.go('tabsController.mkLive');
 	   }
	   
  	  if(val==5){
    	   	$state.go('tabsController.mkLiveList');
  	   }
	}
	
	$rootScope.saveUserInfo = function (mkResp){	
		$localstorage.setObject('mkUser',mkResp.user);
		$localstorage.set('firstTime', 'Y');	
	}
	$rootScope.getUserInfo = function (){
		return $localstorage.getObject('mkUser');
	}
	$rootScope.updateUserInfo = function (realname){
		var mkUserInfo = $localstorage.getObject('mkUser');
		mkUserInfo.realname = realname;
		$localstorage.setObject('mkUser',mkUserInfo);
	}
	$rootScope.isUserAuthed = function (){
		var mkUser = $localstorage.get('mkUser');
		return mkUser.id > 0;
	}
	$rootScope.clearUserInfo = function (){
		$localstorage.setObject('mkUser','');
	}
	
	$rootScope.homeTabName = "首页";
	$rootScope.dynamicTabName = "动态";
	$rootScope.messageTabName = "消息";
	$rootScope.settingTabName = "设置";
	
	$rootScope.liveColumn = "直播";
	$rootScope.videoColumn = "视频";
	$rootScope.topicColumn = "话题";
	$rootScope.doctorColumn = "医师";
	
	$rootScope.mkMore = "更多";
	
	$rootScope.loadNexPageVideos = '加载更多视频...';
	$rootScope.noMoreVideos = '没有更多视频视频了...';
	
})//root end



