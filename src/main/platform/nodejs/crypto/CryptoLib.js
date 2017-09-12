const WebCrypto = require('node-webcrypto-ossl');
global.webcrypto = new WebCrypto({
    directory: 'nimiq/keys'
});

class CryptoLib {
    static get instance() {
        return global.webcrypto.subtle;
    }
}
Class.register(CryptoLib);
