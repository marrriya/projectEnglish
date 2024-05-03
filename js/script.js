let count = 0;
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
function Correct(first, second){
    first = first.getBoundingClientRect();
    second = second.getBoundingClientRect();
    return !(((second.top + 50) < (first.top)) || (second.top > (first.top + 50)) || ((second.left + 50) < first.left) || (second.left > (first.left + 50)));

}
function MousePuzzles(e){
    m = e.target

    if (m.classList.contains("ok")){
        return;
    }


    let coordinates = m.getBoundingClientRect();
    let coordx = e.pageX - coordinates.left;
    let coordy = e.pageY - coordinates.top;
    
    m.style.position = 'absolute';
    function Mooving(e){
        m.style.left = (e.pageX - coordx) + 'px';
       m.style.top = (e.pageY - coordy) + 'px';
    }

    
    Mooving(e);
    m.style.zIndex = 100;

    document.onmousemove = function (e){
        Mooving(e);
    };


   m.onmouseup = function (){
        document.onmousemove = null;
        m.onmouseup = null;
        m.style.zIndex = 500;
        t = document.querySelector("td[data-number='" + m.dataset.number + "']");
        side = document.querySelector("#side");
        
        if (Correct(m, t)){
            m.style.left = t.getBoundingClientRect().left + 'px';
            m.style.top = t.getBoundingClientRect().top + 'px';
            m.classList.add("ok");
            count++;
            if (count >= 54){
                alert("Сongratulations!")
            }

        }
        else{
            let box = m.getBoundingClientRect();
            if ((box.top <0)||(box.left<0)||(box.top + 50 > document.documentElement.clientHeight) || (box.left + 50 > document.documentElement.clientWidth / 2)){
                m.style.left = m.dataset.prevLeft + 'px';
                m.style.top = m.dataset.prevTop + 'px';
            }
        
        }

        
    m.ondragstart = function(){
        return false;
    }
    }




}

function Main(){
    let number = 0;
    for (let i=0; i<6; i++){
        let str = document.querySelector("table").insertRow(i);
        for (let j=0; j<9; j++){
            let cell = str.insertCell(j);
            number = i*9+j;
            cell.dataset.number = number;
            let puzzle = '<div class="puzzle" data-number="' + number + '"></div>';
            document.querySelector(".puzzles").insertAdjacentHTML('beforeend', puzzle);

            let block = document.querySelector('.puzzles').querySelector('div[data-number="' + number + '"]');

            block.style.backgroundPosition = j * -50 + "px " + i * -50 + "px"


            block.style.left  = (getRandomNumber(10, document.documentElement.clientWidth /2 - 60)) + 'px';
            block.style.top = (getRandomNumber(10, document.documentElement.clientHeight - 60)) + 'px';
            
            block.addEventListener("mousedown", MousePuzzles);
            block.dataset.prevLeft = block.getBoundingClientRect().left;
            block.dataset.prevTop = block.getBoundingClientRect().top;

        }
    }
}


Main();