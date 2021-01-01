import { Injectable } from "@nestjs/common";
import { AES, enc } from "crypto-js";
import * as randomstring from 'randomstring';

@Injectable()
export class EncryptionHelper {
    private key = process.env.ENCRYPTION_KEY;

    encrypt(data: any): { data: any } {
        return { data: AES.encrypt(JSON.stringify(data), this.key).toString() };
    }

    decrypt(text: { data }): any {
        let dec = AES.decrypt(text.data, this.key).toString(enc.Utf8);
        return JSON.parse(dec);
    }

    getRandomString = () => randomstring.generate({ charset: 'alphabetic', length: 12 })

}