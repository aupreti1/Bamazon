var mysql = require('mysql');
var inquirer = require('inquirer');
require('dotenv').config();


var connection = mysql.createConnection({
 host: process.env.DB_HOST,

 port: 3306,

 user: process.env.DB_USER,

 password: process.env.DB_PASS,
 database: 'bamazon'
});

connection.connect(function (err) {
    if (err) throw err;
    createTable()
})

var createTable = function () {
    connection.query("Select * from the products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + "|--|" + res[i].product_name + "|--|" + res[i].department_name + "|--|" + res[i].price + "|--|" + res[i].stock_quantity + "\n");
        }
        promptCustomer(res);
       console.log(res);
    });
}

var promptCustomer = function (res) {
    inquirer.prompt([{
        type: 'input',
        name: 'choice',
        message: "What item would you like to purchase? [Press C to Cancel]",
    }]).then(function (answer) {
        var correct = false;
        if (answer.choice.toUpperCase() == "C") {
            process.exit();
        }

        for (var i = 0; i < res.length; i++) {
            if (res[i].product_name == answer.choice) {
                correct = true;
                var product = answer.choice;
                var id = i;
                inquirer.prompt({
                    type: "input",
                    name: "quant",
                    message: "How many would you like to purchase?",
                    validate: function (value) {
                        if (isNaN(value) == false) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }).then(function (answer) {
                    if ((res[id].stock_quantity - answer.quant) > 0) {
                        connection.query("UPDATE products SET stockquantity='" + (res[id].stock_quantity - answer.quant) + "'WHERE productname='" + product + "'", function (err, res2) {
                            createTable();
                            var totalCost = answer.quant * res[id].price;
                            console.log("\n" + "-----------------------" + "\n");
                            console.log("\n" + "You bought a product" + "\n");
                            console.log("Total Cost: $ " + totalCost + "\n");
                            console.log("----------------------" + "\n");
                        })
                    } else {
                        console.log("\n" + "-----------------------" + "\n");
                        console.log("Item is sold out!" + "\n");
                        console.log("--------------------------" + "\n");
                        promptCustomer(res);
                    }
                })
            }
        }

        if (i == res.length && correct == false) {
            console.log("\n" + "-----------------------" + "\n");
            console.log("Invalid Choice!" + "\n");
            console.log("----------------------------" + "\n");
            promptCustomer(res);
        }
    })
}
