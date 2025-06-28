export function exportToCsv<T extends Record<string, any>>(
  data: T[],
  filename: string,
  columns?: { header: string; key: keyof T }[]
) {
  if (!data || data.length === 0) {
    console.warn("Dışa aktarılacak veri bulunamadı.");
    return;
  }

  const headers = columns ? columns.map(col => col.header) : Object.keys(data[0]);
  const keys = columns ? columns.map(col => col.key) : Object.keys(data[0]);

  const csvRows = [];
  csvRows.push(headers.join(',')); // Başlık satırı

  for (const row of data) {
    const values = keys.map(key => {
      const value = row[key];
      // CSV uyumluluğu için özel karakterleri ve virgülleri ele al
      const stringValue = String(value === null || value === undefined ? '' : value);
      return `"${stringValue.replace(/"/g, '""')}"`; // Çift tırnakları kaçış karakteriyle ele al
    });
    csvRows.push(values.join(','));
  }

  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  if (link.download !== undefined) { // Tarayıcı desteği kontrolü
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } else {
    alert('Tarayıcınız dosya indirmeyi desteklemiyor.');
  }
}