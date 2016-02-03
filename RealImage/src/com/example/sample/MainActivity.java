package com.example.sample;

import org.apache.cordova.Config;
import org.apache.cordova.CordovaActivity;
import org.apache.cordova.CordovaWebView;

import android.os.Bundle;


public class MainActivity extends CordovaActivity {

	CordovaWebView cwv;
	
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		cwv = (CordovaWebView) findViewById(R.id.webView);
		Config.init(this);
		super.loadUrl(Config.getStartUrl());
	}

}
