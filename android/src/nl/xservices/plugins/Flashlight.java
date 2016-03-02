package nl.xservices.plugins;

import android.content.pm.FeatureInfo;
import android.content.pm.PackageManager;
import android.graphics.SurfaceTexture;
import android.hardware.Camera;
import android.os.Build;
import android.util.Log;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import com.tencent.mm.sdk.openapi.IWXAPI;
import com.tencent.mm.sdk.openapi.SendMessageToWX;
import com.tencent.mm.sdk.openapi.WXAPIFactory;
import com.tencent.mm.sdk.openapi.WXAppExtendObject;
import com.tencent.mm.sdk.openapi.WXEmojiObject;
import com.tencent.mm.sdk.openapi.WXImageObject;
import com.tencent.mm.sdk.openapi.WXMediaMessage;
import com.tencent.mm.sdk.openapi.WXMusicObject;
import com.tencent.mm.sdk.openapi.WXTextObject;
import com.tencent.mm.sdk.openapi.WXVideoObject;
import com.tencent.mm.sdk.openapi.WXWebpageObject;
import com.tencent.mm.sdk.openapi.SendAuth;

public class Flashlight extends CordovaPlugin {

  private static final String ACTION_AVAILABLE = "available";
  private static final String ACTION_SWITCH_ON = "switchOn";
  private static final String ACTION_SWITCH_OFF = "switchOff";

  private static Boolean capable;
  private boolean releasing;

  @Override
  public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
    Log.d("Flashlight", "Plugin Called: " + action);
    try {
      if (action.equals(ACTION_SWITCH_ON)) {
        // When switching on immediately after checking for isAvailable,
        // the release method may still be running, so wait a bit.

        return true;
      } else if (action.equals(ACTION_SWITCH_OFF)) {

        return true;
      } else if (action.equals(ACTION_AVAILABLE)) {

        IWXAPI api = WXAPIFactory.createWXAPI(this.cordova.getActivity(), "wx4c16435946da293d");

        String text = "mkIntro";
        // 初始化一个WXTextObject对象
        WXTextObject textObj = new WXTextObject();
        textObj.text = text;

        // 用WXTextObject对象初始化一个WXMediaMessage对象
        WXMediaMessage msg = new WXMediaMessage();
        msg.mediaObject = textObj;
        // 发送文本类型的消息时，title字段不起作用
        // msg.title = "Will be ignored";
        msg.description = text;

        // 构造一个Req
        SendMessageToWX.Req req = new SendMessageToWX.Req();
        req.transaction = buildTransaction("text"); // transaction字段用于唯一标识一个请求
        req.message = msg;
        req.scene = SendMessageToWX.Req.WXSceneSession;

        // 调用api接口发送数据到微信
        api.sendReq(req);
        return true;
      } else {
        callbackContext.error("flashlight." + action + " is not a supported function.");
        return false;
      }
    } catch (Exception e) {
      callbackContext.error(e.getMessage());
      return false;
    }
  }

  private boolean isCapable() {
    final PackageManager packageManager = this.cordova.getActivity().getPackageManager();
    for (final FeatureInfo feature : packageManager.getSystemAvailableFeatures()) {
      if (PackageManager.FEATURE_CAMERA_FLASH.equalsIgnoreCase(feature.name)) {
        return true;
      }
    }
    return false;
  }

  private String buildTransaction(final String type) {
    return (type == null) ? String.valueOf(System.currentTimeMillis()) : type + System.currentTimeMillis();
  }
}
