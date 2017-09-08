class WalletStore extends TypedDB {
    constructor() {
        super('wallet');
    }
}
Class.register(WalletStore);
