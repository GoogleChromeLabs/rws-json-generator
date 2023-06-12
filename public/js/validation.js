// Copyright 2023 Google LLC

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     https://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const validation = {
  // Dynamically defines the validation rules for all fields in the form
  getValidationConstraints() {
    const urlRules = {schemes: ['https'], message: 'URL scheme must be https'};
    const constraints = {
      contact: {presence: true, email: true},
      primary: {presence: true, url: urlRules},
    };
    // Loop through each associated domain field to set the constraints
    const aSites = document.querySelectorAll('.associatedSite');
    aSites.forEach((site) => {
      constraints[site.name] = {presence: true, url: urlRules};
    });
    // Loop through each associated domain rationale field to set the constraints
    const aRationales = document.querySelectorAll('.associatedRationale');
    aRationales.forEach((rationale) => {
      constraints[rationale.name] = {presence: true};
    });
    // Loop through each service domain field to set the constraints
    const sSites = document.querySelectorAll('.serviceSite');
    sSites.forEach((site) => {
      constraints[site.name] = {presence: true, url: urlRules};
    });
    // Loop through each service domain rationale field to set the constraints
    const sRationales = document.querySelectorAll('.serviceRationale');
    sRationales.forEach((rationale) => {
      constraints[rationale.name] = {presence: true};
    });
    // Loop through each ccTLDs domain field to set the constraints
    const cSites = document.querySelectorAll('.countrySite');
    cSites.forEach((site) => {
      constraints[site.name] = {presence: true, url: urlRules};
    });
    return constraints;
  },

  // Validates the form and returns the errors (if any)
  validateForm(form) {
    return validate(form, this.getValidationConstraints());
  },
};

export default validation;
