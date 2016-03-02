#import <Cordova/CDV.h>
#import "WXApi.h"
#import "SendMsgToWeChatViewController.h"
#import "RespForWeChatViewController.h"

@interface Flashlight : CDVPlugin<sendMsgToWeChatViewDelegate,WXApiDelegate, RespForWeChatViewDelegate>

@property (strong, nonatomic) SendMsgToWeChatViewController *viewController;

//[WXApi registerApp:@"wx96f6fbd358eec8c0" withDescription:@"medku1.0"];

- (void)available:(CDVInvokedUrlCommand*)command;
- (void)switchOn:(CDVInvokedUrlCommand*)command;
- (void)switchOff:(CDVInvokedUrlCommand*)command;


- (void)mkShareLinkToWx:(CDVInvokedUrlCommand*)command;

@end