
let socket = io();

socket.on( 'connect', () => {
    console.log('Conectado al servidor como: ', socket.id);
});

socket.on( 'disconnect', () => {
    console.log('Desonectado al servidor como: ', socket.id);
});


// Evento a emitir al backend server
socket.emit( 'mensaje', { nombre: 'Cristian' });

socket.on( 'mensaje', ( respuestaServer ) => {
    const { mensaje } = respuestaServer;

    console.log( mensaje );
});

// Se escuchar el evento nuevo-mensaje desde el server
socket.on( 'nuevo-mensaje', ( payload ) => {
    console.log( payload );
});

