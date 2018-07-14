function Recovery() {
    var defaultSurnameMapUrl = 'http://s3.amazonaws.com/12XN8SEM7ZEYVXRQQ702-maps-pl/kowalski_kompletny.png';
    const PL_chars = ['ś', 'ń', 'ó', 'ł', 'ę', 'ź', 'ż', 'ć', 'ą'];
    const PL_chars_map = {
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

    const surnameInput = document.querySelector('.surname');
    const findSurnameButton = document.querySelector('.findSurname');
    const surnameMapImg = document.querySelector('.surnameMap');

    this.init = function() {
        this.setupEventListeners();
        // surnameMapImg.src = defaultSurnameMapUrl; // alternative to HTML approach
    }

    this.setupEventListeners = function() {
        var eventHandler = () => {
            // this.sendRequest(surnameInput.value);
            this.updateImg(surnameInput.value);
        };

        findSurnameButton.addEventListener('click', eventHandler);
        surnameInput.addEventListener('keyup', (e) => {
        	if (!e.target.value){
        		findSurnameButton.setAttribute('disabled', 'disabled');	
        	} else {
        		findSurnameButton.removeAttribute('disabled');	
        	}
        	
            e.which = e.which || e.keyCode;
            if (e.which == 13) { // if Enter pressed
                eventHandler();
            }
        });
    }

    this.parseSurnameValue = function(surnameValue) {
        // Alternative, if needed
        // for (let char of PL_chars){
        // 	if (surnameValue.indexOf(char) > -1) {
        // 		surnameValue = surnameValue.replace(char, PL_chars_map[char]);
        // 	}
        // }
        // var finalSurnameValue = surnameValue;

        var finalSurnameValue = escape(encodeURI(surnameValue.toLowerCase()));;
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
        surnameValue.innerText = surnameValueFromInput.toLowerCase();

        const url = defaultSurnameMapUrl.replace(/kowalski/, surname);

        const surnameMapUrlValue = document.querySelector('.surnameMapUrlValue');
        surnameMapUrlValue.innerText = url;

        surnameMapImg.src = url;
    }
}

var recovery = new Recovery();
recovery.init();
