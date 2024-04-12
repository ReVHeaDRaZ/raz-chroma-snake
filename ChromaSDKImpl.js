// JavaScript source code

function ChromaSDK() {
    var uri;
    var timerId;
}

function onTimer() {
    var request = new XMLHttpRequest();

    request.open("PUT", uri + "/heartbeat", true);

    request.setRequestHeader("content-type", "application/json");

    request.send(null);

    request.onreadystatechange = function () {
        if ((request.readyState == 4) && (request.status == 200)){
            console.log(request.responseText);
        }
    }
}

ChromaSDK.prototype = {
    init: function () {
        var request = new XMLHttpRequest();

        request.open("POST", "http://localhost:54235/razer/chromasdk", true);

        request.setRequestHeader("content-type", "application/json");

        var data = JSON.stringify({
            "title": "RaZ's Razer Chroma Web App",
            "description": "Razer Chroma SDK Particles Application",
            "author": {
                "name": "RaZStuff",
                "contact": "www.razstuff.com"
            },
            "device_supported": [
                "keyboard",
                "mouse",
                "headset",
                "mousepad",
                "keypad",
                "chromalink"],
            "category": "application"
        });

        request.send(data);

        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                uri = JSON.parse(request.responseText)["uri"];
                console.log(uri);
                timerId = setInterval(onTimer, 10000);
            }
        }
    },
    uninit: function () {
        var request = new XMLHttpRequest();

        request.open("DELETE", uri, true);

        request.setRequestHeader("content-type", "application/json");

        request.send(null);

        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                console.log(request.responseText);
            }
        }

        clearInterval(timerId);
    },
    createKeyboardEffect: function (effect, data) {
        var jsonObj;

        if (effect == "CHROMA_NONE") {
            jsonObj = JSON.stringify({ "effect": effect });
        } else if (effect == "CHROMA_CUSTOM") {
            jsonObj = JSON.stringify({ "effect": effect, "param": data });
        } else if (effect == "CHROMA_STATIC") {
            var color = { "color": data };
            jsonObj = JSON.stringify({ "effect": effect, "param": color });
        } else if (effect == "CHROMA_CUSTOM_KEY") {
            jsonObj = JSON.stringify({ "effect": effect, "param": data });
        }

        var request = new XMLHttpRequest();

        request.open("PUT", uri + "/keyboard", false);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);

    },
    preCreateKeyboardEffect: function (effect, data) {
        var jsonObj;

        if (effect == "CHROMA_NONE") {
            jsonObj = JSON.stringify({ "effect": effect });
        } else if (effect == "CHROMA_CUSTOM") {
            jsonObj = JSON.stringify({ "effect": effect, "param": data });
        } else if (effect == "CHROMA_STATIC") {
            var color = { "color": data };
            jsonObj = JSON.stringify({ "effect": effect, "param": color });
        } else if (effect == "CHROMA_CUSTOM_KEY") {
            jsonObj = JSON.stringify({ "effect": effect, "param": data });
        }

        var request = new XMLHttpRequest();

        request.open("POST", uri + "/keyboard", false);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);

        return JSON.parse(request.responseText)['id'];
    },
    createMousematEffect: function (effect, data) {
        var jsonObj;

        if (effect == "CHROMA_NONE") {
            jsonObj = JSON.stringify({ "effect": effect });
        } else if (effect == "CHROMA_CUSTOM") {
            jsonObj = JSON.stringify({ "effect": effect, "param": data });
        } else if (effect == "CHROMA_STATIC") {
            var color = { "color": data };
            jsonObj = JSON.stringify({ "effect": effect, "param": color });
        }

        var request = new XMLHttpRequest();

        request.open("PUT", uri + "/mousepad", false);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);
    },
    preCreateMousematEffect: function (effect, data) {
        var jsonObj;

        if (effect == "CHROMA_NONE") {
            jsonObj = JSON.stringify({ "effect": effect });
        } else if (effect == "CHROMA_CUSTOM") {
            jsonObj = JSON.stringify({ "effect": effect, "param": data });
        } else if (effect == "CHROMA_STATIC") {
            var color = { "color": data };
            jsonObj = JSON.stringify({ "effect": effect, "param": color });
        }

        var request = new XMLHttpRequest();

        request.open("POST", uri + "/mousepad", false);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);

        return JSON.parse(request.responseText)['id'];
    },
    createMouseEffect: function (effect, data) {
        var jsonObj;

        if (effect == "CHROMA_NONE") {
            jsonObj = JSON.stringify({ "effect": effect });
        } else if (effect == "CHROMA_CUSTOM2") {
            jsonObj = JSON.stringify({ "effect": effect, "param": data });
        } else if (effect == "CHROMA_STATIC") {
            var color = { "color": data };
            jsonObj = JSON.stringify({ "effect": effect, "param": color });
        }

        var request = new XMLHttpRequest();

        request.open("PUT", uri + "/mouse", false);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);
    },
    preCreateMouseEffect: function (effect, data) {
        var jsonObj;

        if (effect == "CHROMA_NONE") {
            jsonObj = JSON.stringify({ "effect": effect });
        } else if (effect == "CHROMA_CUSTOM2") {
            jsonObj = JSON.stringify({ "effect": effect, "param": data });
        } else if (effect == "CHROMA_STATIC") {
            var color = { "color": data };
            jsonObj = JSON.stringify({ "effect": effect, "param": color });
        }

        var request = new XMLHttpRequest();

        request.open("POST", uri + "/mouse", false);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);

        return JSON.parse(request.responseText)['id'];
    },
    createHeadsetEffect: function (effect, data) {
        var jsonObj;

        if (effect == "CHROMA_NONE") {
            jsonObj = JSON.stringify({ "effect": effect });
        } else if (effect == "CHROMA_CUSTOM") {
            jsonObj = JSON.stringify({ "effect": effect, "param": data });
        } else if (effect == "CHROMA_STATIC") {
            var color = { "color": data };
            jsonObj = JSON.stringify({ "effect": effect, "param": color });
        }

        var request = new XMLHttpRequest();

        request.open("PUT", uri + "/headset", false);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);
    },
    preCreateHeadsetEffect: function (effect, data) {
        var jsonObj;

        if (effect == "CHROMA_NONE") {
            jsonObj = JSON.stringify({ "effect": effect });
        } else if (effect == "CHROMA_CUSTOM") {
            jsonObj = JSON.stringify({ "effect": effect, "param": data });
        } else if (effect == "CHROMA_STATIC") {
            var color = { "color": data };
            jsonObj = JSON.stringify({ "effect": effect, "param": color });
        }

        var request = new XMLHttpRequest();

        request.open("POST", uri + "/headset", false);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);

        return JSON.parse(request.responseText)['id'];
    },
    createKeypadEffect: function (effect, data) {
        var jsonObj;

        if (effect == "CHROMA_NONE") {
            jsonObj = JSON.stringify({ "effect": effect });
        } else if (effect == "CHROMA_CUSTOM") {
            jsonObj = JSON.stringify({ "effect": effect, "param": data });
        } else if (effect == "CHROMA_STATIC") {
            var color = { "color": data };
            jsonObj = JSON.stringify({ "effect": effect, "param": color });
        }

        var request = new XMLHttpRequest();

        request.open("PUT", uri + "/keypad", false);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);
    },
    preCreateKeypadEffect: function (effect, data) {
        var jsonObj;

        if (effect == "CHROMA_NONE") {
            jsonObj = JSON.stringify({ "effect": effect });
        } else if (effect == "CHROMA_CUSTOM") {
            jsonObj = JSON.stringify({ "effect": effect, "param": data });
        } else if (effect == "CHROMA_STATIC") {
            var color = { "color": data };
            jsonObj = JSON.stringify({ "effect": effect, "param": color });
        }

        var request = new XMLHttpRequest();

        request.open("POST", uri + "/keypad", false);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);

        return JSON.parse(request.responseText)['id'];
    },
    createChromaLinkEffect: function (effect, data) {
        var jsonObj;

        if (effect == "CHROMA_NONE") {
            jsonObj = JSON.stringify({ "effect": effect });
        } else if (effect == "CHROMA_CUSTOM") {
            jsonObj = JSON.stringify({ "effect": effect, "param": data });
        } else if (effect == "CHROMA_STATIC") {
            var color = { "color": data };
            jsonObj = JSON.stringify({ "effect": effect, "param": color });
        }

        var request = new XMLHttpRequest();

        request.open("PUT", uri + "/chromalink", false);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);
    },
    preCreateChromaLinkEffect: function (effect, data) {
        var jsonObj;

        if (effect == "CHROMA_NONE") {
            jsonObj = JSON.stringify({ "effect": effect });
        } else if (effect == "CHROMA_CUSTOM") {
            jsonObj = JSON.stringify({ "effect": effect, "param": data });
        } else if (effect == "CHROMA_STATIC") {
            var color = { "color": data };
            jsonObj = JSON.stringify({ "effect": effect, "param": color });
        }

        var request = new XMLHttpRequest();

        request.open("POST", uri + "/chromalink", false);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);

        return JSON.parse(request.responseText)['id'];
    },
    setEffect: function (id) {
        var jsonObj = JSON.stringify({ "id": id });

        var request = new XMLHttpRequest();

        request.open("PUT", uri + "/effect", false);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);
    },
    deleteEffect: function (id) {
        var jsonObj = JSON.stringify({ "id": id });

        var request = new XMLHttpRequest();

        request.open("DELETE", uri + "/effect", false);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);
    },
    deleteEffectGroup: function (ids) {
        var jsonObj = ids;

        var request = new XMLHttpRequest();

        request.open("DELETE", uri + "/effect", false);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);
    },
    
}