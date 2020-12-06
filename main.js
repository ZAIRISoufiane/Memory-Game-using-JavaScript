document.querySelector('.control-buttons span').onclick = function(){

    let yourName = prompt("Whats Your Name ?");

    if (yourName == null || yourName == ""){

        document.querySelector(".name span").innerHTML = 'Unknown';

    } else {

        document.querySelector(".name span").innerHTML = yourName;

    }

    document.querySelector(".control-buttons").remove();
};

let duration = 1000;

let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children);


//let orderRange = [...Array(blocks.length).keys()]; // spread
let orderRange = Array.from(Array(blocks.length).keys());

console.log(orderRange);
shuffle(orderRange);
console.log(orderRange);

// Add Order Css Property To Game Blocks
blocks.forEach((block, index) => { // l'index de chaque block

    block.style.order = orderRange[index];

    block.addEventListener('click', function(){

        flipBlock(block);

    });

});

// Flip Block Function
function flipBlock(selectedBlock){

    selectedBlock.classList.add('is-flipped');

    // Collect All Flipped Card
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    // If Theres Two Selected Blocks
    if(allFlippedBlocks.length === 2){

        // Stop Clicking Function

        stopClicking();

        // Check Matched Block Function
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);

    }

}

// Stop Clicking Function
function stopClicking(){

    blocksContainer.classList.add('no-clicking');

    setTimeout(() => {

        blocksContainer.classList.remove('no-clicking');

    }, duration);

}

// Check Matched Block Function
function checkMatchedBlocks(firstBlock, secondBlock){

    let triesElement = document.querySelector('.tries span');

    if(firstBlock.dataset.technology === secondBlock.dataset.technology) {

        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        document.getElementById('success').play();

    } else {

        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {

        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        }, duration);

        document.getElementById('fail').play();

    }

}

// Shuffle Function
function shuffle(array){

    let current = array.length,
        temp,
        random;
    
    while (current > 0){

        //Get Random Number
        random = Math.floor(Math.random() * current);

        //Decrease Length By One
        current--;

        // [1] Save Current Element In Stash
        temp = array[current];

        // [2] Current Element = Randome Element
        array[current] = array[random];

        // [3] Random Element = Get Element From Stash
        array[random] = temp
    }

    return array;

}