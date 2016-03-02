angular.module('app.services', ['ngResource'])

.factory('VideoService', ['$resource', function($resource){
  return $resource('videos/:videoId.json', {}, {
    query: {method:'GET', params:{videoId:'videos'}, isArray:true}});
}])

.service('BlankService', [function(){

}]);

