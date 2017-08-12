//setting a variable that allows this file to access mysql npm package
var mysql = require("mysql");

//setting a variable that allows this file to access mysql npm package
var inquirer = require("inquirer");

//setting a variable to connect to the mySQL server and access the bamazon database
var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",//<mySQLusername>",
  password: "Hypeman28!!",//<mySQLpassword>",
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
      console.log(
        res[i].item_id + " | " + res[i].product_name + " | " + res[i].price
      );
    }
  });

  //function call for items selected by user
  pickItemNQuantity();
};

function productChoices(res) {
  var productsArray = [];
  for (var i = 0; i < res.length; i++) {
    productsArray.push({id: res[i].item_id, name: res[i].product_name, stock_quantity: res[i].stock_quantity}); // + " - " + res[i].product_name);
  }
  return productsArray
}

//declaring a function that asks user what item and what quantity the want to purchase
//and returns it to the command line
function pickItemNQuantity() {
  // query the database for all items available for purchase
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) {
      throw err;
    } else {
      var allProducts = productChoices(res)
      //prompt the user for which item they'd like to purchase
      inquirer
        .prompt([
          {
            name: "item",
            type: "list",
            choices: allProducts,
            message:
              "Use the keyboard to press the number of the item above you would like to purchase"
          },

          //prompt the user for quantity of the item they'd like to purchase
          {
            name: "quantity",
            type: "input",
            message: "Type the quantity of this item you would like to purchase"
          }

        ])
        .then(function(answer) {
          var chosenItem;
          for (var i = 0; i < allProducts.length; i++) {
            if (allProducts[i].name === answer.item) {
              chosenItem = allProducts[i];
            }
          }
          if (chosenItem.stock_quantity < answer.quantity) {
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  product_name: chosenItem.item
                },
                {
                  stock_quantity: chosenItem.quantity - answer.quantity
                }
              ],
              function(error) {
                if (error) throw err;

                // get the information of the chosen item and quantity and display it on the command line
                console.log(
                  "You have purchased " +
                    answer.quantity +
                    answer.item.split("-").pop()
                );
              }
            );
          } else {
            console.log("Insufficient quantity!");
          }
        });
    }
  });
}
