import crypto from "crypto";

const generateVarificationCode = () => {
    const code = crypto.randomInt(0, 1000000);
    return code.toString().padStart(6, '0');
}

export default generateVarificationCode;