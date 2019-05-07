const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://Admin:admintest1@ds111065.mlab.com:11065/shoptest-1', {
    useNewUrlParser:true,
    useCreateIndex:true
})
    .then(() => {console.log('Connected to Mongodb')}).catch( e => {
    console.log('Error while DB connecting');
    console.log(e);
});