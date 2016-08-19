angular.module('myApp', [])
  .controller('MainController', ['$scope', function($scope) {
    $scope.users = [];

    $scope.user = {};
    $scope.user.name = '';
    $scope.user.number = 1;
    $scope.user.gender = 'MALE';

    $scope.addUser = function() {
      $scope.users.push({
        name: checkName($scope.user.name, $scope.user.number),
        nameJa: convertName(checkName($scope.user.name, $scope.user.number), $scope.user.gender),
        number: $scope.user.number,
        gender: $scope.user.gender,
        genderJa: convertGenderToJa($scope.user.gender)
      });
      $scope.user.name = '';
      $scope.user.number += 1;
    };

    $scope.save = function() {
      var isUsable = WebStorage.isUsable;
      if ( isUsable ) {
        WebStorage.setData('test', $scope.users, 'session');
      }
    };
  }]);


function escapeHtml(str) {
  str = str.replace(/&/g, '&amp;');
  str = str.replace(/</g, '&lt;');
  str = str.replace(/>/g, '&gt;');
  str = str.replace(/"/g, '&quot;');
  str = str.replace(/'/g, '&#39;');
  return str;
}


function checkName(name, number) {
  if ( !name ) {
    if ( !number ) {
      return '名無しさん';
    } else {
      return '名無しさん '+number;
    }
  }
  return name;
}

function convertName(name, gender) {
  switch ( gender ) {
    case 'MALE':
      return name + ' くん';
      break;
    case 'FEMALE':
      return name + ' さん';
      break;
    default:
      return name ; ' さん';
      break;
  }
}

function convertGenderToJa(gender) {
  switch ( gender ) {
    case 'MALE':
      return '男性';
      break;
    case 'FEMALE':
      return '女性';
      break;
    default:
      return 'なし';
      break;
  }
}




