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
