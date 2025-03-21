"use strict";
function formatDeadlineDate(taskDate) {
    const days = ["კვი", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"];

    const date = new Date(taskDate);

    const dayOfWeek = days[date.getUTCDay()];
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();

    return `${dayOfWeek}.${day}/${month}/${year}`;
};
  