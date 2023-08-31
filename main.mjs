import { TrieNode } from './trie.mjs';
import { google10kWords } from './google10k.mjs';

const root = new TrieNode('', {});

const lines = google10kWords;
lines.forEach((line) => {
    root.insertWord(line);
});

const input = document.getElementById('input');
const result = document.getElementById('result');
const notRecognized = document.getElementById('notRecognized');

const validWord = () => {
    input.classList.add('valid');
    input.classList.remove('invalid');
};

const invalidWord = () => {
    input.classList.add('invalid');
    input.classList.remove('valid');
};

const inputHandler = (e) => {
    const word = e.target.value;

    if (word === '') {
        result.innerText = '';
        input.classList.remove('invalid');
        input.classList.remove('valid');
        notRecognized.classList.add('hidden');
        return;
    }

    const node = root.findNode(word);

    if (!node) {
        result.innerText = 'No words found';
        invalidWord();
        return;
    }

    let outputs = '';
    let queue = [node];
    let outputCount = 0;

    while (queue.length && outputCount < 10) {
        let currNode = queue.shift();
        if (currNode.isWord) {
            outputs += currNode.word + '\n';
            outputCount += 1;
        }

        for (let key in currNode.children) {
            queue.push(currNode.children[key]);
        }
    }

    result.innerText = outputs || 'No words found';

    notRecognized.classList.remove('hidden');
    node.isWord ? validWord() : invalidWord();
};

input.addEventListener('input', inputHandler);
input.addEventListener('propertychange', inputHandler);
