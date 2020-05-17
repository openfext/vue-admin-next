import { Parser } from 'json2csv';

const ExportUtil = {
  createCSV(data = [], options = {}) {
    try {
      const parser = new Parser(options);

      return parser.parse(data);
    } catch (err) {
      throw new Error('Create CSV Error');
    }
  },

  downloadCSV(data = [], fileName = 'download.csv', options = {}) {
    const URLContext = window.URL || window.webkitURL || window;
    try {
      const ext = '.csv';
      const link = document.createElement('a');
      const csv = ExportUtil.createCSV(data, options);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
      const objectURL = URLContext.createObjectURL(blob);

      if (!fileName.endsWith(ext)) {
        fileName = fileName + ext;
      }

      link.href = objectURL;
      link.download = fileName;
      link.click();

      URLContext.revokeObjectURL(objectURL);
    } catch (err) {
      throw new Error('Download CSV Error');
    }
  }
};

export default ExportUtil;
