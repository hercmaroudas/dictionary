dictionary.js is a wrapper based on an associative array that adds methods to manipulate the array with unique key/value pairs.

The associative array is exposed as "items" and can be manipulated directly however this should not be done if you wish to
maintain consistency with the "keys" and "values" contained within the dictionary.

Todo:
Specify the "items" as an observable object and watch for any modification of these items outside of dictionary.js. Update the
"keys" and "values" accordingly if "items" are changed outside of dictionary.
 
See dictionary.test.js on how to use dictionary.js. Open QunitTests.html to run the tests. Unit testing has been created 
using JQuery QUnit found here http://qunitjs.com/.