import { TrieNode, root } from './trie.mjs';

const input = document.getElementById('input');
const result = document.getElementById('result');

const inputHandler = (e) => {
    const word = e.target.value;
    const node = root.findWord(word);
    let outputs = '';
    let queue = [node];

    while (queue.length && outputs.length < 100) {
        let currNode = queue.shift();
        if (currNode.isWord) {
            outputs += currNode.word + '\n';
        }
        console.log(currNode.children);

        for (let key in currNode.children) {
            queue.push(currNode.children[key]);
        }
    }

    result.innerText = outputs;
};

input.addEventListener('input', inputHandler);
input.addEventListener('propertychange', inputHandler);
