window.addEventListener("DOMContentLoaded", function () {
  var clockElement = document.getElementById("clock");
  var alarmHrInput = document.getElementById("alarm-hr");
  var alarmMinInput = document.getElementById("alarm-min");
  var alarmSecInput = document.getElementById("alarm-sec");
  var alarmAmPmInput = document.getElementById("alarm-am-pm");
  var setAlarmButton = document.getElementById("set-alarm");
  var alarmsList = document.getElementById("alarms");
  var alarms = [];

  // Function to update the clock
  function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    ampm = "AM";
    if (hours >= 12) {
      hours = hours - 12;
      ampm = "PM";
    }
    hours = hours == 0 ? (hours = 12) : hours;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    clockElement.textContent =
      hours + ":" + minutes + ":" + seconds + " " + ampm;

    // Check if any alarms have gone off
    for (var i = 0; i < alarms.length; i++) {
      var alarm = alarms[i];
      if (
        alarm.hr === parseInt(hours) &&
        alarm.min === parseInt(minutes) &&
        alarm.sec === parseInt(seconds) &&
        alarm.amPm === ampm
      ) {
        alert("Alarm!");
        alarms.splice(i, 1); // Remove the alarm from the list
        renderAlarms(); // Update the alarms list
        break;
      }
    }
  }

  // Function to render the alarms list
  function renderAlarms() {
    alarmsList.innerHTML = "";
    // let li = "";
    for (var i = 0; i < alarms.length; i++) {
      var alarm = alarms[i];
      var li = document.createElement("li");
      li.className = "list-item";
      li.textContent =
        (alarm.hr < 10 ? "0" + alarm.hr : alarm.hr) +
        ":" +
        (alarm.min < 10 ? "0" + alarm.min : alarm.min) +
        ":" +
        (alarm.sec < 10 ? "0" + alarm.sec : alarm.sec) +
        " "+
        alarm.amPm;

      var deleteButton = document.createElement("div");
      deleteButton.className = "delete-btn";
      deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
      deleteButton.addEventListener(
        "click",
        (function (index) {
          return function () {
            alarms.splice(index, 1);
            renderAlarms();
          };
        })(i)
      );
      li.appendChild(deleteButton);
      alarmsList.appendChild(li);
    }
  }

  // Event listener for the "Set Alarm" button
  setAlarmButton.addEventListener("click", function () {
    var alarmHr = parseInt(alarmHrInput.value);
    var alarmMin = parseInt(alarmMinInput.value);
    var alarmSec = parseInt(alarmSecInput.value);
    var alarmAmPm = alarmAmPmInput.value;

    if (
      isNaN(alarmHr) ||
      alarmHr < 0 ||
      alarmHr > 12 ||
      isNaN(alarmMin) ||
      alarmMin < 0 ||
      alarmMin > 59 ||
      isNaN(alarmSec) ||
      alarmSec < 0 ||
      alarmSec > 59
    ) {
      alert("Invalid alarm time");
      return;
    }

    var alarm = {
      hr: alarmHr,
      min: alarmMin,
      sec: alarmSec,
      amPm: alarmAmPm,
    };

    alarms.push(alarm);
    renderAlarms();

    // Clear the input fields
    alarmHrInput.value = "";
    alarmMinInput.value = "";
    alarmSecInput.value = "";
  });

  // Start the clock
  setInterval(updateClock, 1000);
});
