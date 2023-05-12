const express = require('express');
const router = express();

const {create, index, find, update, destroy} = require('./controller');

const {
	authenticateUser,
	authorizeRoles,
} = require('../../../middlewares/auth');

router.get('/', authenticateUser, authorizeRoles('Organizer'), index);
router.get('/:id', authenticateUser, authorizeRoles('Organizer'), find);
router.put('/:id', authenticateUser, authorizeRoles('Organizer'), update);
router.post('/', authenticateUser, authorizeRoles('Organizer'), create);
router.delete('/:id', authenticateUser, authorizeRoles('Organizer'), destroy);

// import product controller
// const { create, index, find, update, destroy } = require('./controller');

// pasangkan route endpoint dengan method `create`
// router.post('/categories', authenticateUser, authorizeRoles('Organizer'), create);
// router.get('/categories', authenticateUser, authorizeRoles('Organizer'), index);
// router.get('/categories/:id', authenticateUser, authorizeRoles('Organizer'), find);
// router.put('/categories/:id', authenticateUser, authorizeRoles('Organizer'), update);
// router.delete('/categories/:id', authenticateUser, authorizeRoles('Organizer'), destroy);
// module.exports = router;
