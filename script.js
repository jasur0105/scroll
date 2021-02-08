class Scroll {
    constructor(obj) {
        if (typeof obj.el == "string") {
            this.el = document.querySelector(obj.el);
            // console.log(this.el);
        } else if (obj.el instanceof HTMLElement) {
            this.el = obj.el
        }
        // console.dir(this.el);
        this.el.style.position = "fixed"
        this.top = obj.top; //  начальное положение относительно окна браузера
        this.unit = obj.unit;
        window.addEventListener("scroll", () => { this.scroll() })
        window.addEventListener("resize", () => { this.scroll() })
        this.scroll()
    }
    scroll() {
        // pageYOffset - хранит расстояние смещения от верхнего края страницы
        // console.log(window.pageYOffset);
        this.window = this.scrollNumber();
        if (this.window - pageYOffset > 0) {
            this.el.style.top = this.window - pageYOffset + "px";
        } else {
            this.el.style.top = 0;
        }
    }
    scrollNumber() {
        if (this.unit == "px") {
            return this.top >= 0 ? this.top : 0;
        } else if (this.unit == "%" || this.unit == undefined) {
            return this.calc(window.innerHeight, this.top) - this.el.clientHeight
        }
    }
    calc(height, top) {
        return height / 100 * top
    }
}

const myScroll = new Scroll({
    el: ".header__nav",
    top: 100,
})

// случайное перемещение при наведении курсора
class mouseOver {
    constructor(object) {
        this.headerContent = document.querySelector(object.element);
        this.headerContent.addEventListener('mouseover', function () {
            var goX = Math.random() * (window.innerWidth - this.clientWidth);
            var goY = Math.random() * (window.innerHeight - this.clientHeight);
            this.style = `margin-top: ${goY}px; margin-left: ${goX}px;`;
        })
    }
}
const myMouseOver = new mouseOver({
    element: ".header__content"
})

// появление букв поочередно
const text = ['HEADER TITLE'];

let line = 0;
let count = 0;
let result = '';
function typeLine() {
    let interval = setTimeout(() => {
        result += text[line][count]
        document.querySelector('h1').innerHTML = result + '|';
        count++;
        if (count >= text[line].length) {
            count = 0;
            line++;
            if (line == text.length) {
                clearTimeout(interval);
                document.querySelector('h1').innerHTML = result;
                return true;
            }
        }typeLine()
    }, 90);
}
typeLine()

// Боковое меню
function openNav() {
    document.getElementById("status__bar").style.marginLeft = "0";
}

function closeNav() {
    document.getElementById("status__bar").style.marginLeft = "-200px";
}