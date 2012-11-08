Credit Card data validator
==========================

A JavaScript implementation
---------------------------

Can check if only the credit card number is valid, or also the date, based on 
the current date.

### Usage:

Just using the number, just valid the number:

```javascript
var validator = new Bluefish.CreditCardValidator("1234123412341234");
console.log(validator.valid());
```

Using number, year and month:

```javascript
var validator = new Bluefish.CreditCardValidator("1234123412341234",2012,11);
console.log(validator.validNumber());
console.log(validator.validDate());
console.log(validator.valid());
```

Formatting number:

```javascript
var validator = new Bluefish.CreditCardValidator("1234123412341234");
console.log(validator.formatNumber()) => "1234-1234-1234-1234"
```
