'use strict';

describe('MainCtrl', function() {
	var scope, $httpBackend; 

	//Mock Application to allow us to inject our own dependencies
	beforeEach(angular.mock.module('Application'));

	//Mock the controller for the same reason and include $rootScope and $controller
	beforeEach(angular.mock.inject(function($rootScope, $controller, _$httpBackend_) {
		$httpBackend = _$httpBackend_;
		$httpBackend.expect('GET','Users/users.json').respond({id: 1, name: 'Bob'});

		//create an empty scope
		scope = $rootScope.$new();

		$controller('MainCtrl', {$scope: scope});
	}));

	//tests start here
	it('should have variable text = "hello world!"', function() {
		expect(scope.text).toBe('Hello World');	
	});

	it('should fetch list of users', function() {
		$httpBackend.flush();
		expect(scope.users.id).toBe(1);
		expect(scope.users.name).toBe('Bob');
	});

});
