//
//  EACreditCardNumberGenerator.m
//  ccnumber
//
//  Created by Ethan Arbuckle on 7/4/13.
//  Copyright (c) 2013 Ethan Arbuckle. All rights reserved.
// 

#import "EACreditCardNumberGenerator.h"

@implementation EACreditCardNumberGenerator

- (NSArray*)generateMasterCardNumbers_Count:(int)howMany {
    NSArray *masterCardPrefixes = [[NSArray alloc] initWithObjects:@"51", @"52", @"53", @"54", @"55", nil];
    return [self credit_card_number:masterCardPrefixes :16 :howMany];
}

- (NSArray*)generateVisaNumbers_Count:(int)howMany {
    NSArray *visaPrefixes = [[NSArray alloc] initWithObjects:@"4539", @"4556", @"4532", @"4929", @"40240071", @"4485", @"4716", @"4", nil];
    return [self credit_card_number:visaPrefixes :16 :howMany];
}

- (NSArray*)generateDiscoveryNumbers_Count:(int)howMany {
    NSArray *discoveryPrefixes = [[NSArray alloc] initWithObjects:@"6011", nil];
    return [self credit_card_number:discoveryPrefixes :16 :howMany];
}

- (NSArray*)generateAmexNumbers_Count:(int)howMany {
    NSArray *amexPrefixes = [[NSArray alloc] initWithObjects:@"34", @"37", nil];
    return [self credit_card_number:amexPrefixes :16 :howMany];
}

- (NSArray*)generateDinersNumbers_Count:(int)howMany {
    NSArray *dinersPrefixes = [[NSArray alloc] initWithObjects:@"300", @"301", @"302", @"303", @"36", @"38", nil];
    return [self credit_card_number:dinersPrefixes :16 :howMany];
}

- (NSArray*)generateEnrouteNumbers_Count:(int)howMany {
    NSArray *enroutePrefixes = [[NSArray alloc] initWithObjects:@"2014", @"2149", nil];
    return [self credit_card_number:enroutePrefixes :16 :howMany];
}

- (NSArray*)generateJCBNumbers_Count:(int)howMany {
    NSArray *JCBPrefixes = [[NSArray alloc] initWithObjects:@"35", nil];
    return [self credit_card_number:JCBPrefixes :16 :howMany];
}

- (NSArray*)generateVoyagerNumbers_Count:(int)howMany {
    NSArray *voyagerPrefixes = [[NSArray alloc] initWithObjects:@"8699", nil];
    return [self credit_card_number:voyagerPrefixes :16 :howMany];
}

- (NSArray*)credit_card_number :(NSArray*)prefixList :(int)length :(int)howMany {
    NSMutableArray *stack = [[NSMutableArray alloc] init];
    for (int i = 0; i < howMany; i++) {
        int randomArrayIndex = arc4random() % [prefixList count];
        NSString *ccnumber = [prefixList objectAtIndex:randomArrayIndex];
        [stack addObject:[self completed_number:ccnumber :length]];
    }
    return stack;
}

- (NSString*)completed_number :(NSString*)prefix :(int)length {
    NSMutableString *ccnumber = [[NSMutableString alloc] initWithFormat:@"%@", prefix];
    while ([ccnumber length] < (length - 1)) {
        int num = floor(arc4random() % 10);
        [ccnumber appendString:[NSMutableString stringWithFormat:@"%d", num]];
    }
    NSString *reversedCCnumber = [self reverseString:(NSString*)ccnumber];
    NSMutableArray *reversedCCNumList = [NSMutableArray array];
    for (int i = 0; i < [reversedCCnumber length]; i++) {
        NSString *ch = [reversedCCnumber substringWithRange:NSMakeRange(i, 1)];
        [reversedCCNumList addObject:ch];
    }
    int sum = 0;
    int pos = 0;
    while (pos < length - 1) {
        int odd = [[reversedCCNumList objectAtIndex:pos] intValue] * 2;
        if (odd > 9) {
            odd -= 9;
        }
        sum += odd;
        if (pos != (length - 2)) {
            sum += [[reversedCCNumList objectAtIndex:pos + 1] intValue];
        }
        pos += 2;
    }
    int digitInt = ((floor(sum / 10) + 1) * 10 - sum);
    int checkDigit = digitInt % 10;
    [ccnumber appendString:[NSMutableString stringWithFormat:@"%d", checkDigit]];
    return ccnumber;
}

- (NSString*)reverseString :(NSString*)str {
    NSMutableArray *temp=[[NSMutableArray alloc] init];
    for(int i = 0; i < [str length]; i++)
    {
        [temp addObject:[NSString stringWithFormat:@"%c", [str characterAtIndex:i]]];
    }
    temp = [NSMutableArray arrayWithArray:[[temp reverseObjectEnumerator] allObjects]];
    NSString *reverseString = @"";
    for(int i = 0; i < [temp count]; i++)
    {
        reverseString = [NSString stringWithFormat:@"%@%@", reverseString, [temp objectAtIndex:i]];
    }
    return reverseString;
}

- (BOOL)isValidCreditCardNumber:(NSString*)ccnum {
    BOOL isValid = NO;
    NSString *reversedCCNumber = [self reverseString:ccnum];
    int mod10Count = 0;
    for (int i = 0; i < [reversedCCNumber length]; i++) {
        int augend = [[reversedCCNumber substringWithRange:NSMakeRange(i, 1)] intValue];
        if (((i + 1) % 2) == 0) {
            NSString *productString = [NSString stringWithFormat:@"%d", (augend * 2)];
            augend = 0;
            for (int j = 0; j < [productString length]; j++) {
                augend += [[productString substringWithRange:NSMakeRange(j, 1)] intValue];
            }
        }
        mod10Count += augend;
    }
    if ((mod10Count%10) == 0) {
        isValid = YES;
    }
    return isValid;
}

@end
