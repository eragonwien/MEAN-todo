

class Helper {
    addKeyValueLine(text, key, value) {
        text += key + '=' + value + '\n';
        return text;
    }
}

module.exports = Helper;