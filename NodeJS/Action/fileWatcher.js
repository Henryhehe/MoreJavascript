const fs = require('fs');
const events = require('events');

class Watcher extends events.EventEmitter {
    constructor(watchDir, processDir) {
        super();
        this.watchDir = watchDir;
        this.processDir = processDir;
    }

    // process each file in watch directory
    watch() {
        fs.readdir(this.watchDir, (err, files) => {
            if(err) throw err;
            for(var index in files) {
                this.emit('process', files[index]);
            }
        })
    }
    // adds method to start watching 
    start() {
        fs.watchFile(this.watchDir, ()=>{
            this.watch();
        });
    }
}

module.exports = Watcher;

//To use it
//const watcher = new Watcher(watchDir, processDir);
//watcher.on('process', (file) => {
//     const watchFile = `${watchDir}/${file}`;
//     const processedFile = `${processedDir}/${file.toLowerCase()}`;
//     fs.rename(watchFile, processedFile, err => {
//       if (err) throw err;
//     });
//   });
//watcher.start();