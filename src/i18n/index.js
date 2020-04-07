const wd = new Date();
const locale = "default";

const i18n = {
  datetime: {
    weekday: [],
    month: [],
  },
  formatter: {
    date: {
      short: new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
      medium: new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }),
      long: new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }),
    },
  },
};

for (var day = 5; day <= 11; day++) {
  wd.setFullYear(1970, 0, day);
  i18n.datetime.weekday.push({
    narrow: wd.toLocaleString(locale, { weekday: "narrow" }),
    short: wd.toLocaleString(locale, { weekday: "short" }),
    long: wd.toLocaleString(locale, { weekday: "long" }),
  });
}

for (var month = 0; month <= 11; month++) {
  wd.setFullYear(1970, month, 1);
  i18n.datetime.month.push({
    narrow: wd.toLocaleString(locale, { month: "narrow" }),
    short: wd.toLocaleString(locale, { month: "short" }),
    long: wd.toLocaleString(locale, { month: "long" }),
  });
}

export default i18n;
