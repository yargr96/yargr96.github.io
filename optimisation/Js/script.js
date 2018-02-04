
//main func search
function Search()
{
    var result = new Array();
    var type_of_extr = document.getElementById("type_extr").value;
    var func = document.getElementById("type_func").value;
    var cr = document.getElementById("type_cr").value;
    var val = document.getElementById("value_of_kr").value;
    switch(func)
    {
        case "Global": result = get_matrix();
        document.getElementById("result").innerHTML = ToDiv(result);
        break;
        case "Search":
        {
            switch(cr)
            {
                case "Steps": result = get_extr_with_num_of_max_steps();
                document.getElementById("result").innerHTML = ToDiv3(result);
                break;
                case "Eps": result = get_extr_with_eps();
                document.getElementById("result").innerHTML = ToDiv3(result);
                break;

            }
            break;
        }
        break;
        case "Divide":
            switch(cr)
            {
                case "Steps": result = get_extr_with_divide_step_max_step();
                document.getElementById("result").innerHTML = ToDiv3(result);
                break;
                case "Eps": result = get_extr_with_divide_step_eps();
                document.getElementById("result").innerHTML = ToDiv3(result);
                break;
            }
            break;

        case "Ex":
        {
            switch(cr)
            {
                case "Steps": result = get_extr_with_steepest_descent_max();
                document.getElementById("result").innerHTML = ToDiv3(result);
                break;
                case "Eps": result = get_extr_with_steepest_descent_eps();
                document.getElementById("result").innerHTML = ToDiv3(result);
                break;
            }
            break;
        break;
        }

}

}

function ToDiv(array)
{
    return "Result: <br> Extremum : " +  array[0].toFixed(3);
}
function ToDiv3(array)
{
    return "Result: <br> Extremum : " +  array[0].toFixed(3) + "<br>" + "Point : " +  array[1].toFixed(2) + " : " + array[2].toFixed(2);
}
//-----------------------------------------------------------------

//get full of value array[][]
function get_matrix() {
    var result = new Array(2);
    let x_start = parseFloat(document.getElementById("x_start").value);
    let x_end = parseFloat(document.getElementById("x_end").value);
    let x_step = parseFloat(document.getElementById("x_step").value);
    let y_start = parseFloat(document.getElementById("y_start").value);
    let y_end = parseFloat(document.getElementById("y_end").value);
    let y_step = parseFloat(document.getElementById("y_step").value);

    let x_lenght = Math.abs(x_start - x_end) / x_step;
    let y_lenght = Math.abs((y_start - y_end) / y_step);

    var x = x_start;
    var y = y_start;

    var matrix = new Array();
    for (var i = 0; i < x_lenght; i++, x += x_step) {
        matrix[i] = new Array();
        for (var j = 0; j < y_lenght; j++, y += y_step) {
            matrix[i][j] = get_func(x, y);
        }
    }
    result[0] = get_maximum(matrix, x_lenght, y_lenght);
    result[1] = get_minimum(matrix, x_lenght, y_lenght);
    return result;
}

//get global maximum in array[][]
function get_maximum(matrix, x_lenght, y_lenght) {
    var max = -Infinity;
    for (let i = 0; i < x_lenght; i++) {
        for (let j = 1; j < y_lenght; j++) {
            if (max < matrix[i][j]) {
                max = matrix[i][j];
            }
        }
    }
    return max;
}

//get global minimum in array[][]
function get_minimum(matrix, x_lenght, y_lenght) {
    var min = Infinity;
    for (let i = 0; i < x_lenght; i++) {
        for (let j = 1; j < y_lenght; j++) {
            if (min > matrix[i][j]) {
                min = matrix[i][j];
            }
        }
    }
    return min;
}
//------------------------------------------------------------------
//search extr with max steps
function get_extr_with_num_of_max_steps() {
    var x_point = parseFloat(document.getElementById("x_point").value);
    var y_point = parseFloat(document.getElementById("y_point").value);
    let step = parseFloat(document.getElementById("step").value);
    let max_step = parseInt(document.getElementById("value_of_kr").value);

    var current_value_of_function;
    var result = new Array();
    // true - maximum, false - minimum
    let type_of_extemum = (document.getElementById("type_extr").value == "Maximum")? 1: 0;
    //checker - went on x or y coordinate
    var num_step = 0;

    do {
        if (num_step % 2 == 0) {
            result = step_on_x_coordinate(x_point, y_point, step, type_of_extemum);
            current_value_of_function = result[0];
            x_point = result[1];
            y_point = result[2];
        } else {
            result = step_on_y_coordinate(x_point, y_point, step, type_of_extemum);
            current_value_of_function = result[0];
            x_point = result[1];
            y_point = result[2];
        }
        num_step++;
        max_step--;
    } while (max_step > 0);

    result.push(current_value_of_function);
    result.push(x_point);
    result.push(y_point);
    return result;

}

//search extr with min eps
function get_extr_with_eps() {
    var x_point = parseFloat(document.getElementById("x_point").value);
    var y_point = parseFloat(document.getElementById("y_point").value);
    let step = parseFloat(document.getElementById("step").value);
    let eps =  parseFloat(document.getElementById("value_of_kr").value);

    var current_value_of_function;
    var last_value_of_function;
    var result = new Array();
    // true - maximum, false - minimum
    let type_of_extemum = 1;
    //checker - went on x or y coordinate
    var num_step = 0;

    do {
        if (num_step % 2 == 0) {
            last_value_of_function = current_value_of_function;
            result = step_on_x_coordinate(x_point, y_point, step, type_of_extemum);
            current_value_of_function = result[0];
            x_point = result[1];
            y_point = result[2];
        } else {
            last_value_of_function = current_value_of_function;
            result = step_on_y_coordinate(x_point, y_point, step, type_of_extemum);
            current_value_of_function = result[0];
            x_point = result[1];
            y_point = result[2];
        }
        num_step++;
    } while (Math.abs(current_value_of_function - last_value_of_function) < eps);

    result.push(current_value_of_function);
    result.push(x_point);
    result.push(y_point);
    return result;
}

//search extr with division of a step in half
function get_extr_with_divide_step_max_step() {
    var x_point = parseFloat(document.getElementById("x_point").value);
    var y_point = parseFloat(document.getElementById("y_point").value);
    let step = parseFloat(document.getElementById("step").value);
    let max_step = parseInt(document.getElementById("value_of_kr").value);

    var current_value_of_function;
    var result = new Array();
    // true - maximum, false - minimum
    let type_of_extemum = 1;
    //checker - went on x or y coordinate
    var num_step = 0;

    do {
        if (num_step % 2 == 0) {
            result = step_on_x_coordinate(x_point, y_point, step, type_of_extemum);
            current_value_of_function = result[0];
            x_point = result[1];
            y_point = result[2];
        } else {
            result = step_on_y_coordinate(x_point, y_point, step, type_of_extemum);
            current_value_of_function = result[0];
            x_point = result[1];
            y_point = result[2];
        }
        num_step++;
        step /= 2;
        max_step--;
    } while (max_step > 0);

    result.push(current_value_of_function);
    result.push(x_point);
    result.push(y_point);
    return result;
}

function get_extr_with_divide_step_eps() {
    var x_point = parseFloat(document.getElementById("x_point").value);
    var y_point = parseFloat(document.getElementById("y_point").value);
    let step = parseFloat(document.getElementById("step").value);
    let eps = parseFloat(document.getElementById("value_of_kr").value);

    var current_value_of_function;
    var result = new Array();
    // true - maximum, false - minimum
    let type_of_extemum = 1;
    //checker - went on x or y coordinate
    var num_step = 0;

    do {
        if (num_step % 2 == 0) {
            result = step_on_x_coordinate(x_point, y_point, step, type_of_extemum);
            current_value_of_function = result[0];
            x_point = result[1];
            y_point = result[2];
        } else {
            result = step_on_y_coordinate(x_point, y_point, step, type_of_extemum);
            current_value_of_function = result[0];
            x_point = result[1];
            y_point = result[2];
        }
        num_step++;
        step /= 2;

    } while (Math.abs(current_value_of_function - last_value_of_function) < eps);

    result.push(current_value_of_function);
    result.push(x_point);
    result.push(y_point);
    return result;
}

//search fast
function get_extr_with_steepest_descent_eps() {
    var x_point = parseFloat(document.getElementById("x_point").value);
    var y_point = parseFloat(document.getElementById("y_point").value);
    let step = parseFloat(document.getElementById("step").value);
    let eps = parseFloat(document.getElementById("value_of_kr").value);

    var current_value_of_function;
    var result = new Array();
    // true - maximum, false - minimum
    let type_of_extemum = 1;

    do {
        result = search_max_on_both_coordinate(x_point, y_point, step, type_of_extemum);
        current_value_of_function = result[0];
        x_point = result[1];
        y_point = result[2];

    } while (Math.abs(current_value_of_function - last_value_of_function) < eps);

    result.push(current_value_of_function);
    result.push(x_point);
    result.push(y_point);
    return result;
}

function get_extr_with_steepest_descent_max() {
    var x_point = parseFloat(document.getElementById("x_point").value);
    var y_point = parseFloat(document.getElementById("y_point").value);
    let step = parseFloat(document.getElementById("step").value);
    let max_step = parseInt(document.getElementById("value_of_kr").value);

    var current_value_of_function;
    var result = new Array();
    // true - maximum, false - minimum
    let type_of_extemum = 1;

    do {
        result = search_max_on_both_coordinate(x_point, y_point, step, type_of_extemum);
        current_value_of_function = result[0];
        x_point = result[1];
        y_point = result[2];
        max_step--;
    } while (max_step > 0);

    result.push(current_value_of_function);
    result.push(x_point);
    result.push(y_point);
    return result;
}

// search max value of function on X and Y coordinate
function search_max_on_both_coordinate(x, y, step, type_of_extemum) {
    var x_coord = step_on_x_coordinate(x, y, step, type_of_extemum);
    var y_coord = step_on_y_coordinate(x, y, step, type_of_extemum);
    var result = x_coord[0] > y_coord[0] ? x_coord : y_coord;
    return result;
}

//search extr in left and right point
function step_on_x_coordinate(x, y, step, type_of_extemum) {
    var value_function_in_right_point = get_func(x + step, y);
    var value_function_in_left_point = get_func(x - step, y);
    if (type_of_extemum) {
        if (value_function_in_right_point > value_function_in_left_point) {
            var result = [value_function_in_right_point, x + step, y];
        } else {
            var result = [value_function_in_left_point, x - step, y];
        }
    } else {
        if (value_function_in_right_point > value_function_in_left_point) {
            var result = [value_function_in_left_point, x - step, y];
        } else {
            var result = [value_function_in_right_point, x + step, y];
        }
    }
    return result;
}

//search extr in top and botoom point
function step_on_y_coordinate(x, y, step, type_of_extemum) {
    var value_function_in_top_point = get_func(x, y + step);
    var value_function_in_bottom_point = get_func(x, y - step);
    if (type_of_extemum) {
        if (value_function_in_top_point > value_function_in_bottom_point) {
            var result = [value_function_in_top_point, x, y + step];
        } else {
            var result = [value_function_in_bottom_point, x, y - step];
        }
    } else {
        if (value_function_in_right_point > value_function_in_left_point) {
            var result = [value_function_in_bottom_point, x, y - step];
        } else {
            var result = [value_function_in_top_point, x, y + step];
        }
    }
    return result;
}
//------------------------------------------------------------------
//get function
function get_func(x, y) {
    return (x - 1) * Math.cos(3.14 * Math.sqrt(x ** 2 + y ** 2));
}
