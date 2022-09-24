export function generateUID(digits) {
    let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ';
    let uid = [];
    for (let i = 0; i < digits; i++) {
        uid.push(str[Math.floor(Math.random() * str.length)]);
    }
    return uid.join('');
}