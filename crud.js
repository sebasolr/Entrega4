const { log } = require('console');
const fs = require('fs');
class Productos {
    Producto =""
    constructor(producto) {
        this.producto = `./${producto}.json`// creo el archivo json
    }
    async getAll(){
        try {
        const productos = await fs.promises.readFile(`./${this.producto}`, 'utf8');
        console.log(productos);
        console.log(`Archivo leido con exito!`);    
        const archivoJson = (JSON.parse(productos))
        return archivoJson
        } catch (error) {

            console.error(`no se ha logrado leer el archivo error: ${error.message}`);
        }
    };
    async saveItems(obj){
        try {
            const productos = await this.getAll()
            if(!productos || productos == undefined ){
                obj=[obj];
                obj.id =obj.length;
                obj = JSON.stringify(obj);
                await fs.promises.writeFile(`./${this.producto}`,  obj, 'utf8');
                console.log("Primer Producto Agregado con exito!");
            }else{
               productos.push(obj);
               const archivoString = JSON.stringify(productos)
                
                await fs.promises.writeFile(`./${this.producto}`,  archivoString, 'utf8');
                console.log("Archivo leido y guardado con Exito!");
            }

        } catch (error) {
            console.error(`El archivo no se ha logrado Guardar error:${error}`);
        }
    };
    async editItem(id,newName,newPrice,newURL){
        const productos = await this.getAll();
        for(let i = 0; i < productos.length; i++){
            if(productos[i].id == id){
                productos[i].nombre = newName;
                productos[i].precio =newPrice;
                productos[i].avatar = newURL;
        }
        
    }
    const upgrade = JSON.stringify(productos)
    fs.promises.writeFile(`./${this.producto}`, upgrade, 'utf-8')

};
    async deleteItem(id){
        const productos = await this.getAll();
        const archivoBorrado = productos.filter(producto => producto.id != id)
        const esteSI = JSON.stringify(archivoBorrado);
        fs.promises.writeFile(`./${this.producto}`,  esteSI, 'utf8')
    };
}

module.exports = Productos