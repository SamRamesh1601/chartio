import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import moment from "moment/moment";
import 'jspdf-autotable';


export function extractReportDataWithNewKeys(data, columns) {
    let filteredData = data.map(item => {
        let keys = Object.keys(item);
        let newKeys = Object.keys(columns);
        let newObj = {};
        keys.sort((a, b) => {
            const indexA = newKeys.indexOf(a);
            const indexB = newKeys.indexOf(b);
            return indexA - indexB;
        });

        keys.forEach(key => {
            const matchingKey = newKeys.find(newKey => key.includes(newKey));
            if (Boolean(matchingKey) && matchingKey !== 'undefined') {
                const newKey = columns[key] && columns[key] !== 'undefined' ? columns[key] : null;
                if (newKey) {
                    if (key.includes('Date')) newObj[newKey] = item[key] ? moment(item[key]).format('DD-MM-YYYY ') : '';
                    else if (key === 'id') newObj[newKey] = item[key] ? `${item[key]} ` : '';
                    else newObj[newKey] = item[key] ? item[key] : '';
                }
            }
        });
        return newObj;
    });
    return filteredData;
}
export function extractFilterWithNewKeys(data, filterKeyColumns) {
    let keys = Object.keys(data).filter(key => !key.includes('Id'));
    let newKeys = Object.keys(filterKeyColumns);
    let newObj = {};
    keys.sort((a, b) => {
        const indexA = newKeys.indexOf(a);
        const indexB = newKeys.indexOf(b);
        return indexA - indexB;
    });
    keys.forEach(key => {
        const matchingKey = newKeys.find(newKey => key.includes(newKey));
        if (matchingKey) {
            const newKey = filterKeyColumns[key] || key;
            if (key.includes('Date') && Boolean(data[key])) newObj[newKey] = data[key] ? moment(data[key]).format('DD-MM-YYYY ') : '';
            else if (Boolean(data[key])) newObj[newKey] = data[key];
        }
    });
    return newObj;
}
export function createExcelSheet(fileName, sheetName, filterColumns, excelColumns) {
    const workBook = XLSX.utils.book_new();

    const sheetData = filterColumns ? [{ FilterBy: '', ...filterColumns }, {}] : [];
    const workSheet = filterColumns ? XLSX.utils.json_to_sheet(sheetData) : XLSX.utils.json_to_sheet(excelColumns);
    if (filterColumns) {
        XLSX.utils.sheet_add_json(workSheet, excelColumns, { origin: -1 });
    }

    Object.keys(workSheet).forEach((cellRef) => {
        const cellValue = workSheet[cellRef] ? workSheet[cellRef].v : null;
        if (cellValue && !workSheet[cellRef].s) {
            workSheet[cellRef].s = {};
            workSheet[cellRef].s.alignment = { horizontal: 'left' };
            workSheet[cellRef].s.numFmt = '0';
        }
        if (cellValue) {
            workSheet[cellRef].hpx = 10;
            workSheet[cellRef].wch = 10;
            workSheet[cellRef].width = 10;
        }
    });

    XLSX.utils.book_append_sheet(workBook, workSheet, sheetName);
    XLSX.writeFile(workBook, `${fileName}.xlsx`);
}
export function createPDFSheet(fileName, sheetName, filterColumns, excelColumns, isFilterAsText) {
    const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
    });
    pdf.text(sheetName || 'Your PDF Header', 10, 10);
    const isFilterAvailable = filterColumns && Object.keys(filterColumns).length > 0;
    if (isFilterAvailable) {
        pdf.text('Filter By', 10, 20);
        const headers = Object.keys(filterColumns);

        const filterString = Object.keys(filterColumns)
            .map(header => `${header} -  ${filterColumns[header]}`)
            .join(' , ');
        if (isFilterAsText) {
            pdf.text(filterString, 10, 30);
        }
        else {
            pdf.autoTable({
                startY: 30,
                margin: { top: 10 },
                head: [headers],
                body: [headers.map(header => filterColumns[header])],
                theme: 'striped',
                styles: {
                    font: 'helvetica',
                    fontSize: 10,
                    cellPadding: 1,
                    lineColor: 0,
                    lineWidth: 0.1,
                },
                columnStyles: {
                    0: { cellWidth: 'auto', overflow: 'linebreak' },
                    '*': { overflow: 'linebreak', columnWidth: 'wrap', cellBreak: 'word' },
                },
            });
        }
    }
    if (excelColumns && excelColumns.length > 0) {
        const headers = Object.keys(excelColumns[0]);
        pdf.autoTable({
            startY: isFilterAvailable ? 60 : 30,
            margin: { top: 20 },
            head: [headers],
            body: excelColumns.map(obj => headers.map(header => obj[header])),
            theme: 'striped',
            styles: {
                font: 'helvetica',
                fontSize: 8,
                cellPadding: isFilterAsText ? 0.5 : 0.25,
                minCellWidth: 11,
                lineColor: 0,
                lineWidth: 0.1,
            },
            columnStyles: {
                0: { cellWidth: 'auto', overflow: 'linebreak' },
                '*': { overflow: 'linebreak', columnWidth: 'wrap', cellBreak: 'word' },
            },
        });
    }
    else {
        pdf.text('No data to display', 10, 30);
    }
    pdf.save(`${fileName}.pdf`);
}

export function exportReportAs(fileName = 'report', reportData, keyColumns, isPDF) {
    const excelColumns = extractReportDataWithNewKeys(reportData, keyColumns);
    let filterColumns = {};
    // let filterColumns = Object.values(filterValues).some((value) => Boolean(value)) ? extractFilterWithNewKeys(filterValues, filterKeyColumns) : null;
    const fileNameType = `${fileName} Report ${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`;
    if (!isPDF) createExcelSheet(fileNameType, fileName, filterColumns, excelColumns);
    if (isPDF) createPDFSheet(fileNameType, fileName, filterColumns, excelColumns, "Filter BY");
}