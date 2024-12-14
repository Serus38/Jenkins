const mongoose = require('mongoose');

const getConection = async () => {

    try {

        const url = 'mongodb+srv://Serus:DzOAhuM4LHdisgtU@cluster0.tu3si.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

        await mongoose.connect(url);
        console.log('Conexión exitosa');

    } catch (error) {
        console.log(error);
        
    }
    
}

module.exports = {
    getConection
}

