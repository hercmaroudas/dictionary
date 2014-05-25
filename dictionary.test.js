/* SETUP: Part of QUnit */
module("Dictionary", {
    setup: function() {
        this.employees = new dictionary();
    },
    teardown: function() {
    }
});

/* ADD */
test("Add Item", function() {
    var employee = this.employees.add("1", "John Doe");
    equal(employee, "John Doe", "Attempt to add item with key and value.");
});

/* MODIFY */
test("Update Item", function () {
    var newEmployee = this.employees.add("Id", "Jon Doe");
    equal(newEmployee, "Jon Doe", "Attempt to add item to test update.");
    var updatedEmployee = this.employees.update("Id", "John Doe");
    notEqual(newEmployee, updatedEmployee, "Newly created item does not match updated item.");
    equal(updatedEmployee, "John Doe", "Newly updated item has expected value.");
})

/* DELETE */
test("Delete Item", function() {
    // Add items first and delete the last item.
    this.employees.add("A", "Item A");
    this.employees.add("B", "Item B");
    this.employees.add("C", "Item C");
    this.employees.add("D", "Item D");
    var itemToDelete = this.employees.add("Z", "Item Z");
    var deletedItem = this.employees.remove("Z");
    equal(itemToDelete, deletedItem, "Attempt to delete an item by key.");
    // Attempt to get deleted item should return null.
    deletedItem = this.employees.item("Z");
    equal(deletedItem, null, "Attempt to retrieve deleted item by key.");
    // Check that we only have 4 items left.
    var itemCount = this.employees.count();
    equal(itemCount, 4, "Attempt to count items after deletion.");
});

/* GET */
test("Get Item", function () {
    // Create John for retrieval using item method.
    this.employees.add("John", "John Doe");

    // Mix it up a bit.
    var employeeLuke = this.employees.add("Luke", "Luke Skywalker");

    // Get john and test. 
    var employeeJohn = this.employees.item("John");
    equal(employeeJohn, "John Doe", "Attempt to retrieve an item by key.");

    // Get Luke and test. 
    employeeLuke = this.employees.item("Luke");
    equal(employeeLuke, "Luke Skywalker", "Attempt to retrieve a second item by key.");
});

/* COUNT */
test("Count Item", function() {
    // test adding one employee.
    this.employees.add("1", "John Doe");
    equal(this.employees.count(), 1, "Attempt to add and count one item.");

    // Do a count test on added items.
    var manyEmployees = addManyItems(100);
    equal(manyEmployees.count(), 100, "Attempt to add and count one hundred items.");
})

/* EXISTS */
test("Item Exists", function() {
    // Test to see if null is returned using an incorrect key.
    var darthVader = this.employees.add("Darth", "Darth Vader");
    var daftExists = this.employees.exists("Daft");
    notEqual(daftExists, true, "Attempt to obtain an item that does NOT exist.");
    var darthExists = this.employees.exists("Darth");
    equal(darthExists, true, "Attempt to obtain item that does exist.");

    // Darth should still exist even if letter casing is not the same.
    darthExists = this.employees.exists("dArTh");
    equal(darthExists, true, "Attempt to obtain item with same name and different letter case.");

    // Check to see if [un][t]ype conversion keys work as expected.
    this.employees.add(true, "Boolean Key");
    var keyExists = this.employees.exists("true");
    equal(keyExists, true, "Attempt to add a type boolean as key.");

    // Add a string type boolean to see if key still exists.
    this.employees.add("false", "String Boolean Key");
    keyExists = this.employees.exists(false);
    equal(keyExists, true, "Attempt to add a string boolean as key.");
});

/* KEYS */
test("Consistent Keys", function () {
    // add many items to compare the number of keys counted with items added.
    var manyEmployees = addManyItems(5);
    var keyCount = manyEmployees.keys.length;
    equal(keyCount, 5, "Attempt to check key count match items added.");

    // Check that expected keys match those in the dictionary.
    for (var employeeCount = 0; employeeCount < manyEmployees.count(); employeeCount++) {
        var key = employeeCount;
        // Key to compare from dictionary.
        var compareKey = manyEmployees.keys[employeeCount];
        // Compare dictionary item keys with seperate key array within dictionary.
        equal(key, compareKey, "Compare [key] in dictionary with key in key array");
    }
});

/* VALUES */
test("Consistent Values", function () {
    // Add many items to compare the number of values counted with items added.
    var manyEmployees = addManyItems(5);
    var valueCount = manyEmployees.values.length;
    equal(valueCount, 5, "Attempt to check key count match items added.");

    // Check that expected values match those in the dictionary.
    for (var employeeCount = 0; employeeCount < manyEmployees.count(); employeeCount++) {
        var key = employeeCount;
        // Value from value array.
        var value = "person " + key;
        // Value from dictionary.
        var compareValue = manyEmployees.item(key) 
        // Compare dictionary item values with seperate value array within dictionary.
        equal(value, compareValue, "Compare [value] in dictionary with value in value array");
    }
});

/* EXCEPTION */
test("Add Null Key", function () {
    throws(function () {
        // Create a null key. This cannot be true.
        this.employees.add(null, "Blank key/value");
    },
    Error, "Key cannot be an empty value.");
})
test("Add Empty Key", function () {
    throws(function () {
        // Create a blank key. This cannot be true.
        this.employees.add(" ", "Blank key/value");
    },
    Error, "Key cannot be an empty value.");
})
test("Get Item with Null Key", function () {
    throws(function () {
        this.employees.exists(null);    
    },
    Error, "Cannot retrieve a value using an undefined or empty key.");
})
test("Get Item with Empty Key", function () {
    throws(function () {
        this.employees.exists(" ");
    },
    Error, "Cannot retrieve a value using an undefined or empty key.");
});

/* Test Helpers */
function addManyItems(itemCount) {
    var manyEmployees = new dictionary();

    // Add many items and do count test.
    for (var count = 0; count <= itemCount - 1; count++) {
        var key = count;
        var val = "person " + count;
        manyEmployees.add(key, val);
    }

    return manyEmployees;
}