/*
  ~  Copyright 2016 Ripple Foundation C.I.C. Ltd
  ~  
  ~  Licensed under the Apache License, Version 2.0 (the "License");
  ~  you may not use this file except in compliance with the License.
  ~  You may obtain a copy of the License at
  ~  
  ~    http://www.apache.org/licenses/LICENSE-2.0
  ~  Unless required by applicable law or agreed to in writing, software
  ~  distributed under the License is distributed on an "AS IS" BASIS,
  ~  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  ~  See the License for the specific language governing permissions and
  ~  limitations under the License.
*/
export default function ConfirmationModal($uibModal, $ngRedux, patientsActions) {
  var isModalClosed = true;

  var openModal = function (patient, state) {
    if (isModalClosed) {
      isModalClosed = false;

      var modalInstance = $uibModal.open({
        template: require('./confirmation.html'),
        controller: function ($scope, $state, $uibModalInstance) {
          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };

          $scope.ok = function () {
            if (state != undefined) {
              $state.go(state, {
                patientId: patient.id,
              });
            } else {
              $state.go('patients-summary', {
                patientId: patient.id
              });
            }

            patientsActions.getPatient(patient.id);

            $uibModalInstance.dismiss('cancel');
          };

          // $scope.schedulesCreate = schedulesActions.create;
          // $scope.schedulesUpdate = schedulesActions.update;
        }
      });
    }

    modalInstance.result.then(function() {
      isModalClosed = true;
    }, function() {
      isModalClosed = true;
    });

  };

  return {
    isModalClosed: isModalClosed,
    openModal: openModal
  };
}
ConfirmationModal.$inject = ['$uibModal', '$ngRedux', 'patientsActions'];