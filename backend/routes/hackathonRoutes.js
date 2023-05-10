const express = require('express');
const verifyjwt = require('../middlewares/auth');
const {
    addHackathon,
    viewHackathon,
    updateHackathon,
    deleteHackathon
} = require('../controllers/hackathon.controllers');
const router = express.Router();

router.post('/add', verifyjwt, addHackathon);
router.get('/view', verifyjwt, viewHackathon);
router.put('/update', verifyjwt, updateHackathon);
router.delete('/delete/:name', verifyjwt, deleteHackathon);

module.exports = router;