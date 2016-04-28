(function() {
    'use strict';

    angular
        .module('ngClassifieds')
        .controller('classfiedsCtrl', classfiedsCtrl);

    /* @ngInject */
    function classfiedsCtrl($scope, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {

        classifiedsFactory.getClassifieds().then(function(classifieds) {
            //console.log(classifieds);
            $scope.classifieds = classifieds.data;
            //-----------------------------------------------------------
            //    categories
            //-----------------------------------------------------------
            $scope.categories = getCategories($scope.classifieds);
        });

        //-----------------------------------------------------------
        //    local object
        //-----------------------------------------------------------
        var contact = {
            name: "francisco jose",
            phone: 674 - 57483 - 499390,
            email: "franz@mena.com"
        };


        //-----------------------------------------------------------
        //    sidebar
        //-----------------------------------------------------------
        $scope.openSidebar = function() {
            $mdSidenav('left').open();
        };

        $scope.closeSidebar = function() {
            $mdSidenav('left').close();
        };
        //-----------------------------------------------------------
        //    save data 
        //-----------------------------------------------------------
        $scope.saveClassified = function(classified) {
            if (classified) {
                classified.contact = contact;
                $scope.classifieds.push(classified);
                $scope.classified = {};
                $scope.closeSidebar();
                showToast('Classified saved !');
            }

        };

        //-----------------------------------------------------------
        //    edit classified
        //-----------------------------------------------------------
        $scope.editClassified = function(classified) {

            $scope.editing = true;
            $scope.openSidebar();
            $scope.classified = classified;

        };

        //-----------------------------------------------------------
        //    save editing
        //-----------------------------------------------------------
        $scope.saveEdit = function(classified) {

            $scope.editing = false;
            $scope.classified = {};
            $scope.closeSidebar();
            showToast('Edit saved !');
        };

        //-----------------------------------------------------------
        //    delete item
        //-----------------------------------------------------------
        $scope.deleteClassified = function(event, classified) {

            var confirm = $mdDialog.confirm()
                .title('Are you sure you want to delete' + classified.title + '?')
                .ok('yes')
                .cancel('no')
                .targetEvent(event);

            $mdDialog.show(confirm).then(function() {
                var index = $scope.classifieds.indexOf(classified);
                $scope.classifieds.splice(index, 1);
            }, function() {

            });

        };


        function showToast(message) {
            $mdToast.show(
                $mdToast.simple()
                .content(message)
                .position('top, right')
                .hideDelay(3000)
            );
        }


        function getCategories(classifieds) {
            var categories = [];
            angular.forEach(classifieds, function(item) {
                angular.forEach(item.categories, function(category) {
                    categories.push(category);
                });
            });

            //return _.iniq(categories);
        }





    } // end function classfiedsCtrl....

})();
