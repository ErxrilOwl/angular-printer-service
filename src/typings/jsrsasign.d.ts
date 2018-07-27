interface RSAPublicKey
{
	n_hex: string;
	e_hex: string;
}

declare class RSAKey
{
	constructor();

	setPublic(n: string, e: string): void;
	encrypt(text: string): string;
	encrypt_b64(text: string): string;

	setPrivate(n: string, e: string, d: string): void;
	setPrivateEx(n: string, e: string, d: string, p: string, q: string, dp: string, dq: string, c: string);
	generate(b: number, e: string);
	decrypt(ctext: string);
	b64_decrypt(ctext: string);

	getPublic(): RSAPublicKey;
}

declare module KJUR
{
	module crypto
	{
		/**
		 * Signature class which is very similar to java.security.Signature class
		 * @name KJUR.crypto.Signature
		 * @class Signature class which is very similar to java.security.Signature class
		 * @param {Array} params parameters for constructor
		 * @property {String} state Current state of this signature object whether 'SIGN', 'VERIFY' or null
		 * @description
		 * <br/>
		 * As for params of constructor's argument, it can be specify following attributes:
		 * <ul>
		 * <li>alg - signature algorithm name (ex. {MD5,SHA1,SHA224,SHA256,SHA384,SHA512,RIPEMD160}with{RSA,ECDSA,DSA})</li>
		 * <li>provider - currently 'cryptojs/jsrsa' only</li>
		 * </ul>
		 * <h4>SUPPORTED ALGORITHMS AND PROVIDERS</h4>
		 * This Signature class supports following signature algorithm and provider names:
		 * <ul>
		 * <li>MD5withRSA - cryptojs/jsrsa</li>
		 * <li>SHA1withRSA - cryptojs/jsrsa</li>
		 * <li>SHA224withRSA - cryptojs/jsrsa</li>
		 * <li>SHA256withRSA - cryptojs/jsrsa</li>
		 * <li>SHA384withRSA - cryptojs/jsrsa</li>
		 * <li>SHA512withRSA - cryptojs/jsrsa</li>
		 * <li>RIPEMD160withRSA - cryptojs/jsrsa</li>
		 * <li>MD5withECDSA - cryptojs/jsrsa</li>
		 * <li>SHA1withECDSA - cryptojs/jsrsa</li>
		 * <li>SHA224withECDSA - cryptojs/jsrsa</li>
		 * <li>SHA256withECDSA - cryptojs/jsrsa</li>
		 * <li>SHA384withECDSA - cryptojs/jsrsa</li>
		 * <li>SHA512withECDSA - cryptojs/jsrsa</li>
		 * <li>RIPEMD160withECDSA - cryptojs/jsrsa</li>
		 * <li>MD5withRSAandMGF1 - cryptojs/jsrsa</li>
		 * <li>SHA1withRSAandMGF1 - cryptojs/jsrsa</li>
		 * <li>SHA224withRSAandMGF1 - cryptojs/jsrsa</li>
		 * <li>SHA256withRSAandMGF1 - cryptojs/jsrsa</li>
		 * <li>SHA384withRSAandMGF1 - cryptojs/jsrsa</li>
		 * <li>SHA512withRSAandMGF1 - cryptojs/jsrsa</li>
		 * <li>RIPEMD160withRSAandMGF1 - cryptojs/jsrsa</li>
		 * <li>SHA1withDSA - cryptojs/jsrsa</li>
		 * <li>SHA224withDSA - cryptojs/jsrsa</li>
		 * <li>SHA256withDSA - cryptojs/jsrsa</li>
		 * </ul>
		 * Here are supported elliptic cryptographic curve names and their aliases for ECDSA:
		 * <ul>
		 * <li>secp256k1</li>
		 * <li>secp256r1, NIST P-256, P-256, prime256v1</li>
		 * <li>secp384r1, NIST P-384, P-384</li>
		 * </ul>
		 * NOTE1: DSA signing algorithm is also supported since crypto 1.1.5.
		 * <h4>EXAMPLES</h4>
		 * @example
		 * // RSA signature generation
		 * var sig = new KJUR.crypto.Signature({"alg": "SHA1withRSA"});
		 * sig.init(prvKeyPEM);
		 * sig.updateString('aaa');
		 * var hSigVal = sig.sign();
		 *
		 * // DSA signature validation
		 * var sig2 = new KJUR.crypto.Signature({"alg": "SHA1withDSA"});
		 * sig2.init(certPEM);
		 * sig.updateString('aaa');
		 * var isValid = sig2.verify(hSigVal);
		 * 
		 * // ECDSA signing
		 * var sig = new KJUR.crypto.Signature({'alg':'SHA1withECDSA'});
		 * sig.init(prvKeyPEM);
		 * sig.updateString('aaa');
		 * var sigValueHex = sig.sign();
		 *
		 * // ECDSA verifying
		 * var sig2 = new KJUR.crypto.Signature({'alg':'SHA1withECDSA'});
		 * sig.init(certPEM);
		 * sig.updateString('aaa');
		 * var isValid = sig.verify(sigValueHex);
		 */
		class Signature
		{
			constructor(param: { alg: string; prov: string });
			/**
			 * Initialize this object for signing or verifying depends on key
			 * @name init
			 * @memberOf KJUR.crypto.Signature
			 * @function
			 * @param {Object} key specifying public or private key as plain/encrypted PKCS#5/8 PEM file, certificate PEM or {@link RSAKey}, {@link KJUR.crypto.DSA} or {@link KJUR.crypto.ECDSA} object
			 * @param {String} pass (OPTION) passcode for encrypted private key
			 * @since crypto 1.1.3
			 * @description
			 * This method is very useful initialize method for Signature class since
			 * you just specify key then this method will automatically initialize it
			 * using {@link KEYUTIL.getKey} method.
			 * As for 'key',  following argument type are supported:
			 * <h5>signing</h5>
			 * <ul>
			 * <li>PEM formatted PKCS#8 encrypted RSA/ECDSA private key concluding "BEGIN ENCRYPTED PRIVATE KEY"</li>
			 * <li>PEM formatted PKCS#5 encrypted RSA/DSA private key concluding "BEGIN RSA/DSA PRIVATE KEY" and ",ENCRYPTED"</li>
			 * <li>PEM formatted PKCS#8 plain RSA/ECDSA private key concluding "BEGIN PRIVATE KEY"</li>
			 * <li>PEM formatted PKCS#5 plain RSA/DSA private key concluding "BEGIN RSA/DSA PRIVATE KEY" without ",ENCRYPTED"</li>
			 * <li>RSAKey object of private key</li>
			 * <li>KJUR.crypto.ECDSA object of private key</li>
			 * <li>KJUR.crypto.DSA object of private key</li>
			 * </ul>
			 * <h5>verification</h5>
			 * <ul>
			 * <li>PEM formatted PKCS#8 RSA/EC/DSA public key concluding "BEGIN PUBLIC KEY"</li>
			 * <li>PEM formatted X.509 certificate with RSA/EC/DSA public key concluding
			 *     "BEGIN CERTIFICATE", "BEGIN X509 CERTIFICATE" or "BEGIN TRUSTED CERTIFICATE".</li>
			 * <li>RSAKey object of public key</li>
			 * <li>KJUR.crypto.ECDSA object of public key</li>
			 * <li>KJUR.crypto.DSA object of public key</li>
			 * </ul>
			 * @example
			 * sig.init(sCertPEM)
			 */
			init(key: string, pass: string): void;
			/**
			 * Initialize this object for verifying with a public key
			 * @name initVerifyByPublicKey
			 * @memberOf KJUR.crypto.Signature
			 * @function
			 * @param {Object} param RSAKey object of public key or associative array for ECDSA
			 * @since 1.0.2
			 * @deprecated from crypto 1.1.5. please use init() method instead.
			 * @description
			 * Public key information will be provided as 'param' parameter and the value will be
			 * following:
			 * <ul>
			 * <li>{@link RSAKey} object for RSA verification</li>
			 * <li>associative array for ECDSA verification
			 *     (ex. <code>{'ecpubhex': '041f..', 'eccurvename': 'secp256r1'}</code>)
			 * </li>
			 * </ul>
			 * @example
			 * sig.initVerifyByPublicKey(rsaPrvKey)
			 */
			initVerifyByPublicKey(rsaPubKey: RSAKey): void;
			/**
			 * Initialize this object for verifying with a certficate
			 * @name initVerifyByCertificatePEM
			 * @memberOf KJUR.crypto.Signature
			 * @function
			 * @param {String} certPEM PEM formatted string of certificate
			 * @since 1.0.2
			 * @deprecated from crypto 1.1.5. please use init() method instead.
			 * @description
			 * @example
			 * sig.initVerifyByCertificatePEM(certPEM)
			 */
			initVerifyByCertificatePEM(certPEM: string): void;
			/**
			 * Initialize this object for signing
			 * @name initSign
			 * @memberOf KJUR.crypto.Signature
			 * @function
			 * @param {Object} param RSAKey object of public key or associative array for ECDSA
			 * @deprecated from crypto 1.1.5. please use init() method instead.
			 * @description
			 * Private key information will be provided as 'param' parameter and the value will be
			 * following:
			 * <ul>
			 * <li>{@link RSAKey} object for RSA signing</li>
			 * <li>associative array for ECDSA signing
			 *     (ex. <code>{'ecprvhex': '1d3f..', 'eccurvename': 'secp256r1'}</code>)</li>
			 * </ul>
			 * @example
			 * sig.initSign(prvKey)
			 */
			initSign(prvKey: RSAKey): void;
			/**
			 * Updates the data to be signed or verified by a string
			 * @name updateString
			 * @memberOf KJUR.crypto.Signature
			 * @function
			 * @param {String} str string to use for the update
			 * @description
			 * @example
			 * sig.updateString('aaa')
			 */
			updateString(str: string): void;
			/**
			 * Updates the data to be signed or verified by a hexadecimal string
			 * @name updateHex
			 * @memberOf KJUR.crypto.Signature
			 * @function
			 * @param {String} hex hexadecimal string to use for the update
			 * @description
			 * @example
			 * sig.updateHex('1f2f3f')
			 */
			updateHex(hex: string): void;
			/**
			 * Returns the signature bytes of all data updates as a hexadecimal string
			 * @name sign
			 * @memberOf KJUR.crypto.Signature
			 * @function
			 * @return the signature bytes as a hexadecimal string
			 * @description
			 * @example
			 * var hSigValue = sig.sign()
			 */
			sign(): string;
			/**
			 * performs final update on the sign using string, then returns the signature bytes of all data updates as a hexadecimal string
			 * @name signString
			 * @memberOf KJUR.crypto.Signature
			 * @function
			 * @param {String} str string to final update
			 * @return the signature bytes of a hexadecimal string
			 * @description
			 * @example
			 * var hSigValue = sig.signString('aaa')
			 */
			signString(str: string): string;
			/**
			 * performs final update on the sign using hexadecimal string, then returns the signature bytes of all data updates as a hexadecimal string
			 * @name signHex
			 * @memberOf KJUR.crypto.Signature
			 * @function
			 * @param {String} hex hexadecimal string to final update
			 * @return the signature bytes of a hexadecimal string
			 * @description
			 * @example
			 * var hSigValue = sig.signHex('1fdc33')
			 */
			signHex(hex: string): string;
			/**
			 * verifies the passed-in signature.
			 * @name verify
			 * @memberOf KJUR.crypto.Signature
			 * @function
			 * @param {String} str string to final update
			 * @return {Boolean} true if the signature was verified, otherwise false
			 * @description
			 * @example
			 * var isValid = sig.verify('1fbcefdca4823a7(snip)')
			 */
			verify(hSigVal: string): boolean;
		}
	}
}