module.exports = function (sequelize, DataTypes) {
  // 테이블을 만드는데, 테이블 이름은 'Client'
  const client = sequelize.define('Client', {
    name: {
      type: DataTypes.STRING(20), // 데이터 타입은 문자열이고, 20자까지 제한
      allowNull: false, // 값이 꼭 있어야만 한다!
    },
    phone: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
  });

  return client;
};
