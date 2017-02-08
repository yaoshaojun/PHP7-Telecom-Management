﻿(function () {
    'use strict';

    angular
        .module('app', ['ui.router', 'ngMessages', 'ngStorage', 'angular-jwt', 'chart.js'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/");

        // app routes
        $stateProvider
            .state('home', {
                url: '/',
				views: {
					'' : {
						templateUrl: 'home/home.html',
						controller: 'Home.IndexController',
						controllerAs: 'vm',
					},

					/*
					Add Sonus Alarms to Home View
					'sonussplashpage@home': {
						templateUrl: 'sonus/sonus.splashpage.html',
						
						// Removed, included controler as inside html splashpage
						//controller: 'Sonus.AlarmController',
						//controllerAs: 'vm'
					}
					*/
					
				}
            })
            .state('login', {
                url: '/login',
                templateUrl: 'login/login.html',
                controller: 'Login.IndexController',
                controllerAs: 'vm'
            })
			.state('logout', {
                url: '/logout',
                templateUrl: 'logout/logout.html',
                controller: 'Logout.IndexController',
                controllerAs: 'vm'
            })
			.state('didblock', {
                url: '/didblock',
                templateUrl: 'didblock/didblock.html',
                controller: 'Didblock.IndexController',
                controllerAs: 'vm'
            })
			.state('didblockcreate', {
                url: '/didblock/create',
                templateUrl: 'didblock/createdidblock.html',
                controller: 'Didblock.IndexController',
                controllerAs: 'vm'
            })
			.state('getdidblock', {
                url: "/didblock/{id}",
                templateUrl: 'didblock/getdidblock.html',
                controller: 'getDidblock.IndexController',
                controllerAs: 'vm'
            })
			.state('checkdidusage', {
                url: "/checkdidusage",
                templateUrl: 'didblock/usage/checkdidusage.html',
                controller: 'checkdidusage.IndexController',
                controllerAs: 'vm'
            })
			.state('checkdidblockusage', {
                url: "/checkdidblockusage",
                templateUrl: 'didblock/usage/checkdidblockusage.html',
                controller: 'checkdidblockusage.IndexController',
                controllerAs: 'vm'
            })
			.state('site', {
                url: '/site',
                templateUrl: 'siteplanning/site.html',
                controller: 'Site.IndexController',
                controllerAs: 'vm'
            })
			.state('sitecreate', {
                url: '/site/create',
                templateUrl: 'siteplanning/createsite.html',
                controller: 'Site.IndexController',
                controllerAs: 'vm'
            })
			.state('getsite', {
                url: '/site/{id}',
                templateUrl: 'siteplanning/getsite.html',
                controller: 'getSite.IndexController',
                controllerAs: 'vm'
            })
			.state('getphoneplan', {
                url: '/phoneplan/{id}/',
                templateUrl: 'siteplanning/phoneplans/getphoneplan.html',
                controller: 'getPhonePlan.IndexController',
                controllerAs: 'vm'
            })
			.state('phoneplancreate', {
                url: '/phoneplan/create',
                templateUrl: 'siteplanning/phoneplans/createphoneplan.html',
                controller: 'getPhonePlan.IndexController',
                controllerAs: 'vm'
            })
			.state('admin', {
                url: "/admin",
                templateUrl: 'admin/admin.html',
                controller: 'Admin.IndexController',
                controllerAs: 'vm'
            })
			.state('sonus/activecalls', {
                url: "/sonus/activecalls",
                templateUrl: 'sonus/sonus.activecalls.html',
                controller: 'Sonus.CallController',
                controllerAs: 'vm'
            })
			.state('sonus/activealarms', {
                url: "/sonus/activealarms",
                templateUrl: 'sonus/sonus.activealarms.html',
                controller: 'Sonus.AlarmController',
                controllerAs: 'vm'
            })
			.state('sonus/callstats', {
                url: "/sonus/callstats",
                templateUrl: 'calls/calls.graph.html',
                controller: 'CallGraph.IndexController',
                controllerAs: 'vm'
            });

    }
	

    function run($rootScope, $http, $location, $localStorage, jwtHelper) {
        // keep user logged in after page refresh
        if ($localStorage.currentUser) {
			console.log('Found local storage login token: ' + $localStorage.currentUser.token);
			if (jwtHelper.isTokenExpired($localStorage.currentUser.token)) {
				console.log('Cached token is expired, logging out');
				delete $localStorage.currentUser;
				$http.defaults.headers.common.Authorization = '';
			}else{
				console.log('Cached token is still valid');
				$http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
			}
        }

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var publicPages = ['/login'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/login');
            }
        });
    }
})();