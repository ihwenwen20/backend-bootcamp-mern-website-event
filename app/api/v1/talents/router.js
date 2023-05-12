const express = require('express');
const router = express();
const { create, index, find, update, destroy } = require('./controller');

const {
	authenticateUser,
	authorizeRoles,
} = require('../../../middlewares/auth');

router.get('/talents', authenticateUser, authorizeRoles('Organizer'), index);
router.get('/talents/:id', authenticateUser, authorizeRoles('Organizer'), find);
router.put('/talents/:id', authenticateUser, authorizeRoles('Organizer'), update);
router.delete('/talents/:id', authenticateUser, authorizeRoles('Organizer'), destroy);
router.post('/talents', authenticateUser, authorizeRoles('Organizer'), create);

module.exports = router;