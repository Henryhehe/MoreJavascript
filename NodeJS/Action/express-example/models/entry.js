const redis = require('redis');
const db = redis.createClient();

class Entry {
    constructor(obj) {
        for(let key in obj) {
            this[key] = obj[key];
        }
    }

    save(cb) {
        const entryJSON = JSON.stringify(this);
        db.lpush(
            'entries',
            entryJSON,
            (err) => {
                if(err) return cb(err);
                cb();
            }
        );
    }

    // allow you to retrive entries

    static getRange(from, to, cb) {
        db.lrange('entries', from, to, (err, items) => {
            if(err) return cb(err);
            let entries = [];
            items.forEach((item) => {
                entries.push(JSON.parse(item));
            });
        })
    }
}

module.exports = Entry;


/**
 * const entry = new Entry({
 * username: username,
 * title: data.title,
 * body: data.body
 * })
 * 
 * ent
 */