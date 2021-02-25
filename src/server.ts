import { app, port } from "./app";


app.listen(port, () => {
    console.log(`Servidor on line na porta ${port}`);
})
