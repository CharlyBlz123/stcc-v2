  
import io from "socket.io-client";
import path from "./domain";

let socket = io(`${path}`, {
    transports: ['websocket', 'polling']
})

export default socket;