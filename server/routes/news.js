const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const content = (card) => {
    return `
<div class="wrap" style="  width: 350px;
border-radius: 20px;
padding: 15px 10px;
background: linear-gradient(125deg, #d2e5ff, #ffcaed);">
<div class="title" style="  font-size: 30px;
text-align: center;
font-weight: 900;">${card.topic}</div>
<div class="tag-wrap">

</div>
<div class="img-wrap" style="  width: 200px;
height: 100px;
background-color: #fff;
margin: 15px auto;">
<img src="cid:unique@cid" alt="" style="  width: 150px;
display: block;
margin: auto;"/>
</div>
<div class="content" style="  width: 300px;
margin: auto;">
<p class="text" style=" width: 100%;word-break: break-all;font-size:17px;font-weight:400">
${card.content}
</p>
<p>${card.time}</p>
</div>
</div>`;
};
// const { router } = require('../app');
router.route('/').post((req, res) => {
    const mailTransport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASS,
        },
    });
    mailTransport.sendMail(
        {
            from: '來生投放所 <service@nextlife.com.tw>',
            to: 'abby <chiquzt@gmail.com>',
            subject: '來生投放所電子報',
            html: content(req.body),
            attachments: [
                {
                    filename: req.body.img,
                    path: `http://localhost:3500/news/${req.body.img}`,
                    cid: 'unique@cid',
                },
            ],
        },
        function (err) {
            if (err) {
                console.log('Unable to send email: ' + err);
            }
        }
    );

    res.json(req.body);
});

module.exports = router;
