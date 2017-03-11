﻿ozApp.factory('ozAppData', function () {

    var data = {};

    return {
        getData: function () {
            return data;
        },
        setData: function (responsedata) {
            data = responsedata;
        }
    };
});

ozApp.factory('TipsCount', ['$http', function ($http) {
    var data = {};

    return {
        getData: function () {
            return data.length;
        },
        setData: function (value) {
            data =value ;
        }
    };
}]);

ozApp.factory('listID', function () {

    var data = {};

    return {
        getData: function () {
            return data;
        },
        setData: function (responsedata) {
            data = responsedata;
        }
    };
});

ozApp.controller("homeCtrl", ['$scope', '$routeParams', 'TipsCount', function ($scope, $routeParams, TipsCount) {
    $scope.indexpages = [
        { path: "/programing", name: "Programing" },
        { path: "/articles", name: "Articles" },
        { path: "/tips", name: "Tips" }
    ];
    
    $scope.$watch(function () {
        $scope.tipsCount= TipsCount.getData();
    },
        function (newValue, oldValue) {
            if (newValue !== oldValue) $scope.tipsCount = newValue;
    });
}]);

ozApp.controller("TipsCtrl", ['$scope', '$routeParams', 'TipsCount', function ($scope, $routeParams, TipsCount) {
    $scope.tipsCount = $("section div div div a").length;
    $scope.$watch('tipsCount', function (newValue, oldValue) {
        if (newValue !== oldValue) TipsCount.setData();
    });
    //$scope.tipsCount = TipsCount.getData();
}]);


ozApp.controller("ListController", ['$scope', '$routeParams', '$http', 'NgTableParams', 'ozAppData', 'listID', function ($scope, $routeParams, $http, NgTableParams, ozAppData, listID) {
    listID.setData($routeParams.teamID);
    var link = "../AI/data/SqlQuery.aspx?mode=" + $routeParams.teamID;
    $http.get(link)
.then(function (response) {
    var data = response.data.records;
    ozAppData.setData(data);
    $scope.tableParams = new NgTableParams({}, { dataset: data });
});

}]);

ozApp.controller('DetailsController', ['$scope', '$routeParams', '$http', 'ozAppData', 'listID', function ($scope, $routeParams, $http, ozAppData, listID) {

    $scope.pageId = listID.getData();
    $scope.tools = ozAppData.getData();
    $scope.whichItem = $routeParams.appIndex;

    if ($scope.pageId === "ALL") {
        $http.get("../AI/data/SqlQuery.aspx?mode=" + $scope.tools[$scope.whichItem].ID).then(function (response) {
            var data = response.data.records;
            var desr = data[0]["Description"];
            $scope.tools[$scope.whichItem].Description = desr;
        });
    }

    if ($routeParams.appIndex > 0) {
        $scope.prevItem = Number($routeParams.appIndex) - 1;
    } else {
        $scope.prevItem = $scope.tools.length - 1;
    }

    if ($routeParams.appIndex < $scope.tools.length - 1) {
        $scope.nextItem = Number($routeParams.appIndex) + 1;
    } else {
        $scope.nextItem = 0;
    }

}]);

ozApp.controller('AccessController', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
    $http.get("../AI/data/accessRequest.aspx").then(function (response) {
        var data = response.data.records;
        //var desr = data[0]["Description"];
        $scope.GSCList = data;
    });
    $scope.roles = [
        { name: "roleradio", id: 1, value: "Admin" },
        { name: "roleradio", id: 2, value: "SuperUser" },
        { name: "roleradio", id: 3, value: "User" },
        { name: "roleradio", id: 4, value: "Export" }
    ];

    // create a blank object to hold our form information
    // $scope will allow this to pass between controller and view
    $scope.formData = {};
    // process the form
    $scope.processForm = function () {
        $http({
            method: 'POST',
            url: '../AI/data/accessRequest.aspx',
            data: $.param($scope.formData),  // pass in data as strings
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
        })
        .success(function (data) {
            console.log(data);
            $scope.message = data;
            //if (!data.success) {
            //    // if not successful, bind errors to error variables
            //    $scope.errorName = data.errors[0];
            //    $scope.errorSuperhero = data.errors[1];
            //} else {
            //    // if successful, bind success message to message
            //    $scope.message = data.message;
            //}
        });
    };

}]);
