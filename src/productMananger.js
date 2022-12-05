import fs from 'fs';


export class ProductMananger {

    constructor(path){
        this.path = path
    }

    read = () => {
        if (fs.existsSync(this.path)) {
            return fs.promises.readFile(this.path, 'utf-8').then(r => JSON.parse(r))
        }

        return []
    }

    getNextID = list => {
        const count = list.length
        return (count > 0) ? list[count-1].id + 1 :1
    }


    write = list => {
        return fs.promises.writeFile(this.path, JSON.stringify(list))
    }

    getProducts = async () => {
        const data = await this.read()
        return data
    }

    getProductsById = async (id) => {
        const data = await this.read();
        const dataID = data.find(p => p.id == id);
        return dataID
    }


    deleteProduct = async (id) => {
        const data = await this.read();
        const newData = data.filter((i) => i.id !== id)
        await this.write(newData)
    }


    addProduct = async (obj) => {
        const list = await this.read()
        const nextID = this.getNextID(list)
        obj.id = nextID

        list.push(obj)

        await this.write(list)
    }

    updateProduct = async (id, obj) => {
        obj.id = id
        const list = await this.read()

        for (let i = 0; i < list.length; i++) {
            if (list[i].id == id){
                list[i] = obj
                break
            }
        }

        await this.write(list)

    }

}

//module.exports = ProductMananger