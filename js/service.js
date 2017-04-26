NGAApp.service('authService', ['$http', function ($http) {
    var getUser = function () {
        var link = "../AI/data/UserControl.aspx";
        return $http.get(link).then(function (response) {
            user = response.data.records;
            return user;
        });
    };
    return { getUser: getUser };
}]);

NGAApp.directive('restrict', function (authService) {
    return {
        restrict: 'A',
        priority: 10,
        scope: false,
        link: function () { },
        compile: function (element, attr, linker) {

            var user = authService.getUser();
            user.then(function (result) {
                var accessDenied = true;
                var attributes = attr.access.split(" ");
                for (var i in attributes) {
                    if (result[0].Role == attributes[i]) {
                        accessDenied = false;
                    }
                }

                if (accessDenied) {
                    element.children().remove();
                    element.remove();
                }
            })

        }
    };

});