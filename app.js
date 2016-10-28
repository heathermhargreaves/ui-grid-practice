var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.edit']);

app.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {

$scope.gridOptions = {  };

$scope.gridOptions.columnDefs =
       [
          { name:'industry', displayName: 'Industry', editableCellTemplate: 'ui-grid/dropdownEditor', cellFilter: 'mapIndustry',
            editDropdownValueLabel: 'industry', editDropdownOptionsArray: [
            { id: 1, industry: 'Tech' },
            { id: 2, industry: 'Healthcare' },
            { id: 3, industry: 'Retail' },
            { id: 4, industry: 'Banking' },
            { id: 5, industry: 'Insurance' }
          ] },
          { name:'territory', field: 'territory' },
          { name:'company', field: 'company'},
          { name:'customerSnippet', field: 'customerSnippet'}
        ];

$scope.msg = {};

$scope.gridOptions.onRegisterApi = function(gridApi){
                 //set gridApi on scope
                 $scope.gridApi = gridApi;
                 gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
                   $scope.msg.lastCellEdited = 'edited row id:' + rowEntity.id + ' Column:' + colDef.name + ' newValue:' + newValue + ' oldValue:' + oldValue ;
                   $scope.$apply();
                 });
               };

$http.get('/data.json')
          .success(function(data) {
            for(i = 0; i < data.length; i++){

              if(data[i].industry === 'tech') {
                data[i].industry = 1;
              }
              else if(data[i].industry === 'healthcare') {
                data[i].industry = 2;
              }
              else if(data[i].industry === 'retail') {
                data[i].industry = 3;
              }
              else if(data[i].industry === 'banking') {
                data[i].industry = 4;
              }
              else if(data[i].industry === 'insurance') {
                data[i].industry = 5;
              }

            }
            $scope.gridOptions.data = data;
          });


}])
      .filter('mapIndustry', function() {
        var genderHash = {
          1: 'Tech',
          2: 'Healthcare',
          3: 'Retail',
          4: 'Banking',
          5: 'Insurance'
        };

        return function(input) {
          if (!input){
            return '';
          } else {
            return genderHash[input];
          }
        };
      })

; //end controller
