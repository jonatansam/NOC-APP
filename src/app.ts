import { Server } from "./presentation/server";

//funcion anonima autoInvocada
(async() => {
    main();
})();


function main() {

    Server.start();
}