package com.example.android_frontend;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;
import androidx.appcompat.app.AppCompatActivity;
import java.util.ArrayList;
import java.util.Locale;

public class MainActivity extends AppCompatActivity {

    Spinner nganSpinner;
    Spinner hopSpinner;
    Spinner keSpinner;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        nganSpinner = findViewById(R.id.nganSpinner);
        hopSpinner = findViewById(R.id.hopSpinner);
        keSpinner = findViewById(R.id.keSpinner);

        Button nganButton = findViewById(R.id.nganChitietButton);
        nganButton.setOnClickListener(view -> {
            Intent intent = new Intent(this, nganActivity.class);
            MainActivity.this.startActivity(intent);
        });

        Button hopButton = findViewById(R.id.hopChitietButton);
        hopButton.setOnClickListener(view -> {
            Intent intent = new Intent(this, hopActivity.class);
            MainActivity.this.startActivity(intent);
        });

        Button keButton = findViewById(R.id.keChitietButton);
        keButton.setOnClickListener(view -> {
            Intent intent = new Intent(this, keActivity.class);
            MainActivity.this.startActivity(intent);
        });

        ArrayList<String> nganArray = new ArrayList<>();
        nganArray.add("Ngăn 1");
        nganArray.add("Ngăn 2");
        nganArray.add("Ngăn 3");
        ArrayAdapter<String> nganSpinnerAdapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, nganArray);
        nganSpinner.setAdapter(nganSpinnerAdapter);
        nganSpinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
                createHopSpinner(i + 1);
            }
            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });
    }

    private void createHopSpinner(int i) {
        ArrayList<String> hopArray = new ArrayList<>();
        hopArray.add(String.format(Locale.ROOT, "Ngăn %d Hộp 1", i));
        hopArray.add(String.format(Locale.ROOT, "Ngăn %d Hộp 2", i));
        hopArray.add(String.format(Locale.ROOT, "Ngăn %d Hộp 3", i));
        ArrayAdapter<String> hopSpinnerAdapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, hopArray);
        hopSpinner.setAdapter(hopSpinnerAdapter);

        hopSpinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int i2, long l) {
                createKeSpinner(i, i2 + 1);
            }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });
    }

    private void createKeSpinner(int i, int i2) {
        ArrayList<String> keArray = new ArrayList<>();
        keArray.add(String.format(Locale.ROOT, "Ngăn %d Hộp %d Kệ 1", i, i2));
        keArray.add(String.format(Locale.ROOT, "Ngăn %d Hộp %d Kệ 2", i, i2));
        keArray.add(String.format(Locale.ROOT, "Ngăn %d Hộp %d Kệ 3", i, i2));
        ArrayAdapter<String> keSpinnerAdapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, keArray);
        keSpinner.setAdapter(keSpinnerAdapter);
    }
}