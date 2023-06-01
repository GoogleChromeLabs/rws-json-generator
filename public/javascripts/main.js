/* eslint-disable max-len,no-undef */

function addAssociatedSite() {
    const domainsWrapper = $('#associatedDomains');
    const associateCount = domainsWrapper.children().length;
    if (associateCount === 3) {
      alert('You can only add a maximum of 3 associated domains');
      return;
    }
    const num = associateCount + 1;
    const el = `<div id="associate${num}Wrapper" class="row mt-3">
        <div class="col">
          <label for="associate${num}" class="form-label">Associate Domain #${num}</label>
          <input type="url" class="form-control form-control-sm associatedSite" name="associate${num}" id="associate${num}">
          <div class="form-text">https://associate${num}.com</div>
        </div>
        <div class="col">
          <label for="rationaleAssociate${num}" class="form-label">Rationale Domain #${num}</label>
          <input type="text" class="form-control form-control-sm" name="rationaleAssociate${num}" id="rationaleAssociate${num}">
          <div class="form-text">How is the affiliation across domains presented and why users would expect it</div>
        </div>
      </div>`;
    domainsWrapper.append(el);
  }
  
  function removeAssociatedSite() {
    const associateCount = $('#associatedDomains').children().length;
    if (associateCount === 0) {
      alert('There are no associated domains');
      return;
    }
    $(`#associate${associateCount}Wrapper`).remove();
  }
  
  function addServiceSite() {
    const domainWrapper = $('#serviceDomains');
    const serviceCount = domainWrapper.children().length;
    const num = serviceCount + 1;
    const el = `<div id="service${num}Wrapper" class="row mt-3">
        <div class="col">
          <label for="service${num}" class="form-label">Service Domain #${num}</label>
          <input type="url" class="form-control form-control-sm serviceSite" name="service${num}" id="service${num}">
          <div class="form-text">https://service${num}.com</div>
        </div>
        <div class="col">
          <label for="rationaleService${num}" class="form-label">Rationale Domain #${num}</label>
          <input type="text" class="form-control form-control-sm" name="rationaleService${num}" id="rationaleService${num}">
          <div class="form-text">How does the domain supports functionality or security needs</div>
        </div>
      </div>`;
    domainWrapper.append(el);
  }
  
  function removeServiceSite() {
    const serviceCount = $('#serviceDomains').children().length;
    if (serviceCount === 0) {
      alert('There are no service domains');
      return;
    }
    $(`#service${serviceCount}Wrapper`).remove();
  }
  
  function getDomainList() {
    let output = '';
    $('#primary, .associatedSite, .serviceSite').each((index, element) => {
      const domain = element.value;
      if (domain !== '') {
        output += `<option value='${domain}'>${domain}</option>`;
      }
    });
    return output;
  }
  
  function addCountrySite() {
    const domainWrapper = $('#countryDomains');
    const num = domainWrapper.children().length + 1;
    const el = `<div id="country${num}Wrapper" class="row mt-3">
        <div class="col">
          <label for="countrySite${num}" class="form-label">For which site is this ccTLD?</label>
          <select id='countrySite${num}' name='countrySite${num}' class='form-select form-select-sm domainsList'>
          </select>
        </div>
        <div class="col">
          <label for="countryCCTLD${num}" class="form-label">ccTLD #${num}</label>
          <input type="url" class="form-control form-control-sm" name="countryCCTLD${num}" id="countryCCTLD${num}">
          <div class="form-text">https://primary1.co.uk</div>
        </div>
      </div>`;
    domainWrapper.append(el);
    $(`#country${num}Wrapper .domainsList`).html(getDomainList());
  }
  
  function removeCountrySite() {
    const countryCount = $('#countryDomains').children().length;
    if (countryCount === 0) {
      alert('There are no ccTLDs');
      return;
    }
    $(`#country${countryCount}Wrapper`).remove();
  }
  
  function processResponse(response) {
    if (response.status === 'success') {
      // Build the output
      const outputForCanonical = prettyPrintJson.toHtml(response.data);
      const { primary } = response.data;
      // output for primary .well-known
      $('#primaryOutput').text(`${primary}/.well-known/first-party-set.json`);
      $('#primaryWellKnownOutput').html(outputForCanonical);
      // output for members .well-known
      let memberList = '';
      if (response.data.associatedSites) {
        memberList += '<p>Associated Sites:</p><ul>';
        for (let i = 0; i < response.data.associatedSites.length; i += 1) {
          memberList += `<li class='font-monospace'>${response.data.associatedSites[i]}/.well-known/first-party-set.json</li>`;
        }
        memberList += '</ul>';
      }
      if (response.data.serviceSites) {
        memberList += '<p>Service Sites:</p><ul>';
        for (let i = 0; i < response.data.serviceSites.length; i += 1) {
          memberList += `<li class='font-monospace'>${response.data.serviceSites[i]}/.well-known/first-party-set.json</li>`;
        }
        memberList += '</ul>';
      }
      if (response.data.ccTLDs) {
        memberList += '<p>ccTLDs:</p><ul>';
        Object.keys(response.data.ccTLDs).forEach((key) => {
          for (let i = 0; i < response.data.ccTLDs[key].length; i += 1) {
            memberList += `<li class='font-monospace'>${response.data.ccTLDs[key][i]}/.well-known/first-party-set.json</li>`;
          }
        });
        memberList += '</ul>';
      }
      if (memberList !== '') {
        $('#domainsListOutput').html(memberList);
        $('#membersWellKnownOutput').html(prettyPrintJson.toHtml({ primary }));
      }
      // output for GitHub submission
      $('#submissionOutput').html(outputForCanonical);
      $('#outputWrapper').show();
    } else {
      alert('There was an error submitting your form.');
    }
  }
  
  function getFormData() {
    const rationaleBySite = {};
    // Get associated sites and rationale
    const associatedSites = [];
    for (let i = 1; i <= $('#associatedDomains').children().length; i += 1) {
      const domain = $(`#associate${i}`).val();
      if (domain) {
        associatedSites.push(domain);
        rationaleBySite[domain] = $(`#rationaleAssociate${i}`).val();
      }
    }
    // Get service sites and rationale
    const serviceSites = [];
    for (let i = 1; i <= $('#serviceDomains').children().length; i += 1) {
      const domain = $(`#service${i}`).val();
      if (domain) {
        serviceSites.push(domain);
        rationaleBySite[domain] = $(`#rationaleService${i}`).val();
      }
    }
    // Get ccTLDs
    const ccTLDs = {};
    for (let i = 1; i <= $('#countryDomains').children().length; i += 1) {
      const domain = $(`#countrySite${i}`).val();
      if (!ccTLDs[domain]) {
        ccTLDs[domain] = [];
      }
      const ccTLD = $(`#countryCCTLD${i}`).val();
      if (ccTLD) {
        ccTLDs[domain].push(ccTLD);
      }
    }
    // Prep the form data
    return {
      contact: $('#contact').val(),
      primary: $('#primary').val(),
      associatedSites,
      serviceSites,
      rationaleBySite,
      ccTLDs,
    };
  }
  
  function updateAllDomainLists() {
    $('.domainsList').html(getDomainList());
  }
  
  $(document).on('change', '#primary, .associatedSite, .serviceSite', () => {
    updateAllDomainLists();
  });
  
  $(document).ready(() => {
    $('#addAssociate').click(() => {
      addAssociatedSite();
    });
    $('#removeAssociate').click(() => {
      removeAssociatedSite();
      updateAllDomainLists();
    });
    $('#addService').click(() => {
      addServiceSite();
    });
    $('#removeService').click(() => {
      removeServiceSite();
      updateAllDomainLists();
    });
    $('#addCountry').click(() => {
      addCountrySite();
    });
    $('#removeCountry').click(() => {
      removeCountrySite();
    });
  
    $('#myForm').submit((e) => {
      e.preventDefault();
      const spinner = $('#loadingSpinner');
      spinner.show();
      $.ajax({
        url: '/',
        method: 'POST',
        data: getFormData(),
        success(response) {
          processResponse(response);
          spinner.hide();
        },
      });
    });
  });
  