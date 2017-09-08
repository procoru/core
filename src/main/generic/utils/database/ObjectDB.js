class ObjectDB {
    /**
     * @param tableName
     * @returns {Promise}
     */
    constructor(tableName) {
        this._tableName = tableName;
        return this._init();
    }

    /**
     * @returns {Promise.<void>}
     * @private
     */
    async _init() {
        const db = await BaseTypedDB.db();
        this._store = db.getObjectStore(this._tableName);
    }

    /**
     * @param {{hash: function():Hash}|{hashCode: function():string}} obj
     * @returns {Promise.<string>}
     */
    async key(obj) {
        if (obj.hash) return (await obj.hash()).toBase64();
        if (obj.hashCode) return obj.hashCode();
        throw 'ObjectDB requires objects with a .hash() or .hashCode() method';
    }

    /**
     *
     * @param {string} key
     * @param {function(obj:*):*} decoder
     * @returns {Promise.<Object>}
     */
    async get(key, decoder=undefined) {
        return await this._store.get(key, decoder);
    }

    /**
     * @param {object} obj
     * @returns {Promise.<string>}
     */
    async put(obj) {
        const key = await this.key(obj);
        await this._store.put(key, obj);
        return key;
    }

    /**
     * @param {string} key
     * @returns {Promise.<string>}
     */
    getString(key) {
        return this._store.get(key, null);
    }

    /**
     * @param {string} key
     * @param {string} value
     * @returns {Promise.<string>}
     */
    async putString(key, value) {
        await this._store.put(key, value);
        return key;
    }

    /**
     * @param {object} obj
     * @returns {Promise.<string>}
     */
    async remove(obj) {
        const key = await this.key(obj);
        await this._store.remove(key);
        return key;
    }

    /**
     * @returns {Transaction}
     */
    async transaction() {
        const tx = this._store.transaction();
        tx.getString = function(key) {
            return tx.get(key, null);
        };
        tx.putString = async function(key, value) {
            await tx.put(key, value);
            return key;
        }
        return tx;
    }
}
Class.register(ObjectDB);
