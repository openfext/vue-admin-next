function getDateBefore({ year = 0, month = 0, day = 0 }) {
  const dt = new Date();

  if (year) {
    dt.setFullYear(dt.getFullYear() - year);
  }

  if (month) {
    dt.setMonth(dt.getMonth() - month);
  }

  if (day) {
    dt.setDate(dt.getDate() - day);
  }

  return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
}

function getPickerShortcuts() {
  return [
    {
      text: '今天',
      onClick(picker) {
        const start = getDateBefore({ day: 0 });

        picker.$emit('pick', start);
      }
    },
    {
      text: '昨天',
      onClick(picker) {
        const start = getDateBefore({ day: 1 });

        picker.$emit('pick', start);
      }
    },
    {
      text: '前一周',
      onClick(picker) {
        const start = getDateBefore({ day: 7 });

        picker.$emit('pick', start);
      }
    },
    {
      text: '前一月',
      onClick(picker) {
        const start = getDateBefore({ month: 1 });

        picker.$emit('pick', start);
      }
    }
  ];
}

function getPickerRangeShortcuts() {
  return [
    {
      text: '今天',
      onClick(picker) {
        const start = getDateBefore({ day: 0 });
        const end = new Date();

        picker.$emit('pick', [start, end]);
      }
    },
    {
      text: '昨天',
      onClick(picker) {
        const start = getDateBefore({ day: 1 });
        const end = getDateBefore({ day: 0 });

        picker.$emit('pick', [start, end]);
      }
    },
    {
      text: '前一周',
      onClick(picker) {
        const start = getDateBefore({ day: 7 });
        const end = getDateBefore({ day: 0 });

        picker.$emit('pick', [start, end]);
      }
    },
    {
      text: '前一月',
      onClick(picker) {
        const start = getDateBefore({ month: 1 });
        const end = getDateBefore({ day: 0 });

        picker.$emit('pick', [start, end]);
      }
    }
  ];
}

export { getDateBefore, getPickerShortcuts, getPickerRangeShortcuts };
