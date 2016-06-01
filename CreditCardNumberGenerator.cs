using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
 
namespace CreditCardNumberGenerator
{
    public class RandomCreditCardNumberGenerator
    {
        /*
         Copy Kev Hunter's changes August 16, 2009 from from https://kevhunter.wordpress.com/2009/08/16/creating-fake-credit-card-numbers/
         Included comments from Zoltan siaynoq(http://en.gravatar.com/siaynoq) April 20, 2011 
         Included in GitHub by Michael Freidgeim 31 May 2016.
        This is a port of the port of of the Javascript credit card number generator now in C#
        * by Kev Hunter https://kevhunter.wordpress.com
        * See the license below. Obviously, this is not a Javascript credit card number
         generator. However, The following class is a port of a Javascript credit card
         number generator.
         @author robweber
         Javascript credit card number generator Copyright (C) 2006 Graham King
         graham@darkcoding.net

         This program is free software; you can redistribute it and/or modify it
         under the terms of the GNU General Public License as published by the
         Free Software Foundation; either version 2 of the License, or (at your
         option) any later version.
         This program is distributed in the hope that it will be useful, but
         WITHOUT ANY WARRANTY; without even the implied warranty of
         MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General
         Public License for more details.
 
         You should have received a copy of the GNU General Public License along
         with this program; if not, write to the Free Software Foundation, Inc.,
         51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
         www.darkcoding.net
        */
 
 
        public static string[] AMEX_PREFIX_LIST = new[] {"34", "37"};
 
 
        public static string[] DINERS_PREFIX_LIST = new[]
                                                        {
                                                            "300",
                                                            "301", "302", "303", "36", "38"
                                                        };
 
 
        public static string[] DISCOVER_PREFIX_LIST = new[] {"6011"};
 
 
        public static string[] ENROUTE_PREFIX_LIST = new[]
                                                        {
                                                            "2014",
                                                            "2149"
                                                        };
 
      public static String[] JCB_PREFIX_LIST = new[]
                                                        {
                                                        "35"
                                                        };
 
 
        public static string[] MASTERCARD_PREFIX_LIST = new[]
                                                            {
                                                                "51",
                                                                "52", "53", "54", "55"
                                                            };
 
 
        public static string[] VISA_PREFIX_LIST = new[]
                                                    {
                                                        "4539",
                                                        "4556", "4916", "4532", "4929", "40240071", "4485", "4716", "4"
                                                    };
 
 
        public static string[] VOYAGER_PREFIX_LIST = new[] {"8699"};
 
        /*
      'prefix' is the start of the  CC number as a string, any number
        private of digits   'length' is the length of the CC number to generate.
     * Typically 13 or  16
        */
        private static string CreateFakeCreditCardNumber(string prefix, int length)
        {
           //sleep so we get a different seed  if called multiple times
           Thread.Sleep(20);//Todo: consider to make rndGen single instance for all calls see http://stackoverflow.com/questions/767999/random-number-generator-only-generating-one-random-number
            string ccnumber = prefix;
            Random rndGen = new Random();
            while (ccnumber.Length < (length - 1))
            {
                double rnd = (rndGen.NextDouble()*1.0f - 0f);
 
                ccnumber += Math.Floor(rnd*10);
            }
 
 
            // reverse number and convert to int
         var reversedCCnumberstring = ccnumber.ToCharArray().Reverse();
 
            var reversedCCnumberList = reversedCCnumberstring.Select(c => Convert.ToInt32(c.ToString()));
 
            // calculate sum
 
            int sum = 0;
            int pos = 0;
            int[] reversedCCnumber = reversedCCnumberList.ToArray();
 
            while (pos < length - 1)
            {
                int odd = reversedCCnumber[pos]*2;
 
                if (odd > 9)
                    odd -= 9;
 
                sum += odd;
 
                if (pos != (length - 2))
                    sum += reversedCCnumber[pos + 1];
 
                pos += 2;
            }
 
            // calculate check digit
            int checkdigit =
                Convert.ToInt32((Math.Floor((decimal) sum/10) + 1)*10 - sum)%10;
 
            ccnumber += checkdigit;
 
            return ccnumber;
        }
 
 
        public static IEnumerable<string> GetCreditCardNumbers(string[] prefixList, int length,
                                                  int howMany)
        {
            var result = new Stack<string>();
 
            for (int i = 0; i < howMany; i++)
            {
                int randomPrefix = new Random().Next(0, prefixList.Length - 1);
     
                if(randomPrefix>1)
                {
                    randomPrefix--;
                }
 
                string ccnumber = prefixList[randomPrefix];
 
                result.Push(CreateFakeCreditCardNumber(ccnumber, length));
            }
 
            return result;
        }
 
 
        public static IEnumerable<string> GenerateMasterCardNumbers(int howMany)
        {
            return GetCreditCardNumbers(MASTERCARD_PREFIX_LIST, 16, howMany);
        }
 
 
        public static string GenerateMasterCardNumber()
        {
            return GetCreditCardNumbers(MASTERCARD_PREFIX_LIST, 16, 1).First();
        }
 
        public static bool IsValidCreditCardNumber(string creditCardNumber)
        {
            try
            {
                var reversedNumber = creditCardNumber.ToCharArray().Reverse();
                 
                int mod10Count = 0;
                for (int i = 0; i < reversedNumber.Count(); i++)
                {
                    int augend = Convert.ToInt32(reversedNumber.ElementAt(i).ToString());
 
                    if (((i + 1)%2) == 0)
                    {
                        string productstring = (augend*2).ToString();
                        augend = 0;
                        for (int j = 0; j < productstring.Length; j++)
                        {
                            augend += Convert.ToInt32(productstring.ElementAt(j).ToString());
                        }
                    }
                    mod10Count += augend;
                }
 
                if ((mod10Count%10) == 0)
                {
                    return true;
                }
            }
            catch
            {
                return false;
            }
            return false;
        }
    }
}