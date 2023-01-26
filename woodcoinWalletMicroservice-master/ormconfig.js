module.exports = {
   "type": "mysql",
   "host": "db",
   "port": 3306,
   "username": "woody_app",
   "password": "I6NSYAKFgeM/7E9w6p8UrmRkih8D9kWwvYkt3EaAdc",
   "database": "woody_app_db",
   "synchronize": true,
   "logging": false,
   "entities": [
      "src/entity/**/*.ts"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}