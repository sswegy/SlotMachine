import qr from "qrcode"
import sha1 from "sha1"

export default async function generateQRCode(credentials) {
    const hashString = sha1(credentials)
    const QRCode = await qr.toDataURL(hashString)

    return QRCode;
}