const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const models = require('./models/index.js');
const port = 3000;

// 라우팅
const home = require('./routes/index.js');

// 앱 세팅
// app.set('views', `${__dirname}/src/views`);
// app.set('view engine', 'ejs');
// app.set('views', `${__dirname}/views/components`);
// app.set('view engine', 'jsx');
// app.engine('jsx', require('express-react-views').createEngine());

// use -> 미들웨어를 등록해주는 메서드
app.use(cors());
app.use(express.json());
// app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
// URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', home);

app.listen(port, () => {
  console.log(`이든의 서버가 돌아가고 있습니다 port: ${port}`);

  models.sequelize
    .sync()
    .then(() => {
      console.log('DB 연결 성공!');
      // database.sqlite3 파일이 생성되고, 앞으로 DB가 들어갈꺼에요~
    })
    .catch((err) => {
      console.error(err);
      console.log('DB 연결 에러ㅠ');
      process.exit(); // DB연결 안되면 서버와의 연결을 종료!
    });
});
