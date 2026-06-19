export class StreakCalculator {
  calculateStreak(readingLogDates) {
    if (!readingLogDates || readingLogDates.length === 0) {
      return 0;
    }

    // Set to avoid duplicates and allow fast lookups
    const logSet = new Set(readingLogDates);

    const getLocalDateString = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const todayStr = getLocalDateString(new Date());
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = getLocalDateString(yesterday);

    let hasReadToday = logSet.has(todayStr);
    let hasReadYesterday = logSet.has(yesterdayStr);

    if (!hasReadToday && !hasReadYesterday) {
      return 0;
    }

    let streak = 0;
    let checkDate = hasReadToday ? new Date() : yesterday;

    while (logSet.has(getLocalDateString(checkDate))) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    }

    return streak;
  }
}
