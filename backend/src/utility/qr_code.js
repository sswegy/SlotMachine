import qr from "qrcode"
import sha1 from "sha1"

export default async function generateQRCode(credentials) {
    const hash_code = sha1(credentials)
    const qr_code = await qr.toDataURL(hash_code)

    return [qr_code, hash_code];
}