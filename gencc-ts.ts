/*
Typescript credit card number generator
Copyright (C) 2017 Graham King graham@gkgk.org

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

const visaPrefixList: Array<string> = [
    "4539",
    "4556",
    "4916",
    "4532",
    "4929",
    "40240071",
    "4485",
    "4716",
    "4"
];

const mastercardPrefixList: Array<string> = [
    "51",
    "52",
    "53",
    "54",
    "55",
    "2221",
    "2222",
    "2223",
    "2224",
    "2225",
    "2226",
    "2227",
    "2228",
    "2229",
    "223",
    "224",
    "225",
    "226",
    "227",
    "228",
    "229",
    "23",
    "24",
    "25",
    "26",
    "270",
    "271",
    "2720"
];

const amexPrefixList: Array<string> = [
    "34",
    "37"
];

const discoverPrefixList: Array<string> = ["6011"];

const dinersPrefixList: Array<string> = [
    "300",
    "301",
    "302",
    "303",
    "36",
    "38"
];

const enRoutePrefixList: Array<string> = [
    "2014",
    "2149"
];

const jcbPrefixList: Array<string> = [
    "35"
];

const voyagerPrefixList: Array<string> = ["8699"];

/*
'prefix' is the start of the CC number as a string, any number of digits.
'length' is the length of the CC number to generate. Typically 13 or 16
*/
function completed_number(prefix: string, length: number): string {

    let ccnumber: Array<number> = [];
	for (let prefixNum of prefix) {
		ccnumber.push(parseInt(prefixNum));
	}

    // generate digits

    while ( ccnumber.length < (length - 1) ) {
        ccnumber.push(Math.floor(Math.random()*10));
    }
	ccnumber.reverse();

    // calculate sum

    let sum: number = 0;
    let pos: number = 0;

    while (pos < length - 1) {

        let odd: number = ccnumber[ pos ] * 2;
        if ( odd > 9 ) {
            odd -= 9;
        }

        sum += odd;

        if ( pos != (length - 2) ) {
            sum += ccnumber[ pos +1 ];
        }
        pos += 2;
    }

    // calculate check digit

    const checkdigit = (( Math.floor(sum/10) + 1) * 10 - sum) % 10;
	ccnumber.reverse();
    ccnumber.push(checkdigit);

	let ccstr: string = "";
	for (let n of ccnumber) {
		ccstr += n.toString();
	}
    return ccstr;
}

function credit_card_number(prefixList: Array<string>, length: number, howMany: number): Array<string> {
    let result: Array<string> = [];
    for (let i = 0; i < howMany; i++) {

        let randomArrayIndex: number = Math.floor(Math.random() * prefixList.length);
        let ccnumber: string = prefixList[ randomArrayIndex ];
        result.push( completed_number(ccnumber, length) );
    }
    return result;
}
