function checkBody (body, keys) {
    let isValid = true;
    for (const e of keys) {
        if (!body[e] || body[e] === "") {
            isValid = false;
        }
    }
    return isValid;
}

module.exports = {checkBody};