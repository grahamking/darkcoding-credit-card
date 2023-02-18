<?php
/*
PHP credit card number generator
Copyright (C) 2006 Graham King graham@darkcoding.net

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
*/

$visaPrefixList[] =  "4539";
$visaPrefixList[] =  "4556";
$visaPrefixList[] =  "4916";
$visaPrefixList[] =  "4532";
$visaPrefixList[] =  "4929";
$visaPrefixList[] =  "40240071";
$visaPrefixList[] =  "4485";
$visaPrefixList[] =  "4716";
$visaPrefixList[] =  "4";

$mastercardPrefixList[] =  "51";
$mastercardPrefixList[] =  "52";
$mastercardPrefixList[] =  "53";
$mastercardPrefixList[] =  "54";
$mastercardPrefixList[] =  "55";
$mastercardPrefixList[] =  "2221";
$mastercardPrefixList[] =  "2222";
$mastercardPrefixList[] =  "2223";
$mastercardPrefixList[] =  "2224";
$mastercardPrefixList[] =  "2225";
$mastercardPrefixList[] =  "2226";
$mastercardPrefixList[] =  "2227";
$mastercardPrefixList[] =  "2228";
$mastercardPrefixList[] =  "2229";
$mastercardPrefixList[] =  "223";
$mastercardPrefixList[] =  "224";
$mastercardPrefixList[] =  "225";
$mastercardPrefixList[] =  "226";
$mastercardPrefixList[] =  "227";
$mastercardPrefixList[] =  "228";
$mastercardPrefixList[] =  "229";
$mastercardPrefixList[] =  "23";
$mastercardPrefixList[] =  "24";
$mastercardPrefixList[] =  "25";
$mastercardPrefixList[] =  "26";
$mastercardPrefixList[] =  "270";
$mastercardPrefixList[] =  "271";
$mastercardPrefixList[] =  "2720";

$amexPrefixList[] =  "34";
$amexPrefixList[] =  "37";

$discoverPrefixList[] = "6011";

$dinersPrefixList[] =  "300";
$dinersPrefixList[] =  "301";
$dinersPrefixList[] =  "302";
$dinersPrefixList[] =  "303";
$dinersPrefixList[] =  "36";
$dinersPrefixList[] =  "38";

$enRoutePrefixList[] =  "2014";
$enRoutePrefixList[] =  "2149";

$jcbPrefixList[] =  "35";

$voyagerPrefixList[] = "8699";

/*
'prefix' is the start of the CC number as a string, any number of digits.
'length' is the length of the CC number to generate. Typically 13 or 16
*/
function completed_number($prefix, $length) {

    $ccnumber = $prefix;

    # generate digits

    while ( strlen($ccnumber) < ($length - 1) ) {
        $ccnumber .= rand(0,9);
    }

    # Calculate sum

    $sum = 0;
    $pos = 0;

    $reversedCCnumber = strrev( $ccnumber );

    while ( $pos < $length - 1 ) {

        $odd = $reversedCCnumber[ $pos ] * 2;
        if ( $odd > 9 ) {
            $odd -= 9;
        }

        $sum += $odd;

        if ( $pos != ($length - 2) ) {

            $sum += $reversedCCnumber[ $pos +1 ];
        }
        $pos += 2;
    }

    # Calculate check digit

    $checkdigit = (( floor($sum/10) + 1) * 10 - $sum) % 10;
    $ccnumber .= $checkdigit;

    return $ccnumber;
}

function credit_card_number($prefixList, $length, $howMany) {

    for ($i = 0; $i < $howMany; $i++) {

        $ccnumber = $prefixList[ array_rand($prefixList) ];
        $result[] = completed_number($ccnumber, $length);
    }

    return $result;
}

function output($title, $numbers) {

    $result[] = "<div class='creditCardNumbers'>";
    $result[] = "<h3>$title</h3>";
    $result[] = implode('<br />', $numbers);
    $result[]= '</div>';

    return implode('<br />', $result);
}

#
# Main
#

echo "<div class='creditCardSet'>";
$mastercard = credit_card_number($mastercardPrefixList, 16, 10);
echo output("Mastercard", $mastercard);

$visa16 = credit_card_number($visaPrefixList, 16, 10);
echo output("VISA 16 digit", $visa16);
echo "</div>";

echo "<div class='creditCardSet'>";
$visa13 = credit_card_number($visaPrefixList, 13, 5);
echo output("VISA 13 digit", $visa13);

$amex = credit_card_number($amexPrefixList, 15, 5);
echo output("American Express", $amex);
echo "</div>";

# Minor cards

echo "<div class='creditCardSet'>";
$discover = credit_card_number($discoverPrefixList, 16, 3);
echo output("Discover", $discover);

$diners = credit_card_number($dinersPrefixList, 14, 3);
echo output("Diners Club", $diners);
echo "</div>";

echo "<div class='creditCardSet'>";
$enRoute = credit_card_number($enRoutePrefixList, 15, 3);
echo output("enRoute", $enRoute);

$jcb = credit_card_number($jcbPrefixList, 16, 3);
echo output("JCB", $jcb);
echo "</div>";

echo "<div class='creditCardSet'>";
$voyager = credit_card_number($voyagerPrefixList, 15, 3);
echo output("Voyager", $voyager);
echo "</div>";
?>
