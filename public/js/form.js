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

import validation from './validation.js';
import ui from './ui.js';

const formHandler = {
  // Removes validation styling and messages from a given input field
  resetInput(input) {
    input.classList.remove('is-invalid');
    input.classList.remove('is-valid');
    const messageDiv = document.getElementById(`${input.name}ErrorMessage`);
    messageDiv.innerHTML = '';
  },

  // Shows the validation error for a given input field
  showErrorsForInput(input, errors) {
    const messageDiv = document.getElementById(`${input.name}ErrorMessage`);
    this.resetInput(input);
    if (errors) {
      input.classList.add('is-invalid');
      errors.forEach((error) => {
        messageDiv.innerHTML = error;
      });
    } else {
      input.classList.add('is-valid');
    }
  },

  // Shows all validation errors in the form
  showFormErrors(form, errors) {
    const formInputs = form.querySelectorAll('input[name]');
    formInputs.forEach((input) => {
      this.showErrorsForInput(input, errors && errors[input.name]);
    });
  },

  // Removes validation styling and messages from all input fields
  resetForm(form) {
    const formInputs = form.querySelectorAll('input[name]');
    formInputs.forEach((input) => {
      this.resetInput(input);
    });
  },

  // Gets all the form data in the right structure once validated
  getFormData() {
    const rationaleBySite = {};
    const associatedSites = [];
    const serviceSites = [];
    const ccTLDs = {};
    // Loop through associated sites and add data to the array
    const aSitesWrapper = document.getElementById('associatedDomains');
    for (let i = 1; i <= aSitesWrapper.children.length; i += 1) {
      const domain = document.getElementById(`associate${i}`).value;
      if (domain) {
        associatedSites.push(domain);
        rationaleBySite[domain] = document.getElementById(
          `rationaleAssociate${i}`
        ).value;
      }
    }
    // Loop through service sites and add data to the array
    const sSitesWrapper = document.getElementById('serviceDomains');
    for (let i = 1; i <= sSitesWrapper.children.length; i += 1) {
      const domain = document.getElementById(`service${i}`).value;
      if (domain) {
        serviceSites.push(domain);
        rationaleBySite[domain] = document.getElementById(
          `rationaleService${i}`
        ).value;
      }
    }
    // Loop through ccTLDs and add data to the array
    const cSitesWrapper = document.getElementById('countryDomains');
    for (let i = 1; i <= cSitesWrapper.children.length; i += 1) {
      const domain = document.getElementById(`countrySite${i}`).value;
      if (!ccTLDs[domain]) {
        ccTLDs[domain] = [];
      }
      const ccTLD = document.getElementById(`CCTLD${i}`).value;
      if (ccTLD) {
        ccTLDs[domain].push(ccTLD);
      }
    }
    // Prep the final form data in the right format
    const data = {};
    data.contact = document.getElementById('contact').value;
    data.primary = document.getElementById('primary').value;
    if (associatedSites.length > 0) {
      data.associatedSites = associatedSites;
    }
    if (serviceSites.length > 0) {
      data.serviceSites = serviceSites;
    }
    if (Object.keys(rationaleBySite).length > 0) {
      data.rationaleBySite = rationaleBySite;
    }
    if (Object.keys(ccTLDs).length > 0) {
      data.ccTLDs = ccTLDs;
    }
    return data;
  },

  // Handles the form submission
  submit(form) {
    const errors = validation.validateForm(form);
    if (!errors) {
      this.resetForm(form);
      ui.showOutput(this.getFormData());
    } else {
      this.showFormErrors(form, errors || {});
    }
  },
};

export default formHandler;
