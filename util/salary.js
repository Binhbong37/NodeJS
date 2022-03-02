const moment = require('moment');

class Methods {
    getSalary = (month, staff) => {
        console.log('Tháng: ', +month);
        const year = 2022;
        const lastDayOfMonth = new Date(year, month, 0).getDate();
        let overTime = 0;
        let shortTime = 0;
        const listDayLeave = [];

        // get date leave
        staff.onLeave.forEach((leaveInfo) => {
            const listDay = leaveInfo.dayOff;
            const dayLeave = new Date(listDay).getDate();
            const timesLeave = leaveInfo.hourOff;
            const monthLeave = new Date(listDay).getMonth() + 1;

            const daysLeave = {
                dayLeave,
                timesLeave,
                monthLeave,
            };

            return listDayLeave.push(daysLeave);
        });

        // get overTime and shortTime;
        for (let i = 1; i <= lastDayOfMonth; i++) {
            let timeWorkInDay = 0;
            let timeAnnualLeave = 0;
            staff.workTimes.forEach((workTime) => {
                if (
                    workTime.startWork.getDate() == i &&
                    workTime.startWork.getMonth() + 1 == month
                ) {
                    listDayLeave.forEach((day) => {
                        const hoursStart = workTime.startWork.getHours();
                        const hoursEnd = workTime.endWork.getHours();
                        const timeStart =
                            hoursStart * 60 + workTime.startWork.getMinutes();
                        const timeEnd =
                            hoursEnd * 60 + workTime.endWork.getMinutes();

                        // plus time leave to timework

                        if (
                            day.dayLeave <= workTime.startWork.getDate() &&
                            day.monthLeave == month
                        ) {
                            timeAnnualLeave = day.timesLeave;
                        }
                        timeWorkInDay += (timeEnd - timeStart) / 60;
                    });
                }
            });
            overTime += timeWorkInDay <= 8 ? 0 : timeWorkInDay - 8;
            shortTime +=
                timeWorkInDay + timeAnnualLeave < 8
                    ? 8 - (timeWorkInDay + timeAnnualLeave)
                    : 8 - (timeWorkInDay + timeAnnualLeave);
        }
        console.log('Check: ', overTime, shortTime);
        return staff.salaryScale * 3000000 + (overTime - shortTime) * 200000;
    };

    getdayLeave = (staff) => {
        let dayLeave;
        let hourOff = 0;
        staff.onLeave.forEach((day) => {
            let dayOff = day.dayOff;
            dayLeave = new Date(dayOff).getDate();
            let today = new Date().getDate();
            if (dayLeave == today) {
                hourOff = day.hourOff;
            } else {
                hourOff = 0;
            }
        });
        return hourOff;
    };
}

module.exports = new Methods();
