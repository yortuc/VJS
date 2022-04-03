class Bus {
    constructor(){
        this.channels = {}
    }

    subscribe(channel, cb) {
        if (this.channels[channel]){
            this.channels[channel].push(cb)
        }
        else{
            this.channels[channel] = [cb]
        }
    }

    publish(channel, payload){
        if(this.channels[channel]){
            this.channels[channel].forEach(cb => {
                cb(payload)
            });
        }
        else{
            console.log("No channel named ", channel)
        }
    }
}

export default new Bus()