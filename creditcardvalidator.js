/**
 * JavaScript credit card data validator.
 * Can check if only the number is valid, or also the date, based on the 
 * current date.
 *
 * Usage:
 *
 * Just using the number, just valid the number:
 *
 * var validator = new Bluefish.CreditCardValidator("1234123412341234");
 * console.log(validator.valid());
 *
 * Using number, year and month:
 *
 * var validator = new Bluefish.CreditCardValidator("1234123412341234",2012,11);
 * console.log(validator.validNumber());
 * console.log(validator.validDate());
 * console.log(validator.valid());
 *
 * Formatting number:
 *
 * var validator = new Bluefish.CreditCardValidator("1234123412341234");
 * console.log(validator.formatNumber()) => "1234-1234-1234-1234"
 *
 */
var Bluefish = Bluefish || {};

Bluefish.CreditCardValidator = function(number,year,month) {
   this.number = number.match(/\d/g).join("");
   this.year   = year;
   this.month  = month;
}

/**
 * Validates number
 */
Bluefish.CreditCardValidator.prototype.validNumber = function() {
   if(!/^\d{16}$/.test(this.number))
      return false;
   
   var r1 = [0, 2, 4, 6, 8, 10, 12, 14];
   var r2 = [1, 3, 5, 7, 9, 11, 13, 15];
   var total=0, acum=0, pos;

   for(pos=0; pos<r1.length; pos++) {
      acum = parseInt(this.number[r1[pos]])*2;
      if(acum>9)
         acum -= 9;
      total += acum;
   }

   for(pos=0; pos<r2.length; pos++)
      total += parseInt(this.number[r2[pos]]);

   if((total%10)!=0 || total>150)
      return false;

   return true;
}

/**
 * Validates expiration date
 */
Bluefish.CreditCardValidator.prototype.validDate = function() {
   if(isNaN(this.year) || isNaN(this.month))
      return false;

   var today = new Date();
   var cdate = parseInt(parseInt(this.year)+("00"+parseInt(this.month)).slice(-2));
   var ndate = parseInt(today.getFullYear()+("00"+(today.getMonth()+1)).slice(-2));
   return ndate<=cdate;
}

/**
 * Validates everything!
 */
Bluefish.CreditCardValidator.prototype.valid = function() {
   return this.validNumber() && this.validDate();
}

/**
 * Format number
 */
Bluefish.CreditCardValidator.prototype.formatNumber = function() {
   return this.number.match(/(\d{4})/g).join("-");
}
