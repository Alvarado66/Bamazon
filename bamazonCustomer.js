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

var quantityPrompt = function (itemID) {
    inquirer.prompt([
        {
            type: "input",
            message: "How many would you like to buy?",
            name: "quantity",
        }
    ]).then(function (choices) {
        var quantityPicked = choices.quantity;
        var quantityID = choices.itemID;
        connection.query(
            "Update products set ? WHERE ?",
            [
                {
                    stock_quantity: quantityPicked
                },
                {
                    itemID: quantityID
                }
            ]
        )
    });
};



let purchasePrompt = function () {
    inquirer.prompt([
        {
            type: "input",
            message: "What item would you like to purchase?",
            name: "itemID",
        }
    ]).then(function (choices) {
        const itemID = parseInt(choices.itemID);
        console.log(itemID);
        quantityPrompt(itemID)
    })

}
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

connection.connect(function (err) {
    if (err) throw err;
    console.log("You're connected as ID:" + connection.threadId);
    displayProducts();
});

// let displayProducts = function (){
//     var query = "Select * FROM products";
//     connection.query(query, function(err, res){
//         if(err) throw err;
//         var displayTable = new Table ({
//             head: ["Item ID", "Product Name", "Category", "Price", "Quantity"],
//             colWidth: [10,25,25,10,14]
//         });
//         for(var i = 0; i < res.length; i++){
// 			displayTable.push(
// 				[res[i].item_id,res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
// 				);
// 		}
// 		console.log(displayTable.toString());
// 		purchasePrompt();
// 	});

// }