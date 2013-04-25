Credit Card generator
=============

A node.js library for generating test credit card numbers.

Interface
-----
```js
GenCC([Scheme], [numberOfCards]);
```

Usage
-----
```js
generator = require('./gencc.js')
generator.GenCC();
//Will return 1 MasterCardNumber
generator.GenCC("Amex");
//Will return 1 Amex number
generator.GenCC("VISA", 10);
//Will return 10 VisaCards numbers
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