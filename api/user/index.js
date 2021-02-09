
// 라우팅 설정 로직
const { request } = require('express');
const express = require('express');
const router = express.Router();
const ctrl = require('./user.ctrl');

router.get('/',ctrl.getUsersInfo);
router.get('/:id', ctrl.getUserInfo);
router.post('/', ctrl.createUser);
router.put('/:id', ctrl.updateUser);
router.delete('/:id', ctrl.deleteUser)

module.exports = router;