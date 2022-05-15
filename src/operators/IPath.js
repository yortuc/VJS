export default class IPath {
    constructor(path, opt){
        this.path = path
        this.opt = opt
    }

    async render() {
        return new Promise(resolve => 
            resolve(this.path)
        )
    }
}