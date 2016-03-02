angular.module('app.controllers', [])

.controller('mkWelcomeCtrl',['$state','$scope','$localstorage', function($state,$scope,$localstorage) {
	//首页的主线程
	$scope.mkWelcomeMainFunc = function(){
		if(!$localstorage.get('didTutorial')||true) {
			$localstorage.set('didTutorial','true');
		} else {
			$state.go('mkSignIn');
		}
	}
    $scope.gotoMainPage = function (){
           $state.go('tabsController.Home');
    }
	$scope.mkWelcomeMainFunc();
}])

//
.controller('HomeCtrl', ['$scope','$state', '$http', '$rootScope','$cordovaFlashlight','$cordovaBarcodeScanner',
		function($scope, $state, $http,$rootScope,$cordovaFlashlight,$cordovaBarcodeScanner) {
	
 	$scope.mkGetLiveListSuc = function(mkResp){
		if(mkResp){
			$scope.mkLiveList = mkResp.data;
		} else {
			//todo 页面显示：没有数据
		}
 	}
 
 	$scope.mkGetLiveListFail = function(mkResp){
		$rootScope.showMkAlert("获取推荐视频时发生异常，原因:"+mkResp.result);
 	}
		
 	$scope.mkSuggestVideoSuc = function(mkResp){
		if(mkResp){
			$scope.recommendVideo = mkResp.splice(0,3);
		} else {
			//todo 页面显示：没有数据
		}
 	}
 
 	$scope.mkSuggestVideoFail = function(mkResp){
		$rootScope.showMkAlert("获取推荐视频时发生异常，原因:"+mkResp.result);
 	}
 
 	$scope.mkSuggestTopicSuc = function(mkResp){
		if(mkResp){
			$scope.recommendTopic = mkResp.splice(0,3);
		} else {
			//todo 页面显示：没有数据
		}
 	}
 
 	$scope.mkSuggestTopicFail = function(mkResp){
		$rootScope.showMkAlert("获取推荐话题时发生异常，原因:"+mkResp.result);
 	}
 
 	$scope.mkSuggestedUserSuc = function(mkResp){
		if(mkResp){
			$scope.recommendUser = mkResp.splice(0,3);
		} else {
			//todo 页面显示：没有数据
		}
 	}
 
 	$scope.mkSuggestedUserFail = function(mkResp){
		$rootScope.showMkAlert("获取推荐用户时发生异常，原因:"+mkResp.result);
 	}
  
  	$scope.mkHomeSearch = function (mkAllKeyword,mkCurrentKeyword){
    	if(mkCurrentKeyword == 13){
			//搜索栏失去焦点，键盘会自动隐藏
			document.getElementById("mkSearchField").blur();
			
			$rootScope.showMkLoading();
    		$state.go('tabsController.Video',{ 'mkAllKeyword': mkAllKeyword,'mkCurrentKeyword':mkCurrentKeyword});
			$rootScope.hideMkLoading();
   	 	}
 	}

	$scope.openOneVideo = function (){
 	   $state.go('tabsController.TopicDetail');
	}
	
	//首页的主线程
	$scope.mkHomeMainFunc = function(){
		
		var mkGetLiveListParam = new Object;
		$rootScope.getMkRequest2($rootScope.mkGetLiveListApi,mkGetLiveListParam,$scope.mkGetLiveListSuc,$scope.mkGetLiveListFail);
		
		var mkSuggestVideoParam = new Object;
		mkSuggestVideoParam.page = 1;
		$rootScope.getMkRequest2($rootScope.mkSuggestedVideoApi,mkSuggestVideoParam,$scope.mkSuggestVideoSuc,$scope.mkSuggestVideoFail);
	
		var mkSuggestTopicParam = new Object;
		mkSuggestTopicParam.page = 1;
		$rootScope.getMkRequest2($rootScope.mkSuggestedTopicApi,mkSuggestTopicParam,$scope.mkSuggestTopicSuc,$scope.mkSuggestTopicFail);
	
		var mkSuggestedUserParam = new Object;
		mkSuggestedUserParam.page = 1;
		$rootScope.getMkRequest2($rootScope.mkSuggestedUserApi,mkSuggestedUserParam,$scope.mkSuggestedUserSuc,$scope.mkSuggestedUserFail);
	}
		
	$scope.doRefresh = function (){
    	$scope.mkHomeMainFunc();
		//todo:三个都执行完成后，才调用broadcast。当前有bug
 		$scope.$broadcast('scroll.refreshComplete');
	}

	$scope.mkScanBar = function (){
		$cordovaBarcodeScanner
              .scan()
              .then(function(barcodeData) {
                // Success! Barcode data is here
                 window.open(barcodeData.text,'_self');

              }, function(error) {
                // An error occurred
                 alert("mkErr")
              });
	}

    $scope.mkShareApp = function (){
                         $cordovaFlashlight.available()
                         .then(function (success) { /* success */ },
                               function (error) { /* error */ });
    }
	$scope.mkHomeMainFunc();
}])
//
.controller('DynamicCtrl', ['$scope', '$http', '$rootScope','$ionicModal',function($scope, $http , $rootScope,$ionicModal) {
 	$scope.mkGetDynamicSuc = function(mkResp){
		if(mkResp && mkResp.data){
			$scope.dynamics = mkResp.data;
		} else {
			$rootScope.mkAlertApiResponseError();
		}
 	}
 
 	$scope.mkGetDynamicFail = function(mkResp){
		$rootScope.showMkAlert("获取所有人的动态时发生异常，原因:"+mkResp.result);
 	}
	
	//首页的主线程
	$scope.mkDynamicMainFunc = function(){
		var mkAllUserDynamicParam = new Object;
		mkAllUserDynamicParam.page = 1;
		$rootScope.getMkRequest2($rootScope.mkAllUserDynamicApi,mkAllUserDynamicParam,$scope.mkGetDynamicSuc,$scope.mkGetDynamicFail);
	}
	
    $scope.doRefresh = function (){
	  $scope.mkDynamicMainFunc();
      $scope.$broadcast('scroll.refreshComplete');
    }
	$scope.mkDynamicMainFunc();




}])
//
.controller('MessageCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
	 $scope.shouldShowDelete = false;
 	$scope.shouldShowReorder = false;
 	$scope.listCanSwipe = true;
 
	$scope.selection = "first";
	$scope.mkFirstTab = "button button-mk";
	$scope.mkSecTab = "button";

	$scope.setIndex = function(mkIndex){
		if(mkIndex == 0){
			$scope.selection='first';
			$scope.mkFirstTab="button button-mk";
			$scope.mkSecTab="button";
		} else {
			$scope.selection='second';
			$scope.mkSecTab="button button-mk";
			$scope.mkFirstTab="button";
		}
	}
	
 	$scope.mkGetMessageSuc = function(mkResp){
		if(mkResp && mkResp.data){
			$scope.mkMyMessage = mkResp.data;
		} else {
			$rootScope.mkAlertApiResponseError();
		}
 	}
 
 	$scope.mkGetMessageFail = function(mkResp){
		$rootScope.showMkAlert("获取所有人的动态时发生异常，原因:"+mkResp.result);
 	}
	
	//首页的主线程
	$scope.mkGetMessageMainFunc = function(){
		var mkMyMessageParam = new Object;
		mkMyMessageParam.page = 1;
		$rootScope.getMkRequest2($rootScope.mkMyMessageApi,mkMyMessageParam,$scope.mkGetMessageSuc,$scope.mkGetMessageFail);
	}
	
    $scope.doRefresh = function (){
	  $scope.mkGetMessageMainFunc();
      $scope.$broadcast('scroll.refreshComplete');
    }
	$scope.mkGetMessageMainFunc();
	$scope.mkUser = $rootScope.getUserInfo();
 	$scope.mkUserId = $scope.mkUser.id;
}])

.controller('UpdateProfileCtrl', ['$scope','$rootScope','$state', function($scope,$rootScope,$state) {
	
 	$scope.mkUpdateProfileSuc = function(mkResp){
		if(mkResp && mkResp.result=='Succeed'){
			//$rootScope.showMkAlert("成功地更新了个人资料");
			$state.go('tabsController.Profile');
			
			$rootScope.updateUserInfo(mkResp.realname);
		} else {
			$rootScope.mkAlertApiResponseError();
		}
 	}
 
 	$scope.mkUpdateProfileFail = function(mkResp){
		$rootScope.showMkAlert("更新个人资料发生异常，原因:"+mkResp.result);
 	}
	
	
	
	//经过检查，后台的接口，我用json传数据时，不支持。只能通过form方式，发送请求
	$scope.updateProfile = function(mkuser){
		var mkCurrentUser = $rootScope.getUserInfo();
		var mkUpdateProfileParam = new Object;
		//mkUpdateProfileParam.mobile = mkCurrentUser.mobile;
		//mkUpdateProfileParam.realname = mkuser.username;
		//mkUpdateProfileParam.department = mkuser.mkdept;
		$rootScope.postMkRequest2($rootScope.mkUpdateProfileApi+"?realname="+mkuser.username+"&department="+mkuser.mkdept+"&jwt_token="+$rootScope.mkToken,mkUpdateProfileParam,$scope.mkUpdateProfileSuc,$scope.mkUpdateProfileFail);
	}
}])

.controller('mkLiveListCtrl', ['$scope','$rootScope', function($scope,$rootScope) {
 	$scope.mkGetLiveListSuc = function(mkResp){
		if(mkResp){
			$scope.mkLiveList = mkResp.data;
		} else {
			//todo 页面显示：没有数据
		}
 	}
 
 	$scope.mkGetLiveListFail = function(mkResp){
		$rootScope.showMkAlert("获取直播会议时发生异常，原因:"+mkResp.result);
 	}
	var mkGetLiveListParam = new Object;
	$rootScope.getMkRequest2($rootScope.mkGetLiveListApi,mkGetLiveListParam,$scope.mkGetLiveListSuc,$scope.mkGetLiveListFail);
	
}])

.controller('mkLiveCtrl', ['$scope','$rootScope','$stateParams','$sce', function($scope,$rootScope,$stateParams,$sce) {
	$scope.selection = "first";
	$scope.mkFirstTab = "button button-mk";
	$scope.mkSecTab = "button";
	
    $scope.trustSrc = function(src) {
   		return  $sce.trustAsResourceUrl(src);
     }
	 
	$scope.mkGetOneLiveSuc = function(mkResp){
		$scope.mkLive = mkResp;
		$scope.mkComments = mkResp.comments;
		
	}
	
	$scope.mkGetOneLiveFail = function(mkResp){
		$rootScope.showMkAlert("系统出现故障，原因:"+mkResp.result);
	}
	/**
	var videoState = document.getElementById("mkVideo").readyState;
	    if(videoState == 0)
	    $rootScope.showMkAlert('该直播未开始或已结束...');*/
	
	var mkGetOneLiveParam = new Object;
	$rootScope.getMkRequest2($rootScope.mkGetOneLiveApi+$stateParams.mkLiveId,mkGetOneLiveParam,$scope.mkGetOneLiveSuc,$scope.mkGetOneLiveFail);
	
	
	$scope.setIndex = function(mkIndex){
		if(mkIndex == 0){
			$scope.selection='first';
			$scope.mkFirstTab="button button-mk";
			$scope.mkSecTab="button";
		} else {
			$scope.selection='second';
			$scope.mkSecTab="button button-mk";
			$scope.mkFirstTab="button";
		}
	}
	$scope.addComment = function(){
		var one = new Object;
		one.id = startX++;
		var mkUserInfo = $rootScope.getUserInfo();
		one.name = mkUserInfo.realname;
		one.content = $scope.mkCommentContent;
		$scope.mkComments.push(one);
		
		$scope.mkCommentContent = '';
	}
}])
//登录逻辑
.controller('mkSignInCtrl', ['$scope','$http','$state','$ionicLoading','$rootScope', function($scope,$http,$state,$ionicLoading,$rootScope) {
	 $scope.mkSignInSuc = function(mkResp){
		if(mkResp && mkResp.user){
			//$rootScope.showMkAlert("登录成功...");
			$rootScope.saveUserInfo(mkResp);
			$state.go('tabsController.Home');
			$scope.mkPassword='';
			$scope.phonenum='';
		} else {
			//API返回的数据中，如果user字段不存在，则报错：接口返回的数据格式错误
			$rootScope.mkAlertApiResponseError();
		}
	 }
	 
	 $scope.mkSignInFail = function(mkResp){
		$rootScope.showMkAlert("登录失败，错误原因:"+mkResp.result);
	 }
	
	 $scope.submit = function(loginObj){
		var mkPhoneNum = loginObj.phonenum;
		var mkPassword = loginObj.mkPassword;
		if(!mkPhoneNum || mkPhoneNum < 13000000000 || mkPhoneNum > 19999999999){
	      $rootScope.showMkAlert('手机号码不存在，请确认');
	      return ;
	    }else {
			var loginApiParam = new Object;
			loginApiParam.mobile = loginObj.phonenum;
			loginApiParam.password = loginObj.mkPassword;
			$rootScope.postMkRequest($rootScope.mkSignInApi,loginApiParam,$scope.mkSignInSuc,$scope.mkSignInFail);
	    }
    }
}])

.controller('mkSignUpCtrl', ['$scope','$state','$http','$rootScope','$interval',function($scope,$state,$http,$rootScope,$interval) {
	$scope.authorization = {username:"",password:""};  

  	var mkcycleTime = 60;//in secs
  	var mkIntervalTime = 1000;//in milli secs
  	$scope.mkprefix = '发验证码(';
    $scope.mktimer = mkcycleTime;
    $scope.mksuffix = ')';
	$scope.mkdisabled = "";
	$scope.mkVerifyCode = "";
	$scope.mkphonenum = "ss";
	var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9tZWRrdS5jb20iLCJpc19ndWVzdCI6MX0.tHELpls39Bj92bq7tUR-mbC97WR3aUD4Dk99W-sgQD0';
	var stop;

$scope.sendVerifyCode = function() {
          // Don't start a new fight if we are already fighting
          if ( angular.isDefined(stop) ) return;
          var phoneNumber = $scope.authorization.phonenum;
          if(!phoneNumber || phoneNumber < 13000000000 || phoneNumber > 19999999999)
          {
            $rootScope.showMkAlert('手机号码不存在，请确认');
            return ;
          }
          else {

            var jsonData = '{"token":"'+token+'","mobile":"'+$scope.authorization.phonenum+'"}';
            $http.post('http://medku.com/api/v1/user/register_mobile_verify',jsonData).then(function(resp) {
              if(resp.status == 200 ){
                if(resp.data.result=='Succeed')
                    $rootScope.showMkAlert("验证码已经发到您的手机，请注意查收...");
                else {
                    $rootScope.showMkAlert("发送验证码失败,原因:"+resp.data.result);
                }
              } else {
                $rootScope.showMkAlert("服务器出问题了，请稍候再试.或者您可以换个手机号码尝试下。");
              }
            }, function(err) {
             $rootScope.showMkAlert("服务器出问题了，请稍候再试...");
           });

          }

          stop = $interval(function() {
            if ($scope.mktimer > 0) {
              $scope.mktimer = $scope.mktimer - 1;
              $scope.mkdisabled = "disabled";
            } else {
              $scope.stopFight();;
              $scope.mktimer = mkcycleTime;
              $scope.mkdisabled = "";
            }
          }, mkIntervalTime);
          //TODO: send ajax request to get verify no.
          // $http.get('http://www.w3school.com.cn/example/jquery/demo_ajax_json.js').then(function(resp) {
          //     $scope.mkprefix = resp.data.firstName;
          // }, function(err) {
          //     console.error('ERR', err);
          // });
};

$scope.stopFight = function() {
  if (angular.isDefined(stop)) {
    $interval.cancel(stop);
    stop = undefined;
  }
};

$scope.resetFight = function() {
  $scope.mktimer = mkcycleTime;
};

$scope.signIn = function() {
  var jsonData = '{"token":"'+token+'","mobile":"'+$scope.authorization.phonenum+'","code":"'+$scope.authorization.mkVerifyCode+'"}';
  $http.post('http://medku.com/api/v1/user/register_mobile_verify_check',jsonData).then(function(resp) {
    if(resp.status == 200){
      if(resp.data.result=='Succeed'){
        window.localStorage['mkphoneNum'] = $scope.authorization.phonenum;
        $state.go('mkhome');
      } else {
        alert("系统出错了");
      }  
    }
  }, function(err) {
   alert("手机号和验证码不匹配...");
 });
}

$scope.$on('$destroy', function() {
    // Make sure that the interval is destroyed too
    $scope.stopFight();
});

}])

.controller('mkHomeCtrl', ['$scope','$state','$http',function($scope,$state,$http) {
 $scope.mkuser = {
  	username: '',
  	password1 : '',
  	password2 : '',
  	mkdept:''
	};  

var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9tZWRrdS5jb20iLCJpc19ndWVzdCI6MX0.tHELpls39Bj92bq7tUR-mbC97WR3aUD4Dk99W-sgQD0';

$scope.signIn2 = function(mkuser,form) {
  if(form.$valid) {
    if(mkuser.password1==mkuser.password2){

      var jsonData = '{"token":"'+token+'","mobile":"'+window.localStorage['mkphoneNum']
      +'","realname":"'+$scope.mkuser.username
      +'","department":"'+$scope.mkuser.mkdept
      +'","password":"'+$scope.mkuser.password1
      +'"}';
      $http.post('http://medku.com/api/v1/user/register',jsonData).then(function(resp) {
        if(resp.status == 200 ){
          if(resp.data.result=='Succeed'){
            window.localStorage['mkAuthenUser'] = 1;
            $state.go('tabsController.Home');
          } else {
            alert(resp.data.result);
          }

        }
      }, function(err) {
       alert("注册时系统出错了...");
     });
    } else {
      alert('两次输入的密码不一致...');
      return ;
    }
  }
};  

}])

// .controller('AddCtrl', function($scope) {
//
// })

//done
.controller('ProfileCtrl', ['$scope','$rootScope','$state', '$http', function($scope,$rootScope, $state,$http) {
	
	$scope.mkCurrentUser = $rootScope.getUserInfo();
	
 	$scope.mkLogoutSuc = function(mkResp){
		if(mkResp){
			$rootScope.clearUserInfo();
			$rootScope.mkAuth();
		} else {
			$rootScope.mkAlertApiResponseError();
		}
 	}

 	$scope.mkLogoutFail = function(mkResp){
		$rootScope.showMkAlert("获取所有人的动态时发生异常，原因:"+mkResp.result);
 	}
	
 	$scope.mkLogout = function (){
		var mkLogoutParam = new Object;
		mkLogoutParam.page = 1;
		$rootScope.getMkRequest($rootScope.mkLogoutApi,mkLogoutParam,$scope.mkLogoutSuc,$scope.mkLogoutFail);
 	}//end of mkLogout
}])

.controller('VideoCtrl', ['$scope','$state', '$http','$stateParams','$rootScope', function($scope, $state,$http,$stateParams,$rootScope) {
	
	var deptUrl = "http://medku.com/api/v1/videos/top_tags";
	var deptUrl2 = "http://medku.com/api/v1/videos/list_tags";
	var mkCurrentPage = 1;
	$scope.loadNexPageVideos = $rootScope.loadNexPageVideos;

	$scope.mkTag="";
     $http.get(deptUrl).then(function(resp) {
         if(resp.status == 200){
           $scope.firstLevelClassifyList = resp.data;
		 
	       $http.get(deptUrl2, {params: {parent_id:resp.data[0].id}}).then(function(resp) {
	           if(resp.status == 200){
	             $scope.deptList = resp.data;
	           }
	         }, function(err) {
	          console.error('ERR', err);
	        });
 	       $http.get(deptUrl2, {params: {parent_id:resp.data[1].id}}).then(function(resp) {
 	           if(resp.status == 200){
 	             $scope.tagList = resp.data;
 	           }
 	         }, function(err) {
 	          console.error('ERR', err);
 	        });
			$http.get(deptUrl2, {params: {parent_id:resp.data[2].id}}).then(function(resp) {
			 	if(resp.status == 200){
			 	   $scope.classifyList = resp.data;
			 	}
			 }, function(err) {
			 	  console.error('ERR', err);
			 });
			
         }
       }, function(err) {
        console.error('ERR', err);
      });
	  
      $http.get("http://medku.com/api/v1/videos", {params: {page: mkCurrentPage,keyword:$stateParams.mkAllKeyword}}).then(function(resp) {
          if(resp.status == 200){
            $scope.videos = resp.data.data;
          }
        }, function(err) {
         console.error('ERR', err);
       });
	 
	   var ss = "";
	   var deptUrl3 = "http://medku.com/api/v1/videos"; 
     $scope.updateClassify1 = function(){
		 ss = this.selectedTagItem1;
		 this.selectedTagItem2 = '';
		 this.selectedTagItem3 = '';
		$http.get(deptUrl3, {params: {tag:ss}}).then(function(resp) {
		 	if(resp.status == 200){
		 	   $scope.videos = resp.data.data;
		 	}
		 }, function(err) {
		 	  console.error('ERR', err);
		 });
     }
     $scope.updateClassify2 = function(){
		  ss = this.selectedTagItem2;
 		 this.selectedTagItem1 = '';
 		 this.selectedTagItem3 = '';
		$http.get(deptUrl3, {params: {tag:ss}}).then(function(resp) {
		 	if(resp.status == 200){
		 	   $scope.videos = resp.data.data;
		 	}
		 }, function(err) {
		 	  console.error('ERR', err);
		 });
     }
     $scope.updateClassify3 = function(){
		 ss = this.selectedTagItem3;
		 this.selectedTagItem2 = '';
		 this.selectedTagItem1 = '';
		$http.get(deptUrl3, {params: {tag:ss}}).then(function(resp) {
		 	if(resp.status == 200){
		 	   $scope.videos = resp.data.data;
		 	}
		 }, function(err) {
		 	  console.error('ERR', err);
		 });
     }
	 
	 
	 $scope.loadMoreVideo = function(){
		 mkCurrentPage = mkCurrentPage + 1;
         $http.get("http://medku.com/api/v1/videos", {params: {page: mkCurrentPage,keyword:$stateParams.mkAllKeyword}}).then(function(resp) {
             if(resp.status == 200){
               var newPageData = resp.data.data;
			   if(newPageData.length > 0 ){
				   var oldPageData = $scope.videos;
				   $scope.videos = oldPageData.concat(newPageData);
			   } else {
			   	   $scope.loadNexPageVideos = $rootScope.noMoreVideos;
			   }
			   
             }
           }, function(err) {
            console.error('ERR', err);
          });
	 }
}])
//done
.controller('UserVideoCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
	$scope.mkMyVideoSuc = function(mkResp){
		if(mkResp && mkResp.data){
			$scope.mkMyVideos = mkResp.data;;
		} else {
			$rootScope.mkAlertApiResponseError();
		}
	}

	$scope.mkMyVideoFail = function(mkResp){
		$rootScope.showMkAlert("获取我的视频时发生异常，原因:"+mkResp.result);
	}

	var mkMyVideoParam = new Object;
	mkMyVideoParam.page = 1;
	$rootScope.getMkRequest2($rootScope.mkMyVideoApi,mkMyVideoParam,$scope.mkMyVideoSuc,$scope.mkMyVideoFail);

}])
//done
.controller('UserFavoriteCtrl', ['$scope', '$rootScope', function($scope, $rootScope) { 
	$scope.mkMyFavoriteSuc = function(mkResp){
		if(mkResp && mkResp.data){
			$scope.mkMyFavorite = mkResp.data;;
		} else {
			$rootScope.mkAlertApiResponseError();
		}
	}

	$scope.mkMyFavoriteFail = function(mkResp){
		$rootScope.showMkAlert("获取我的收藏时发生异常，原因:"+mkResp.result);
	}

	var mkMyFavoriteParam = new Object;
	mkMyFavoriteParam.page = 1;
	$rootScope.getMkRequest2($rootScope.mkMyFavoriteApi,mkMyFavoriteParam,$scope.mkMyFavoriteSuc,$scope.mkMyFavoriteFail);
}])
//done
.controller('UserCommentCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
   
$scope.mkMyCommentSuc = function(mkResp){
	if(mkResp && mkResp.data){
		$scope.mkMyComment = mkResp.data;;
	} else {
		$rootScope.mkAlertApiResponseError();
	}
}

$scope.mkMyCommentFail = function(mkResp){
	$rootScope.showMkAlert("获取我的收藏时发生异常，原因:"+mkResp.result);
}

var mkMyCommentParam = new Object;
mkMyCommentParam.page = 1;
$rootScope.getMkRequest2($rootScope.mkMyCommentApi,mkMyCommentParam,$scope.mkMyCommentSuc,$scope.mkMyCommentFail);
}])
//done
.controller('UserDynamicCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
		
	$scope.mkMyDynamicSuc = function(mkResp){
		if(mkResp){
			$scope.mkMyDynamic = mkResp;
		} else {
			$rootScope.mkAlertApiResponseError();
		}
	}

	$scope.mkMyDynamicFail = function(mkResp){
		$rootScope.showMkAlert("获取我的收藏时发生异常，原因:"+mkResp.result);
	}

	var mkMyDynamicParam = new Object;
	mkMyDynamicParam.page = 1;
	$rootScope.getMkRequest2($rootScope.mkMyDynamicApi,mkMyDynamicParam,$scope.mkMyDynamicSuc,$scope.mkMyDynamicFail);
}])
//done
.controller('UserViewHistoryCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
   
$scope.mkMyViewHistorySuc = function(mkResp){
	if(mkResp){
		$scope.mkMyViewHistory = mkResp;
	} else {
		$rootScope.mkAlertApiResponseError();
	}
}

$scope.mkMyViewHistoryFail = function(mkResp){
	$rootScope.showMkAlert("获取我的收藏时发生异常，原因:"+mkResp.result);
}

var mkMyViewHistoryParam = new Object;
mkMyViewHistoryParam.page = 1;
$rootScope.getMkRequest2($rootScope.mkMyViewHistoryApi,mkMyViewHistoryParam,$scope.mkMyViewHistorySuc,$scope.mkMyViewHistoryFail);
}])
//done
.controller('TopicCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
   $scope.mkSuggestedTopicSuc = function(mkResp){
   	if(mkResp){
   		$scope.topics = mkResp;
   	} else {
   		$rootScope.mkAlertApiResponseError();
   	}
   }

   $scope.mkSuggestedTopicFail = function(mkResp){
   	$rootScope.showMkAlert("获取我的收藏时发生异常，原因:"+mkResp.result);
   }

   var mkSuggestedTopicParam = new Object;
   mkSuggestedTopicParam.page = 1;
   $rootScope.getMkRequest2($rootScope.mkSuggestedTopicApi,mkSuggestedTopicParam,$scope.mkSuggestedTopicSuc,$scope.mkSuggestedTopicFail);
   
}])
//done
.controller('DoctorCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
   $scope.mkSuggestedUserSuc = function(mkResp){
   	if(mkResp){
   		$scope.doctors = mkResp;
   	} else {
   		$rootScope.mkAlertApiResponseError();
   	}
   }

   $scope.mkSuggestedUserFail = function(mkResp){
   	$rootScope.showMkAlert("获取我的收藏时发生异常，原因:"+mkResp.result);
   }

   var mkSuggestedUserParam = new Object;
   mkSuggestedUserParam.page = 1;
   $rootScope.getMkRequest2($rootScope.mkSuggestedUserApi,mkSuggestedUserParam,$scope.mkSuggestedUserSuc,$scope.mkSuggestedUserFail);
   
}])

.controller('VideoDetailCtrl', ['$scope', '$stateParams', '$http','$sce', function($scope, $stateParams, $http, $sce) {

  $scope.trustSrc = function(src) {
	return  $sce.trustAsResourceUrl(src);
  }

  $scope.mkScreenWidth = window.screen.width;
  $http.get('http://medku.com/api/v1/video/'+
    +$stateParams.videoId).then(function(resp) {
      if(resp.status == 200){
        $scope.video = resp.data;
		$scope.videoFullPath = "http://p.bokecc.com/playvideo.bo?uid=4999F7FE4C992AA5&playerid=D1017C43A114E05A&playertype=1&autoStart=true&vid="+$scope.video.cc_vid;
		$scope.comments = resp.data.comments;
      }
    }, function(err) {
     console.error('ERR', err);
   });
}])

//done
.controller('TopicDetailCtrl', ['$scope', '$stateParams', '$rootScope', function($scope, $stateParams, $rootScope) {
     $scope.mkGetOneTopicSuc = function(mkResp){
     	if(mkResp){
     		$scope.topic = mkResp;
     	} else {
     		$rootScope.mkAlertApiResponseError();
     	}
     }

     $scope.mkGetOneTopicFail = function(mkResp){
     	$rootScope.showMkAlert("获取我的收藏时发生异常，原因:"+mkResp.result);
     }

     var mkGetOneTopicParam = new Object;
     mkGetOneTopicParam.page = 1;
     $rootScope.getMkRequest2($rootScope.mkGetOneTopicApi+$stateParams.topicId,mkGetOneTopicParam,$scope.mkGetOneTopicSuc,$scope.mkGetOneTopicFail);
}])