import { words } from './words.mjs';

class TrieNode {
    constructor(word, children = {}, isWord = false) {
        this.word = word;
        this.children = children;
        this.isWord = isWord;
    }

    findWord(word) {
        word = word.toLowerCase();
        let currentNode = this;

        for (let i = 0; i < word.length; i++) {
            let char = word[i];
            if (char in currentNode.children) {
                currentNode = currentNode.children[char];
                continue;
            }
            return null;
        }

        return currentNode.isWord ? currentNode : null;
    }

    insertWord(word) {
        word = word.toLowerCase();
        let currentNode = this;

        for (let i = 0; i < word.length; i++) {
            let char = word[i];

            if (char in currentNode.children) {
                currentNode = currentNode.children[char];
                continue;
            }

            currentNode.children[char] = new TrieNode(word.substring(0, i + 1));
            currentNode = currentNode.children[char];
        }

        currentNode.isWord = true;
    }

    deleteWord(word) {
        word = word.toLowerCase();
        let toDelete = this.findWord(word);
        if (toDelete) toDelete.isWord = false;
    }
}

const root = new TrieNode('', {});

const lines = words;
lines.forEach((line) => {
    root.insertWord(line);
});

export { TrieNode, root };
