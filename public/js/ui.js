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

import templates from './templates.js';

const ui = {
  // Gets all the domains added to the form (primary, associated & service)
  // and creates the options list for the ccTLD select
  getDomainList() {
    let output = '';
    const domains = document.querySelectorAll(
      '#primary, .associatedSite, .serviceSite'
    );
    domains.forEach((element) => {
      const domain = element.value.trim();
      if (domain !== '') {
        output += `<option value='${domain}'>${domain}</option>`;
      }
    });
    return output;
  },

  // Generates and displays the final output based on the form's data
  showOutput(formData) {
    const outputOptions = {
      quoteKeys: true,
      trailingComma: false,
      linkUrls: false,
    };
    const outputForCanonical = prettyPrintJson.toHtml(formData, outputOptions);
    // Output for primary .well-known
    document.getElementById(
      'primaryOutput'
    ).innerHTML = `${formData.primary}/.well-known/related-website-set.json`;
    document.getElementById('primaryWellKnownOutput').innerHTML =
      outputForCanonical;
    // Output for member domains .well-known
    let memberList = '';
    if (formData.associatedSites) {
      memberList += '<p>Associated Sites:</p><ul>';
      for (let i = 0; i < formData.associatedSites.length; i += 1) {
        memberList += `<li class='font-monospace'>${formData.associatedSites[i]}/.well-known/related-website-set.json</li>`;
      }
      memberList += '</ul>';
    }
    if (formData.serviceSites) {
      memberList += '<p>Service Sites:</p><ul>';
      for (let i = 0; i < formData.serviceSites.length; i += 1) {
        memberList += `<li class='font-monospace'>${formData.serviceSites[i]}/.well-known/related-website-set.json</li>`;
      }
      memberList += '</ul>';
    }
    if (formData.ccTLDs) {
      memberList += '<p>ccTLDs:</p><ul>';
      Object.keys(formData.ccTLDs).forEach((key) => {
        for (let i = 0; i < formData.ccTLDs[key].length; i += 1) {
          memberList += `<li class='font-monospace'>${formData.ccTLDs[key][i]}/.well-known/related-website-set.json</li>`;
        }
      });
      memberList += '</ul>';
    }
    if (memberList !== '') {
      document.getElementById('domainsListOutput').innerHTML = memberList;
      document.getElementById('membersWellKnownOutput').innerHTML =
        prettyPrintJson.toHtml({primary: formData.primary}, outputOptions);
    }
    // output for GitHub submission
    document.getElementById('submissionOutput').innerHTML = outputForCanonical;
    document.getElementById('outputWrapper').style.display = 'block';
  },

  // Adds an input field to the form in the given subset based
  // on the button clicked
  addDomainToSubset(button) {
    let domainsWrapper = null;
    let num = 0;
    const newDiv = document.createElement('div');
    let html = null;
    switch (button.id) {
      case 'addAssociate':
        domainsWrapper = document.getElementById('associatedDomains');
        num = domainsWrapper.children.length + 1;
        newDiv.id = `associate${num}Wrapper`;
        html = templates.associatedSite(num);
        break;
      case 'addService':
        domainsWrapper = document.getElementById('serviceDomains');
        num = domainsWrapper.children.length + 1;
        newDiv.id = `service${num}Wrapper`;
        html = templates.serviceSite(num);
        break;
      case 'addCountry':
        if (this.getDomainList() === '') {
          alert('You must add domains to your RSS before adding ccTLDs');
          return;
        }
        domainsWrapper = document.getElementById('countryDomains');
        num = domainsWrapper.children.length + 1;
        newDiv.id = `country${num}Wrapper`;
        html = templates.countrySite(num);
        break;
      default:
        break;
    }
    newDiv.classList.add('row', 'mt-3');
    newDiv.innerHTML = html;
    domainsWrapper.appendChild(newDiv);
    if (button.id === 'addCountry') {
      const dList = document.querySelector(
        `#country${num}Wrapper .domainsList`
      );
      dList.innerHTML = this.getDomainList();
    }
  },

  // Updates all the domain selects for the ccTLDs, in case domains change
  updateAllDomainLists() {
    const dLists = document.querySelectorAll('.domainsList');
    dLists.forEach((dList) => {
      dList.innerHTML = this.getDomainList();
    });
  },

  // Removes an input field from the form in the given subset based
  // on the button clicked
  removeDomainFromSubset(button) {
    let subset = null;
    let wrapper = null;
    let domainCount = 0;
    switch (button.id) {
      case 'removeAssociate':
        subset = document.getElementById('associatedDomains');
        domainCount = subset.children.length;
        wrapper = 'associate';
        break;
      case 'removeService':
        subset = document.getElementById('serviceDomains');
        domainCount = subset.children.length;
        wrapper = 'service';
        break;
      case 'removeCountry':
        subset = document.getElementById('countryDomains');
        domainCount = subset.children.length;
        wrapper = 'country';
        break;
      default:
        break;
    }
    if (domainCount === 0) {
      alert(`There are no ${wrapper} domains`);
      return;
    }
    const d = document.getElementById(`${wrapper}${domainCount}Wrapper`);
    d.remove();
    if (button.id === 'removeAssociate' || button.id === 'removeService') {
      this.updateAllDomainLists();
    }
  },
};

export default ui;
