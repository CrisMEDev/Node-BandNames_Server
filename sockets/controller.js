const { Socket } = require("socket.io");

const Bands = require('../models/bands');
const Band = require("../models/band");

const bands = new Bands();

bands.addBand( new Band( 'Foo fighters' ) );
bands.addBand( new Band( 'The siege' ) );
bands.addBand( new Band( 'Smash into pieces' ) );
bands.addBand( new Band( 'Metallica' ) );


const socketController = ( socket = new Socket ) => {

    console.log( 'Conectado: ', socket.id );

    socket.emit( 'active-bands', bands.getBands() );

    socket.on('disconnect', () => {

        console.log( 'Desconectado: ', socket.id );

    });

    // Se escucha el evento mensaje del lado del cliente
    socket.on( 'mensaje', ( payload ) => {

        const { nombre } = payload;

        console.log(nombre);

        // Emitir el mensaje a todos los clientes conectados menos al mismo que realiza la conexión
        socket.broadcast.emit( 'mensaje', { mensaje: `${nombre} se ha integrado al server` });
    });

    // Se escucha el evento nuevo-mensaje del lado del cliente
    socket.on( 'emitir-mensaje', ( payload ) => {

        // Emitir el mensaje a todos los clientes conectados menos al mismo que realiza la conexión
        socket.broadcast.emit( 'nuevo-mensaje', payload);
    });

    socket.on( 'vote-band', (payload) => {

        bands.voteBand( payload.id );

        // Responder a todos los usuarios menos al que disparó el eventó; si se quiere hacer a todos en
        // una instruccion en lugar de socket se debe usar el propio io
        socket.broadcast.emit( 'active-bands', bands.getBands() );
        // Responder al frontend en la app con la actualización de votos
        socket.emit( 'active-bands', bands.getBands() );

    });

    socket.on( 'add-band', (payload) => {

        bands.addBand( new Band( payload.name ) );
        
        socket.broadcast.emit( 'active-bands', bands.getBands() );
        socket.emit( 'active-bands', bands.getBands() );       

    });

    socket.on( 'delete-band', (payload) => {

        bands.deleteBand( payload.id );

        socket.broadcast.emit( 'active-bands', bands.getBands() );
        socket.emit( 'active-bands', bands.getBands() ); 

    });

}

module.exports = {
    socketController
}

