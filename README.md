Credit Card generator
=============

A node.js library for generating test credit card numbers.
The card numbers are valid with respect to the Luhn algorithm (Mod 10 test).
https://en.wikipedia.org/wiki/Luhn_algorithm

Interface
-----
```js
GenCC([Scheme], [numberOfCards]. [pseudoRandomFunction]);
```
pseudoRandomFunction must supply random numbers between 0 to 1.
Use this in conjunction with a seeded random number generator to reproduce test data.

Usage
-----
```js
generator = require('creditcard-generator')
generator.GenCC();
//Will return 1 MasterCardNumber
generator.GenCC("Amex");
//Will return 1 Amex number
generator.GenCC("VISA", 10);
//Will return 10 VisaCards numbers
generator.GenCC("Mastercard", 3, Math.random)
//Will generator 3 Mastercard numbers using the standard random function
```
Contributing
------------
All contributions are welcome. 
Please supply tests.

LICENSE
-------
GNU GPL
https://gnu.org/licenses/gpl.html

Project forked from https://github.com/grahamking/darkcoding-credit-card