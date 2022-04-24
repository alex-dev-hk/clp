export default {
    corsOrigin: "http://0.0.0.0:3000",
    port: 4000,
    host: "localhost",
    EVENTS: {
        connection: "connection",
        CLIENT: {
          SEND_CLIENT_RESULT: "SEND_CLIENT_RESULT",
          END_GAME: "END_GAME"
        },
        SERVER: {
          RECEIVED_CLIENT_RESULT: "RECEIVED_CLIENT_RESULT",
        },
    }
}


