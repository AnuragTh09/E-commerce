import connectDB from './db/index.db.js'
import app from './app.js'
import config from './config/index.config.js'


connectDB()
.then( () => {
    app.listen(config.PORT || 5000, () => {
        console.log(`\n ✅ Server listening on ${config.PORT}`);
    })
})
.catch( (err) => {
    console.log("\n ☠️ Connection Failed||",err);
})