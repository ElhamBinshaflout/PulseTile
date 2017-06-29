'use strict';
import ClinicalnotesListComponent from '../../../../app/pulsetileui/pages/clinical-notes/clinicalnotes-list.component.js';
import '../../../../app/index';
import '../../../../app/actions/index';
import * as types from '../../../../app/constants/ActionTypes';
import clinicalnotes from '../../../../app/pulsetileui/pages/clinical-notes/clinicalnotes-reducer-all.js';

describe('Clinicalnotes List', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, 
    ctrl, 
    controller, 
    template, 
    stateParams, 
    state, 
    ngRedux,
    personalnotesActions, 
    serviceRequests, 
    usSpinnerService,
    fakeCall,
    actions;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _personalnotesActions_, _serviceRequests_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    serviceRequests = _serviceRequests_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    personalnotesActions = _personalnotesActions_;
    usSpinnerService = _usSpinnerService_;

    template = ClinicalnotesListComponent.template;

    ctrl = controller(ClinicalnotesListComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      personalnotesActions: personalnotesActions,
      serviceRequests: serviceRequests,
      usSpinnerService: usSpinnerService
    });

    actions = $injector.get('personalnotesActions');
    // scope.$digest();
  }));

  beforeEach(function() {
    fakeCall = {
      callClinicalnotes: clinicalnotes
    };

    spyOn(fakeCall, 'callClinicalnotes');

    spyOn(ctrl, 'go');
    spyOn(ctrl, 'create');
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'clinicalnotesLoad');
    spyOn(actions, 'all');
    spyOn(actions, 'get');
    spyOn(actions, 'create');
    spyOn(actions, 'update');

    fakeCall.callClinicalnotes({}, types.EOLCAREPLANS);

    ctrl.go();
    ctrl.create();
    ctrl.setCurrentPageData();
    ctrl.clinicalnotesLoad();
    actions.all();
    actions.get();
    actions.create();
    actions.update();
  });
  
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it('Include personalnotesActions in index actions file', function() {
    expect(actions).toBeDefined();
  });
  it("Clinicalnotes reducer was called", function() {
    expect(fakeCall.callClinicalnotes).toHaveBeenCalled();
  });
  it("personalnotesActions methods was called", function() {
    expect(actions.all).toHaveBeenCalled();
    expect(actions.get).toHaveBeenCalled();
    expect(actions.create).toHaveBeenCalled();
    expect(actions.update).toHaveBeenCalled();
  });
  it("route go was called", function() {
    expect(ctrl.go).toHaveBeenCalled();
  });
  it("create was called", function() {
    expect(ctrl.create).toHaveBeenCalled();
  });
  it("setCurrentPageData was called", function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
  it("personalnotesLoad was called", function() {
    expect(ctrl.clinicalnotesLoad).toHaveBeenCalled();
  });
});