/*Predefined data */

// Letters contains the words which are to be placed in the matrix
var letters=[
"OUMBAMRUNOUTFHWNT",
"SZIKQRWHZZTMATITE",
"THERUNSHXILNNHGUA",
"UDWZMQFBYWRPOSNFO",
"MTIYICENJGBOWLING",
"PUGBNAOCRRAXAYEPQ",
"EYBONNPSPPTQWFUJR",
"DLTCICZTPISTGKKCE",
"KQSONZAUVIMSJBFAI",
"LNFQGUYMIPASFAFTE",
"OISQSKSPFHNYZTNCV",
"QHHKASVSYXUHBTHHB",
"HCMXJCXAMIVHOIPSJ",
"SUMPIREWOTVEVNTPH",
"SQHTYSVNOQSYFGJOZ",
"HBOUNDARYAZWRIFYO",
"QSGEDMKSLNOVDEJED",
"TDCJEFIELDERJHDDM",
"YARWXAFYNQSMZHDDV",
"URJLWZGXZWSVFUXAG",
"HSPINTAGVCVISDZUJ",
"VNHUEVFRVAPPEALHE"
];

//Puzzle words are the words which our program will find and strike through, it will also find and highlight words which are not in this array for testing purposes.
var puzzle_words=[
    'BOWLING',
    'STUMPED',
    'FIELDER',
    'BATSMAN',
    'RUNOUT',
    'CATCH',
    'UMPIRE',
    'INNING',
    'APPEAL',
    'BATTING',
    'SPIN',
    'TEA',
    'RUNS',
    'STUMPS',
    'BOUNDARY'
];

// Colors contains colors which we will use to highlight the found words
var colors=[
    "#57f281",
    "#e3f257",
    "#ed745f",
    "#54b9f0",
    "#f246f2"
];

/*Set letters and words when loaded */
window.onload=function(){
    setLetters();
    setWords();
};

/*Set Matrix data*/ 
function setLetters(){
    var mat=document.querySelector('#matrix');
    for(let i=1;i<=22;i++){
        for(let j=1;j<=17;j++){
            const cell= document.createElement("div");
            cell.classList.add("cells");
            cell.innerText=letters[i-1][j-1];
            cell.id=i.toString()+" "+j.toString();
            mat.append(cell);
        }
    }
}

/*Set words in aside section*/
function setWords(){
    var word_div=document.querySelector("#words_div");
    for(let i=0;i<puzzle_words.length;i++){
        const cell= document.createElement("div");
            cell.classList.add("words");
            cell.innerText=puzzle_words[i];
            cell.id=puzzle_words[i];
            word_div.appendChild(cell);
    }
}

/*Take input word from the user*/
function takeInput(){
    let word=document.querySelector("#word").value.toUpperCase();
    console.log(word);
    if(word==undefined || word==null || word==""){
        window.alert("Enter the word in the input field.");
    }else{
        let found=find_word(word);
        if(found.length!=0){
            wordStrikeThrough(word);
            wordHighlighter(found);
        }
        else displayWrong();
    }
}


/*Finding word in the matrix */
function find_word(word){
    let location=[];
    let found=false;
    for(let i=0;i<22;i++){
        for(let j=0;j<17;j++){
            if(checkUp(word,i,j)){
                found=true;
                for(let k=0;k<word.length;k++){
                    let id=(i-k+1).toString()+" "+(j+1).toString();
                    location.push(id);
                }
                break;
            }else if(checkDown(word,i,j)){
                found=true;
                for(let k=0;k<word.length;k++){
                    let id=(i+k+1).toString()+" "+(j+1).toString();
                    location.push(id);
                }
                break;
            }else if(checkLeft(word,i,j)){
                found=true;
                for(let k=0;k<word.length;k++){
                    let id=(i+1).toString()+" "+(j-k+1).toString();
                    location.push(id);
                }
                break;
            }else if(checkRight(word,i,j)){
                found=true;
                for(let k=0;k<word.length;k++){
                    let id=(i+1).toString()+" "+(j+k+1).toString();
                    location.push(id);
                }
                break;
            }else if(checkUpRight(word,i,j)){
                found=true;
                for(let k=0;k<word.length;k++){
                    let id=(i-k+1).toString()+" "+(j+k+1).toString();
                    location.push(id);
                }
                break;
            }else if(checkUpLeft(word,i,j)){
                found=true;
                for(let k=0;k<word.length;k++){
                    let id=(i-k+1).toString()+" "+(j-k+1).toString();
                    location.push(id);
                }
                break;
            }else if(checkDownLeft(word,i,j)){
                found=true;
                for(let k=0;k<word.length;k++){
                    let id=(i+k+1).toString()+" "+(j-k+1).toString();
                    location.push(id);
                }
                break;
            }else if(checkDownRight(word,i,j)){
                found=true;
                for(let k=0;k<word.length;k++){
                    let id=(i+k+1).toString()+" "+(j+k+1).toString();
                    location.push(id);
                }
                break;
            } 
        }
    }
    return location;
}


/*Checking if element exists in all directions of each block */
function checkLeft(word, indexX, indexY){
    for(let i=0;i<word.length;i++){
        let x=indexX;
        let y=indexY-i;
        if(y<0){
            return false;
        }
        if(word[i]!=letters[x][y]){
            return false;
        }
    }
    console.log("Found");
    return true;
}
function checkRight(word, indexX, indexY){
    for(let i=0;i<word.length;i++){
        let x=indexX;
        let y=indexY+i;
        if(y>=17){
            return false;
        }
        console.log(word[i], letters[x][y]);
        if(word[i]!=letters[x][y]){
            return false;
        }
    }
    console.log("Found");
    return true;
}
function checkUp(word, indexX, indexY){
    for(let i=0;i<word.length;i++){
        let x=indexX-i;
        let y=indexY;
        if(x<0){
            return false;
        }
        if(word[i]!=letters[x][y]){
            return false;
        }
    }
    console.log("Found");
    return true;
}
function checkDown(word, indexX, indexY){
    for(let i=0;i<word.length;i++){
        let x=indexX+i;
        let y=indexY;
        if(x>=22){
            return false;
        }
        if(word[i]!=letters[x][y]){
            return false;
        }
    }
    console.log("Found");
    return true;
}
function checkUpLeft(word, indexX, indexY){
    for(let i=0;i<word.length;i++){
        let x=indexX-i;
        let y=indexY-i;
        if(x<0 || y<0){
            return false;
        }
        if(word[i]!=letters[x][y]){
            return false;
        }
    }
    console.log("Found");
    return true;
}
function checkUpRight(word, indexX, indexY){
    for(let i=0;i<word.length;i++){
        let x=indexX-i;
        let y=indexY+i;
        if(x<0 || y>=17){
            return false;
        }
        if(word[i]!=letters[x][y]){
            return false;
        }
    }
    console.log("Found");
    return true;
}
function checkDownRight(word, indexX, indexY){
    for(let i=0;i<word.length;i++){
        let x=indexX+i;
        let y=indexY+i;
        if(x>=22 || y>=17){
            return false;
        }
        if(word[i]!=letters[x][y]){
            return false;
        }
    }
    console.log("Found");
    return true;
}
function checkDownLeft(word, indexX, indexY){
    for(let i=0;i<word.length;i++){
        let x=indexX+i;
        let y=indexY-i;
        if(x>=22 || y<0){
            return false;
        }
        if(word[i]!=letters[x][y]){
            return false;
        }
    }
    console.log("Found");
    return true;
}


/*WordStrikeThrough() It will strikethrough the words which already are found*/
function wordStrikeThrough(word){
    let index=0;
    let found=false;
    for(let i=0;i<puzzle_words.length;i++){
        if(puzzle_words[i]===word){
            index=i;found=true;
        }
    }
    if(found) document.getElementsByClassName("words")[index].classList.add("wordsFound");

}

/*Word Highlighter when the word is found it will highlight those letters*/
function wordHighlighter(locations){
    console.log(locations);
    let color=colors[Math.floor(Math.random()*5)];
    for(let i=1;i<=22;i++){
        for(let j=1;j<=17;j++){
            let id=i.toString()+" "+j.toString();
            locations.forEach(element => {
                if(element==id){
                    document.getElementById(id).style.backgroundColor=color;
                    document.getElementById(id).style.color="#fff";
                }
            });
        }
    }
}

/*=======Display Wrong word message for 3 seconds if not found====== */ 
function displayWrong(){
    const wrong=document.querySelector("#wrong");
    wrong.style.display="flex";
    setTimeout(()=>{
        var wrong=document.querySelector("#wrong");
        wrong.style.display="none";
    }, 3000);
}