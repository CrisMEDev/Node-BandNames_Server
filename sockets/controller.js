const { Socket } = require("socket.io");


const socketController = ( socket = new Socket ) => {

    console.log( 'Conectado: ', socket.id );

    socket.on('disconnect', () => {

        console.log( 'Desconectado: ', socket.id );

    });

}

module.exports = {
    socketController
}

