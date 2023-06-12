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
  }, 80);
  spinner.style.display = 'none';
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
