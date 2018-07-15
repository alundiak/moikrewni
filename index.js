function MoiKrewniRecovery() {
    const amazonUrl = 'https://s3.amazonaws.com/12XN8SEM7ZEYVXRQQ702-maps-pl/'; // return XML
    const defaultSurnameMapUrl = 'https://s3.amazonaws.com/12XN8SEM7ZEYVXRQQ702-maps-pl/kowalski_kompletny.png';

    // Alternative code. Not really needed right now.
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
    // Alternative code. Not really needed right now.

    const surnameInput = document.querySelector('.surname');
    const findSurnameButton = document.querySelector('.findSurname');
    const surnameMapImg = document.querySelector('.surnameMap');

    this.getAllMapsPlRequest = function() {
        // doesn't work, due to CORS
        // 
        var myHeaders = new Headers({
            "Content-Type": "application/xml"
        });

        var myInit = {
            method: 'GET',
            headers: myHeaders,
            mode: 'cors', // => 403
            // mode: 'no-cors', // => 200
            cache: 'default'
        };

        var myRequest = new Request(amazonUrl, myInit);

        // fetch(amazonUrl)
        fetch(myRequest)
            .then(function(response) {
                return response.text();
            })
            .then(function(myXml) {
                console.log(myXml);
            })
            .catch((error) => {
                //no XML content yet
                console.log('There has been a problem with your fetch operation: ', error.message);
            });;

        // const xmlhttp = new XMLHttpRequest();
        // xmlhttp.open('GET', amazonUrl, false);
        // xmlhttp.send();
        // var xmlDoc = xmlhttp.responseXML;
        // console.log(xmlDoc);
    }

    this.getImageRequest = function(surnameValueFromInput) {
        const surname = this.parseSurnameValue(surnameValueFromInput);
        const url = defaultSurnameMapUrl.replace(/kowalski/, surname);

        fetch(url)
            .then(function(response) {
                return response.blob();
            })
            .then((myBlob) => {
                // doesn't go into this
                const objectURL = URL.createObjectURL(myBlob);
                this.updateImgTag(objectURL);
            }).catch((error) => {
                //even if png file fetched, in Network tab, it's still error here.
                console.log('There has been a problem with your fetch operation: ', error.message);
            });
    }

    this.getImageRequest_2 = function() {
        var myHeaders = new Headers();

        var myInit = {
            method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            // mode: 'no-cors',
            cache: 'default'
        };

        var myRequest = new Request(defaultSurnameMapUrl, myInit);

        fetch(myRequest).then(function(response) {
            return response.blob();
        }).then((myBlob) => {
            var objectURL = URL.createObjectURL(myBlob);
            console.log(objectURL);
            this.updateImgTag(objectURL);
        });
    }

    this.setupEventListeners = function() {
        var eventHandler = () => {
            findSurnameButton.classList.add('is-loading');
            // this.getImageRequest(surnameInput.value); // Causes CORS, from localhost
            // this.getImageRequest_2(surnameInput.value); // Causes CORS, from localhost
            const surname = this.parseSurnameValue(surnameInput.value);
            const url = defaultSurnameMapUrl.replace(/kowalski/, surname);
            this.updateImgTag(url);
            this.updateImageInfo(surname, url);
        };

        findSurnameButton.addEventListener('click', eventHandler);
        surnameInput.addEventListener('keyup', (e) => {
            if (!e.target.value) {
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
        //  if (surnameValue.indexOf(char) > -1) {
        //      surnameValue = surnameValue.replace(char, PL_chars_map[char]);
        //  }
        // }
        // var finalSurnameValue = surnameValue;

        var finalSurnameValue = escape(encodeURI(surnameValue.toLowerCase()));
        return finalSurnameValue;
    }

    this.updateImgTag = function(url) {
        surnameMapImg.src = url;
        surnameMapImg.onload = function() {
            findSurnameButton.classList.remove('is-loading');
        }
    }

    this.updateImageInfo = function(surnameValueFromInput, url) {
        const surnameValue = document.querySelector('.surnameValue');
        surnameValue.innerText = surnameValueFromInput.toLowerCase();

        const surnameMapUrlValue = document.querySelector('.surnameMapUrlValue');
        surnameMapUrlValue.href = url;
        surnameMapUrlValue.innerText = url;
    }

    this.init = function() {
        // fetches URL, which returns XML data about all available images. But doesn't work due to CORS
        // this.getAllMapsPlRequest();

        this.setupEventListeners();

        // surnameMapImg.src = defaultSurnameMapUrl; // alternative to HTML approach
        this.updateImageInfo(surnameInput.value, defaultSurnameMapUrl);
    }
}

var moikrewni = new MoiKrewniRecovery();
moikrewni.init();
