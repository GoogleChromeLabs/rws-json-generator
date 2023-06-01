const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'First-Party Sets Submission Tool' });
});

/* POST process form */
router.post('/', (req, res) => {
  const {
    contact,
    primary,
    associatedSites,
    serviceSites,
    rationaleBySite,
    ccTLDs,
  } = req.body;
  res.status(200).json({
    status: 'success',
    data: {
      contact,
      primary,
      associatedSites,
      serviceSites,
      rationaleBySite,
      ccTLDs,
    },
  });
});

module.exports = router;
