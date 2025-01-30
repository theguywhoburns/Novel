package me.theguywhoburns.novelapp;

import com.getcapacitor.BridgeActivity;
import android.webkit.WebView;

public class MainActivity extends BridgeActivity {
    @Override
    public void onBackPressed() {
        super.onBackPressed();
        WebView webView = getBridge().getWebView();
        webView.loadUrl("javascript:pressBack()");
    }
}
