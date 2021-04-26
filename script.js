function sma(arr, range, format) {
    if (!Array.isArray(arr)) {
        throw TypeError("expected first argument to be an array");
    }

    function sum(arr) {
        var len = arr.length;
        var num = 0;
        while (len--) num += Number(arr[len]);
        return num;
    }
    function avg(arr, idx, range) {
        return sum(arr.slice(idx - range, idx)) / range;
    }

    var fn = typeof format === "function" ? format : Math.round;
    var num = range || arr.length;
    var res = Array(Math.round(num / 2)).fill(null);
    var len = arr.length + 1;
    var idx = num - 1;
    while (++idx < len) {
        res.push(fn(avg(arr, idx, num)));
    }
    return res;
}

function f(url, callback) {
    fetch(url)
        .then((response) => {
            if (response.ok) {
                return Promise.resolve(response);
            } else {
                return Promise.reject(new Error(response.statusText));
            }
        })
        .then((response) => {
            return response.json();
        })
        .then(callback)
        .catch((error) => {
            console.log("Request failed", error);
        });
}



let div_container = document.getElementById("container");


f("https://api.wahl.app.5ls.de/", (data) => {
    document.getElementById("spinner").style.display = "None";

    let latest = data.history[0];


    const config = {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [
                {
                    label: '# of Votes',
                    data: [],
                    backgroundColor: [],
                    borderColor: "#fff",
                    borderWidth: 5
                }
            ]
        },
        options: {
            rotation: -90,
            circumference: 180,
        }
    };

    for (const party in data.parties) {
        if (Object.hasOwnProperty.call(data.parties, party)) {
            config.data.labels.push(party)
            config.data.datasets[0].backgroundColor.push(data.parties[party].color)
        }
    }

    for (const party in latest.parties) {
        if (Object.hasOwnProperty.call(latest.parties, party)) {
            config.data.datasets[0].data.push(latest.parties[party])
        }
    }

    var myChart = new Chart(document.getElementById('half_doughnut').getContext('2d'), config);
});
