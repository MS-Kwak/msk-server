const clients = require('../models/client.js');
const oauths = require('../models/oauth.js');
const models = require('../models/index.js');

// GET
const output = {
  oauths: (req, res) => {
    models.Oauth.findAll({
      attributes: ['userid', 'password'],
    })
      .then((result) => {
        // console.log('OAUTHS: ', result);
        res.send({
          oauths: result,
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(400).send('에러발생!!');
      });
  },
  clients: (req, res) => {
    models.Client.findAll({
      order: [
        ['createdAt', 'DESC'], // 오름차순 (시간이 최신인것부터 조회)
      ],
      attributes: ['id', 'name', 'phone', 'email', 'description', 'createdAt'],
    })
      .then((result) => {
        // console.log('CLIENTS: ', result);
        res.send({
          clients: result,
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(400).send('에러발생!!');
      });
  },
};

// POST
const process = {
  oauths: (req, res) => {
    // console.log(req.body);
    const { userId, userPassword } = req.body;
    const response = {};
    // 방어로직
    if (!userId || !userPassword) {
      res.status(400).send('모든 필드를 입력해 주세요');
    }
    models.Oauth.findOne({
      where: {
        userId,
      },
    })
      .then((result) => {
        console.log(result);
        // console.log(result.password);
        if (result) {
          if (String(userPassword) === String(result.password)) {
            response.success = true;
            response.msg = '로그인에 성공하였습니다.';
            response.userId = result.userid;
            res.send(response);
          } else {
            response.success = false;
            response.msg = '비밀번호가 일치하지 않습니다.';
            response.userId = result.userid;
            res.send(response);
          }
        } else {
          response.success = false;
          response.msg = '가입되지 않은 아이디입니다.';
          response.userId = result.userid;
          res.send(response);
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(400).send('로그인에 오류가 발생했습니다.');
      });
  },
  clients: (req, res) => {
    const body = req.body;
    const { name, phone, email, description } = body;
    // 방어로직
    if (!name || !phone || !email || !description) {
      res.status(400).send('모든 필드를 입력해 주세요');
    }

    models.Client.create({
      name,
      phone,
      email,
      description,
    })
      .then((result) => {
        console.log('고객 데이터 생성 결과: ', result);
        res.send({
          clients: result,
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(400).send('고객 데이터 생성에 문제가 발생했습니다.');
      });
  },
};

module.exports = {
  output,
  process,
};
