const express = require('express');
const router = express.Router();

const ctrl = require('./home.ctrl');

// 로그인
router.get('/login', ctrl.output.oauths);
router.post('/login', ctrl.process.oauths);

// 고객문의 게시판
router.get('/clients', ctrl.output.clients);
router.post('/clients', ctrl.process.clients);

module.exports = router;
