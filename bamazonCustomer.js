var mysql = require("mysql2");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Phantomrex95501",
    database: "bamazon_db",
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("You're connected as ID:" + connection.threadId);
});

let displayProducts = function () {
    var query = "Select * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        var displayTable = new Table({
            head: ["Item ID", "Product Name", "Category", "Price", "Quantity"],
            colWidth: [10, 25, 25, 10, 14]
        });
        for (var i = 0; i < res.length; i++) {
            displayTable.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }
        console.log(displayTable.toString());
        purchasePrompt();
    });

}

function purchasePrompt() {
    inquirer.prompt([
        {
            name: "ID",
            type: "input",
            message: "What would you like to order?(Item Id)",

        },
        {
            name: "Quantity",
            type: "input",
            message: "How many items would you like to purchase?",

        },

    ]).then(function (itemPicked) {
        console.log(itemPicked)
        var IDrequested = itemPicked.ID || 1;
        var quantityNeeded = itemPicked.Quantity;
        customerOrder(IDrequested, quantityNeeded);
    });
};

function customerOrder(ID, quantityNeeded) {
    connection.query('Select * FROM products WHERE item_id = ? ', [ID], function (err, res) {
        if (err) {
            console.log(err)
        };

        if (quantityNeeded <= res[0].stock_quantity) {
            var orderTotal = res[0].price * quantityNeeded;

            console.log("Your total for " + quantityNeeded + " " + res[0].product_name + " is" + " " + orderTotal + ", Thanks for shopping with us!");
        } else {
            console.log("We're sorry, we do not have enough of the product!");
        };
        const amtLeft = res[0].stock_quantity - quantityNeeded;
        updateQuantity(amtLeft, ID);
        displayProducts();


    });
    function updateQuantity(amtLeft, ID) {
        connection.query(
            "UPDATE products SET ? WHERE ?",
            [
                {
                    stock_quantity: amtLeft
                },
                {
                    item_id: ID
                }
            ]
        )
    }
};




displayProducts();