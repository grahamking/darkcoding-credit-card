
var visaPrefixList = new Array(
    "4539",
    "4556",
    "4916",
    "4532",
    "4929",
    "40240071",
    "4485",
    "4716",
    "4"
);

var mastercardPrefixList = new Array(
    "51",
    "52",
    "53",
    "54",
    "55"
);

var amexPrefixList = new Array(
    "34",
    "37"
);

function strrev(str) {
   if (!str) return '';
   var revstr='';
   for (i = str.length-1; i>=0; i--)
       revstr+=str.charAt(i)
   return revstr;
}

/*
'prefix' is the start of the CC number as a string, any number of digits.
'length' is the length of the CC number to generate. Typically 13 or 16
*/
function completed_number(prefix, length) {

    var ccnumber = prefix;

    // generate digits

    while ( ccnumber.length < (length - 1) ) {
        ccnumber += Math.floor(Math.random()*10);
    }

    // reverse number and convert to int

    var reversedCCnumberString = strrev( ccnumber );

    var reversedCCnumber = new Array();
    for ( var i=0; i < reversedCCnumberString.length; i++ ) {
        reversedCCnumber[i] = parseInt( reversedCCnumberString.charAt(i) );
    }

    // calculate sum

    var sum = 0;
    var pos = 0;

    while ( pos < length - 1 ) {

        odd = reversedCCnumber[ pos ] * 2;
        if ( odd > 9 ) {
            odd -= 9;
        }

        sum += odd;

        if ( pos != (length - 2) ) {

            sum += reversedCCnumber[ pos +1 ];
        }
        pos += 2;
    }

    // calculate check digit

    var checkdigit = (( Math.floor(sum/10) + 1) * 10 - sum) % 10;
    ccnumber += checkdigit;

    return ccnumber;

}

 
function credit_card_number(prefixList, length, howMany) {

    var result = new Array();
    for (var i = 0; i < howMany; i++) {

        var randomArrayIndex = Math.floor(Math.random() * prefixList.length);
        var ccnumber = prefixList[ randomArrayIndex ];
        result.push( completed_number(ccnumber, length) );
    }

    return result;
}

module.exports.Schemes = ["VISA", "Amex", "MasterCard"];
module.exports.GenCC = function(CardScheme, howMany){
    var amount = howMany || 1;
    if(CardScheme == module.exports.Schemes[0]) //VISA
    {
        return credit_card_number(visaPrefixList, 16, amount)
    }
    else if(CardScheme == module.exports.Schemes[1]) //Amex
    {
        return credit_card_number(amexPrefixList, 15, amount)
    }
    else // MasterCard
    {
        return credit_card_number(mastercardPrefixList, 16, amount)
    }
}
