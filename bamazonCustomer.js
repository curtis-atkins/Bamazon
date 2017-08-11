//setting a variable that allows this file to access mysql npm package
var mysql = require("mysql");

//setting a variable that allows this file to access mysql npm package
var inquirer = require("inquirer");

//setting a variable to connect to the mySQL server and access the bamazon database
var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "Hypeman28!!",
    database: "bamazon"
});

//if server is unable to connect to the bamazon database in error code is thrown
//otherwise the thread ID is logged and a query is run on the database
connection.connect(function(err) {
    if (err) throw err;
    
//function call for items in mysql table names products
    getBamazonItems();
});

// declaring a function that returns ID, name and price for all items from the mysql table 
//named products to the command line
getBamazonItems = function() {
        connection.query("SELECT * FROM products", function(err, res) {
            for (var i = 0; i < res.length; i++) {
                console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
            }
        });
    
//function call for items selected by user
        pickItemNQuantity();
    }

//declaring a function that asks user what item and what quantity the want to purchase 
//and returns it to the command line
function pickItemNQuantity() {
    
// query the database for all items available for purchase
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        
//prompt the user for which item they'd like to purchase
        inquirer.prompt([{
                name: "item",
                type: "list",
                choices: function() {
                    var productsArray = [];
                    for (var i = 0; i < res.length; i++) {
                        productsArray.push(res[i].item_id + " "); // + " - " + res[i].product_name);
                    }
                    return productsArray;
                },
                message: "Use the keyboard to press the number of the item above you would like to purchase"
            },
                         
//prompt the user for quantity of the item they'd like to purchase
            {
                name: "quantity",
                type: "input",
                message: "Type the quantity of this item you would like to purchase"
            }



//******* I could not get this portion of the project to work.  There seems to be something wrong with how 
//******* chosenItem variable to where it prints undefined to the console.
//******* also when I use chosenItem.stock_quantity OR res[i].stock_quantity, an error is thrown
//******* any advice on that portion would be greatly appreciated!
        ]).then(function(answer) {
            var chosenItem;
            for (var i = 0; i < res.length; i++) {
                if (res[i].item_id === answer.item) {
                    chosenItem = res[i];
                }
                console.log(res[i]);
                console.log(chosenItem);
            }
            if (chosenItem.stock_quantity < answer.quantity) {
                connection.query("UPDATE products SET ? WHERE ?", [{
                    product_name: chosenItem.item
                }, {
                    stock_quantity: chosenItem.quantity - answer.quantity
                }], function(error) {
                    if (error) throw err;
                    
// get the information of the chosen item and quantity and display it on the command line
                    console.log("You have purchased " + answer.quantity + answer.item.split("-").pop());
                });
            } else {
                console.log("Insufficient quantity!");
            }
        });
    });
}