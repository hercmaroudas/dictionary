function dictionary() {
    
    // Items that make up this dictionary.
    this.items = {};

    // Array of all keys and values belonging to the dictionary.
    this.keys = [];
    this.values = [];
    
    // Adds an element with the specified key and value to the dictionary.
    // Returns the item value that was added.
    this.add = function(key, value) {
        // Cannot create a blank key.
        if (key == null || key.toString().trim() == "")
            throw new Error("Key cannot be an empty value.");

        // Cannot add a new item if one already exists.
        if (this.exists(key))
            throw new Error("key already exists in dictionary");

        this.items[key] = value;
        
        // Update key and value arrays (zero index).
        addArrayItem(this.keys, key);
        addArrayItem(this.values, value);
        
        // Return the newly added dictionary item.
        return this.items[key];
    }

    // Updates an element with the specified key and value to the dictionary.
    // Returns true if the item was modified otherwise false.
    this.update = function (key, value) {
        if (!this.exists(key))
            throw new Error("Key does not exist in dictionary.")

        // Store old value to update values collection.
        var oldValue = this.items[key];

        // Update current key with new value.
        this.items[key] = value;

        // Update values array to new value.
        updateArrayItem(this.values, oldValue, value);

        return this.items[key];
    }

    // Removes an element with the specified key from the dictionary.
    // Returns the item value that was deleted.
    this.remove = function(key) {
        if (this.exists(key)) {
            // Get the item in dictionary and delete it.
            var item = this.items[key];
            delete this.items[key];

            // Delete key and value arrays.
            deleteArrayItem(this.keys, key);
            deleteArrayItem(this.values, item);

            // Return the deleted item.
            return item;
        }
        return null;
    }

    // Returns the number of elements within the dictionary.
    this.count = function () {
        return Object.keys(this.items).length;
    }

    // Returns the element with the specified key.
    this.item = function (key) {
        if (this.exists(key))
            return this.items[key];

        return null;
    }

    // Determines if an element with the key specified exists within the dictionary.
    this.exists = function (key) {
        if (key == null || key.toString().trim() == "")
            throw new Error("Cannot retrieve a value using an undefined or empty key.");
        
        // Loop through this.items already added and see if the item with key exists.
        for (var _key in this.items) {
            if (_key.toString().toLowerCase() == key.toString().toLowerCase())
                return true;
        }
        return false;
    }

    // Add an element witin an array at given index.
    var addArrayItem = function (array, value) {
        array.push(value);
    }

    // Updates an element witin an array with a new value.
    var updateArrayItem = function (array, oldValue, newValue) {
        var indexOfValue = array.indexOf(oldValue);
        if (indexOfValue >= 0)
            array[indexOfValue] = newValue;
    }

    // Deletes an element within an array at the index of the value.
    var deleteArrayItem = function(array, value) {
        var indexOfValue = array.indexOf(value);
        if (indexOfValue >= 0)
            delete array[indexOfValue];
    }
}
