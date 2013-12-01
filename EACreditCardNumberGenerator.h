//
//  EACreditCardNumberGenerator.h
//  ccnumber
//
//  Created by Ethan Arbuckle on 7/4/13.
//  Copyright (c) 2013 Ethan Arbuckle. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface EACreditCardNumberGenerator : NSObject
- (NSArray*)generateMasterCardNumbers_Count:(int)howMany;
- (NSArray*)generateVisaNumbers_Count:(int)howMany;
- (NSArray*)generateDiscoveryNumbers_Count:(int)howMany;
- (NSArray*)generateAmexNumbers_Count:(int)howMany;
- (NSArray*)generateDinersNumbers_Count:(int)howMany;
- (NSArray*)generateEnrouteNumbers_Count:(int)howMany;
- (NSArray*)generateJCBNumbers_Count:(int)howMany;
- (NSArray*)generateVoyagerNumbers_Count:(int)howMany;
- (BOOL)isValidCreditCardNumber:(NSString*)ccnum;
@end
