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

import formHandler from './form.js';
import ui from './ui.js';

// Handle the form submission
const form = document.getElementById('mainForm');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const spinner = document.getElementById('loadingSpinner');
  spinner.style.display = 'inline-block';
  setTimeout(() => {
    formHandler.submit(form);
    spinner.style.display = 'none';
  }, 150);
});

// Add domains to subsets
const addButtons = document.querySelectorAll(
  '#addAssociate, #addService, #addCountry'
);
addButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    ui.addDomainToSubset(button);
  });
});

// Remove domains to subsets
const removeButtons = document.querySelectorAll(
  '#removeAssociate, #removeService, #removeCountry'
);
removeButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    ui.removeDomainFromSubset(button);
  });
});

// Update domain select list for ccTLDs in case domains change
document.addEventListener('change', (event) => {
  const target = event.target.closest(
    '#primary, .associatedSite, .serviceSite'
  );
  if (target) {
    ui.updateAllDomainLists();
  }
});
