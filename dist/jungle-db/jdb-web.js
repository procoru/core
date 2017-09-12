if (typeof JDB === 'undefined') {
    var JDB = typeof window !== 'undefined' ? window : {};
}
var Proxy; // ensure Proxy exists
(function (exports) {
    exports = typeof exports !== 'undefined' ? exports : {};

class Class {
    static register(cls) {
        if (typeof exports !== 'undefined') exports[cls.name] = cls;
    }
}
Class.register(Class);

class IDBTools {
    /**
     * Converts our KeyRange objects into IDBKeyRange objects.
     * @param {KeyRange} keyRange A KeyRange object.
     * @returns {IDBKeyRange} The corresponding IDBKeyRange.
     */
    static convertKeyRange(keyRange) {
        if (!(keyRange instanceof KeyRange)) return keyRange;
        if (keyRange.exactMatch) {
            return IDBKeyRange.only(keyRange.lower);
        }
        if (keyRange.lower !== undefined && keyRange.upper === undefined) {
            return IDBKeyRange.lowerBound(keyRange.lower, keyRange.lowerOpen);
        }
        if (keyRange.upper !== undefined && keyRange.lower === undefined) {
            return IDBKeyRange.upperBound(keyRange.upper, keyRange.upperOpen);
        }
        return IDBKeyRange.bound(keyRange.lower, keyRange.upper, keyRange.lowerOpen, keyRange.upperOpen);
    }
}
Class.register(IDBTools);

/**
 * This class is a wrapper around the IndexedDB.
 * It manages the access to a single table/object store.
 * @implements {IObjectStore}
 */
class IDBBackend {
    /**
     * Creates a wrapper given a JungleDB object and table name.
     * @param {JungleDB} db The JungleDB object managing the connection.
     * @param {string} tableName THe table name this object store represents.
     * @param {function(obj:*):*} [decoder] Optional decoder function for the object store (null is the identity decoder).
     */
    constructor(db, tableName, decoder=null) {
        this._db = db;
        this._tableName = tableName;
        /** @type {Map.<string,IIndex>} */
        this._indices = new Map();
        this._indicesToDelete = [];
        this._decoder = decoder;
    }

    /**
     * A map of index names to indices.
     * The index names can be used to access an index.
     * @type {Map.<string,IIndex>}
     */
    get indices() {
        return this._indices;
    }

    /**
     * Internal method called by the JungleDB to create the necessary indices during a version upgrade.
     * @param {IDBObjectStore} objectStore The IDBObjectStore object obtained during a version upgrade.
     * @protected
     */
    init(objectStore) {
        // Delete indices.
        for (const indexName of this._indicesToDelete) {
            objectStore.deleteIndex(indexName);
        }
        delete this._indicesToDelete;

        // Create indices.
        for (const [indexName, index] of this._indices) {
            objectStore.createIndex(indexName, index.keyPath, { unique: false, multiEntry: index.multiEntry});
        }
    }

    /**
     * Internal method called to decode a single value.
     * @param {*} value Value to be decoded.
     * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
     * @returns {*} The decoded value, either by the object store's default or the overriding decoder if given.
     */
    decode(value, decoder=undefined) {
        if (value === undefined) {
            return undefined;
        }
        if (decoder !== undefined) {
            if (decoder === null) {
                return value;
            }
            return decoder(value);
        }
        if (this._decoder !== null && this._decoder !== undefined) {
            return this._decoder(value);
        }
        return value;
    }

    /**
     * Internal method called to decode multiple values.
     * @param {Array.<*>} values Values to be decoded.
     * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
     * @returns {Array.<*>} The decoded values, either by the object store's default or the overriding decoder if given.
     */
    decodeArray(values, decoder=undefined) {
        if (!Array.isArray(values)) {
            return this.decode(values, decoder);
        }
        if (decoder !== undefined) {
            if (decoder === null) {
                return values;
            }
            return values.map(decoder);
        }
        if (this._decoder !== null && this._decoder !== undefined) {
            return values.map(this._decoder);
        }
        return values;
    }

    /**
     * Returns a promise of the object stored under the given primary key.
     * Resolves to undefined if the key is not present in the object store.
     * @param {string} key The primary key to look for.
     * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
     * @returns {Promise.<*>} A promise of the object stored under the given key, or undefined if not present.
     */
    async get(key, decoder=undefined) {
        const db = await this._db.backend;
        return new Promise((resolve, reject) => {
            const getTx = db.transaction([this._tableName])
                .objectStore(this._tableName)
                .get(key);
            getTx.onsuccess = event => resolve(this.decode(event.target.result, decoder));
            getTx.onerror = reject;
        });
    }

    /**
     * Inserts or replaces a key-value pair.
     * @param {string} key The primary key to associate the value with.
     * @param {*} value The value to write.
     * @returns {Promise} The promise resolves after writing to the current object store finished.
     */
    async put(key, value) {
        const db = await this._db.backend;
        return new Promise((resolve, reject) => {
            const putTx = db.transaction([this._tableName], 'readwrite')
                .objectStore(this._tableName)
                .put(value, key);
            putTx.onsuccess = event => resolve(event.target.result);
            putTx.onerror = reject;
        });
    }

    /**
     * Removes the key-value pair of the given key from the object store.
     * @param {string} key The primary key to delete along with the associated object.
     * @returns {Promise} The promise resolves after writing to the current object store finished.
     */
    async remove(key) {
        const db = await this._db.backend;
        return new Promise((resolve, reject) => {
            const deleteTx = db.transaction([this._tableName], 'readwrite')
                .objectStore(this._tableName)
                .delete(key);
            deleteTx.onsuccess = event => resolve(event.target.result);
            deleteTx.onerror = reject;
        });
    }

    /**
     * Returns a promise of an array of objects whose primary keys fulfill the given query.
     * If the optional query is not given, it returns all objects in the object store.
     * If the query is of type KeyRange, it returns all objects whose primary keys are within this range.
     * If the query is of type Query, it returns all objects whose primary keys fulfill the query.
     * @param {Query|KeyRange} [query] Optional query to check keys against.
     * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
     * @returns {Promise.<Array.<*>>} A promise of the array of objects relevant to the query.
     */
    async values(query=null, decoder=undefined) {
        if (query !== null && query instanceof Query) {
            return query.values(this);
        }
        query = IDBTools.convertKeyRange(query);
        const db = await this._db.backend;
        return new Promise((resolve, reject) => {
            const getRequest = db.transaction([this._tableName], 'readonly')
                .objectStore(this._tableName)
                .getAll(query);
            getRequest.onsuccess = () => resolve(this.decodeArray(getRequest.result, decoder));
            getRequest.onerror = () => reject(getRequest.error);
        });
    }

    /**
     * Returns a promise of a set of keys fulfilling the given query.
     * If the optional query is not given, it returns all keys in the object store.
     * If the query is of type KeyRange, it returns all keys of the object store being within this range.
     * If the query is of type Query, it returns all keys fulfilling the query.
     * @param {Query|KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<Set.<string>>} A promise of the set of keys relevant to the query.
     */
    async keys(query=null) {
        if (query !== null && query instanceof Query) {
            return query.keys(this);
        }
        query = IDBTools.convertKeyRange(query);
        const db = await this._db.backend;
        return new Promise((resolve, reject) => {
            const getRequest = db.transaction([this._tableName], 'readonly')
                .objectStore(this._tableName)
                .getAllKeys(query);
            getRequest.onsuccess = () => resolve(Set.from(getRequest.result));
            getRequest.onerror = () => reject(getRequest.error);
        });
    }

    /**
     * Returns a promise of the object whose primary key is maximal for the given range.
     * If the optional query is not given, it returns the object whose key is maximal.
     * If the query is of type KeyRange, it returns the object whose primary key is maximal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
     * @returns {Promise.<*>} A promise of the object relevant to the query.
     */
    async maxValue(query=null, decoder=undefined) {
        query = IDBTools.convertKeyRange(query);
        const db = await this._db.backend;
        return new Promise((resolve, reject) => {
            const openCursorRequest = db.transaction([this._tableName], 'readonly')
                .objectStore(this._tableName)
                .openCursor(query, 'prev');
            openCursorRequest.onsuccess = () => resolve(this.decode(openCursorRequest.result.value, decoder));
            openCursorRequest.onerror = () => reject(openCursorRequest.error);
        });
    }

    /**
     * Returns a promise of the key being maximal for the given range.
     * If the optional query is not given, it returns the maximal key.
     * If the query is of type KeyRange, it returns the key being maximal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<string>} A promise of the key relevant to the query.
     */
    async maxKey(query=null) {
        query = IDBTools.convertKeyRange(query);
        const db = await this._db.backend;
        return new Promise((resolve, reject) => {
            const openCursorRequest = db.transaction([this._tableName], 'readonly')
                .objectStore(this._tableName)
                .openKeyCursor(query, 'prev');
            openCursorRequest.onsuccess = () => resolve(openCursorRequest.result.primaryKey);
            openCursorRequest.onerror = () => reject(openCursorRequest.error);
        });
    }

    /**
     * Returns a promise of the object whose primary key is minimal for the given range.
     * If the optional query is not given, it returns the object whose key is minimal.
     * If the query is of type KeyRange, it returns the object whose primary key is minimal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
     * @returns {Promise.<*>} A promise of the object relevant to the query.
     */
    async minValue(query=null, decoder=undefined) {
        query = IDBTools.convertKeyRange(query);
        const db = await this._db.backend;
        return new Promise((resolve, reject) => {
            const openCursorRequest = db.transaction([this._tableName], 'readonly')
                .objectStore(this._tableName)
                .openCursor(query, 'next');
            openCursorRequest.onsuccess = () => resolve(this.decode(openCursorRequest.result.value, decoder));
            openCursorRequest.onerror = () => reject(openCursorRequest.error);
        });
    }

    /**
     * Returns a promise of the key being minimal for the given range.
     * If the optional query is not given, it returns the minimal key.
     * If the query is of type KeyRange, it returns the key being minimal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<string>} A promise of the key relevant to the query.
     */
    async minKey(query=null) {
        query = IDBTools.convertKeyRange(query);
        const db = await this._db.backend;
        return new Promise((resolve, reject) => {
            const openCursorRequest = db.transaction([this._tableName], 'readonly')
                .objectStore(this._tableName)
                .openKeyCursor(query, 'next');
            openCursorRequest.onsuccess = () => resolve(openCursorRequest.result.primaryKey);
            openCursorRequest.onerror = () => reject(openCursorRequest.error);
        });
    }

    /**
     * Returns the count of entries in the given range.
     * If the optional query is not given, it returns the count of entries in the object store.
     * If the query is of type KeyRange, it returns the count of entries within the given range.
     * @param {KeyRange} [query]
     * @returns {Promise.<number>}
     */
    async count(query=null) {
        query = IDBTools.convertKeyRange(query);
        const db = await this._db.backend;
        return new Promise((resolve, reject) => {
            const getRequest = db.transaction([this._tableName], 'readonly')
                .objectStore(this._tableName)
                .count(query);
            getRequest.onsuccess = () => resolve(getRequest.result);
            getRequest.onerror = () => reject(getRequest.error);
        });
    }

    /**
     * The wrapper object stores do not support this functionality
     * as it is managed by the ObjectStore.
     * @param {Transaction} [tx]
     * @returns {Promise.<boolean>}
     */
    async commit(tx) {
        throw 'Unsupported operation';
    }

    /**
     * The wrapper object stores do not support this functionality
     * as it is managed by the ObjectStore.
     * @param {Transaction} [tx]
     */
    async abort(tx) {
        throw 'Unsupported operation';
    }

    /**
     * Returns the index of the given name.
     * If the index does not exist, it returns undefined.
     * @param {string} indexName The name of the requested index.
     * @returns {IIndex} The index associated with the given name.
     */
    index(indexName) {
        return this._indices.get(indexName);
    }

    /** @type {Promise.<IDBDatabase>} The underlying IDBDatabase. */
    get backend() {
        return this._db.backend;
    }

    /** @type {string} The own table name. */
    get tableName() {
        return this._tableName;
    }

    /**
     * Internally applies a transaction to the store's state.
     * This needs to be done in batch (as a db level transaction), i.e., either the full state is updated
     * or no changes are applied.
     * @param {Transaction} tx The transaction to apply.
     * @returns {Promise} The promise resolves after applying the transaction.
     * @protected
     */
    async _apply(tx) {
        const db = await this._db.backend;
        return new Promise((resolve, reject) => {
            const idbTx = db.transaction([this._tableName], 'readwrite');
            const objSt = idbTx.objectStore(this._tableName);

            if (tx._truncated) {
                objSt.clear();
            }
            for (const key of tx._removed) {
                objSt.delete(key);
            }
            for (const [key, value] of tx._modified) {
                objSt.put(value, key);
            }

            idbTx.oncomplete = () => resolve(true);
            idbTx.onerror = reject;
        });
    }

    /**
     * Empties the object store.
     * @returns {Promise} The promise resolves after emptying the object store.
     */
    async truncate() {
        const db = await this._db.backend;
        return new Promise((resolve, reject) => {
            const getRequest = db.transaction([this._tableName], 'readonly')
                .objectStore(this._tableName)
                .clear();
            getRequest.onsuccess = resolve;
            getRequest.onerror = () => reject(getRequest.error);
        });
    }

    /**
     * Creates a new secondary index on the object store.
     * Currently, all secondary indices are non-unique.
     * They are defined by a key within the object or alternatively a path through the object to a specific subkey.
     * For example, ['a', 'b'] could be used to use 'key' as the key in the following object:
     * { 'a': { 'b': 'key' } }
     * Secondary indices may be multiEntry, i.e., if the keyPath resolves to an iterable object, each item within can
     * be used to find this entry.
     * If a new object does not possess the key path associated with that index, it is simply ignored.
     *
     * This function may only be called before the database is connected.
     * Moreover, it is only executed on database version updates or on first creation.
     * @param {string} indexName The name of the index.
     * @param {string|Array.<string>} [keyPath] The path to the key within the object. May be an array for multiple levels.
     * @param {boolean} [multiEntry]
     */
    async createIndex(indexName, keyPath, multiEntry=false) {
        if (this._db.connected) throw 'Cannot create index while connected';
        keyPath = keyPath || indexName;
        const index = new PersistentIndex(this, indexName, keyPath, multiEntry);
        this._indices.set(indexName, index);
    }

    /**
     * Deletes a secondary index from the object store.
     * @param indexName
     * @returns {Promise} The promise resolves after deleting the index.
     */
    async deleteIndex(indexName) {
        if (this._db.connected) throw 'Cannot delete index while connected';
        this._indicesToDelete.push(indexName);
    }

    /**
     * Closes the object store and potential connections.
     * @returns {Promise} The promise resolves after closing the object store.
     */
    close() {
        // Nothing to do here, it is all done on the DB level.
        return this._db.close();
    }
}
Class.register(IDBBackend);

/**
 * @implements {IJungleDB}
 */
class JungleDB {
    /**
     * Initiates a new database connection. All changes to the database structure
     * require an increase in the version number.
     * Whenever new object stores need to be created, old ones deleted,
     * or indices created/deleted, the dbVersion number has to be increased.
     * When the version number increases, the given function onUpgradeNeeded is called
     * after modifying the database structure.
     * @param {string} name The name of the database.
     * @param {number} dbVersion The current version of the database.
     * @param {function()} [onUpgradeNeeded] A function to be called after upgrades of the structure.
     */
    constructor(name, dbVersion, onUpgradeNeeded) {
        if (dbVersion <= 0) throw 'The version provided must not be less or equal to 0.';
        this._databaseDir = name;
        this._dbVersion = dbVersion;
        this._onUpgradeNeeded = onUpgradeNeeded;
        this._connected = false;
        this._objectStores = new Map();
        this._objectStoreBackends = new Map();
        this._objectStoresToDelete = [];
    }

    /**
     * @type {IDBFactory} The browser's IDB factory.
     * @private
     */
    get _indexedDB() {
        return window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB;
    }

    /**
     * Connects to the indexedDB.
     * @returns {Promise.<IDBDatabase>} A promise resolving on successful connection.
     * The raw IDBDatabase object should not be used.
     */
    connect() {
        if (this._db) return Promise.resolve(this._db);

        const request = this._indexedDB.open(this._databaseDir, this._dbVersion);
        const that = this;

        return new Promise((resolve, reject) => {
            request.onsuccess = () => {
                that._connected = true;
                that._db = request.result;
                resolve(request.result);
            };

            request.onupgradeneeded = event => that._initDB(event);
        });
    }

    /**
     * Internal method that is called when a db upgrade is required.
     * @param {*} event The obupgradeneeded event.
     * @returns {Promise.<void>} A promise that resolves after successful completion.
     * @private
     */
    async _initDB(event) {
        const db = event.target.result;

        // Delete existing ObjectStores.
        for (const tableName of this._objectStoresToDelete) {
            db.deleteObjectStore(tableName);
        }
        delete this._objectStoresToDelete;

        // Create new ObjectStores.
        for (const [tableName, objStore] of this._objectStoreBackends) {
            const IDBobjStore = db.createObjectStore(tableName);
            // Create indices.
            objStore.init(IDBobjStore);
        }
        delete this._objectStoreBackends;

        // Call user defined function if requested.
        if (this._onUpgradeNeeded) {
            await this._onUpgradeNeeded();
        }
    }

    /** @type {Promise.<IDBDatabase>} A promise to the underlying IDBDatabase. */
    get backend() {
        return this.connect();
    }

    /** @type {boolean} Whether a connection is established. */
    get connected() {
        return this._connected;
    }

    /**
     * Returns the ObjectStore object for a given table name.
     * @param {string} tableName The table name to access.
     * @returns {ObjectStore} The ObjectStore object.
     */
    getObjectStore(tableName) {
        return this._objectStores.get(tableName);
    }

    /**
     * Creates a new object store (and allows to access it).
     * This method always has to be called before connecting to the database.
     * If it is not called, the object store will not be accessible afterwards.
     * If a call is newly introduced, but the database version did not change,
     * the table does not exist yet.
     * @param {string} tableName The name of the object store.
     * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default.
     */
    createObjectStore(tableName, decoder=null) {
        if (this._connected) throw 'Cannot create ObjectStore while connected';
        if (this._objectStores.has(tableName)) {
            return this._objectStores.get(tableName);
        }
        const backend = new IDBBackend(this, tableName, decoder);
        const cachedBackend = new CachedBackend(backend);
        const objStore = new ObjectStore(cachedBackend, this, decoder);
        this._objectStores.set(tableName, objStore);
        this._objectStoreBackends.set(tableName, backend);
        return objStore;
    }

    /**
     * Deletes an object store.
     * This method has to be called before connecting to the database.
     * @param {string} tableName
     */
    async deleteObjectStore(tableName) {
        if (this._connected) throw 'Cannot delete ObjectStore while connected';
        this._objectStoresToDelete.push(tableName);
    }

    /**
     * Closes the database connection.
     * @returns {Promise} The promise resolves after closing the database.
     */
    async close() {
        if (this._connected) {
            this._connected = false;
            (await this.backend).close();
        }
    }

    /**
     * Fully deletes the database.
     * @returns {Promise} The promise resolves after deleting the database.
     */
    async destroy() {
        await this.close();
        return new Promise((resolve, reject) => {
            const req = this._indexedDB.deleteDatabase(this._databaseDir);
            req.onsuccess = resolve;
            req.onerror = reject;
        });
    }
}
Class.register(JungleDB);

/**
 * This class represents a wrapper around the IndexedDB indices.
 * @implements IIndex
 */
class PersistentIndex {
    /**
     * @param {IDBBackend} objectStore
     * @param {string} indexName
     * @param {string|Array.<string>} keyPath
     * @param {boolean} multiEntry
     */
    constructor(objectStore, indexName, keyPath, multiEntry=false) {
        this._objectStore = objectStore;
        this._indexName = indexName;
        this._keyPath = keyPath;
        this._multiEntry = multiEntry;
    }

    /**
     * Reinitialises the index.
     * @returns {Promise} The promise resolves after emptying the index.
     */
    async truncate() {
        // Will automatically be truncated.
    }

    /**
     * The key path associated with this index.
     * A key path is defined by a key within the object or alternatively a path through the object to a specific subkey.
     * For example, ['a', 'b'] could be used to use 'key' as the key in the following object:
     * { 'a': { 'b': 'key' } }
     * @type {string|Array.<string>}
     */
    get keyPath() {
        return this._keyPath;
    }

    /**
     * This value determines whether the index supports multiple secondary keys per entry.
     * If so, the value at the key path is considered to be an iterable.
     * @type {boolean}
     */
    get multiEntry() {
        return this._multiEntry;
    }

    /**
     * Internal method to access IDB index.
     * @param {IDBDatabase} db The indexed DB.
     * @returns {IDBIndex} The indexedDB's index object.
     * @private
     */
    _index(db) {
        return db.transaction([this._objectStore.tableName], 'readonly')
            .objectStore(this._objectStore.tableName)
            .index(this._indexName);
    }

    /**
     * Returns a promise of an array of objects whose secondary keys fulfill the given query.
     * If the optional query is not given, it returns all objects in the index.
     * If the query is of type KeyRange, it returns all objects whose secondary keys are within this range.
     * @param {KeyRange} [query] Optional query to check secondary keys against.
     * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
     * @returns {Promise.<Array.<*>>} A promise of the array of objects relevant to the query.
     */
    async values(query=null, decoder=undefined) {
        query = IDBTools.convertKeyRange(query);
        const db = await this._objectStore.backend;
        return new Promise((resolve, reject) => {
            const getRequest = this._index(db).getAll(query);
            getRequest.onsuccess = () => resolve(this._objectStore.decodeArray(getRequest.result, decoder));
            getRequest.onerror = () => reject(getRequest.error);
        });
    }

    /**
     * Returns a promise of a set of primary keys, whose associated objects' secondary keys are in the given range.
     * If the optional query is not given, it returns all primary keys in the index.
     * If the query is of type KeyRange, it returns all primary keys for which the secondary key is within this range.
     * @param {KeyRange} [query] Optional query to check the secondary keys against.
     * @returns {Promise.<Set.<string>>} A promise of the set of primary keys relevant to the query.
     */
    async keys(query=null) {
        query = IDBTools.convertKeyRange(query);
        const db = await this._objectStore.backend;
        return new Promise((resolve, reject) => {
            const getRequest = this._index(db).getAllKeys(query);
            getRequest.onsuccess = () => resolve(Set.from(getRequest.result));
            getRequest.onerror = () => reject(getRequest.error);
        });
    }

    /**
     * Returns a promise of an array of objects whose secondary key is maximal for the given range.
     * If the optional query is not given, it returns the objects whose secondary key is maximal within the index.
     * If the query is of type KeyRange, it returns the objects whose secondary key is maximal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
     * @returns {Promise.<Array.<*>>} A promise of array of objects relevant to the query.
     */
    async maxValues(query=null, decoder=undefined) {
        query = IDBTools.convertKeyRange(query);
        const db = await this._objectStore.backend;
        return new Promise((resolve, reject) => {
            const request = this._index(db).openCursor(query, 'prev');
            request.onsuccess = () => resolve(request.result ? this._objectStore.decodeArray(request.result.value, decoder) : []);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Returns a promise of a set of primary keys, whose associated secondary keys are maximal for the given range.
     * If the optional query is not given, it returns the set of primary keys, whose associated secondary key is maximal within the index.
     * If the query is of type KeyRange, it returns the set of primary keys, whose associated secondary key is maximal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<Set.<*>>} A promise of the key relevant to the query.
     */
    async maxKeys(query=null) {
        query = IDBTools.convertKeyRange(query);
        const db = await this._objectStore.backend;
        return new Promise((resolve, reject) => {
            const request = this._index(db).openKeyCursor(query, 'prev');
            request.onsuccess = () => resolve(Set.from(request.result ? request.result.primaryKey : []));
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Returns a promise of an array of objects whose secondary key is minimal for the given range.
     * If the optional query is not given, it returns the objects whose secondary key is minimal within the index.
     * If the query is of type KeyRange, it returns the objects whose secondary key is minimal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
     * @returns {Promise.<Array.<*>>} A promise of array of objects relevant to the query.
     */
    async minValues(query=null, decoder=undefined) {
        query = IDBTools.convertKeyRange(query);
        const db = await this._objectStore.backend;
        return new Promise((resolve, reject) => {
            const request = this._index(db).openCursor(query, 'next');
            request.onsuccess = () => resolve(request.result ? this._objectStore.decodeArray(request.result.value, decoder) : []);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Returns a promise of a set of primary keys, whose associated secondary keys are minimal for the given range.
     * If the optional query is not given, it returns the set of primary keys, whose associated secondary key is minimal within the index.
     * If the query is of type KeyRange, it returns the set of primary keys, whose associated secondary key is minimal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<Set.<*>>} A promise of the key relevant to the query.
     */
    async minKeys(query=null) {
        query = IDBTools.convertKeyRange(query);
        const db = await this._objectStore.backend;
        return new Promise((resolve, reject) => {
            const request = this._index(db).openKeyCursor(query, 'next');
            request.onsuccess = () => resolve(Set.from(request.result ? request.result.primaryKey : []));
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Returns the count of entries, whose secondary key is in the given range.
     * If the optional query is not given, it returns the count of entries in the index.
     * If the query is of type KeyRange, it returns the count of entries, whose secondary key is within the given range.
     * @param {KeyRange} [query]
     * @returns {Promise.<number>}
     */
    async count(query=null) {
        query = IDBTools.convertKeyRange(query);
        const db = await this._objectStore.backend;
        return new Promise((resolve, reject) => {
            const request = this._index(db).count(query);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
}
Class.register(PersistentIndex);


/*
 B+ Tree processing
 Version 2.0.0
 Based on code by Graham O'Neill, April 2013
 Modified by Pascal Berrang, July 2017

 ------------------------------------------------------------------------------

 Copyright (c) 2017 Graham O'Neill & Pascal Berrang

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 ------------------------------------------------------------------------------

 */

/**
 * This abstract class describes a general Node within a B+Tree.
 * Each node owns an array of keys and has an id.
 */
class Node {
    /**
     * Creates a new node.
     * @param {number} id The node's id.
     * @param {Array.<*>} [keys] Optional array of keys (default is empty).
     */
    constructor(id, keys=[]) {
        this._keys = keys;
        this._id = id;
    }

    /**
     * @type {number} The id of the node.
     */
    get id() {
        return this._id;
    }

    /**
     * @type {Array.<*>} The array of keys.
     */
    get keys() {
        return this._keys;
    }

    /**
     * Converts a node to JSON, which is necessary to persist the B+Tree.
     * @returns {{_id: number, _keys: Array.<*>}} The JSON representation.
     */
    toJSON() {
        return {
            _id: this._id,
            _keys: this._keys
        };
    }

    /**
     * Constructs a node from a JSON object.
     * @param {{isLeaf: boolean, _id: number, _keys: Array.<*>}} o The JSON object to build the node from.
     * @returns {Node} The constructed node.
     */
    static fromJSON(o) {
        if (o.isLeaf === true) {
            return LeafNode.fromJSON(o);
        } else if (o.isLeaf === false) {
            return InnerNode.fromJSON(o);
        }
        return undefined;
    }
}
Class.register(Node);

/**
 * A Leaf Node in the B+Tree.
 * @extends Node
 */
class LeafNode extends Node {
    /**
     * Creates a new leaf node.
     * Leaf nodes store key value pairs,
     * hence the keys and records arrays are required to have the same length.
     * In an index, the keys array usually stores the secondary key,
     * while the records array stores the corresponding primary key.
     * The B+Tree ensures that the items in the keys array are ordered ascending.
     * @param {number} id The node's id.
     * @param {Array.<*>} [keys] Optional array of keys (default is empty).
     * @param {Array.<*>} [records] Optional array of records (default is empty).
     */
    constructor(id, keys=[], records=[]) {
        if (keys.length !== records.length) {
            throw 'Keys and records must have the same length';
        }
        super(id, keys);
        this._records = records;
        this.prevLeaf = null;
        this.nextLeaf = null;
    }

    /**
     * @type {Array.<*>} The list of records associated with the keys.
     */
    get records() {
        return this._records;
    }

    /**
     * Returns whether this is a leaf node.
     * @returns {boolean} True, since it is a leaf node.
     */
    isLeaf() {
        return true;
    }

    /**
     * Converts a node to JSON, which is necessary to persist the B+Tree.
     * @returns {{_id: number, _keys: Array.<*>, _records: Array.<*>, isLeaf: boolean, prevLeaf: number, nextLeaf: number}} The JSON representation.
     */
    toJSON() {
        const o = super.toJSON();
        o.isLeaf = true;
        o._records = this._records;
        o.prevLeaf = this.prevLeaf ? this.prevLeaf.id : this.prevLeaf;
        o.nextLeaf = this.nextLeaf ? this.nextLeaf.id : this.nextLeaf;
        return o;
    }

    /**
     * Constructs a node from a JSON object.
     * @param {{_id: number, _keys: Array.<*>, _records: Array.<*>, isLeaf: boolean, prevLeaf: number, nextLeaf: number}} o The JSON object to build the node from.
     * @returns {Node} The constructed node.
     */
    static fromJSON(o) {
        const leaf = new LeafNode(o._id, o._keys, o._records);
        leaf.prevLeaf = o.prevLeaf;
        leaf.nextLeaf = o.nextLeaf;
        return leaf;
    }

    /**
     * Searches the node for a specific key and returns its position if found.
     * The near parameter allows to find either an exact match or the first key
     * greater/less or equal than the specified key.
     *
     * Since the B+tree limits the number of records per leaf node,
     * the complexity of this method is in O([order/2, order-1]).
     * @param {*} key The key to look for.
     * @param {BTree.NEAR_MODE} near
     * @returns {number} The index of the match if found, -1 otherwise.
     */
    getItem(key, near) {
        const keys = this._keys;
        // Find item matching the query.
        if (near === BTree.NEAR_MODE.GE) {
            for (let i=0, len=keys.length; i<len; ++i) {
                if (key <= keys[i]) return i;
            }
        } else if (near === BTree.NEAR_MODE.LE) {
            for (let i=keys.length - 1; i>=0; --i) {
                if (key >= keys[i]) return i;
            }
        } else {
            for (let i=0, len=keys.length; i<len; ++i) {
                if (key === keys[i]) return i;
            }
        }
        return -1;
    }

    /**
     * Adds a key, record pair to this leaf node.
     * By definition, the key is inserted into the keys of this leaf node,
     * such that the ascending order of the keys is maintained.
     * @param {*} key The key to insert.
     * @param {*} record The corresponding record to insert.
     * @returns {number} The position it was inserted at.
     */
    addKey(key, record) {
        let insertPos = this._keys.length;
        // Find position to insert.
        for (let i=0, len=insertPos; i<len; ++i) {
            // Key already exists.
            if (key === this._keys[i]) {
                return -1;
            }
            // Update potential position.
            if (key <= this._keys[i]) {
                insertPos = i;
                break;
            }
        }
        // Insert key/record.
        this._keys.splice(insertPos, 0, key);
        this._records.splice(insertPos, 0, record);
        return insertPos;
    }

    /**
     * Splits the leaf node into two nodes (this + one new node).
     * The resulting nodes should have almost equal sizes.
     * The new node will return the upper half of the previous entries.
     * @param {number} newId The id to be assigned the new node.
     * @returns {LeafNode} The new leaf node containing the upper half of entries.
     */
    split(newId) {
        const mov = Math.floor(this._keys.length/2);
        const newKeys = [], newRecords = [];
        for (let i = 0; i < mov; ++i) {
            newKeys.unshift(this._keys.pop());
            newRecords.unshift(this._records.pop());
        }
        const newL = new LeafNode(newId, newKeys, newRecords);
        newL.prevLeaf = this;
        newL.nextLeaf = this.nextLeaf;
        if (this.nextLeaf !== null) this.nextLeaf.prevLeaf = newL;
        this.nextLeaf = newL;
        return newL;
    }

    /**
     * Merges two leaf nodes together (this + frNod).
     * The given node frNod is no longer connected afterwards.
     * @param {LeafNode} frNod The node to merge with.
     * @param {InnerNode} paNod The parent node that needs to be updated.
     * @param {*} frKey The key of the old leaf in the parent.
     */
    merge(frNod, paNod, frKey) {
        // Append keys/records.
        for (let i=0, len=frNod.keys.length; i<len; ++i) {
            this._keys.push(frNod.keys[i]);
            this._records.push(frNod.records[i]);
        }
        // Update leaf pointers.
        this.nextLeaf = frNod.nextLeaf;
        if (frNod.nextLeaf !== null) frNod.nextLeaf.prevLeaf = this;
        frNod.prevLeaf = null;
        frNod.nextLeaf = null;
        // Update parent: find position of old leaf.
        let pos = paNod.keys.length-1;
        for (let i=pos; i>=0; --i) {
            if (paNod.keys[i] === frKey) {
                pos = i;
                break;
            }
        }
        // Delete old key from parent.
        paNod.keys.splice(pos, 1);
        paNod.nodePointers.splice(pos+1, 1);
    }

}
Class.register(LeafNode);

/**
 * An Inner Node in the B+Tree.
 * @extends Node
 */
class InnerNode extends Node {
    /**
     * Creates a new inner node.
     * The only key values that appear in the internal nodes are the first key values from each leaf,
     * with the exception of the key from the very first leaf which isn't included.
     * Each key value that appears in the internal nodes only appears once.
     * @param {number} id The node's id.
     * @param {Array.<*>} [keys] The first key of each child node (except for the first one).
     * @param {Array.<Node>} [nodePointers] The pointers to the child nodes.
     */
    constructor(id, keys=[], nodePointers=[]) {
        super(id, keys);
        this._nodePointers = nodePointers;
    }

    /**
     * Returns whether this is a leaf node.
     * @returns {boolean} False, since it is an inner node.
     */
    isLeaf() {
        return false;
    }

    /**
     * @type {Array.<Node>} The pointers to the children.
     */
    get nodePointers() {
        return this._nodePointers;
    }

    /**
     * Converts a node to JSON, which is necessary to persist the B+Tree.
     * @returns {{_id: number, _keys: Array.<*>, isLeaf: boolean, _nodePointers: Array.<number>}} The JSON representation.
     */
    toJSON() {
        const o = super.toJSON();
        const nodePointers = [];
        for (let i=0; i<this._nodePointers.length; ++i) {
            nodePointers.push(this._nodePointers[i] ? this._nodePointers[i].id : this._nodePointers[i]);
        }
        o.isLeaf = false;
        o._nodePointers = nodePointers;
        return o;
    }

    /**
     * Constructs a node from a JSON object.
     * @param {{_id: number, _keys: Array.<*>, isLeaf: boolean, _nodePointers: Array.<number>}} o The JSON object to build the node from.
     * @returns {Node} The constructed node.
     */
    static fromJSON(o) {
        return new InnerNode(o._id, o._keys, o._nodePointers);
    }

    /**
     * Searches the node for a specific key and returns the matching child's position.
     *
     * Since the B+tree limits the number of records per leaf node,
     * the complexity of this method is in O([(order-1)/2, order-1]).
     * @param {*} key The key to look for.
     * @returns {number} The index of the match.
     */
    getItem(key) {
        const len = this._keys.length;
        for (let i=0; i<len; ++i) {
            if (key < this._keys[i]) return i;
        }
        return this._keys.length;
    }

    /**
     * Adds a key corresponding to a new child node to this inner node.
     * By definition, the key is inserted into the keys of this leaf node,
     * such that the ascending order of the keys is maintained.
     * @param {*} key The key to insert.
     * @param {Node} ptrL The pointer to the corresponding child node.
     * @param {Node} ptrR The pointer to the node right of the child node.
     * @returns {number} The position it was inserted at.
     */
    addKey(key, ptrL, ptrR) {
        const len = this._keys.length;
        let insertPos = len;
        // Find position to insert.
        for (let i=0; i<len; ++i) {
            if (key <= this._keys[i]) {
                insertPos = i;
                break;
            }
        }
        // Update keys and pointers.
        this._keys.splice(insertPos, 0, key);
        this._nodePointers.splice(insertPos, 0, ptrL);
        this._nodePointers[insertPos+1] = ptrR;
    }

    /**
     * Splits the node into two nodes (this + one new node).
     * The resulting nodes should have almost equal sizes.
     * The new node will return the upper half of the previous entries.
     * @param {number} newId The id to be assigned the new node.
     * @returns {InnerNode} The new inner node containing the upper half of entries.
     */
    split(newId) {
        const mov = Math.ceil(this._keys.length/2) - 1;
        const newNodePointers = [this._nodePointers.pop()];
        const newKeys = [];
        for (let i=mov-1; i>=0; --i) {
            newKeys.unshift(this._keys.pop());
            newNodePointers.unshift(this._nodePointers.pop());
        }
        return new InnerNode(newId, newKeys, newNodePointers);
    }

    /**
     * Merges two inner nodes together (this + frNod).
     * The given node frNod is no longer connected afterwards.
     * @param {InnerNode} frNod The node to merge with.
     * @param {InnerNode} paNod The parent node that needs to be updated.
     * @param {number} paItm The position in the parent.
     */
    merge(frNod, paNod, paItm) {
        const del = paNod.keys[paItm];
        // Add key from parent.
        this._keys.push(del);
        // Add keys and nodePointers from merged node.
        for (let i=0, len=frNod.keys.length; i<len; ++i) {
            this._keys.push(frNod.keys[i]);
            this._nodePointers.push(frNod.nodePointers[i]);
        }
        // Add last nodePointer as well.
        this._nodePointers.push(frNod.nodePointers[frNod.nodePointers.length-1]);
        paNod.keys.splice(paItm, 1); // Delete old key from parent.
        paNod.nodePointers.splice(paItm+1, 1); // Delete old pointer from parent.
        return del;
    }
}
Class.register(InnerNode);

/**
 * The actual BTree implementation.
 * @implements {IBTree}
 */
class BTree {
    /**
     * Creates a new BTree of a given order.
     * The order specifies how many entries a single node can contain.
     * A leaf node generally contains [order/2, order-1] entries,
     * while an inner node contains [(order-1)/2, order-1] entries.
     * @param {number} order The order of the tree.
     */
    constructor(order=7) {
        this._nodeId = 0; // Needed for persistence.
        this._root = new LeafNode(this._nodeId++);
        this._maxkey = order-1;
        this._minkyl = Math.floor(order/2);
        this._minkyn = Math.floor(this._maxkey/2);
        this._leaf = null;
        this._item = -1;

        this._key = null;
        this._record = null;
        this._length = 0;
        this._eof = true;
        this._found = false;
    }

    /**
     * The total number of records.
     * Note that if the record is a list/set of records, these are not counted.
     * @type {number}
     */
    get length() {
        return this._length;
    }

    /**
     * The current key as returned by any operation.
     * It is null if there is no matching record.
     * @type {*}
     */
    get currentKey() {
        return this._key;
    }

    /**
     * The current record as returned by any operation.
     * It is null if there is no matching record.
     * @type {*}
     */
    get currentRecord() {
        return this._record;
    }

    /**
     * Creates a new TreeTransaction object on this tree.
     * A tree transaction keeps track of the changed nodes and entries,
     * so that these can be updated in a permanent storage.
     * @returns {TreeTransaction}
     */
    transaction() {
        return new TreeTransaction(this);
    }

    /**
     * Inserts a new key-record pair into the BTree, if there is no entry for that key.
     * The current record and current key are set to the new entry in case of success
     * or the existing entry if present.
     * @param {*} key The unique key for the record.
     * @param {*} rec The record associated with the key.
     * @returns {boolean} True if the record was inserted, false if there was already a record with that key.
     */
    insert(key, rec, modified=null) {
        const stack = [];
        this._leaf = this._root;
        while (!this._leaf.isLeaf()) {
            stack.push(this._leaf);
            this._item = this._leaf.getItem(key);
            this._leaf = this._leaf.nodePointers[this._item];
        }
        this._item = this._leaf.addKey(key, rec);
        this._key = key;
        this._eof = false;
        if (this._item === -1) {
            this._found = true;
            this._item = this._leaf.getItem(key, false);
            this._record = this._leaf.records[this._item];
        } else {
            BTree._modifyNode(modified, this._leaf);

            this._found = false;
            this._record = rec;
            this._length++;
            if (this._leaf.keys.length > this._maxkey) {
                let pL = this._leaf;
                let pR = this._leaf.split(this._nodeId++);
                BTree._modifyNode(modified, pL); // we splitted nodes
                BTree._modifyNode(modified, pR);
                let ky = pR.keys[0];
                this._item = this._leaf.getItem(key, false);
                if (this._item === -1) {
                    this._leaf = this._leaf.nextLeaf;
                    this._item = this._leaf.getItem(key, false);
                }
                while (true) { // eslint-disable-line no-constant-condition
                    if (stack.length === 0) {
                        const newN = new InnerNode(this._nodeId++);
                        newN.keys[0] = ky;
                        newN.nodePointers[0] = pL;
                        newN.nodePointers[1] = pR;
                        BTree._modifyNode(modified, newN);
                        this._root = newN;
                        break;
                    }
                    const nod = stack.pop();
                    nod.addKey(ky, pL, pR);
                    BTree._modifyNode(modified, nod);
                    if (nod.keys.length <= this._maxkey) break;
                    pL = nod;
                    pR = nod.split(this._nodeId++);
                    BTree._modifyNode(modified, pL);
                    BTree._modifyNode(modified, pR);
                    ky = nod.keys.pop();
                }
            }
        }
        return (!this._found);
    }

    /**
     * Removes a key-record pair from the BTree.
     * In case of successful deletion, the current record and key will be set to the next entry greater or equal.
     * If no record was found, they will be reset to null.
     * @param {*} key The unique key for the record.
     * @returns {boolean} True if the record was deleted, false if there is no such record.
     */
    remove(key, modified=null, removed=null) {
        if (typeof key === 'undefined') {
            if (this._item === -1) {
                this._eof = true;
                this._found = false;
                return false;
            }
            key = this._leaf.keys[this._item];
        }
        this._del(key, modified, removed);
        if (!this._found) {
            this._item = -1;
            this._eof = true;
            this._key = null;
            this._record = null;
        } else {
            this.seek(key, BTree.NEAR_MODE.GE);
            this._found = true;
        }
        return (this._found);
    }

    /**
     * Searches the tree for a specific key and advances the current key/record pointers if found.
     * By default only an exact key match is found, but the near parameter also allows to advance to the next entry
     * greater/less or equal than the specified key.
     * @param {*} key The key to look for.
     * @param {BTree.NEAR_MODE} [near] Optional parameter, specifies to look for a key k' =/≤/≥ key.
     * @returns {boolean} True if such a key was found, false otherwise.
     */
    seek(key, near=BTree.NEAR_MODE.NONE) {
        this._leaf = this._root;
        while (!this._leaf.isLeaf()) {
            this._item = this._leaf.getItem(key);
            this._leaf = this._leaf.nodePointers[this._item];
        }
        this._item = this._leaf.getItem(key, near);
        if (near === BTree.NEAR_MODE.GE && this._item === -1 && this._leaf.nextLeaf !== null) {
            this._leaf = this._leaf.nextLeaf;
            this._item = 0;
        }
        if (near === BTree.NEAR_MODE.LE && this._item === -1 && this._leaf.prevLeaf !== null) {
            this._leaf = this._leaf.prevLeaf;
            this._item = this._leaf.records.length - 1;
        }
        if (this._item === -1) {
            this._eof = true;
            this._key = null;
            this._found = false;
            this._record = null;
        } else {
            this._eof = false;
            this._found = (this._leaf.keys[this._item] === key);
            this._key = this._leaf.keys[this._item];
            this._record = this._leaf.records[this._item];
        }
        return (!this._eof);
    }

    /**
     * Advances the current key/record pointers by a given number of steps.
     * Default is advancing by 1, which means the next record (the new key will thus be the next larger key).
     * -1 means the previous record (the new key will thus be the next smaller key).
     * @param {number} [cnt] The number of records to advance (may be negative).
     * @returns {boolean} True if there is a record to advance to, false otherwise.
     */
    skip(cnt = 1) {
        if (typeof cnt !== 'number') cnt = 1;
        if (this._item === -1 || this._leaf === null) this._eof = true;
        if (cnt > 0) {
            while (!this._eof && this._leaf.keys.length - this._item - 1 < cnt) {
                cnt = cnt - this._leaf.keys.length + this._item;
                this._leaf = this._leaf.nextLeaf;
                if (this._leaf === null) {
                    this._eof = true;
                } else {
                    this._item = 0;
                }
            }
            if (!this._eof) this._item = this._item + cnt;
        } else {
            cnt = -cnt;
            while (!this._eof && this._item < cnt) {
                cnt = cnt - this._item - 1;
                this._leaf = this._leaf.prevLeaf;
                if (this._leaf === null) {
                    this._eof = true;
                } else {
                    this._item = this._leaf.keys.length-1;
                }
            }
            if (!this._eof) {
                this._item = this._item - cnt;
            }
        }
        if (this._eof) {
            this._item = -1;
            this._found = false;
            this._key = null;
            this._record = null;
        } else {
            this._found = true;
            this._key = this._leaf.keys[this._item];
            this._record = this._leaf.records[this._item];
        }
        return (this._found);
    }

    /**
     * Jumps to the cnt entry starting from the smallest key (i.e., leftmost leaf, first entry) if cnt > 0.
     * If cnt < 0, it jumps to the cnt entry starting from the largest key (i.e., rightmost leaf, last entry).
     * @param {number} [cnt] The record to jump to (may be negative).
     * @returns {boolean} True if there is a record to jump to, false otherwise.
     */
    goto(cnt) {
        if (cnt < 0) {
            this.goBottom();
            if (!this._eof) this.skip(cnt+1);
        } else {
            this.goTop();
            if (!this._eof) this.skip(cnt-1);
        }
        return (this._found);
    }

    /**
     * Returns the index of the current entry (key/record) in a sorted list of all entries.
     * For the B+ Tree, this is done by traversing the leafs from the leftmost leaf, first entry
     * until the respective key is found.
     * @returns {number} The entry position.
     */
    keynum() {
        if (this._leaf === null || this._item === -1) return -1;
        let cnt = this._item + 1;
        let ptr = this._leaf;
        while (ptr.prevLeaf !== null) {
            ptr = ptr.prevLeaf;
            cnt += ptr.keys.length;
        }
        return cnt;
    }

    /**
     * Jumps to the smallest key's entry (i.e., leftmost leaf, first entry).
     * False will only be returned if the tree is completely empty.
     * @returns {boolean} True if there is such an entry, false otherwise.
     */
    goTop() {
        this._leaf = this._root;
        while (!this._leaf.isLeaf()) {
            this._leaf = this._leaf.nodePointers[0];
        }
        if (this._leaf.keys.length === 0) {
            this._item = -1;
            this._eof = true;
            this._found = false;
            this._key = null;
            this._record = null;
        } else {
            this._item = 0;
            this._eof = false;
            this._found = true;
            this._key = this._leaf.keys[0];
            this._record = this._leaf.records[0];
        }
        return (this._found);
    }

    /**
     * Jumps to the largest key's entry (i.e., rightmost leaf, last entry).
     * False will only be returned if the tree is completely empty.
     * @returns {boolean} True if there is such an entry, false otherwise.
     */
    goBottom() {
        this._leaf = this._root;
        while (!this._leaf.isLeaf()) {
            this._leaf = this._leaf.nodePointers[this._leaf.nodePointers.length-1];
        }
        if (this._leaf.keys.length === 0) {
            this._item = -1;
            this._eof = true;
            this._found = false;
            this._key = null;
            this._record = null;
        } else {
            this._item = this._leaf.keys.length-1;
            this._eof = false;
            this._found = true;
            this._key = this._leaf.keys[this._item];
            this._record = this._leaf.records[this._item];
        }
        return (this._found);
    }

    /**
     * Rebuilds/balances the whole tree.
     * Inserting and deleting keys into a tree will result
     * in some leaves and nodes having the minimum number of keys allowed.
     * This routine will ensure that each leaf and node has as many keys as possible,
     * resulting in a denser, flatter tree.
     * False is only returned if the tree is completely empty.
     * @returns {boolean} True if the tree is not completely empty.
     */
    pack(modified=null) {
        let len;
        let i;
        this.goTop(0);
        if (this._leaf === this._root) return false;

        // Pack leaves
        let toN = new LeafNode(this._nodeId++);
        let toI = 0;
        let frN = this._leaf;
        let frI = 0;
        let parKey = [];
        let parNod = [];
        while (true) { // eslint-disable-line no-constant-condition
            BTree._modifyNode(modified, toN);
            BTree._modifyNode(modified, frN);
            toN.keys[toI] = frN.keys[frI];
            toN.records[toI] = frN.records[frI];
            if (toI === 0) parNod.push(toN);
            if (frI === frN.keys.length-1) {
                if (frN.nextLeaf === null) break;
                frN = frN.nextLeaf;
                frI = 0;
            } else {
                frI++;
            }
            if (toI === this._maxkey-1) {
                const tmp = new LeafNode(this._nodeId++);
                toN.nextLeaf = tmp;
                tmp.prevLeaf = toN;
                toN = tmp;
                toI = 0;
            } else {
                toI++;
            }
        }
        let mov = this._minkyl - toN.keys.length;
        frN = toN.prevLeaf;
        if (mov > 0 && frN !== null) {
            BTree._modifyNode(modified, frN);
            // Insert new keys/records.
            for (i = mov-1; i>=0; --i) {
                toN.keys.unshift(frN.keys.pop());
                toN.records.unshift(frN.records.pop());
            }
        }
        for (i=1, len=parNod.length; i<len; ++i) {
            parKey.push(parNod[i].keys[0]);
        }
        parKey[parKey.length] = null;

        // Rebuild nodes
        let kidKey, kidNod;
        while (parKey[0] !== null) {
            kidKey = parKey;
            kidNod = parNod;
            parKey = [];
            parNod = [];
            toI = this._maxkey + 1;
            i = 0;
            len = kidKey.length;
            for (; i<len; i++) {
                if (toI > this._maxkey) {
                    toN = new InnerNode(this._nodeId++);
                    toI = 0;
                    parNod.push(toN);
                }
                toN.keys[toI] = kidKey[i];
                toN.nodePointers[toI] = kidNod[i];
                toI++;
                BTree._modifyNode(modified, toN);
            }
            mov = this._minkyn - toN.keys.length + 1;
            if (mov > 0 && parNod.length > 1) {
                frN = parNod[parNod.length-2];
                BTree._modifyNode(modified, frN);
                for (i = mov-1; i>=0; --i) {
                    toN.keys.unshift(frN.keys.pop());
                    toN.nodePointers.unshift(frN.nodePointers.pop());
                }
            }
            i = 0;
            len = parNod.length;
            for (; i<len; ++i) {
                parKey.push(parNod[i].keys.pop());
            }
        }
        this._root = parNod[0];
        this.goTop();
        return (this._found);
    }

    /**
     * Internal helper method to delete a key from the tree.
     * @param {*} key The unique key for the record.
     * @param [modified] The optional set of modified nodes (will be updated by the method).
     * @param [removed] The optional set of removed nodes (will be updated by the method).
     * @private
     */
    _del(key, modified=null, removed=null) {
        const stack = [];
        let parNod = null;
        let parPtr = -1;
        this._leaf = this._root;
        while (!this._leaf.isLeaf()) {
            stack.push(this._leaf);
            parNod = this._leaf;
            parPtr = this._leaf.getItem(key);
            this._leaf = this._leaf.nodePointers[parPtr];
        }
        this._item = this._leaf.getItem(key,false);

        // Key not in tree
        if (this._item === -1) {
            this._found = false;
            return;
        }
        this._found = true;

        // Delete key from leaf
        this._leaf.keys.splice(this._item, 1);
        this._leaf.records.splice(this._item, 1);
        BTree._modifyNode(modified, this._leaf);
        this._length--;

        // Leaf still valid: done
        if (this._leaf === this._root) {
            return;
        }
        if (this._leaf.keys.length >= this._minkyl) {
            if (this._item === 0) BTree._fixNodes(stack, key, this._leaf.keys[0], modified);
            return;
        }
        let delKey;

        // Steal from left sibling if possible
        let sibL = (parPtr === 0) ? null : parNod.nodePointers[parPtr - 1];
        if (sibL !== null && sibL.keys.length > this._minkyl) {
            delKey = (this._item === 0) ? key : this._leaf.keys[0];
            this._leaf.keys.unshift(sibL.keys.pop());
            this._leaf.records.unshift(sibL.records.pop());
            BTree._fixNodes(stack, delKey, this._leaf.keys[0], modified);
            BTree._modifyNode(modified, sibL);
            return;
        }

        // Steal from right sibling if possible
        let sibR = (parPtr === parNod.keys.length) ? null : parNod.nodePointers[parPtr + 1];
        if (sibR !== null && sibR.keys.length > this._minkyl) {
            this._leaf.keys.push(sibR.keys.shift());
            this._leaf.records.push(sibR.records.shift());
            if (this._item === 0) BTree._fixNodes(stack, key, this._leaf.keys[0], modified);
            BTree._fixNodes(stack, this._leaf.keys[this._leaf.keys.length-1], sibR.keys[0], modified);
            BTree._modifyNode(modified, sibR);
            return;
        }

        // Merge left to make one leaf
        if (sibL !== null) {
            delKey = (this._item === 0) ? key : this._leaf.keys[0];
            sibL.merge(this._leaf, parNod, delKey);
            BTree._modifyNode(modified, sibL);
            BTree._modifyNode(removed, this._leaf);
            this._leaf = sibL;
        } else {
            delKey = sibR.keys[0];
            this._leaf.merge(sibR, parNod, delKey);
            BTree._modifyNode(modified, this._leaf);
            BTree._modifyNode(removed, sibR);
            if (this._item === 0) BTree._fixNodes(stack, key, this._leaf.keys[0], modified);
        }

        if (stack.length === 1 && parNod.keys.length === 0) {
            this._root = this._leaf;
            return;
        }

        let curNod = stack.pop();
        let parItm;

        // Update all nodes
        while (curNod.keys.length < this._minkyn && stack.length > 0) {

            parNod = stack.pop();
            parItm = parNod.getItem(delKey);

            // Steal from right sibling if possible
            sibR = (parItm === parNod.keys.length) ? null : parNod.nodePointers[parItm+1];
            if (sibR !== null && sibR.keys.length > this._minkyn) {
                curNod.keys.push(parNod.keys[parItm]);
                parNod.keys[parItm] = sibR.keys.shift();
                curNod.nodePointers.push(sibR.nodePointers.shift());
                BTree._modifyNode(modified, curNod);
                BTree._modifyNode(modified, sibR);
                BTree._modifyNode(modified, parNod);
                break;
            }

            // Steal from left sibling if possible
            sibL = (parItm === 0) ? null : parNod.nodePointers[parItm-1];
            if (sibL !== null && sibL.keys.length > this._minkyn) {
                curNod.keys.unshift(parNod.keys[parItm-1]);
                parNod.keys[parItm-1] = sibL.keys.pop();
                curNod.nodePointers.unshift(sibL.nodePointers.pop());
                BTree._modifyNode(modified, curNod);
                BTree._modifyNode(modified, sibL);
                BTree._modifyNode(modified, parNod);
                break;
            }

            // Merge left to make one node
            if (sibL !== null) {
                delKey = sibL.merge(curNod, parNod, parItm-1);
                BTree._modifyNode(removed, curNod);
                BTree._modifyNode(modified, sibL);
                curNod = sibL;
            } else if (sibR !== null) {
                delKey = curNod.merge(sibR, parNod, parItm);
                BTree._modifyNode(removed, sibR);
                BTree._modifyNode(modified, curNod);
            }

            // Next level
            if (stack.length === 0 && parNod.keys.length === 0) {
                this._root = curNod;
                break;
            }
            curNod = parNod;
        }
    }

    /**
     * Internal helper method to replace a key within the whole stack.
     * @param {Array.<Node>} stk The stack of nodes to examine.
     * @param {*} frKey The key to replace.
     * @param {*} toKey The new key to put in place.
     * @param {*} [modified] The optional set of modified nodes (will be updated by the method).
     * @private
     */
    static _fixNodes(stk, frKey, toKey, modified) {
        let keys, lvl = stk.length, mor = true;
        do {
            lvl--;
            keys = stk[lvl].keys;
            for (let i=keys.length-1; i>=0; --i) {
                if (keys[i] === frKey) {
                    keys[i] = toKey;
                    BTree._modifyNode(modified, stk[lvl]);
                    mor = false;
                    break;
                }
            }
        } while (mor && lvl>0);
    }

    /**
     * Advances to the smallest key k', such that either k' > lower (if lowerOpen) or k' ≥ lower (if !lowerOpen).
     * If lower is undefined, jump to the smallest key's entry.
     * @param {*} lower A lower bound on the key or undefined.
     * @param {boolean} [lowerOpen] Whether lower may be included or not.
     * @returns {boolean} True if there is such an entry, false otherwise.
     */
    goToLowerBound(lower, lowerOpen=false) {
        // TODO: it might be that there is no exact key match, then we do not need to skip!
        if (lower !== undefined) {
            let success = this.seek(lower, BTree.NEAR_MODE.GE);
            if (success && lowerOpen) {
                success = this.skip();
            }
            return success;
        }
        return this.goTop();
    }

    /**
     * Advances to the largest key k', such that either k' < upper (if upperOpen) or k' ≤ upper (if !upperOpen).
     * If upper is undefined, jump to the largest key's entry.
     * @param {*} upper An upper bound on the key or undefined.
     * @param {boolean} [upperOpen] Whether upper may be included or not.
     * @returns {boolean} True if there is such an entry, false otherwise.
     */
    goToUpperBound(upper, upperOpen=false) {
        // TODO: it might be that there is no exact key match, then we do not need to skip!
        if (upper !== undefined) {
            let success = this.seek(upper, BTree.NEAR_MODE.LE);
            if (success && upperOpen) {
                success = this.skip(-1);
            }
            return success;
        }
        return this.goBottom();
    }

    /**
     * An internal helper method used to add a node to a set.
     * If the given s is not a set, it does not do anything.
     * @param {Set|*} s The set to add the node to.
     * @param {Node} node The node to add to the set.
     * @private
     */
    static _modifyNode(s, node) {
        if (s instanceof Set) {
            s.add(node);
        }
    }

    /**
     * Load a BTree from JSON objects.
     * This method can be used to load a BTree from a JSON database.
     * @param {number} rootId The id of the root node.
     * @param {Map.<number,Object>} nodes A map mapping node ids to JSON objects.
     * @param {number} [order] The order of the tree the nodes will be added to.
     * This is required to be the same as when storing the tree.
     */
    static loadFromJSON(rootId, nodes, order) {
        const tree = new BTree(order);
        const root = Node.fromJSON(nodes.get(rootId));
        tree._root = root;
        const queue = [root];
        let maxId = 0;
        // Restore all nodes and pointers
        while (queue.length > 0) {
            const node = queue.shift();
            maxId = Math.max(node.id, maxId);

            if (node.isLeaf()) {
                let tmp = nodes.get(prevLeaf);
                node.prevLeaf = tmp ? Node.fromJSON(tmp) : null;
                if (node.prevLeaf) {
                    queue.push(node.prevLeaf);
                }
                tmp = nodes.get(nextLeaf);
                node.nextLeaf = tmp ? Node.fromJSON(tmp) : null;
                if (node.nextLeaf) {
                    queue.push(node.nextLeaf);
                }
            } else {
                for (let i=0; i<node.nodePointers.length; ++i) {
                    let tmp = nodes.get(node.nodePointers[i]);
                    tmp = tmp ? Node.fromJSON(tmp) : null;
                    if (tmp) {
                        queue.push(tmp);
                    }
                    node.nodePointers[i] = tmp;
                }
            }
        }
        tree._nodeId = maxId + 1; // Needed for persistence
    }

    /**
     * Dumps the current state of the tree into a map mapping node ids to JSON objects.
     * This method can be used to store the state of the tree into a JSON key value store.
     * @param {Map.<number,Object>} nodes This should be a reference to an empty map.
     * @returns {number} root The id of the root node.
     */
    dump(nodes) {
        nodes.clear();
        const queue = [this._root];
        // Save all nodes and pointers
        while (queue.length > 0) {
            const node = queue.shift();

            nodes.set(node.id, node.toJSON());

            if (node.isLeaf()) {
                if (node.prevLeaf) {
                    queue.push(node.prevLeaf);
                }
                if (node.nextLeaf) {
                    queue.push(node.nextLeaf);
                }
            } else {
                for (let i=0; i<node.nodePointers.length; ++i) {
                    if (node.nodePointers[i]) {
                        queue.push(node.nodePointers[i]);
                    }
                }
            }
        }
        return this._root.id;
    }
}
/**
 * Allows to specify the seek method of a BTree.
 * @enum {number}
 */
BTree.NEAR_MODE = {
    NONE: 0,
    LE: 1,
    GE: 2
};
Class.register(BTree);

/**
 * A TreeTransaction keeps track of the set of modified and removed nodes
 * during one or multiple operations on an underlying BTree.
 * @implements {IBTree}
 */
class TreeTransaction {
    /**
     * Create a TreeTransaction from a BTree.
     * @param {BTree} tree The underlying BTree.
     */
    constructor(tree) {
        this._tree = tree;

        // We potentially need to keep track of modifications to persist them.
        // To ensure consistency, the caller needs to collect modifications over multiple calls synchronously.
        // Hence, the observer pattern is not applicable here, and we keep modifications in the state if requested.
        this._modified = new Set();
        this._removed = new Set();
    }

    /**
     * This method allows to merge the set of modified and removed nodes
     * from two TreeTransactions.
     * @param {TreeTransaction} treeTx The other TreeTransaction to be merged.
     */
    merge(treeTx) {
        if (!(treeTx instanceof TreeTransaction)) {
            return;
        }
        this._removed = this._removed.union(treeTx.removed);
        this._modified = this._modified.union(treeTx.modified).difference(this._removed);
    }

    /**
     * The set of modified nodes during the transaction.
     * @type {Set.<Node>}
     */
    get modified() {
        return this._modified;
    }

    /**
     * The set of removed nodes during the transaction.
     * @type {Set.<Node>}
     */
    get removed() {
        return this._removed;
    }

    /**
     * The root node of the underlying tree.
     * @type {Node}
     */
    get root() {
        return this._tree._root;
    }

    /**
     * The total number of records.
     * Note that if the record is a list/set of records, these are not counted.
     * @type {number}
     */
    get length() {
        return this._tree.length;
    }

    /**
     * The current key as returned by any operation.
     * It is null if there is no matching record.
     * @type {*}
     */
    get currentKey() {
        return this._tree.currentKey;
    }

    /**
     * The current record as returned by any operation.
     * It is null if there is no matching record.
     * This getter also adds the node to the set of modified nodes
     * as we cannot keep track whether something will be modified.
     * @type {*}
     */
    get currentRecord() {
        // Potentially untracked modification.
        this._modified.add(this._tree.currentLeaf);
        return this._tree.currentRecord;
    }

    /**
     * Inserts a new key-record pair into the BTree, if there is no entry for that key.
     * The current record and current key are set to the new entry in case of success
     * or the existing entry if present.
     * @param {*} key The unique key for the record.
     * @param {*} rec The record associated with the key.
     * @returns {boolean} True if the record was inserted, false if there was already a record with that key.
     */
    insert(key, rec) {
        return this._tree.insert(key, rec, this._modified);
    }

    /**
     * Removes a key-record pair from the BTree.
     * In case of successful deletion, the current record and key will be set to the next entry greater or equal.
     * If no record was found, they will be reset to null.
     * @param {*} key The unique key for the record.
     * @returns {boolean} True if the record was deleted, false if there is no such record.
     */
    remove(key) {
        return this._tree.remove(key, this._modified, this._removed);
    }

    /**
     * Searches the tree for a specific key and advances the current key/record pointers if found.
     * By default only an exact key match is found, but the near parameter also allows to advance to the next entry
     * greater/less or equal than the specified key.
     * @param {*} key The key to look for.
     * @param {BTree.NEAR_MODE} [near] Optional parameter, specifies to look for a key k' =/≤/≥ key.
     * @returns {boolean} True if such a key was found, false otherwise.
     */
    seek(key, near=BTree.NEAR_MODE.NONE) {
        return this._tree.seek(key, near);
    }

    /**
     * Advances the current key/record pointers by a given number of steps.
     * Default is advancing by 1, which means the next record (the new key will thus be the next larger key).
     * -1 means the previous record (the new key will thus be the next smaller key).
     * @param {number} [cnt] The number of records to advance (may be negative).
     * @returns {boolean} True if there is a record to advance to, false otherwise.
     */
    skip(cnt = 1) {
        return this._tree.skip(cnt);
    }

    /**
     * Jumps to the cnt entry starting from the smallest key (i.e., leftmost leaf, first entry) if cnt > 0.
     * If cnt < 0, it jumps to the cnt entry starting from the largest key (i.e., rightmost leaf, last entry).
     * @param {number} [cnt] The record to jump to (may be negative).
     * @returns {boolean} True if there is a record to jump to, false otherwise.
     */
    goto(cnt) {
        return this._tree.goto(cnt);
    }

    /**
     * Returns the index of the current entry (key/record) in a sorted list of all entries.
     * For the B+ Tree, this is done by traversing the leafs from the leftmost leaf, first entry
     * until the respective key is found.
     * @returns {number} The entry position.
     */
    keynum() {
        return this._tree.keynum();
    }

    /**
     * Jumps to the smallest key's entry (i.e., leftmost leaf, first entry).
     * False will only be returned if the tree is completely empty.
     * @returns {boolean} True if there is such an entry, false otherwise.
     */
    goTop() {
        return this._tree.goTop();
    }

    /**
     * Jumps to the largest key's entry (i.e., rightmost leaf, last entry).
     * False will only be returned if the tree is completely empty.
     * @returns {boolean} True if there is such an entry, false otherwise.
     */
    goBottom() {
        return this._tree.goBottom();
    }

    /**
     * Rebuilds/balances the whole tree.
     * Inserting and deleting keys into a tree will result
     * in some leaves and nodes having the minimum number of keys allowed.
     * This routine will ensure that each leaf and node has as many keys as possible,
     * resulting in a denser, flatter tree.
     * False is only returned if the tree is completely empty.
     * @returns {boolean} True if the tree is not completely empty.
     */
    pack() {
        return this._tree.pack();
    }

    /**
     * Advances to the smallest key k', such that either k' > lower (if lowerOpen) or k' ≥ lower (if !lowerOpen).
     * If lower is undefined, jump to the smallest key's entry.
     * @param {*} lower A lower bound on the key or undefined.
     * @param {boolean} [lowerOpen] Whether lower may be included or not.
     * @returns {boolean} True if there is such an entry, false otherwise.
     */
    goToLowerBound(lower, lowerOpen=false) {
        return this._tree.goToLowerBound(lower, lowerOpen);
    }

    /**
     * Advances to the largest key k', such that either k' < upper (if upperOpen) or k' ≤ upper (if !upperOpen).
     * If upper is undefined, jump to the largest key's entry.
     * @param {*} upper An upper bound on the key or undefined.
     * @param {boolean} [upperOpen] Whether upper may be included or not.
     * @returns {boolean} True if there is such an entry, false otherwise.
     */
    goToUpperBound(upper, upperOpen=false) {
        return this._tree.goToUpperBound(upper, upperOpen);
    }
}
Class.register(TreeTransaction);

/**
 * An implementation of a LRU (least recently used) map.
 * This is a map that contains a maximum of k entries,
 * where k is specified in the constructor.
 * When the maximal number of entries is reached,
 * it will evict the least recently used entry.
 * This behaviour is useful for caches.
 * @template K The keys' type.
 * @template V The values' type.
 */
class LRUMap {
    /**
     * Instantiate a LRU map of maximum size maxSize.
     * @param {number} maxSize The maximum size of the map.
     */
    constructor(maxSize) {
        this._maxSize = maxSize;
        /** @type {Map.<K,V>} */
        this._map = new Map();
        /** @type {Map.<K,number>} */
        this._numAccesses = new Map();
        /** @type {Array.<K>} */
        this._accessQueue = [];
    }

    /**
     * The current size of the map.
     * @type {number}
     */
    get size() {
        return this._map.size;
    }

    /**
     * Clears the map.
     */
    clear() {
        this._numAccesses.clear();
        this._accessQueue = [];
        return this._map.clear();
    }

    /**
     * Deletes a key from the map.
     * @param {K} key The key to delete.
     * @returns {boolean} Whether an entry was deleted.
     */
    delete(key) {
        return this._map.delete(key);
    }

    /**
     * Returns an iterator over key value pairs [k, v].
     * @returns {Iterator.<Array>}
     */
    entries() {
        return this._map.entries();
    }

    /**
     * Execute a given function for each key value pair in the map.
     * @param {function(key:K, value:V):*} callback The function to be called.
     * @param {*} [thisArg] This value will be used as this when executing the function.
     */
    forEach(callback, thisArg) {
        return this._map.forEach(callback, thisArg);
    }

    /**
     * Return the corresponding value to a specified key.
     * @param {K} key The key to look for.
     * @returns {V} The value the key maps to (or undefined if not present).
     */
    get(key) {
        this.access(key);
        return this._map.get(key);
    }

    /**
     * Returns true if the specified key is to be found in the map.
     * @param {K} key The key to look for.
     * @returns {boolean} True, if the key is in the map, false otherwise.
     */
    has(key) {
        return this._map.has(key);
    }

    /**
     * Returns an iterator over the keys of the map.
     * @returns {Iterator.<K>}
     */
    keys() {
        return this._map.keys();
    }

    /**
     * Evicts the k least recently used entries from the map.
     * @param {number} [k] The number of entries to evict (default is 1).
     */
    evict(k=1) {
        while (k > 0 && this._accessQueue.length > 0) {
            const oldest = this._accessQueue.shift();
            let accesses = this._numAccesses.get(oldest);
            --accesses;
            this._numAccesses.set(oldest, accesses);
            // Check if not used in the meanwhile.
            if (accesses !== 0) {
                continue;
            }
            // Otherwise delete that.
            this._numAccesses.delete(oldest);
            // If it was not present however, we need to search further.
            if (!this.delete(oldest)) {
                continue;
            }
            --k;
        }
    }

    /**
     * Marks a key as accessed.
     * This implicitly makes the key the most recently used key.
     * @param {K} key The key to mark as accessed.
     */
    access(key) {
        if (!this._map.has(key)) {
            return;
        }
        let accesses = 0;
        if (this._numAccesses.has(key)) {
            accesses = this._numAccesses.get(key);
        }
        ++accesses;
        this._numAccesses.set(key, accesses);
        this._accessQueue.push(key);
    }

    /**
     * Inserts or replaces a key's value into the map.
     * If the maxSize of the map is exceeded, the least recently used key is evicted first.
     * Inserting a key implicitly accesses it.
     * @param {K} key The key to set.
     * @param {V} value The associated value.
     */
    set(key, value) {
        if (this.size >= this._maxSize) {
            this.evict();
        }
        this._map.set(key, value);
        this.access(key);
    }

    /**
     * Returns an iterator over the values of the map.
     * @returns {Iterator.<V>}
     */
    values() {
        return this._map.values();
    }

    /**
     * Returns an iterator over key value pairs [k, v].
     * @returns {Iterator.<Array>}
     */
    [Symbol.iterator]() {
        return this._map.entries();
    }
}
Class.register(LRUMap);

/**
 * Utils that are related to common JavaScript objects.
 */
class ObjectUtils {
    /**
     * This method returns the value of an object at a given path.
     * A key path is defined by a key within the object or alternatively a path through the object to a specific subkey.
     * For example, ['a', 'b'] could be used to use 'key' as the key in the following object:
     * { 'a': { 'b': 'key' } }
     * @param {Object} obj The JS object to access.
     * @param {string|Array.<string>} path The key path to access.
     * @returns {*} The value at the given path or undefined if the path does not exist..
     */
    static byKeyPath(obj, path) {
        if (!Array.isArray(path)) {
            return obj[path];
        }
        let tmp = obj;
        for (const component of path) {
            if (tmp === undefined) {
                return undefined;
            }
            tmp = tmp[component];
        }
        return tmp;
    }
}
Class.register(ObjectUtils);

/**
 * A class, which inherits from Observable, can notify interested parties
 * on occurrence of specified events.
 */
class Observable {
    /**
     * A special event matching every other event.
     * @type {string}
     * @constant
     */
    static get WILDCARD() {
        return '*';
    }

    constructor() {
        /** @type {Map.<string, Array.<Function>>} */
        this._listeners = new Map();
    }

    /**
     * Registers a handler for a given event.
     * @param {string} type The event to observe.
     * @param {Function} callback The handler to be called on occurrence of the event.
     * @return {number} The handle for this handler. Can be used to unregister it again.
     */
    on(type, callback) {
        if (!this._listeners.has(type)) {
            this._listeners.set(type, [callback]);
            return 0;
        } else {
            return this._listeners.get(type).push(callback) - 1;
        }
    }

    /**
     * Unregisters a handler for a given event.
     * @param {string} type The event to unregister from.
     * @param {number} id The handle received upon calling the on function.
     */
    off(type, id) {
        if (!this._listeners.has(type) || !this._listeners.get(type)[id]) return;
        delete this._listeners.get(type)[id];
    }

    /**
     * Fires an event and notifies all observers.
     * @param {string} type The type of event.
     * @param {...*} args Arguments to pass to the observers.
     */
    fire(type, ...args) {
        // Notify listeners for this event type.
        if (this._listeners.has(type)) {
            for (const i in this._listeners.get(type)) {
                const listener = this._listeners.get(type)[i];
                listener.apply(null, args);
            }
        }

        // Notify wildcard listeners. Pass event type as first argument
        if (this._listeners.has(Observable.WILDCARD)) {
            for (const i in this._listeners.get(Observable.WILDCARD)) {
                const listener = this._listeners.get(Observable.WILDCARD)[i];
                listener.apply(null, arguments);
            }
        }
    }

    /**
     * Registers handlers on another observable, bubbling its events up to the own observers.
     * @param {Observable} observable The observable, whose events should bubble up.
     * @param {...string} types The events to bubble up.
     */
    bubble(observable, ...types) {
        for (const type of types) {
            let callback;
            if (type == Observable.WILDCARD) {
                callback = function() {
                    this.fire.apply(this, arguments);
                };
            } else {
                callback = function() {
                    this.fire.apply(this, [type, ...arguments]);
                };
            }
            observable.on(type, callback.bind(this));
        }
    }
}
Class.register(Observable);

/**
 * Calculates the union of two sets.
 * Method of Set.
 * @memberOf Set
 * @param {Set} setB The second set.
 * @returns {Set} The union of this set and the second set.
 */
Set.prototype.union = function(setB) {
    const union = new Set(this);
    for (const elem of setB) {
        union.add(elem);
    }
    return union;
};

/**
 * Calculates the intersection of two sets.
 * Method of Set.
 * @memberOf Set
 * @param {Set} setB The second set.
 * @returns {Set} The intersection of this set and the second set.
 */
Set.prototype.intersection = function(setB) {
    const intersection = new Set();
    for (const elem of setB) {
        if (this.has(elem)) {
            intersection.add(elem);
        }
    }
    return intersection;
};

/**
 * Calculates the difference of two sets.
 * Method of Set.
 * @memberOf Set
 * @param {Set} setB The second set.
 * @returns {Set} The difference of this set and the second set.
 */
Set.prototype.difference = function(setB) {
    const difference = new Set(this);
    for (const elem of setB) {
        difference.delete(elem);
    }
    return difference;
};

/**
 * Checks whether two sets are equal to each other.
 * Method of Set.
 * @memberOf Set
 * @param {Set} setB The second set.
 * @returns {boolean} True if they contain the same elements, false otherwise.
 */
Set.prototype.equals = function(setB) {
    if (this.size !== setB.size) return false;
    for (const elem of setB) {
        if (!this.has(elem)) {
            return false;
        }
    }
    return true;
};

/**
 * Creates a Set from single values and iterables.
 * If arg is not iterable, it creates a new Set with arg as its single member.
 * If arg is iterable, it iterates over arg and puts all items into the Set.
 * Static method of Set.
 * @memberOf Set
 * @param {*} arg The argument to create the Set from.
 * @returns {Set} The resulting Set.
 */
Set.from = function(arg) {
    // Check if iterable and not string.
    if (arg && typeof arg[Symbol.iterator] === 'function' && typeof arg !== 'string') {
        return new Set(arg);
    }
    return new Set([arg]);
};

class Synchronizer extends Observable {
    constructor() {
        super();
        this._queue = [];
        this._working = false;
    }

    /**
     * Push function to the Synchronizer for later, synchronous execution
     * @template T
     * @param {function():T} fn Function to be invoked later by this Synchronizer
     * @returns {Promise.<T>}
     */
    push(fn) {
        return new Promise((resolve, error) => {
            this._queue.push({fn: fn, resolve: resolve, error: error});
            if (!this._working) {
                this._doWork();
            }
        });
    }

    async _doWork() {
        this._working = true;
        this.fire('work-start', this);

        while (this._queue.length) {
            const job = this._queue.shift();
            try {
                const result = await job.fn();
                job.resolve(result);
            } catch (e) {
                if (job.error) job.error(e);
            }
        }

        this._working = false;
        this.fire('work-end', this);
    }

    /** @type {boolean} */
    get working() {
        return this._working;
    }
}
Class.register(Synchronizer);

/**
 * This is an intermediate layer caching the results of a backend.
 * While simple get/put queries make use of the cache,
 * more advanced queries will be forwarded to the backend.
 * @implements {IObjectStore}
 */
class CachedBackend {
    /**
     * Creates a new instance of the cached layer using the specified backend.
     * @param {IObjectStore} backend The backend to use.
     */
    constructor(backend) {
        this._backend = backend;
        /** @type {Map.<string,*>} */
        this._cache = new LRUMap(CachedBackend.MAX_CACHE_SIZE);
    }

    /**
     * A map of index names to indices as defined by the underlying backend.
     * The index names can be used to access an index.
     * @type {Map.<string,IIndex>}
     */
    get indices() {
        return this._backend.indices;
    }

    /**
     * A helper method to retrieve the values corresponding to a set of keys.
     * @param {Set.<string>} keys The set of keys to get the corresponding values for.
     * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
     * @returns {Promise.<Array.<*>>} A promise of the array of values.
     * @protected
     */
    async _retrieveValues(keys, decoder=undefined) {
        const valuePromises = [];
        for (const key of keys) {
            valuePromises.push(this.get(key, decoder));
        }
        return Promise.all(valuePromises);
    }

    /**
     * Internal method called to decode a single value.
     * @param {*} value Value to be decoded.
     * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
     * @returns {*} The decoded value, either by the object store's default or the overriding decoder if given.
     */
    decode(value, decoder=undefined) {
        return this._backend.decode(value, decoder);
    }

    /**
     * Internal method called to decode multiple values.
     * @param {Array.<*>} values Values to be decoded.
     * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
     * @returns {Array.<*>} The decoded values, either by the object store's default or the overriding decoder if given.
     */
    decodeArray(values, decoder=undefined) {
        return this._backend.decodeArray(values, decoder);
    }

    /**
     * Returns a promise of the object stored under the given primary key.
     * If the item is in the cache, the cached value will be returned.
     * Otherwise, the value will be fetched from the backend object store..
     * Resolves to undefined if the key is not present in the object store.
     * @param {string} key The primary key to look for.
     * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
     * @returns {Promise.<*>} A promise of the object stored under the given key, or undefined if not present.
     */
    async get(key, decoder=undefined) {
        if (this._cache.has(key)) {
            return this.decode(this._cache.get(key), decoder);
        }
        const value = await this._backend.get(key, null);
        this._cache.set(key, value);
        return this.decode(value, decoder);
    }

    /**
     * Inserts or replaces a key-value pair.
     * Stores the new key-value pair in both the cache and the backend.
     * @param {string} key The primary key to associate the value with.
     * @param {*} value The value to write.
     * @returns {Promise} The promise resolves after writing to the current object store finished.
     */
    put(key, value) {
        this._cache.set(key, value);
        return this._backend.put(key, value);
    }

    /**
     * Removes the key-value pair of the given key from the cache and the backend.
     * @param {string} key The primary key to delete along with the associated object.
     * @returns {Promise} The promise resolves after writing to the current object store finished.
     */
    remove(key) {
        this._cache.delete(key);
        return this._backend.remove(key);
    }

    /**
     * Returns a promise of a set of keys fulfilling the given query by querying the backend.
     * If the optional query is not given, it returns all keys in the object store.
     * If the query is of type KeyRange, it returns all keys of the object store being within this range.
     * If the query is of type Query, it returns all keys fulfilling the query.
     * @param {Query|KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<Set.<string>>} A promise of the set of keys relevant to the query.
     */
    keys(query=null) {
        return this._backend.keys(query);
    }

    /**
     * Returns a promise of an array of objects whose primary keys fulfill the given query by relying on the backend.
     * If the optional query is not given, it returns all objects in the object store.
     * If the query is of type KeyRange, it returns all objects whose primary keys are within this range.
     * If the query is of type Query, it returns all objects whose primary keys fulfill the query.
     * @param {Query|KeyRange} [query] Optional query to check keys against.
     * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
     * @returns {Promise.<Array.<*>>} A promise of the array of objects relevant to the query.
     */
    async values(query=null, decoder=undefined) {
        const keys = await this.keys(query);
        return this._retrieveValues(keys, decoder);
    }

    /**
     * Returns a promise of the object whose primary key is maximal for the given range.
     * If the optional query is not given, it returns the object whose key is maximal.
     * If the query is of type KeyRange, it returns the object whose primary key is maximal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
     * @returns {Promise.<*>} A promise of the object relevant to the query.
     */
    async maxValue(query=null, decoder=undefined) {
        const key = await this.maxKey(query);
        return this.get(key, decoder);
    }

    /**
     * Returns a promise of the key being maximal for the given range.
     * If the optional query is not given, it returns the maximal key.
     * If the query is of type KeyRange, it returns the key being maximal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<string>} A promise of the key relevant to the query.
     */
    maxKey(query=null) {
        return this._backend.maxKey(query);
    }

    /**
     * Returns a promise of the key being minimal for the given range.
     * If the optional query is not given, it returns the minimal key.
     * If the query is of type KeyRange, it returns the key being minimal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<string>} A promise of the key relevant to the query.
     */
    minKey(query=null) {
        return this._backend.minKey(query);
    }

    /**
     * Returns a promise of the object whose primary key is minimal for the given range.
     * If the optional query is not given, it returns the object whose key is minimal.
     * If the query is of type KeyRange, it returns the object whose primary key is minimal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
     * @returns {Promise.<*>} A promise of the object relevant to the query.
     */
    async minValue(query=null, decoder=undefined) {
        const key = await this.minKey(query);
        return this.get(key, decoder);
    }

    /**
     * Returns the count of entries in the given range.
     * If the optional query is not given, it returns the count of entries in the object store.
     * If the query is of type KeyRange, it returns the count of entries within the given range.
     * @param {KeyRange} [query]
     * @returns {Promise.<number>}
     */
    count(query=null) {
        return this._backend.count(query);
    }

    /**
     * Unsupported operation for a cached backend.
     * @param {Transaction} [tx]
     * @returns {Promise.<boolean>}
     */
    async commit(tx) {
        throw 'Unsupported operation';
    }

    /**
     * Unsupported operation for a cached backend.
     * @param {Transaction} [tx]
     */
    async abort(tx) {
        throw 'Unsupported operation';
    }

    /**
     * Internally applies a transaction to the cache's and backend's state.
     * This needs to be done in batch (as a db level transaction), i.e., either the full state is updated
     * or no changes are applied.
     * @param {Transaction} tx The transaction to apply.
     * @returns {Promise} The promise resolves after applying the transaction.
     * @protected
     */
    _apply(tx) {
        // Update local state and push to backend for batch transaction.
        if (tx._truncated) {
            this._cache.clear();
        }
        for (const key of tx._removed) {
            this._cache.delete(key);
        }
        for (const [key, value] of tx._modified) {
            this._cache.set(key, value);
        }
        return this._backend._apply(tx);
    }

    /**
     * Empties the object store.
     * @returns {Promise} The promise resolves after emptying the object store.
     */
    async truncate() {
        this._cache.clear();
        return this._backend.truncate();
    }

    /**
     * Returns the index of the given name.
     * If the index does not exist, it returns undefined.
     * @param {string} indexName The name of the requested index.
     * @returns {IIndex} The index associated with the given name.
     */
    index(indexName) {
        return this._backend.index(indexName);
    }

    /**
     * Creates a new secondary index on the object store.
     * Currently, all secondary indices are non-unique.
     * They are defined by a key within the object or alternatively a path through the object to a specific subkey.
     * For example, ['a', 'b'] could be used to use 'key' as the key in the following object:
     * { 'a': { 'b': 'key' } }
     * Secondary indices may be multiEntry, i.e., if the keyPath resolves to an iterable object, each item within can
     * be used to find this entry.
     * If a new object does not possess the key path associated with that index, it is simply ignored.
     *
     * This function may only be called before the database is connected.
     * Moreover, it is only executed on database version updates or on first creation.
     * @param {string} indexName The name of the index.
     * @param {string|Array.<string>} [keyPath] The path to the key within the object. May be an array for multiple levels.
     * @param {boolean} [multiEntry]
     */
    createIndex(indexName, keyPath, multiEntry=false) {
        return this._backend.createIndex(indexName, keyPath, multiEntry);
    }

    /**
     * Deletes a secondary index from the object store.
     * @param indexName
     * @returns {Promise} The promise resolves after deleting the index.
     */
    deleteIndex(indexName) {
        return this._backend.deleteIndex(indexName);
    }

    /**
     * Closes the object store and potential connections.
     * @returns {Promise} The promise resolves after closing the object store.
     */
    close() {
        return this._backend.close();
    }
}
/** @type {number} Maximum number of cached elements. */
CachedBackend.MAX_CACHE_SIZE = 5000 /*elements*/;
Class.register(CachedBackend);

/**
 * This is a BTree based index, which is generally stored in memory.
 * It is used by transactions.
 * @implements IIndex
 */
class InMemoryIndex {
    /**
     * Creates a new InMemoryIndex for a given object store.
     * The key path describes the path of the secondary key within the stored objects.
     * Only objects for which the key path exists are part of the secondary index.
     *
     * A key path is defined by a key within the object or alternatively a path through the object to a specific subkey.
     * For example, ['a', 'b'] could be used to use 'key' as the key in the following object:
     * { 'a': { 'b': 'key' } }
     *
     * If a secondary index is a multi entry index, and the value at the key path is iterable,
     * every item of the iterable value will be associated with the object.
     * @param {IObjectStore} objectStore The underlying object store to use.
     * @param {string|Array.<string>} [keyPath] The key path of the indexed attribute.
     * If the keyPath is not given, this is a primary index.
     * @param {boolean} [multiEntry] Whether the indexed attribute is considered to be iterable or not.
     * @param {boolean} [unique] Whether there is a unique constraint on the attribute.
     */
    constructor(objectStore, keyPath, multiEntry=false, unique=false) {
        this._objectStore = objectStore;
        this._keyPath = keyPath;
        this._multiEntry = multiEntry;
        this._unique = unique;
        this._tree = new BTree();
    }

    /**
     * Reinitialises the index.
     * @returns {Promise} The promise resolves after emptying the index.
     */
    async truncate() {
        this._tree = new BTree();
    }

    /**
     * Helper method to return the attribute associated with the key path if it exists.
     * @param {string} key The primary key of the key-value pair.
     * @param {*} obj The value of the key-value pair.
     * @returns {*} The attribute associated with the key path, if it exists, and undefined otherwise.
     * @private
     */
    _indexKey(key, obj) {
        if (this.keyPath) {
            if (obj === undefined) return undefined;
            return ObjectUtils.byKeyPath(obj, this.keyPath);
        }
        return key;
    }

    /**
     * The key path associated with this index.
     * A key path is defined by a key within the object or alternatively a path through the object to a specific subkey.
     * For example, ['a', 'b'] could be used to use 'key' as the key in the following object:
     * { 'a': { 'b': 'key' } }
     * If the keyPath is undefined, this index uses the primary key of the key-value store.
     * @type {string|Array.<string>}
     */
    get keyPath() {
        return this._keyPath;
    }

    /**
     * This value determines whether the index supports multiple secondary keys per entry.
     * If so, the value at the key path is considered to be an iterable.
     * @type {boolean}
     */
    get multiEntry() {
        return this._multiEntry;
    }

    /**
     * A helper method to insert a primary-secondary key pair into the tree.
     * @param {string} key The primary key.
     * @param {*} iKey The indexed key.
     * @param {IBTree} [tree] The optional tree in which to insert the pair.
     * @throws if the uniqueness constraint is violated.
     */
    _insert(key, iKey, tree) {
        tree = tree || this._tree;
        if (!this._multiEntry || !Array.isArray(iKey)) {
            iKey = [iKey];
        }
        // Add all keys.
        for (const component of iKey) {
            if (tree.seek(component)) {
                if (this._unique) {
                    throw `Uniqueness constraint violated for key ${key} on path ${this._keyPath}`;
                }
                tree.currentRecord.add(key);
            } else {
                tree.insert(component, this._unique ? key : Set.from(key));
            }
        }
    }

    /**
     * Inserts a new key-value pair into the index.
     * For replacing an existing pair, the old value has to be passed as well.
     * @param {string} key The primary key of the pair.
     * @param {*} value The value of the pair. The indexed key will be extracted from this.
     * @param {*} [oldValue] The old value associated with the primary key.
     * @returns {TreeTransaction} The TreeTransaction that was needed to insert/replace the key-value pair.
     */
    put(key, value, oldValue) {
        const treeTx = this._tree.transaction();
        const oldIKey = this._indexKey(key, oldValue);
        const newIKey = this._indexKey(key, value);

        if (oldIKey !== undefined) {
            this._remove(key, oldIKey, treeTx);
        }
        this._insert(key, newIKey, treeTx);
        return treeTx;
    }

    /**
     * Removes a key-value pair from the index.
     * @param {string} key The primary key of the pair.
     * @param {*} oldValue The old value of the pair. The indexed key will be extracted from this.
     * @returns {TreeTransaction} The TreeTransaction that was needed to remove the key-value pair.
     */
    remove(key, oldValue) {
        const treeTx = this._tree.transaction();
        if (oldValue !== undefined) {
            const iKey = this._indexKey(key, oldValue);
            this._remove(key, iKey, treeTx);
        }
        return treeTx;
    }

    /**
     * A helper method to remove a primary-secondary key pair from the tree.
     * @param {string} key The primary key.
     * @param {*} iKey The indexed key.
     * @param {IBTree} [tree] The optional tree in which to insert the pair.
     */
    _remove(key, iKey, tree) {
        tree = tree || this._tree;
        if (!this._multiEntry || !Array.isArray(iKey)) {
            iKey = [iKey];
        }
        // Remove all keys.
        for (const component of iKey) {
            if (tree.seek(component)) {
                if (!this._unique && tree.currentRecord.size > 1) {
                    tree.currentRecord.delete(key);
                } else {
                    tree.remove(component);
                }
            }
        }
    }

    /**
     * A helper method to retrieve the values corresponding to a set of keys.
     * @param {Set.<string>} keys The set of keys to get the corresponding values for.
     * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
     * @returns {Promise.<Array.<*>>} A promise of the array of values.
     * @protected
     */
    async _retrieveValues(keys, decoder=undefined) {
        const valuePromises = [];
        for (const key of keys) {
            valuePromises.push(this._objectStore.get(key, decoder));
        }
        return Promise.all(valuePromises);
    }

    /**
     * Returns a promise of an array of objects whose secondary keys fulfill the given query.
     * If the optional query is not given, it returns all objects in the index.
     * If the query is of type KeyRange, it returns all objects whose secondary keys are within this range.
     * @param {KeyRange} [query] Optional query to check secondary keys against.
     * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
     * @returns {Promise.<Array.<*>>} A promise of the array of objects relevant to the query.
     */
    async values(query=null, decoder=undefined) {
        const keys = await this.keys(query);
        return this._retrieveValues(keys, decoder);
    }

    /**
     * Returns a promise of a set of primary keys, whose associated objects' secondary keys are in the given range.
     * If the optional query is not given, it returns all primary keys in the index.
     * If the query is of type KeyRange, it returns all primary keys for which the secondary key is within this range.
     * @param {KeyRange} [query] Optional query to check the secondary keys against.
     * @returns {Promise.<Set.<string>>} A promise of the set of primary keys relevant to the query.
     */
    async keys(query=null) {
        let resultSet = new Set();

        // Shortcut for exact match.
        if (query instanceof  KeyRange && query.exactMatch) {
            if (this._tree.seek(query.lower)) {
                resultSet = Set.from(this._tree.currentRecord);
            }
            return resultSet;
        }

        // Find lower bound and start from there.
        if (!(query instanceof KeyRange)) {
            this._tree.goTop();
        } else {
            if (!this._tree.goToLowerBound(query.lower, query.lowerOpen)) {
                return resultSet; // empty
            }
        }

        while (!(query instanceof KeyRange) || query.includes(this._tree.currentKey)) {
            resultSet = resultSet.union(Set.from(this._tree.currentRecord));
            this._tree.skip();
        }
        return resultSet;
    }

    /**
     * Returns a promise of an array of objects whose secondary key is maximal for the given range.
     * If the optional query is not given, it returns the objects whose secondary key is maximal within the index.
     * If the query is of type KeyRange, it returns the objects whose secondary key is maximal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
     * @returns {Promise.<Array.<*>>} A promise of array of objects relevant to the query.
     */
    async maxValues(query=null, decoder=undefined) {
        const keys = await this.maxKeys(query);
        return this._retrieveValues(keys, decoder);
    }

    /**
     * Returns a promise of a set of primary keys, whose associated secondary keys are maximal for the given range.
     * If the optional query is not given, it returns the set of primary keys, whose associated secondary key is maximal within the index.
     * If the query is of type KeyRange, it returns the set of primary keys, whose associated secondary key is maximal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<Set.<*>>} A promise of the key relevant to the query.
     */
    async maxKeys(query=null) {
        const isRange = query instanceof KeyRange;
        if (!this._tree.goToUpperBound(isRange ? query.upper : undefined, isRange ? query.upperOpen : false)) {
            return new Set();
        }
        return Set.from(this._tree.currentRecord);
    }

    /**
     * Returns a promise of an array of objects whose secondary key is minimal for the given range.
     * If the optional query is not given, it returns the objects whose secondary key is minimal within the index.
     * If the query is of type KeyRange, it returns the objects whose secondary key is minimal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
     * @returns {Promise.<Array.<*>>} A promise of array of objects relevant to the query.
     */
    async minValues(query=null, decoder=undefined) {
        const keys = await this.minKeys(query);
        return this._retrieveValues(keys, decoder);
    }

    /**
     * Returns a promise of a set of primary keys, whose associated secondary keys are minimal for the given range.
     * If the optional query is not given, it returns the set of primary keys, whose associated secondary key is minimal within the index.
     * If the query is of type KeyRange, it returns the set of primary keys, whose associated secondary key is minimal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<Set.<*>>} A promise of the key relevant to the query.
     */
    async minKeys(query=null) {
        const isRange = query instanceof KeyRange;
        if (!this._tree.goToLowerBound(isRange ? query.lower : undefined, isRange ? query.lowerOpen : false)) {
            return new Set();
        }
        return Set.from(this._tree.currentRecord);
    }

    /**
     * Returns the count of entries, whose secondary key is in the given range.
     * If the optional query is not given, it returns the count of entries in the index.
     * If the query is of type KeyRange, it returns the count of entries, whose secondary key is within the given range.
     * @param {KeyRange} [query]
     * @returns {Promise.<number>}
     */
    async count(query=null) {
        return (await this.keys(query)).size;
        // The code below does only work for unique indices.
        // if (!(query instanceof KeyRange)) {
        //     return this._tree.length;
        // }
        // if (!this._tree.goToLowerBound(query.lower, query.lowerOpen)) {
        //     return 0;
        // }
        // const start = this._tree.keynum();
        // if (!this._tree.goToUpperBound(query.upper, query.upperOpen)) {
        //     return 0;
        // }
        // const end = this._tree.keynum();
        // return end - start + 1;
    }
}
Class.register(InMemoryIndex);


/**
 * This class represents range queries on an index (primary and secondary).
 */
class KeyRange {
    /**
     * This constructor is only used internally.
     * See static methods for constructing a KeyRange object.
     * @param {*} lower
     * @param {*} upper
     * @param {boolean} lowerOpen
     * @param {boolean} upperOpen
     * @private
     */
    constructor(lower, upper, lowerOpen, upperOpen) {
        this._lower = lower;
        this._upper = upper;
        this._lowerOpen = lowerOpen;
        this._upperOpen = upperOpen;
    }

    /** @type {*} The lower bound of the range. */
    get lower() {
        return this._lower;
    }

    /** @type {*} The upper bound of the range. */
    get upper() {
        return this._upper;
    }

    /** @type {boolean} Whether the lower bound is NOT part of the range. */
    get lowerOpen() {
        return this._lowerOpen;
    }

    /** @type {boolean} Whether the upper bound is NOT part of the range. */
    get upperOpen() {
        return this._upperOpen;
    }

    /** @type {boolean} Whether it is a query for an exact match. */
    get exactMatch() {
        return this._lower === this._upper && !this._lowerOpen && !this.upperOpen;
    }

    /**
     * Returns true if the given key is included in this range.
     * @param {*} key The key to test for.
     * @returns {boolean} True, if the key is included in the range and false otherwise.
     */
    includes(key) {
        return (this._lower === undefined
                || this._lower < key
                || (!this._lowerOpen && this._lower === key))
            && (this._upper === undefined
                || this._upper > key
                || (!this._upperOpen && this._upper === key));
    }

    /**
     * If upperOpen is false, all keys ≤ upper,
     * all keys < upper otherwise.
     * @param {*} upper The upper bound.
     * @param {boolean} upperOpen Whether the upper bound is NOT part of the range.
     * @returns {KeyRange} The corresponding KeyRange object.
     */
    static upperBound(upper, upperOpen=false) {
        return new KeyRange(undefined, upper, false, upperOpen);
    }

    /**
     * If lowerOpen is false, all keys ≥ lower,
     * all keys > lower otherwise.
     * @param {*} lower The lower bound.
     * @param {boolean} lowerOpen Whether the lower bound is NOT part of the range.
     * @returns {KeyRange} The corresponding KeyRange object.
     */
    static lowerBound(lower, lowerOpen=false) {
        return new KeyRange(lower, undefined, lowerOpen, false);
    }

    /**
     * A range bounded by both a lower and upper bound.
     * lowerOpen and upperOpen decide upon whether < (open) or ≤ (inclusive) comparisons
     * should be used for comparison.
     * @param {*} lower The lower bound.
     * @param {*} upper The upper bound.
     * @param {boolean} lowerOpen Whether the lower bound is NOT part of the range.
     * @param {boolean} upperOpen Whether the upper bound is NOT part of the range.
     * @returns {KeyRange} The corresponding KeyRange object.
     */
    static bound(lower, upper, lowerOpen=false, upperOpen=false) {
        return new KeyRange(lower, upper, lowerOpen, upperOpen);
    }

    /**
     * A range matching only exactly one value.
     * @param {*} value The value to match.
     * @returns {KeyRange} The corresponding KeyRange object.
     */
    static only(value) {
        return new KeyRange(value, value, false, false);
    }
}
Class.register(KeyRange);

/**
 * This is the main implementation of an object store.
 * It uses a specified backend (which itself implements the very same interface)
 * and builds upon this backend to answer queries.
 * The main task of this object store is to manage transactions
 * and ensure read isolation on these transactions.
 * @implements {IObjectStore}
 */
class ObjectStore {
    /**
     * Creates a new object store based on a backend and an underlying database.
     * The database is only used to determine the connection status.
     * @param {IObjectStore} backend The backend underlying this object store.
     * @param {{connected:boolean}} db The database underlying the backend.
     */
    constructor(backend, db) {
        this._backend = backend;
        this._db = db;
        /** @type {Array.<Transaction>} */
        this._stateStack = [];
        /**
         * Maps transactions to their base states.
         * @type {Map.<number|string,number>}
         */
        this._txBaseStates = new Map();
        /**
         * Counter for number of open transactions for base states.
         * @type {Object}
         */
        this._openTransactions = Object.create(null);
        /**
         * Set of base states already committed to.
         * @type {Set.<number|string>}
         */
        this._closedBaseStates = new Set();
    }

    /** @type {IObjectStore} */
    get _currentState() {
        return this._stateStack.length > 0 ? this._stateStack[this._stateStack.length - 1] : this._backend;
    }

    /** @type {number|string} */
    get _currentStateId() {
        return this._stateStack.length > 0 ? this._stateStack[this._stateStack.length - 1].id : 'backend';
    }

    /**
     * A map of index names to indices.
     * The index names can be used to access an index.
     * @type {Map.<string,IIndex>}
     */
    get indices() {
        if (!this._db.connected) throw 'JungleDB is not connected';
        return this._currentState.indices;
    }

    /**
     * Returns a promise of the object stored under the given primary key.
     * Resolves to undefined if the key is not present in the object store.
     * @param {string} key The primary key to look for.
     * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
     * @returns {Promise.<*>} A promise of the object stored under the given key, or undefined if not present.
     */
    get(key, decoder=undefined) {
        if (!this._db.connected) throw 'JungleDB is not connected';
        return this._currentState.get(key, decoder);
    }

    /**
     * Inserts or replaces a key-value pair.
     * Implicitly creates a transaction for this operation and commits it.
     * @param {string} key The primary key to associate the value with.
     * @param {*} value The value to write.
     * @returns {Promise.<boolean>} A promise of the success outcome.
     */
    async put(key, value) {
        if (!this._db.connected) throw 'JungleDB is not connected';
        const tx = this.transaction();
        await tx.put(key, value);
        return tx.commit();
    }

    /**
     * Removes the key-value pair of the given key from the object store.
     * Implicitly creates a transaction for this operation and commits it.
     * @param {string} key The primary key to delete along with the associated object.
     * @returns {Promise.<boolean>} A promise of the success outcome.
     */
    async remove(key) {
        if (!this._db.connected) throw 'JungleDB is not connected';
        const tx = this.transaction();
        await tx.remove(key);
        return tx.commit();
    }

    /**
     * Returns a promise of a set of keys fulfilling the given query.
     * If the optional query is not given, it returns all keys in the object store.
     * If the query is of type KeyRange, it returns all keys of the object store being within this range.
     * If the query is of type Query, it returns all keys fulfilling the query.
     * @param {Query|KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<Set.<string>>} A promise of the set of keys relevant to the query.
     */
    keys(query=null) {
        if (!this._db.connected) throw 'JungleDB is not connected';
        if (query !== null && query instanceof Query) {
            return query.keys(this._currentState);
        }
        return this._currentState.keys(query);
    }

    /**
     * Returns a promise of an array of objects whose primary keys fulfill the given query.
     * If the optional query is not given, it returns all objects in the object store.
     * If the query is of type KeyRange, it returns all objects whose primary keys are within this range.
     * If the query is of type Query, it returns all objects whose primary keys fulfill the query.
     * @param {Query|KeyRange} [query] Optional query to check keys against.
     * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
     * @returns {Promise.<Array.<*>>} A promise of the array of objects relevant to the query.
     */
    values(query=null, decoder=undefined) {
        if (!this._db.connected) throw 'JungleDB is not connected';
        if (query !== null && query instanceof Query) {
            return query.values(this._currentState, decoder);
        }
        return this._currentState.values(query, decoder);
    }

    /**
     * Returns a promise of the object whose primary key is maximal for the given range.
     * If the optional query is not given, it returns the object whose key is maximal.
     * If the query is of type KeyRange, it returns the object whose primary key is maximal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
     * @returns {Promise.<*>} A promise of the object relevant to the query.
     */
    maxValue(query=null, decoder=undefined) {
        if (!this._db.connected) throw 'JungleDB is not connected';
        return this._currentState.maxValue(query, decoder);
    }

    /**
     * Returns a promise of the key being maximal for the given range.
     * If the optional query is not given, it returns the maximal key.
     * If the query is of type KeyRange, it returns the key being maximal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<string>} A promise of the key relevant to the query.
     */
    maxKey(query=null) {
        if (!this._db.connected) throw 'JungleDB is not connected';
        return this._currentState.maxKey(query);
    }

    /**
     * Returns a promise of the key being minimal for the given range.
     * If the optional query is not given, it returns the minimal key.
     * If the query is of type KeyRange, it returns the key being minimal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<string>} A promise of the key relevant to the query.
     */
    minKey(query=null) {
        if (!this._db.connected) throw 'JungleDB is not connected';
        return this._currentState.minKey(query);
    }

    /**
     * Returns a promise of the object whose primary key is minimal for the given range.
     * If the optional query is not given, it returns the object whose key is minimal.
     * If the query is of type KeyRange, it returns the object whose primary key is minimal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
     * @returns {Promise.<*>} A promise of the object relevant to the query.
     */
    minValue(query=null, decoder=undefined) {
        if (!this._db.connected) throw 'JungleDB is not connected';
        return this._currentState.minValue(query, decoder);
    }

    /**
     * Returns the count of entries in the given range.
     * If the optional query is not given, it returns the count of entries in the object store.
     * If the query is of type KeyRange, it returns the count of entries within the given range.
     * @param {KeyRange} [query]
     * @returns {Promise.<number>}
     */
    count(query=null) {
        if (!this._db.connected) throw 'JungleDB is not connected';
        return this._currentState.count(query);
    }

    /**
     * This method is only used by transactions internally to commit themselves to the corresponding object store.
     * Thus, the tx argument is non-optional.
     * A call to this method checks whether the given transaction can be applied and pushes it to
     * the stack of applied transactions. When there is no other transaction requiring to enforce
     * read isolation, the state will be flattened and all transactions will be applied to the backend.
     * @param {Transaction} tx The transaction to be applied.
     * @returns {Promise.<boolean>} A promise of the success outcome.
     * @protected
     */
    async commit(tx) {
        if (!this._db.connected) throw 'JungleDB is not connected';
        if (!(tx instanceof Transaction) || tx.state !== Transaction.STATE.OPEN || !this._txBaseStates.has(tx.id)) {
            throw 'Can only commit open transactions';
        }
        const baseState = this._txBaseStates.get(tx.id);

        // Another transaction was already committed.
        if (this._closedBaseStates.has(baseState)) {
            await this.abort(tx);
            return false;
        }

        const numOpenTransactions = --this._openTransactions[baseState];

        // If this is the last transaction, we push our changes to the underlying layer.
        if (numOpenTransactions === 0) {
            // The underlying layer *has to be* the last one in our stack.
            await this._flattenState(tx);
        } else {
            // Otherwise, create new layer on stack.
            if (this._stateStack.length >= ObjectStore.MAX_STACK_SIZE) {
                throw 'Transaction stack size exceeded';
            }
            this._stateStack.push(tx);
            this._openTransactions[tx.id] = 0;
            this._closedBaseStates.add(baseState);
        }
        return true;
    }

    /**
     * This method is only used by transactions internally to abort themselves at the corresponding object store.
     * Thus, the tx argument is non-optional.
     * @param {Transaction} tx The transaction to be aborted.
     * @returns {Promise.<boolean>} A promise of the success outcome.
     * @protected
     */
    async abort(tx) {
        if (!this._db.connected) throw 'JungleDB is not connected';
        if (!(tx instanceof Transaction) || tx.state !== Transaction.STATE.OPEN || !this._txBaseStates.has(tx.id)) {
            throw 'Can only abort open transactions';
        }
        const baseState = this._txBaseStates.get(tx.id);

        const numOpenTransactions = --this._openTransactions[baseState];
        this._txBaseStates.delete(tx.id);

        if (numOpenTransactions === 0) {
            await this._flattenState();
        }
        return true;
    }

    /**
     * This internal method applies a transaction to the current state
     * and tries flattening the stack of transactions.
     * @param {Transaction} [tx] An optional transaction to apply to the current state.
     * @private
     */
    async _flattenState(tx) {
        // If there is a tx argument, merge it with the current state.
        if (tx && (tx instanceof Transaction)) {
            // TODO maybe get around calling a private method here
            await this._currentState._apply(tx);
        }
        // Try collapsing the states as far as possible.
        if (this._openTransactions[this._currentState.id] > 0) {
            // The current state has open transactions,
            // no way to flatten state here.
            return;
        }
        // Start flattening at the end.
        while (this._stateStack.length > 0) {
            const currentState = this._currentState;
            const baseState = this._txBaseStates.get(currentState.id);
            // Check whether it is collapsible, if no stop here.
            if (this._openTransactions[baseState] > 0) {
                break;
            }
            this._txBaseStates.delete(currentState.id);
            this._stateStack.pop(); // Remove the current state from the stack.
            await this._currentState._apply(currentState); // And apply it to the underlying layer.
        }
    }

    /**
     * Returns the index of the given name.
     * If the index does not exist, it returns undefined.
     * @param {string} indexName The name of the requested index.
     * @returns {IIndex} The index associated with the given name.
     */
    index(indexName) {
        if (!this._db.connected) throw 'JungleDB is not connected';
        return this._currentState.index(indexName);
    }

    /**
     * Creates a new secondary index on the object store.
     * Currently, all secondary indices are non-unique.
     * They are defined by a key within the object or alternatively a path through the object to a specific subkey.
     * For example, ['a', 'b'] could be used to use 'key' as the key in the following object:
     * { 'a': { 'b': 'key' } }
     * Secondary indices may be multiEntry, i.e., if the keyPath resolves to an iterable object, each item within can
     * be used to find this entry.
     * If a new object does not possess the key path associated with that index, it is simply ignored.
     *
     * This function may only be called before the database is connected.
     * Moreover, it is only executed on database version updates or on first creation.
     * @param {string} indexName The name of the index.
     * @param {string|Array.<string>} [keyPath] The path to the key within the object. May be an array for multiple levels.
     * @param {boolean} [multiEntry]
     */
    createIndex(indexName, keyPath, multiEntry=false) {
        return this._backend.createIndex(indexName, keyPath, multiEntry);
    }

    /**
     * Deletes a secondary index from the object store.
     * @param indexName
     * @returns {Promise} The promise resolves after deleting the index.
     */
    deleteIndex(indexName) {
        return this._backend.deleteIndex(indexName);
    }

    /**
     * Creates a new transaction, ensuring read isolation
     * on the most recently successfully commited state.
     * @returns {Transaction} The transaction object.
     */
    transaction() {
        if (!this._db.connected) throw 'JungleDB is not connected';
        const tx = new Transaction(this._currentState, this);
        this._txBaseStates.set(tx.id, this._currentStateId);
        this._openTransactions[this._currentStateId] = this._openTransactions[this._currentStateId] ? this._openTransactions[this._currentStateId] + 1 : 1;
        return tx;
    }

    /**
     * An object store is strongly connected to a backend.
     * Hence, it does not store anything by itself and the _apply method is not supported.
     * @param {Transaction} tx
     * @returns {Promise.<boolean>}
     * @protected
     */
    async _apply(tx) {
        throw 'Unsupported operation';
    }

    /**
     * Empties the object store.
     * @returns {Promise} The promise resolves after emptying the object store.
     */
    async truncate() {
        if (!this._db.connected) throw 'JungleDB is not connected';
        const tx = this.transaction();
        await tx.truncate();
        return tx.commit();
    }

    /**
     * Closes the object store and potential connections.
     * @returns {Promise} The promise resolves after closing the object store.
     */
    close() {
        // TODO perhaps use a different strategy here
        if (this._stateStack.length > 0) {
            throw 'Cannot close database while transactions are active';
        }
        return this._backend.close();
    }

    /**
     * Internal method called to decode a single value.
     * @param {*} value Value to be decoded.
     * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
     * @returns {*} The decoded value, either by the object store's default or the overriding decoder if given.
     */
    decode(value, decoder=undefined) {
        return this._backend.decode(value, decoder);
    }

    /**
     * Internal method called to decode multiple values.
     * @param {Array.<*>} values Values to be decoded.
     * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
     * @returns {Array.<*>} The decoded values, either by the object store's default or the overriding decoder if given.
     */
    decodeArray(values, decoder=undefined) {
        return this._backend.decodeArray(values, decoder);
    }
}
/** @type {number} The maximum number of states to stack. */
ObjectStore.MAX_STACK_SIZE = 10;
Class.register(ObjectStore);

/**
 * This class represents a Query object.
 * Queries are constructed using the static helper methods.
 */
class Query {
    /**
     * Internal helper method that translates an operation to a KeyRange object.
     * @param {Query.OPERATORS} op The operator of the query.
     * @param {*} value The first operand of the query.
     * @param {*} [value2] The optional second operand of the query.
     * @private
     */
    static _parseKeyRange(op, value, value2) {
        switch (op) {
            case Query.OPERATORS.GT:
                return KeyRange.lowerBound(value, true);
            case Query.OPERATORS.GE:
                return KeyRange.lowerBound(value, false);
            case Query.OPERATORS.LT:
                return KeyRange.upperBound(value, true);
            case Query.OPERATORS.LE:
                return KeyRange.upperBound(value, false);
            case Query.OPERATORS.EQ:
                return KeyRange.only(value);
            case Query.OPERATORS.BETWEEN:
                return KeyRange.bound(value, value2, true, true);
            case Query.OPERATORS.WITHIN:
                return KeyRange.bound(value, value2, false, false);
        }
        throw 'Unknown operator';
    }

    /**
     * Returns the conjunction of multiple queries.
     * @param {...Query} var_args The list of queries, which all have to be fulfilled.
     * @returns {Query} The conjunction of the queries.
     */
    static and(var_args) {
        const args = Array.from(arguments);
        return new Query(args, Query.OPERATORS.AND);
    }

    /**
     * Returns the disjunction of multiple queries.
     * @param {...Query} var_args The list of queries, out of which at least one has to be fulfilled.
     * @returns {Query} The disjunction of the queries.
     */
    static or(var_args) {
        const args = Array.from(arguments);
        return new Query(args, Query.OPERATORS.OR);
    }

    /**
     * Returns a query for the max key of an index.
     * @param {string} indexName The name of the index, whose maximal key the query matches.
     * @returns {Query} The query for the max key of the index.
     */
    static max(indexName) {
        return new Query(indexName, Query.OPERATORS.MAX);
    }

    /**
     * Returns a query for the min key of an index.
     * @param {string} indexName The name of the index, whose minimal key the query matches.
     * @returns {Query} The query for the min key of the index.
     */
    static min(indexName) {
        return new Query(indexName, Query.OPERATORS.MIN);
    }

    /**
     * Returns a query that matches all keys of an index that are less than a value.
     * The query matches all keys k, such that k < val.
     * @param {string} indexName The name of the index.
     * @param {*} val The upper bound of the query.
     * @returns {Query} The resulting query object.
     */
    static lt(indexName, val) {
        return new Query(indexName, Query.OPERATORS.LT, val);
    }

    /**
     * Returns a query that matches all keys of an index that are less or equal than a value.
     * The query matches all keys k, such that k ≤ val.
     * @param {string} indexName The name of the index.
     * @param {*} val The upper bound of the query.
     * @returns {Query} The resulting query object.
     */
    static le(indexName, val) {
        return new Query(indexName, Query.OPERATORS.LE, val);
    }

    /**
     * Returns a query that matches all keys of an index that are greater than a value.
     * The query matches all keys k, such that k > val.
     * @param {string} indexName The name of the index.
     * @param {*} val The lower bound of the query.
     * @returns {Query} The resulting query object.
     */
    static gt(indexName, val) {
        return new Query(indexName, Query.OPERATORS.GT, val);
    }

    /**
     * Returns a query that matches all keys of an index that are greater or equal than a value.
     * The query matches all keys k, such that k ≥ val.
     * @param {string} indexName The name of the index.
     * @param {*} val The lower bound of the query.
     * @returns {Query} The resulting query object.
     */
    static ge(indexName, val) {
        return new Query(indexName, Query.OPERATORS.GE, val);
    }

    /**
     * Returns a query that matches all keys of an index that equal to a value.
     * The query matches all keys k, such that k = val.
     * @param {string} indexName The name of the index.
     * @param {*} val The value to look for.
     * @returns {Query} The resulting query object.
     */
    static eq(indexName, val) {
        return new Query(indexName, Query.OPERATORS.EQ, val);
    }

    /**
     * Returns a query that matches all keys of an index that are between two values, excluding the boundaries.
     * The query matches all keys k, such that lower < k < upper.
     * @param {string} indexName The name of the index.
     * @param {*} lower The lower bound.
     * @param {*} upper The upper bound.
     * @returns {Query} The resulting query object.
     */
    static between(indexName, lower, upper) {
        return new Query(indexName, Query.OPERATORS.BETWEEN, lower, upper);
    }

    /**
     * Returns a query that matches all keys of an index that are between two values, including the boundaries.
     * The query matches all keys k, such that lower ≤ k ≤ upper.
     * @param {string} indexName The name of the index.
     * @param {*} lower The lower bound.
     * @param {*} upper The upper bound.
     * @returns {Query} The resulting query object.
     */
    static within(indexName, lower, upper) {
        return new Query(indexName, Query.OPERATORS.WITHIN, lower, upper);
    }

    /**
     * Internal constructor for a query.
     * Should not be called directly.
     * @param {string|Array.<Query>} arg Either a list of queries or an index name (depending on the operator).
     * @param {Query.OPERATORS} op The operator to apply.
     * @param {*} [value] The first operand if applicable.
     * @param {*} [value2] The second operand if applicable.
     * @private
     */
    constructor(arg, op, value, value2) {
        // If first argument is an array of queries, this is a combined query.
        if (Array.isArray(arg)) {
            if (arg.some(it => !(it instanceof Query))) {
                throw 'Invalid query';
            }
            if (Query.COMBINED_OPERATORS.indexOf(op) < 0) {
                throw 'Unknown operator';
            }
            this._queryType = Query.Type.COMBINED;
            this._queries = arg;
            this._op = op;
        }
        // Otherwise we have a single query.
        else {
            if (Query.RANGE_OPERATORS.indexOf(op) >= 0) {
                this._queryType = Query.Type.RANGE;
                this._keyRange = Query._parseKeyRange(op, value, value2);
            } else if (Query.ADVANCED_OPERATORS.indexOf(op) >= 0) {
                this._queryType = Query.Type.ADVANCED;
                this._op = op;
            } else {
                throw 'Unknown operator';
            }
            this._indexName = arg;
        }
    }

    /**
     * Returns a promise of an array of objects fulfilling this query.
     * @param {IObjectStore} objectStore The object store to execute the query on.
     * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
     * @returns {Promise.<Array.<*>>} A promise of the array of objects relevant to this query.
     */
    async values(objectStore, decoder=undefined) {
        const keys = await this._execute(objectStore);
        const resultPromises = [];
        for (const key of keys) {
            resultPromises.push(objectStore.get(key, decoder));
        }
        return Promise.all(resultPromises);
    }

    /**
     * Returns a promise of a set of keys fulfilling this query.
     * @param {IObjectStore} objectStore The object store to execute the query on.
     * @returns {Promise.<Set.<string>>} A promise of the set of keys relevant to this query.
     */
    keys(objectStore) {
        return this._execute(objectStore);
    }

    /**
     * Internal method to execute a query on an object store.
     * @param {IObjectStore} objectStore The object store to execute the query on.
     * @returns {Promise.<Set.<string>>} A promise of the set of keys relevant to this query.
     * @private
     */
    async _execute(objectStore) {
        switch (this._queryType) {
            case Query.Type.COMBINED:
                return Promise.resolve(this._executeCombined(objectStore));

            case Query.Type.ADVANCED:
                return Promise.resolve(this._executeAdvanced(objectStore));

            case Query.Type.RANGE:
                return this._executeRange(objectStore);
        }
        return Promise.resolve(new Set());
    }

    /**
     * Internal method for and/or operators.
     * @param {IObjectStore} objectStore The object store to execute the query on.
     * @returns {Promise.<Set.<string>>} A promise of the set of keys relevant to this query.
     * @private
     */
    async _executeCombined(objectStore) {
        // Evaluate children.
        const resultPromises = [];
        for (const query of this._queries) {
            resultPromises.push(query._execute(objectStore));
        }
        const results = await Promise.all(resultPromises);

        if (this._op === Query.OPERATORS.AND) {
            // Provide shortcuts.
            if (results.length === 0) {
                return new Set();
            } else if (results.length === 1) {
                return results[0];
            }

            // Set intersection of all keys.
            const firstResult = results.shift();
            const intersection = new Set();
            for (const val of firstResult) {
                if (results.every(result => result.has(val))) {
                    intersection.add(val);
                }
            }
            return intersection;
        } else if (this._op === Query.OPERATORS.OR) {
            // Set union of all keys.
            const union = new Set();
            for (const result of results) {
                result.forEach(val => union.add(val));
            }
            return union;
        }
        return new Set();
    }

    /**
     * Internal method for min/max operators.
     * @param {IObjectStore} objectStore The object store to execute the query on.
     * @returns {Promise.<Set.<string>>} A promise of the set of keys relevant to this query.
     * @private
     */
    async _executeAdvanced(objectStore) {
        const index = objectStore.index(this._indexName);
        let results = new Set();
        switch (this._op) {
            case Query.OPERATORS.MAX:
                results = await index.maxKeys();
                break;
            case Query.OPERATORS.MIN:
                results = await index.minKeys();
                break;
        }
        return new Set(results);
    }

    /**
     * Internal method for range operators.
     * @param {IObjectStore} objectStore The object store to execute the query on.
     * @returns {Promise.<Set.<string>>} A promise of the set of keys relevant to this query.
     * @private
     */
    async _executeRange(objectStore) {
        const index = objectStore.index(this._indexName);
        return new Set(await index.keys(this._keyRange));
    }
}
/**
 * Enum for supported operators.
 * @enum {number}
 */
Query.OPERATORS = {
    GT: 0,
    GE: 1,
    LT: 2,
    LE: 3,
    EQ: 4,
    // NEQ: 5, not supported
    BETWEEN: 7,
    WITHIN: 8,
    MAX: 9,
    MIN: 10,
    AND: 11,
    OR: 12
};
Query.RANGE_OPERATORS = [
    Query.OPERATORS.GT,
    Query.OPERATORS.GE,
    Query.OPERATORS.LT,
    Query.OPERATORS.LE,
    Query.OPERATORS.EQ,
    Query.OPERATORS.BETWEEN,
    Query.OPERATORS.WITHIN
];
Query.ADVANCED_OPERATORS = [Query.OPERATORS.MAX, Query.OPERATORS.MIN];
Query.COMBINED_OPERATORS = [Query.OPERATORS.AND, Query.OPERATORS.OR];
/**
 * Enum for query types.
 * Each operator belongs to one of these types as specified above.
 * @enum {number}
 */
Query.Type = {
    RANGE: 0,
    ADVANCED: 1,
    COMBINED: 2
};
Class.register(Query);


/**
 * This class constitutes an InMemoryIndex for Transactions.
 * It unifies the results of keys changed during the transaction
 * with the underlying backend.
 */
class TransactionIndex extends InMemoryIndex {
    /**
     * Derives the indices from the backend and returns a new map of transactions.
     * @param {Transaction} objectStore The transaction the index should be based on.
     * @param {IObjectStore} backend The backend underlying the transaction.
     * @returns {Map.<string,TransactionIndex>} A map containing all indices for the transaction.
     */
    static derive(objectStore, backend) {
        const indices = new Map();
        for (const [name, index] of backend.indices) {
            indices.set(name, new TransactionIndex(objectStore, backend, name, index.keyPath, index.multiEntry));
        }
        return indices;
    }

    /** @type {IIndex} The index of the underlying backend. */
    get _index() {
        return this._backend.index(this._databaseDir);
    }

    /**
     * Constructs a new TransactionIndex serving the transaction's changes
     * and unifying the results with the underlying backend.
     * @param {Transaction} objectStore The transaction the index should be based on.
     * @param {IObjectStore} backend The backend underlying the transaction.
     * @param {string|Array.<string>} keyPath The key path of the indexed attribute.
     * @param {boolean} multiEntry Whether the indexed attribute is considered to be iterable or not.
     * @protected
     */
    constructor(objectStore, backend, name, keyPath, multiEntry=false) {
        super(objectStore, keyPath, multiEntry);
        this._backend = backend;
        this._databaseDir = name;
    }

    /**
     * Returns a promise of a set of primary keys, whose associated objects' secondary keys are in the given range.
     * If the optional query is not given, it returns all primary keys in the index.
     * If the query is of type KeyRange, it returns all primary keys for which the secondary key is within this range.
     * @param {KeyRange} [query] Optional query to check the secondary keys against.
     * @returns {Promise.<Set.<string>>} A promise of the set of primary keys relevant to the query.
     */
    async keys(query=null) {
        const promises = [];
        promises.push(this._index.keys(query));
        promises.push(InMemoryIndex.prototype.keys.call(this, query));
        let [keys, newKeys] = await Promise.all(promises);
        // Remove keys that have been deleted or modified.
        keys = keys.difference(this._objectStore._removed);
        keys = keys.difference(this._objectStore._modified.keys());
        return keys.union(newKeys);
    }

    /**
     * Returns a promise of an array of objects whose secondary keys fulfill the given query.
     * If the optional query is not given, it returns all objects in the index.
     * If the query is of type KeyRange, it returns all objects whose secondary keys are within this range.
     * @param {KeyRange} [query] Optional query to check secondary keys against.
     * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
     * @returns {Promise.<Array.<*>>} A promise of the array of objects relevant to the query.
     */
    async values(query=null, decoder=undefined) {
        const keys = await this.keys(query);
        return super._retrieveValues(keys, decoder);
    }

    /**
     * Returns a promise of an array of objects whose secondary key is maximal for the given range.
     * If the optional query is not given, it returns the objects whose secondary key is maximal within the index.
     * If the query is of type KeyRange, it returns the objects whose secondary key is maximal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
     * @returns {Promise.<Array.<*>>} A promise of array of objects relevant to the query.
     */
    async maxValues(query=null, decoder=undefined) {
        const keys = await this.maxKeys(query);
        return super._retrieveValues(keys, decoder);
    }

    /**
     * Returns an element of a set.
     * @template T
     * @param {Set.<T>} s The set to return an element from.
     * @returns {T} An element of the set.
     * @private
     */
    static _sampleElement(s) {
        return s.size > 0 ? s.values().next().value : undefined;
    }

    /**
     * Returns a promise of a set of primary keys, whose associated secondary keys are maximal for the given range.
     * If the optional query is not given, it returns the set of primary keys, whose associated secondary key is maximal within the index.
     * If the query is of type KeyRange, it returns the set of primary keys, whose associated secondary key is maximal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<Set.<*>>} A promise of the key relevant to the query.
     */
    async maxKeys(query=null) {
        let backendKeys = await this._index.maxKeys(query);

        // Remove keys that have been deleted or modified.
        let sampleElement = TransactionIndex._sampleElement(backendKeys);
        const value = await this._backend.get(sampleElement, null);
        let maxIKey = sampleElement ? ObjectUtils.byKeyPath(value, this.keyPath) : undefined;
        backendKeys = backendKeys.difference(this._objectStore._removed);
        backendKeys = backendKeys.difference(this._objectStore._modified.keys());

        while (sampleElement !== undefined && backendKeys.size === 0) {
            const tmpQuery = KeyRange.upperBound(maxIKey, true);
            backendKeys = await this._index.maxKeys(tmpQuery);

            // Remove keys that have been deleted or modified.
            sampleElement = TransactionIndex._sampleElement(backendKeys);
            const value = await this._backend.get(sampleElement, null);
            maxIKey = sampleElement ? ObjectUtils.byKeyPath(value, this.keyPath) : undefined;
            backendKeys = backendKeys.difference(this._objectStore._removed);
            backendKeys = backendKeys.difference(this._objectStore._modified.keys());

            // If we get out of the range, stop here.
            if (maxIKey && query !== null && !query.includes(maxIKey)) {
                backendKeys = new Set();
                break;
            }
        }

        const newKeys = await InMemoryIndex.prototype.maxKeys.call(this, query);

        if (backendKeys.size === 0) {
            return newKeys;
        } else if (newKeys.size === 0) {
            return backendKeys;
        }

        // Both contain elements, check which one is larger.
        const valueTx = await this._objectStore.get(TransactionIndex._sampleElement(newKeys), null);

        const iKeyBackend = maxIKey;
        const iKeyTx = ObjectUtils.byKeyPath(valueTx, this.keyPath);

        if (iKeyBackend > iKeyTx) {
            return backendKeys;
        } else if (iKeyBackend < iKeyTx) {
            return newKeys;
        }
        return backendKeys.union(newKeys);
    }

    /**
     * Returns a promise of an array of objects whose secondary key is minimal for the given range.
     * If the optional query is not given, it returns the objects whose secondary key is minimal within the index.
     * If the query is of type KeyRange, it returns the objects whose secondary key is minimal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
     * @returns {Promise.<Array.<*>>} A promise of array of objects relevant to the query.
     */
    async minValues(query=null, decoder=undefined) {
        const keys = await this.minKeys(query);
        return super._retrieveValues(keys, decoder);
    }

    /**
     * Returns a promise of a set of primary keys, whose associated secondary keys are minimal for the given range.
     * If the optional query is not given, it returns the set of primary keys, whose associated secondary key is minimal within the index.
     * If the query is of type KeyRange, it returns the set of primary keys, whose associated secondary key is minimal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<Set.<*>>} A promise of the key relevant to the query.
     */
    async minKeys(query=null) {
        let backendKeys = await this._index.minKeys(query);

        // Remove keys that have been deleted or modified.
        let sampleElement = TransactionIndex._sampleElement(backendKeys);
        const value = await this._backend.get(sampleElement, null);
        let minIKey = sampleElement ? ObjectUtils.byKeyPath(value, this.keyPath) : undefined;
        backendKeys = backendKeys.difference(this._objectStore._removed);
        backendKeys = backendKeys.difference(this._objectStore._modified.keys());

        while (sampleElement !== undefined && backendKeys.size === 0) {
            const tmpQuery = KeyRange.lowerBound(minIKey, true);
            backendKeys = await this._index.minKeys(tmpQuery);

            // Remove keys that have been deleted or modified.
            sampleElement = TransactionIndex._sampleElement(backendKeys);
            const value = await this._backend.get(sampleElement, null);
            minIKey = sampleElement ? ObjectUtils.byKeyPath(value, this.keyPath) : undefined;
            backendKeys = backendKeys.difference(this._objectStore._removed);
            backendKeys = backendKeys.difference(this._objectStore._modified.keys());

            // If we get out of the range, stop here.
            if (minIKey && query !== null && !query.includes(minIKey)) {
                backendKeys = new Set();
                break;
            }
        }

        const newKeys = await InMemoryIndex.prototype.minKeys.call(this, query);

        if (backendKeys.size === 0) {
            return newKeys;
        } else if (newKeys.size === 0) {
            return backendKeys;
        }

        // Both contain elements, check which one is larger.
        const valueTx = await this._objectStore.get(TransactionIndex._sampleElement(newKeys), null);

        const iKeyBackend = minIKey;
        const iKeyTx = ObjectUtils.byKeyPath(valueTx, this.keyPath);

        if (iKeyBackend < iKeyTx) {
            return backendKeys;
        } else if (iKeyBackend > iKeyTx) {
            return newKeys;
        }
        return backendKeys.union(newKeys);
    }

    /**
     * Returns the count of entries, whose secondary key is in the given range.
     * If the optional query is not given, it returns the count of entries in the index.
     * If the query is of type KeyRange, it returns the count of entries, whose secondary key is within the given range.
     * @param {KeyRange} [query]
     * @returns {Promise.<number>}
     */
    async count(query=null) {
        // Unfortunately, we cannot do better than getting keys + counting.
        return (await this.keys(query)).size;
    }
}
Class.register(TransactionIndex);

/**
 * Transactions are created by calling the transaction method on an ObjectStore object.
 * Transactions ensure read-isolation.
 * On a given state, only *one* transaction can be committed successfully.
 * Other transactions based on the same state will end up in a conflicted state if committed.
 * Transactions opened after the successful commit of another transaction will be based on the
 * new state and hence can be committed again.
 * @implements {IObjectStore}
 */
class Transaction {
    /**
     * This constructor should only be called by an ObjectStore object.
     * Our transactions have a watchdog enabled by default,
     * aborting them after a certain time specified by WATCHDOG_TIMER.
     * This helps to detect unclosed transactions preventing to store the state in
     * the persistent backend.
     * @param {IObjectStore} backend The backend on which the transaction is based,
     * i.e., another transaction or the real database.
     * @param {IObjectStore} [commitBackend] The object store managing the transactions,
     * i.e., the ObjectStore object.
     * @param {boolean} [enableWatchdog] If this is is set to true (default),
     * transactions will be automatically aborted if left open for longer than WATCHDOG_TIMER.
     * @protected
     */
    constructor(backend, commitBackend, enableWatchdog=true) {
        this._id = Transaction._instanceCount++;
        this._backend = backend;
        this._commitBackend = commitBackend || backend;
        this._modified = new Map();
        this._removed = new Set();
        this._originalValues = new Map();
        this._truncated = false;
        this._indices = TransactionIndex.derive(this, backend);

        this._state = Transaction.STATE.OPEN;

        this._enableWatchdog = enableWatchdog;
        if (this._enableWatchdog) {
            this._watchdog = setTimeout(() => {
                this.abort();
                throw 'Watchdog timer aborted transaction';
            }, Transaction.WATCHDOG_TIMER);
        }
    }

    /** @type {number} A unique transaction id. */
    get id() {
        return this._id;
    }

    /**
     * A map of index names to indices.
     * The index names can be used to access an index.
     * @type {Map.<string,IIndex>}
     */
    get indices() {
        return this._indices;
    }

    /**
     * The transaction's current state.
     * @returns {Transaction.STATE}
     */
    get state() {
        return this._state;
    }

    /**
     * Internally applies a transaction to the transaction's state.
     * This needs to be done in batch (as a db level transaction), i.e., either the full state is updated
     * or no changes are applied.
     * @param {Transaction} tx The transaction to apply.
     * @returns {Promise} The promise resolves after applying the transaction.
     * @protected
     */
    async _apply(tx) {
        if (!(tx instanceof Transaction)) {
            throw 'Can only apply transactions';
        }
        if (tx._truncated) {
            await this.truncate();
        }
        for (const [key, value] of tx._modified) {
            // If this transaction has key in its originalValues, we use it.
            // Otherwise, the original value has to coincide with the transaction's stored original value.
            let oldValue;
            if (this._originalValues.has(key)) {
                oldValue = this._originalValues.get(key);
            } else {
                oldValue = tx._originalValues.get(key);
                this._originalValues.set(key, oldValue);
            }

            this._put(key, value, oldValue);
        }
        for (const key of tx._removed) {
            // If this transaction has key in its originalValues, we use it.
            // Otherwise, the original value has to coincide with the transaction's stored original value.
            let oldValue;
            if (this._originalValues.has(key)) {
                oldValue = this._originalValues.get(key);
            } else {
                oldValue = tx._originalValues.get(key);
                this._originalValues.set(key, oldValue);
            }

            this._remove(key, oldValue);
        }
    }

    /**
     * Empties the object store.
     * @returns {Promise} The promise resolves after emptying the object store.
     */
    async truncate() {
        this._truncated = true;
        this._modified.clear();
        this._removed.clear();
        this._originalValues.clear();

        // Update indices.
        for (const index of this._indices.values()) {
            index.truncate();
        }
    }

    /**
     * Commits a transaction to the underlying backend.
     * The state is only written to the persistent backend if no other transaction is open.
     * If the commit was successful, new transactions will always be based on the new state.
     * There are two outcomes for a commit:
     * If there was no other transaction committed that was based on the same state,
     * it will be successful and change the transaction's state to COMMITTED (returning true).
     * Otherwise, the state will be CONFLICTED and the method will return false.
     * @param {Transaction} [tx] The transaction to be applied, only used internally.
     * @returns {Promise.<boolean>} A promise of the success outcome.
     */
    async commit(tx) {
        // Transaction is given, forward to backend.
        if (tx !== undefined) {
            // Make sure transaction can be based on this state.
            if (this._state !== Transaction.STATE.COMMITTED) {
                throw 'Transaction is based on invalid state';
            }
            return this._commitBackend.commit(tx);
        }

        if (this._state !== Transaction.STATE.OPEN) {
            throw 'Transaction already closed';
        }
        if (this._enableWatchdog) {
            clearTimeout(this._watchdog);
        }
        if (await this._commitBackend.commit(this)) {
            this._state = Transaction.STATE.COMMITTED;
            return true;
        } else {
            this._state = Transaction.STATE.CONFLICTED;
            return false;
        }
    }

    /**
     * Aborts a transaction and (if this was the last open transaction) potentially
     * persists the most recent, committed state.
     * @param {Transaction} [tx] The transaction to be applied, only used internally.
     * @returns {Promise.<boolean>} A promise of the success outcome.
     */
    async abort(tx) {
        // Transaction is given, forward to backend.
        if (tx !== undefined) {
            // Make sure transaction can be based on this state.
            if (this._state !== Transaction.STATE.COMMITTED) {
                throw 'Transaction is based on invalid state';
            }

            await this._commitBackend.abort(tx);
        }

        if (this._state !== Transaction.STATE.OPEN) {
            throw 'Transaction already closed';
        }
        if (this._enableWatchdog) {
            clearTimeout(this._watchdog);
        }
        await this._commitBackend.abort(this);
        this._state = Transaction.STATE.ABORTED;
        return true;
    }

    /**
     * Internal method called to decode a single value.
     * @param {*} value Value to be decoded.
     * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
     * @returns {*} The decoded value, either by the object store's default or the overriding decoder if given.
     */
    decode(value, decoder=undefined) {
        // shortcut to the commit backend (we don't need to go through the transaction stack for this)
        return this._commitBackend.decode(value, decoder);
    }

    /**
     * Internal method called to decode multiple values.
     * @param {Array.<*>} values Values to be decoded.
     * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
     * @returns {Array.<*>} The decoded values, either by the object store's default or the overriding decoder if given.
     */
    decodeArray(values, decoder=undefined) {
        // shortcut to the commit backend (we don't need to go through the transaction stack for this)
        return this._commitBackend.decodeArray(values, decoder);
    }

    /**
     * Returns a promise of the object stored under the given primary key.
     * Resolves to undefined if the key is not present in the object store.
     * @param {string} key The primary key to look for.
     * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
     * @returns {Promise.<*>} A promise of the object stored under the given key, or undefined if not present.
     */
    async get(key, decoder=undefined) {
        // Order is as follows:
        // 1. check if removed,
        // 2. check if modified,
        // 3. check if truncated
        // 4. request from backend
        if (this._removed.has(key)) {
            return undefined;
        }
        if (this._modified.has(key)) {
            return this.decode(this._modified.get(key), decoder);
        }
        if (this._truncated) {
            return undefined;
        }
        return await this._backend.get(key, decoder);
    }

    /**
     * Inserts or replaces a key-value pair.
     * @param {string} key The primary key to associate the value with.
     * @param {*} value The value to write.
     * @returns {Promise} The promise resolves after writing to the current object store finished.
     */
    async put(key, value) {
        if (this._state !== Transaction.STATE.OPEN) {
            throw 'Transaction already closed';
        }

        const oldValue = await this.get(key, null);

        // Save for indices.
        if (!this._originalValues.has(key)) {
            this._originalValues.set(key, oldValue);
        }

        this._put(key, value, oldValue);
    }

    /**
     * Internal method for inserting/replacing a key-value pair.
     * @param {string} key The primary key to associate the value with.
     * @param {*} value The value to write.
     * @param {*} [oldValue] The old value associated with the key to update the indices (if applicable).
     * @private
     */
    _put(key, value, oldValue) {
        this._removed.delete(key);
        this._modified.set(key, value);

        // Update indices.
        for (const index of this._indices.values()) {
            index.put(key, value, oldValue);
        }
    }

    /**
     * Removes the key-value pair of the given key from the object store.
     * @param {string} key The primary key to delete along with the associated object.
     * @returns {Promise} The promise resolves after writing to the current object store finished.
     */
    async remove(key) {
        if (this._state !== Transaction.STATE.OPEN) {
            throw 'Transaction already closed';
        }

        const oldValue = await this.get(key, null);
        // Only remove if it exists.
        if (oldValue !== undefined) {
            // Save for indices.
            if (!this._originalValues.has(key)) {
                this._originalValues.set(key, oldValue);
            }

            this._remove(key, oldValue);
        }
    }

    /**
     * Internal method for removing a key-value pair.
     * @param {string} key The primary key to delete along with the associated object.
     * @param {*} oldValue The old value associated with the key to update the indices.
     */
    _remove(key, oldValue) {
        this._removed.add(key);
        this._modified.delete(key);

        // Update indices.
        for (const index of this._indices.values()) {
            index.remove(key, oldValue);
        }
    }

    /**
     * Returns a promise of a set of keys fulfilling the given query.
     * If the optional query is not given, it returns all keys in the object store.
     * If the query is of type KeyRange, it returns all keys of the object store being within this range.
     * If the query is of type Query, it returns all keys fulfilling the query.
     * @param {Query|KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<Set.<string>>} A promise of the set of keys relevant to the query.
     */
    async keys(query=null) {
        if (query !== null && query instanceof Query) {
            return query.keys(this);
        }
        let keys = new Set();
        if (!this._truncated) {
            keys = await this._backend.keys(query);
        }
        keys = keys.difference(this._removed);
        for (const key of this._modified.keys()) {
            if (query === null || query.includes(key)) {
                keys.add(key);
            }
        }
        return keys;
    }

    /**
     * Returns a promise of an array of objects whose primary keys fulfill the given query.
     * If the optional query is not given, it returns all objects in the object store.
     * If the query is of type KeyRange, it returns all objects whose primary keys are within this range.
     * If the query is of type Query, it returns all objects whose primary keys fulfill the query.
     * @param {Query|KeyRange} [query] Optional query to check keys against.
     * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
     * @returns {Promise.<Array.<*>>} A promise of the array of objects relevant to the query.
     */
    async values(query=null, decoder=undefined) {
        if (query !== null && query instanceof Query) {
            return query.values(this);
        }
        const keys = await this.keys(query);
        const valuePromises = [];
        for (const key of keys) {
            valuePromises.push(this.get(key, decoder));
        }
        return Promise.all(valuePromises);
    }

    /**
     * Returns a promise of the object whose primary key is maximal for the given range.
     * If the optional query is not given, it returns the object whose key is maximal.
     * If the query is of type KeyRange, it returns the object whose primary key is maximal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
     * @returns {Promise.<*>} A promise of the object relevant to the query.
     */
    async maxValue(query=null, decoder=undefined) {
        const maxKey = await this.maxKey(query);
        return this.get(maxKey, decoder);
    }

    /**
     * Returns a promise of the key being maximal for the given range.
     * If the optional query is not given, it returns the maximal key.
     * If the query is of type KeyRange, it returns the key being maximal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<string>} A promise of the key relevant to the query.
     */
    async maxKey(query=null) {
        // Take underlying maxKey.
        let maxKey = undefined;
        if (!this._truncated) {
            maxKey = await this._backend.maxKey(query);
        }

        // If this key has been removed, find next best key.
        while (maxKey !== undefined && this._removed.has(maxKey)) {
            const tmpQuery = KeyRange.upperBound(maxKey, true);
            maxKey = await this._backend.maxKey(tmpQuery);

            // If we get out of the range, stop here.
            if (query !== null && !query.includes(maxKey)) {
                maxKey = undefined;
                break;
            }
        }

        for (const key of this._modified.keys()) {
            // Find better maxKey in modified data.
            if ((query === null || query.includes(key)) && (maxKey === undefined || key > maxKey)) {
                maxKey = key;
            }
        }
        return maxKey;
    }

    /**
     * Returns a promise of the object whose primary key is minimal for the given range.
     * If the optional query is not given, it returns the object whose key is minimal.
     * If the query is of type KeyRange, it returns the object whose primary key is minimal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
     * @returns {Promise.<*>} A promise of the object relevant to the query.
     */
    async minValue(query=null, decoder=undefined) {
        const minKey = await this.minKey(query);
        return this.get(minKey, decoder);
    }

    /**
     * Returns a promise of the key being minimal for the given range.
     * If the optional query is not given, it returns the minimal key.
     * If the query is of type KeyRange, it returns the key being minimal for the given range.
     * @param {KeyRange} [query] Optional query to check keys against.
     * @returns {Promise.<string>} A promise of the key relevant to the query.
     */
    async minKey(query=null) {
        // Take underlying minKey.
        let minKey = undefined;
        if (!this._truncated) {
            minKey = await this._backend.minKey(query);
        }

        // If this key has been removed, find next best key.
        while (minKey !== undefined && this._removed.has(minKey)) {
            const tmpQuery = KeyRange.lowerBound(minKey, true);
            minKey = await this._backend.minKey(tmpQuery);

            // If we get out of the range, stop here.
            if (query !== null && !query.includes(minKey)) {
                minKey = undefined;
                break;
            }
        }

        for (const key of this._modified.keys()) {
            // Find better maxKey in modified data.
            if ((query === null || query.includes(key)) && (minKey === undefined || key < minKey)) {
                minKey = key;
            }
        }
        return minKey;
    }


    /**
     * Returns the count of entries in the given range.
     * If the optional query is not given, it returns the count of entries in the object store.
     * If the query is of type KeyRange, it returns the count of entries within the given range.
     * @param {KeyRange} [query]
     * @returns {Promise.<number>}
     */
    async count(query=null) {
        // Unfortunately, we cannot do better than getting keys + counting.
        return (await this.keys(query)).size;
    }

    /**
     * Returns the index of the given name.
     * If the index does not exist, it returns undefined.
     * @param {string} indexName The name of the requested index.
     * @returns {IIndex} The index associated with the given name.
     */
    index(indexName) {
        return this._indices.get(indexName);
    }

    /**
     * This method is not implemented for transactions.
     */
    async createIndex() {
        throw 'Cannot create index in transaction';
    }

    /**
     * This method is not implemented for transactions.
     */
    async deleteIndex() {
        throw 'Cannot delete index in transaction';
    }

    /**
     * Alias for abort.
     * @returns {Promise} The promise resolves after successful abortion of the transaction.
     */
    close() {
        return this.abort();
    }
}
/** @type {number} Milliseconds to wait until automatically aborting transaction. */
Transaction.WATCHDOG_TIMER = 10000 /*ms*/;
/**
 * The states of a transaction.
 * New transactions are in the state OPEN until they are aborted or committed.
 * Aborted transactions move to the state ABORTED.
 * Committed transactions move to the state COMMITTED,
 * if no other transaction has been applied to the same state.
 * Otherwise, they change their state to CONFLICTED.
 * @enum {number}
 */
Transaction.STATE = {
    OPEN: 0,
    COMMITTED: 1,
    ABORTED: 2,
    CONFLICTED: 3
};
Transaction._instanceCount = 0;
Class.register(Transaction);

    exports._loaded = true;
    if (typeof exports._onload === 'function') exports._onload();
    return exports;
})(JDB);

//# sourceMappingURL=web.js.map
