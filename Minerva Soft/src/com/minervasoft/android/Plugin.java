package com.minervasoft.android;

import java.text.SimpleDateFormat;
import java.util.Calendar;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.app.TimePickerDialog;
import android.widget.TimePicker;

public class Plugin extends CordovaPlugin {

	@Override
	public boolean execute(String action, JSONArray args,
			CallbackContext callbackContext) throws JSONException {

		if (action.equalsIgnoreCase("timepicker")) {
			this.showTimePicker(callbackContext);
			return true;
		}
		return false;
	}

	private void showTimePicker(final CallbackContext callbackContext) {
		final Calendar mcurrentTime = Calendar.getInstance();
		int hour = mcurrentTime.get(Calendar.HOUR_OF_DAY);
		int minute = mcurrentTime.get(Calendar.MINUTE);

		TimePickerDialog mTimePicker;
		mTimePicker = new TimePickerDialog(cordova.getActivity(),
				new TimePickerDialog.OnTimeSetListener() {

					@Override
					public void onTimeSet(TimePicker timePicker,
							int selectedHour, int selectedMinute) {

						mcurrentTime.set(Calendar.HOUR_OF_DAY, selectedHour);
						mcurrentTime.set(Calendar.MINUTE, selectedMinute);

						SimpleDateFormat mSDF = new SimpleDateFormat("hh:mm a");
						String time = mSDF.format(mcurrentTime.getTime());

						callbackContext.success(String.valueOf(time));
					}
				}, hour, minute, false);
		mTimePicker.setTitle("Select Time");
		mTimePicker.show();

	}
}
