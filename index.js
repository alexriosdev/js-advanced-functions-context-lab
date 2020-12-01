const createEmployeeRecord = (employee) => {
	return {
		firstName: employee[0],
		familyName: employee[1],
		title: employee[2],
		payPerHour: employee[3],
		timeInEvents: [],
		timeOutEvents: [],
	}
}

const createEmployeeRecords = (employees) => {
  return employees.map(employee => { return createEmployeeRecord(employee) });
}

const createTimeInEvent = function(dateStamp) {
  let [date, hour] = dateStamp.split(' ');
  this.timeInEvents.push({
    type: 'TimeIn',
    date: date,
    hour: parseInt(hour, 10),
  });
  return this;
}

const createTimeOutEvent = function(dateStamp) {
  let [date, hour] = dateStamp.split(' ');
  this.timeOutEvents.push({
    type: 'TimeOut',
    date: date,
    hour: parseInt(hour, 10),
  });
  return this;
}

const hoursWorkedOnDate = function(date) {
  let timeIn = this.timeInEvents.find(record => { return record.date  === date });
  let timeOut = this.timeOutEvents.find(record => { return record.date  === date });

  return (timeOut.hour - timeIn.hour) / 100;
}

const wagesEarnedOnDate = function(date) {
  return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

const allWagesFor = function() {
	let workDates = this.timeInEvents.map(record => { return record.date });
	
  let payable = workDates.reduce(function(total, date) {
		return total + wagesEarnedOnDate.call(this, date)
	}.bind(this), 0);

	return payable;
}

const findEmployeeByFirstName = (srcArray, firstName) => {
  return srcArray.find(record => { return record.firstName === firstName });
}

const calculatePayroll = (records) => {
  return records.reduce((total, record) => { return total + allWagesFor.call(record) }, 0);
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!


let allWagesFor = function () {
	let eligibleDates = this.timeInEvents.map(function (e) {
		return e.date
	})

	let payable = eligibleDates.reduce(function (memo, d) {
		return memo + wagesEarnedOnDate.call(this, d)
	}.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

	return payable
}
 */