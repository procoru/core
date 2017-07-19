var levelup = require('levelup');

class TypedDB {
    constructor(tableName, type) {
        if (!type || !type.copy) throw 'NodeJS TypedDB requires type with .copy()';
        this._db = levelup('./database/' + tableName, {
            keyEncoding: 'ascii'
        });
        this._type = type;
    }

    getObject(key) {
        return new Promise((resolve, error) => {
            this._db.get(key, {valueEncoding: TypedDB.JSON_ENCODING}, (err, value) => {
                if (err) {
                    resolve(undefined);
                    return;
                }
                resolve(this._type.copy(value));
            });
        });
    }

    putObject(key, value) {
        return new Promise((resolve, error) => {
            this._db.put(key, value, {valueEncoding: TypedDB.JSON_ENCODING}, err => err ? error(err) : resolve());
        });
    }

    putString(key, value) {
        return new Promise((resolve, error) => {
            this._db.put(key, value, {valueEncoding: 'ascii'}, err => err ? error(err) : resolve());
        });
    }

    getString(key) {
        return new Promise((resolve, error) => {
            this._db.get(key, {valueEncoding: 'ascii'}, (err, value) => {
                if (err) {
                    resolve(undefined);
                    return;
                }
                resolve(value);
            });
        });
    }

    remove(key) {
        return new Promise((resolve, error) => {
            this._db.del(key, err => resolve());
        });
    }

    nativeTransaction() {
        return Promise.resolve(new NativeDBTransaction(this._db));
    }

    transaction() {
        return new TypedDBTransaction(this);
    }
}
TypedDB.JSON_ENCODING = {
    encode: val => JSON.stringify(val, (k, v) => {
        if (v instanceof Uint8Array) {
            return Array.from(v);
        }
        return v;
    }),
    decode: JSON.parse,
    buffer: false,
    type: 'json'
};
Class.register(TypedDB);

class NativeDBTransaction extends Observable {
    constructor(db) {
        super();
        this._batch = db.batch();
    }

    open() {
        // Empty method needed for compatibility.
    }

    putObject(key, value) {
        this._batch.put(key, value, {valueEncoding: TypedDB.JSON_ENCODING});
    }

    putString(key, value) {
        this._batch.put(key, value, {valueEncoding: 'ascii'});
    }

    remove(key) {
        this._batch.del(key);
    }

    commit() {
        this._batch.write(err => {
            if (err) {
                this.fire('error', err);
            } else {
                this.fire('complete');
            }
        });
    }

}
Class.register(NativeDBTransaction);
