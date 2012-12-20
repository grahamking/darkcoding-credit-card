/*
Javascript credit card number generator
Copyright (C) 2006-2012 Graham King graham@gkgk.org

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

www.darkcoding.net
*/

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

var discoverPrefixList = new Array("6011");

var dinersPrefixList = new Array(
    "300",
    "301",
    "302",
    "303",
    "36",
    "38"
);

var enRoutePrefixList = new Array(
    "2014",
    "2149"
);

var jcbPrefixList = new Array(
    "35"
);

var voyagerPrefixList = new Array("8699");


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


