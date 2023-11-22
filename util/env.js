const env = {
    database: "mock_up",
    username: "root",
    password: "0875250135",
    host: "localhost",
    dialect: "mariadb",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
}

module.exports = env
