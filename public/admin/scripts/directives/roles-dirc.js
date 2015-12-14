commonModule.directive('authRoles', ['$parse', '$rootScope',
    function($parse, $rootScope) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                if ($rootScope.loggedinUser) {
                    var roles = attrs.authRoles;
                    roles = roles.split(",");
                    if (roles.indexOf('all') == -1) {
                        if (roles.indexOf($rootScope.loggedinUser.role) == -1) {
                            $(element).hide();
                        }
                    } else {
                        $(element).show();
                    }
                } else {
                    $(element).hide();
                }
            }
        };
    }
]);
