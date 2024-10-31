const EC = require("elliptic").ec;
const { v1: uuidV1 } = require("uuid");
const ec = new EC("secp256k1");
class chainUtil {
  static genKeyPair() {
    return ec.genKeyPair();
  }
  static id() {
    return uuidV1();
  }
}
module.exports = chainUtil;
