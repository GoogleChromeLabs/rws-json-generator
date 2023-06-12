const templates = {
  // Gets the HTML template for the associated site form field
  associatedSite(num) {
    return `<div class="col">
      <label for="associate${num}" class="form-label">Associate Domain #${num}</label>
      <input type="url" class="form-control form-control-sm associatedSite" name="associate${num}" id="associate${num}" placeholder="https://associate${num}.com">
      <div id='associate${num}ErrorMessage' class="invalid-feedback">Error message.</div>
    </div>
    <div class="col">
      <label for="rationaleAssociate${num}" class="form-label">Rationale Domain #${num}</label>
      <input type="text" class="form-control form-control-sm associatedRationale" name="rationaleAssociate${num}" id="rationaleAssociate${num}">
      <div id='rationaleAssociate${num}ErrorMessage' class="invalid-feedback">Error message.</div>
      <div class="form-text">How is the affiliation across domains presented and why users would expect it</div>
    </div>`;
  },
  // Gets the HTML template for the service site form field
  serviceSite(num) {
    return `<div class="col">
      <label for="service${num}" class="form-label">Service Domain #${num}</label>
      <input type="url" class="form-control form-control-sm serviceSite" name="service${num}" id="service${num}" placeholder="https://service${num}.com">
      <div id='service${num}ErrorMessage' class="invalid-feedback">Error message.</div>
    </div>
    <div class="col">
      <label for="rationaleService${num}" class="form-label">Rationale Domain #${num}</label>
      <input type="text" class="form-control form-control-sm serviceRationale" name="rationaleService${num}" id="rationaleService${num}">
      <div id='rationaleService${num}ErrorMessage' class="invalid-feedback">Error message.</div>
      <div class="form-text">How does the domain supports functionality or security needs</div>
    </div>`;
  },
  // Gets the HTML template for the ccTLD site form field
  countrySite(num) {
    return `<div class="col">
      <label for="countrySite${num}" class="form-label">For which site is this ccTLD?</label>
      <select id='countrySite${num}' name='countrySite${num}' class='form-select form-select-sm domainsList'>
      </select>
    </div>
    <div class="col">
      <label for="CCTLD${num}" class="form-label">ccTLD #${num}</label>
      <input type="url" class="form-control form-control-sm countrySite" name="CCTLD${num}" id="CCTLD${num}" placeholder="https://primary1.co.uk">
      <div id='CCTLD${num}ErrorMessage' class="invalid-feedback">Error message.</div>
    </div>`;
  },
};

export default templates;
