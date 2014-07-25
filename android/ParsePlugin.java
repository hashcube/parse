package com.tealeaf.plugin.plugins;

import java.util.HashSet;
import java.util.HashMap;
import java.util.Date;

import com.tealeaf.plugin.IPlugin;
import com.tealeaf.logger;

import android.app.Activity;
import android.content.Intent;
import android.content.Context;
import android.os.Bundle;
import android.view.*;
import android.content.pm.PackageManager;
import android.content.pm.ApplicationInfo;

import org.json.JSONException;
import org.json.JSONObject;

import com.parse.*;

public class ParsePlugin implements IPlugin {
	Context _ctx;
	Intent _intent;
	Activity _activity;

	public void onCreateApplication(Context applicationContext) {
		this._ctx = applicationContext;
	}

	public void onCreate(Activity activity, Bundle savedInstanceState) {
		this._activity = activity;
	}

	public void initialize(String jsonData) {
		try {
			JSONObject object = new JSONObject(jsonData);
			String appID = object.getString("appid");
			String clientKey = object.getString("clientkey");
			if (appID != null && clientKey != null) {
				Parse.initialize(this._ctx, appID, clientKey);
				ParseAnalytics.trackAppOpened(this._intent);
				ParseInstallation.getCurrentInstallation().saveInBackground();
				PushService.setDefaultPushCallback(_ctx, this._activity.getClass().class);
			} else {
				throw "Parse AppID or ClientKey is not defined";
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}


	public void onResume() {
	}

	public void onStart() {
	}

	public void onPause() {
	}

	public void onStop() {
	}

	public void onDestroy() {
	}

	public void onNewIntent(Intent intent) {
		this._intent = intent;
	}

	public void setInstallReferrer(String referrer) {
	}

	public void onActivityResult(Integer request, Integer result, Intent data) {
	}

	public void logError(String error) {
	}

	public boolean consumeOnBackPressed() {
		return true;
	}

	public void onBackPressed() {
	}
	// Subscribe to a channel
	public void subscribe (String jsonData) {
		try {
			JSONObject object = new JSONObject(jsonData);
			String event = object.getString('evt');
			if (event != null) {
				PushService.subscribe(this._ctx, event, this._activity.getClass().class);
			} else {
				throw "Parse Subscribe method needs an event";
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// Unsubscribe from a channel
	public void unsubscribe (String jsonData) {
		try {
			JSONObject object = new JSONObject(jsonData);
			String event = object.getString('evt');
			if (event != null) {
				PushService.unsubscribe(this._ctx, event);
			} else {
				throw "Parse Unsubscribe method needs an event";
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
