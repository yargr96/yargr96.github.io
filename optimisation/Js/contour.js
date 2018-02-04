function contour() {

    let x_start = parseFloat(document.getElementById("x_start").value);
    let x_end = parseFloat(document.getElementById("x_end").value);
    let x_step = parseFloat(document.getElementById("x_step").value);
    let y_start = parseFloat(document.getElementById("y_start").value);
    let y_end = parseFloat(document.getElementById("y_end").value);
    let y_step = parseFloat(document.getElementById("y_step").value);

    let x_lenght = Math.abs(x_start - x_end) / x_step;
    let y_lenght = Math.abs((y_start - y_end) / y_step);
    var x_arr = new Array();
    var y_arr = new Array();

    var x = x_start;
    var y = y_start;

    for (var i = 0; i < x_lenght; i++) {
        x_arr[i] = x + x_step * i;
    }

    for (var i = 0; i < y_lenght; i++) {
        y_arr[i] = y + y_step * i;
    }

    var matrix = new Array();
    for (var i = 0; i < x_lenght; i++, x += x_step) {
        matrix[i] = new Array();
        for (var j = 0; j < y_lenght; j++, y += y_step) {
            matrix[i][j] = get_func(x, y);
        }
    }


    var data = [{
        z: matrix,
        x: x_arr,
        y: y_arr,
        type: 'contour',
        contours: {
     coloring: 'heatmap',
         showlabels: true,
     labelfont: {
       family: 'Raleway',
       size: 12,
       color: 'white',

     }
   }
    }];

    var layout = {

        autosize: false,
        width: 750,
        height: "autosize",
        margin: {
    l: 65,
    r: 50,
    b: 65,
    t: 90,
},

    }
    Plotly.newPlot('graphic', data, layout);
}

function get_func(x, y) {
    return (x - 1) * Math.cos(3.14 * Math.sqrt(x ** 2 + y ** 2));
}
