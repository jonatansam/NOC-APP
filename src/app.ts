import { envs } from "./config/plugins/env.plugins";
import { Server } from "./presentation/server";

//funcion anonima autoInvocada
(async() => {
    main();
})();


function main() {

    // console.log( {envs} ); 

    Server.start();
    
}