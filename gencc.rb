#
# Adapted by Paul Marclay, paul.eduardo.marclay@gmail.com
#

class CreditCardGenerator
  VISA_PREFIX_LIST = ["4539", "4556", "4916", "4532", "4929", "40240071", "4485", "4716", "4"]
  MASTERCARD_PREFIX_LIST = ["51","52","53","54","55", "2221", "2222", "2223", "2224", "2225", "2226", "2227", "2228", "2229", "223", "224", "225", "226", "227", "228", "229", "23", "24", "25", "26", "270", "271", "2720"]
  AMEX_PREFIX_LIST = ["34", "37"]
  DISCOVERY_PREFIX_LIST = ["6011"]
  DINERS_PREFIX_LIST = ["300", "301", "302", "303", "36", "38"]
  ENROUTE_PREFIX_LIST = ["2014", "2149"]
  JBC_PREFIX_LIST = ["35"]
  VOYAGER_PREFIX_LIST = ["8699"]

  def self.completed_number(prefix, length)
    cc_number = prefix

    # generate digits
    1...(length - (prefix.length + 1)).times do
      cc_number += "#{rand(9)}"
    end

    # Calculate sum
    sum, pos = 0, 0

    reversed_cc_number = cc_number.reverse
    while pos < length  do
      odd = reversed_cc_number[pos].to_i * 2
      odd -= 9 if odd > 9

      sum += odd

      sum += reversed_cc_number[pos + 1].to_i if pos != (length - 2)

      pos += 2;
    end

    # Calculate check digit
    checkdigit = (((sum / 10).floor + 1) * 10 - sum) % 10
    cc_number += checkdigit.to_s;

    return cc_number
  end

end
