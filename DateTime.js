// This line of code will be used to use our function in everywhere once we require it
// syntax : module.exports.function to export. or simply write exports.function to export

module.exports.getDate = getDate;

function getDate () {
var today = new Date();
    var options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year:"numeric",
    };

    var day = today.toLocaleDateString("en-Us", options)
    return day;
}

// Now we are also going to export getDay method declared in this function.
module.exports.getDay = getDay;


function getDay () {
    var today = new Date();
        var options = {
            weekday: 'long',
        };
    
        var day = today.toLocaleDateString("en-Us", options)
        return day;
    }