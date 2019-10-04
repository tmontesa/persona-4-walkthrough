function substringBetweenChars(str, char1, char2) {
    return str.split(char1).pop().split(char2)[0];
}