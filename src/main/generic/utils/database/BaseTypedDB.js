class BaseTypedDB {
    static get db() {
        if (BaseTypedDB._db) return Promise.resolve(BaseTypedDB._db);
        return BaseTypedDB.initDB();
    }

    static async initDB() {
        const dbVersion = 4;
        const db = new JDB.JungleDB('nimiq', dbVersion);
        BaseTypedDB._db = db;

        // Create object stores and indices here.
        const accounts = db.createObjectStore('accounts', AccountsTreeNode.copy);
        const blocks = db.createObjectStore('blocks', Chain.copy);
        const certificate = db.createObjectStore('certificate');
        const wallet = db.createObjectStore('wallet', KeyPair.copy);

        await db.connect();

        return db;
    }
}
Class.register(BaseTypedDB);
