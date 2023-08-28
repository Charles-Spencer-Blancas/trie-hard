import { TrieNode, root } from './trie.mjs';

const input = document.getElementById('input');
const result = document.getElementById('result');

const inputHandler = (e) => {
    const word = e.target.value;
    const node = root.findNode(word);

    if (!node) {
        result.innerText = 'No words found';
        input.classList.add('invalid');
        input.classList.remove('valid');
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

    if (node.isWord) {
        input.classList.add('valid');
        input.classList.remove('invalid');
    } else {
        input.classList.add('invalid');
        input.classList.remove('valid');
    }
};

input.addEventListener('input', inputHandler);
input.addEventListener('propertychange', inputHandler);
