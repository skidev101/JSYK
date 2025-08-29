import express from 'express'; 
const router = express.Router();

router.get('/', cleanup);

module.exports = router;
