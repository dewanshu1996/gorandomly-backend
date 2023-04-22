const mongoose = require('mongoose')

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    sslValidate: false
}

mongoose.connect(process.env.MONGODB_URL , connectionParams);