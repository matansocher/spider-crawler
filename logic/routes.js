const express = require('express');
const router = express.Router();
const controller = require('./controller');
const commonService = require('../services/common.service');

router.post('/start-flow', async (req, res, next) => {
    const { initialUrl } = req.body;

    try {
        const ans = await controller.startFlow(initialUrl);
        console.log(`start-flow endpoint - done process`);
        return res.status(200).send(ans);
    } catch (err) {
        const errorMessage = commonService.getErrorMessage(err);
        console.error(`start-flow endpoint - failed process, err: ${errorMessage}`);
        return res.status(500).send({ success: false });
    }
});

module.exports = router;
