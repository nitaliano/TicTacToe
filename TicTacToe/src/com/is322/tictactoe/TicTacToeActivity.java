package com.is322.tictactoe;

import android.os.Bundle;

import org.apache.cordova.DroidGap;

public class TicTacToeActivity extends DroidGap {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
    }
}
