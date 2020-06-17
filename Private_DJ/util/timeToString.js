module.exports = {
	name: 'timeToString',
	description: 'Joins the DJ\'s Voice Channel',

	async execute(totalSeconds) {
    var time
    //console.log(typeof totalSeconds)
    if (totalSeconds.match(/:/g)) {
      return totalSeconds;
    }

    else {
      let hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = totalSeconds % 60;

      var hoursStr = ""
      var minutesStr = ""
      var secondsStr = ""

      if (hours == 0){
        hoursStr = ""
      }
      else {
        hoursStr = hours + ":"
      }
      if (minutes < 10){
        if (hours == 0) {
          minutesStr = minutes + ":"
        }
        else {
          minutesStr = "0"+minutes + ":"
        }
      }
      else {
        minutesStr = minutes + ":"
      }
      if (seconds < 10) {
        secondsStr = "0" + seconds
      }
      else {
        secondsStr = "" + seconds
      }
      return hoursStr + minutesStr + secondsStr;
    }
  }
}
