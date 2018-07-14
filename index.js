function Recovery() {
    var defaultSurnameMapUrl = 'http://s3.amazonaws.com/12XN8SEM7ZEYVXRQQ702-maps-pl/kowalski_kompletny.png';
    const PL = {
        'ś': '%25C5%259B',
        'ń': '%25C5%2584',
        'ó': '%25C3%25B3',
        'ł': '%25C5%2582',
        'ę': '%25C4%2599',
        'ź': '%25C5%25BA',
        'ż': '%25C5%25BC',
        'ć': '%25C4%2587',
        'ą': '%25C4%2585'
    };

    const surnameMapImg = document.querySelector('.surnameMap');

    this.init = function() {
        // tbd
        this.setupEventListeners();
        // surnameMapImg.src = defaultSurnameMapUrl;
    }

    this.setupEventListeners = function() {
        let surnameEl = document.querySelector('.surname');
        // surnameEl.addEventListener('change', (e) => {
        //     console.log(e);
        // });

        let findSurnameEl = document.querySelector('.findSurname');
        var eventHandler = () => {
            console.log(surnameEl.value);
            // this.sendRequest(surname.value);
            this.updateImg(surnameEl.value);
        };

        findSurnameEl.addEventListener('click', eventHandler);
        surnameEl.addEventListener('keyup', (e) => {
            e.which = e.which || e.keyCode;
            if (e.which == 13) {
                eventHandler();
            }
        });
    }

    this.parseSurnameValue = function(surnameValue) {
        var finalSurnameValue = surnameValue;
        // TBD, PL
        return finalSurnameValue;
    }

    this.sendRequest = function(surnameValueFromInput) {
        const surname = this.parseSurnameValue(surnameValueFromInput);
        const url = defaultSurnameMapUrl.replace(/kowalski/, surname);

        fetch(url).then(function(a, b) {
            console.log(a, b);
        });
    }

    this.updateImg = function(surnameValueFromInput) {
        const surname = this.parseSurnameValue(surnameValueFromInput);

        const surnameValue = document.querySelector('.surnameValue');
        surnameValue.innerText = surname;

        const url = defaultSurnameMapUrl.replace(/kowalski/, surname);

        const surnameMapUrlValue = document.querySelector('.surnameMapUrlValue');
        surnameMapUrlValue.innerText = url;

        surnameMapImg.src = url;
    }
}

var recovery = new Recovery();
recovery.init();
