function Project(id,name,description,author,fileSize,createdDate,site) {
  this.$id = id;
  this.name = name;
  this.description = description;
  this.author = author;
  this.fileSize = fileSize;
  this.createdDate =createdDate;
  this.site = site;
}

function Projects() {
  projects = [];
  this.projects = projects;
  this.loaded = 0;

  this.add = function(prj) {
    projects.splice(projects.length,0,prj);
  }

  this.get = function(id) {
    for(var i=0;i<projects.length;i++) {
      var prj = projects[i];
      if(prj.$id == id)
        return prj;
    }
  }

  this.remove = function(id) {
    for(var i=0;i<projects.length;i++) {
      if(projects[i].$id == id) {
        projects.splice(i,1);
        return;
      }
    }
  }

  this.update = function(itemOrId) {
    alert(itemOrId);
  }
}

angular.projects = new Projects();

angular.module('project',['ngRoute']).
  factory('ProjectsData', function ($q, $timeout){
    var service = {};

    service.get = function() {
        var deferred = $q.defer(),
            projects = [  
  {  
    "$id":"1",
    "name":"AngularJS",
    "description":"HTML enhanced for web apps!",
    "author":"Vivek",
    "fileSize" : "30 mb",
    "createdDate":"2016-01-16T01:05:00.055Z",
    "site":"http://angularjs.org/"
  },
  {  
    "$id":"2",
    "name":"Backbone",
    "description":"Models for your apps.",
    "author":"Sudhir",
    "fileSize" : "43 mb",
    "createdDate":"2015-11-10T09:05:00.055Z",
    "site":"http://documentcloud.github.com/backbone/"
  },
  {  
    "$id":"3",
    "name":"Batman",
    "description":"Quick and beautiful.",
    "author":"Koushik",
    "fileSize" : "33 mb",
    "createdDate":"2015-01-03T01:05:00.055Z",
    "site":"http://batmanjs.org/"
  },
  {  
    "$id":"4",
    "name":"Cappucino",
    "description":"Objective-J.",
    "author":"Shiva",
    "fileSize" : "50 mb",
    "createdDate":"2015-07-10T09:05:00.040Z",
    "site":"http://cappuccino.org/"
  },
  {  
    "$id":"5",
    "name":"Ember",
    "description":"Ambitious web apps.",
    "author":"Santhosh",
    "fileSize" : "9 mb",
    "createdDate":"2016-06-08T10:10:00.045Z",
    "site":"http://emberjs.com/"
  },
  {  
    "$id":"6",
    "name":"GWT",
    "description":"JS in Java.",
    "author":"Deol",
    "fileSize" : "8 mb",
    "createdDate":"2015-08-06T03:08:00.030Z",
    "site":"https://developers.google.com/web-toolkit/"
  },
  {  
    "$id":"7",
    "name":"jQuery",
    "description":"Write less, do more.",
    "author":"john",
    "fileSize" : "6 mb",
    "createdDate":"2016-05-18T15:18:00.033Z",
    "site":"http://jquery.com/"
  },
  {  
    "$id":"8",
    "name":"Knockout",
    "description":"MVVM pattern.",
    "author":"Kranthi",
    "fileSize" : "25 mb",
    "createdDate":"2016-10-01T01:05:00.055Z",
    "site":"http://knockoutjs.com/"
  },
  {  
    "$id":"9",
    "name":"Sammy",
    "description":"Small with class.",
    "author":"Aman",
    "fileSize" : "15 mb",
    "createdDate":"2016-06-07T01:05:00.055Z",
    "site":"http://sammyjs.org/"
  },
  {  
    "$id":"10",
    "name":"Spine",
    "description":"Awesome MVC Apps.",
    "author":"Meena",
    "fileSize" : "10 mb",
    "createdDate":"2014-09-18T01:05:00.055Z",
    "site":"http://spinejs.com/"
  },
  {  
    "$id":"11",
    "name":"SproutCore",
    "description":"Innovative web-apps.",
    "author":"Hari",
    "fileSize" : "6 mb",
    "createdDate":"2014-08-02T10:00:00.055Z",
    "site":"http://sproutcore.com/"
  }
];

        $timeout(function(){
            deferred.resolve(projects);
        }, 800);

        return deferred.promise;
    };
    return service;
  }).
  factory('Projects', function() {
    return angular.projects;
  }).
  config(function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/', {controller:ListCtrl, templateUrl:'list.html'}).
    when('/edit/:projectId', {controller:EditCtrl, templateUrl:'detail.html'}).
    when('/new', {controller:CreateCtrl, templateUrl:'detail.html'}).
    otherwise({redirectTo:'/'});
    // enable html5Mode
    //$locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('');
  });


     
function ListCtrl($scope, $http, Projects, ProjectsData) {
  if(Projects.loaded == 0) {
      ProjectsData.get().then(function(data) {
      for(var i = 0;i<data.length;i++) {
        var itm = data[i];
        Projects.add(new Project(itm.$id,itm.name,itm.description,itm.author,itm.fileSize,itm.createdDate,itm.site));
      }
    });
    Projects.loaded = 1;
  }
  $scope.projects = Projects;

  $scope.deleteDoc = function(id) {
      Projects.remove(id);
   };
   $scope.hideFilter = true;
}
     
function CreateCtrl($scope, $location, $timeout, Projects) {
  $scope.project = new Project();
  $scope.save = function() {
    $scope.project.$id = randomString(5,"abcdefghijklmnopqrstuvwxyz0123456789");
    $scope.project.createdDate= new Date();
    Projects.add(angular.copy($scope.project));
    $location.path('/');
  }
}

function EditCtrl($scope, $location, $routeParams, Projects) {
   $scope.project = angular.copy(Projects.get($routeParams.projectId));
   $scope.isClean = function() {
      return angular.equals(Projects.get($routeParams.projectId), $scope.project);
   }
   $scope.destroy = function() {
      Projects.remove($routeParams.projectId);
      $location.path('/');
   };
   $scope.save = function() {
      var prj = Projects.get($routeParams.projectId);
      prj.name = $scope.project.name;
      prj.description = $scope.project.description;
      prj.fileSize = $scope.project.fileSize;
      prj.author = $scope.project.author;
      prj.createdDate = $scope.project.createdDate;
      prj.site = $scope.project.site;
      $location.path('/');
   };
}

function randomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i) 
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
}
