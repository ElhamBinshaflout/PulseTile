'use strict';
import OrdersListComponent from '../../../../app/pulsetileui/pages/orders/orders-list.component.js';
import '../../../../app/index';
import * as types from '../../../../app/constants/ActionTypes';
import orders from '../../../../app/pulsetileui/pages/orders/orders-reducer-all.js';
import '../../../../app/index';

describe('Orders List', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, actions, fakeCall, stateParams, state, ngRedux, ordersActions, serviceRequests, usSpinnerService;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _ordersActions_, _serviceRequests_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    serviceRequests = _serviceRequests_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    ordersActions = _ordersActions_;
    usSpinnerService = _usSpinnerService_;

    template = OrdersListComponent.template;

    ctrl = controller(OrdersListComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      ordersActions: ordersActions,
      serviceRequests: serviceRequests,
      usSpinnerService: usSpinnerService
    });
    actions = $injector.get('ordersActions');
    // scope.$digest();
  }));
  beforeEach(function() {
    fakeCall = {
      callOrders: orders
    };

    spyOn(fakeCall, 'callOrders');

    spyOn(ctrl, 'go');
    spyOn(ctrl, 'setCurrentPageData');

    fakeCall.callOrders({}, types.ORDERS);

    ctrl.go();
    ctrl.setCurrentPageData();
  });

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it('Include ordersActions in index actions file', function() {
    expect(actions).toBeDefined();
  });
  it("Orders reducer was called", function() {
    expect(fakeCall.callOrders).toHaveBeenCalled();
  });
  it("route go was called", function() {
    expect(ctrl.go).toHaveBeenCalled();
  });
  it("setCurrentPageData was called", function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
});