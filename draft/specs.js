// === Progress ===

// 80% specifications
// 40% analysis
// 0%  implementation

// === API ===

var report = KindaReport.create();

report.addHeader(function(header) {
  header.addRow(function(row) {
    row.addText(
      'Lunch Friday 20th, 2014',
      { alignment: 'left', style: 'bold' }
    );
    row.addText(
      '5 chekings',
      { alignment: 'center' }
    );
    row.addText(
      'Page 1 of 1',
      { alignment: 'right' }
    );
  });
});

report.addBody(function(body) {
  body.addTable(function(table) {
    table.addHeader(function(header) {
      header.addRow(function(row) {
        row.addCell().addText('Date');
        row.addCell().addText('Participant');
        row.addCell().addText('Status');
      });
    });
    table.addBody(function(body) {
      body.addRow(function(row) {
        row.addCell().addText('01/01/01 10:20');
        row.addCell().addText('Jean Durand');
        row.addCell().addText('Checked');
      });
      // ...
    });
    table.addFooter(function(footer) {
      footer.addRow(function(row) {
        row.addCell().addText('...');
        row.addCell().addText('...');
        row.addCell().addText('...');
      };
    });
  });
});

yield report.renderToPDFFile('/tmp/report.pdf');

// === Classes hierarchy (not sure about that) ===

// Component
//   KindaReport
//   ReportBody
//   Table
//   TableHeader
//   Row???
//   TableBody
//   TableFooter
//   TableRow
//   Box
//     ReportHeader
//     ReportFooter
//     TableCell
//   Text

// === Properties ===

// Component
//   parentComponent: undefined
//   childComponents: []
//   Properties with inheritance:
//     fontTypeFace: 'Helvetica'
//     fontSize: 10 // pt
//     fontStyle: [] // could be ['bold', 'italic']
//     alignment: 'left' // could be 'center' or 'right'
//     color: 'black' // could be '#abc'
//     backgroundColor: 'white'
//   Properties without inheritance:
//     paddingTop: undefined // mm
//     paddingBottom: undefined
//     paddingLeft: undefined
//     paddingRight: undefined
//     marginTop: undefined // mm

// KindaReport
//   title: undefined
//   width: 210 // mm
//   height: 297
//   paddingTop: 10
//   paddingBottom: 10
//   paddingLeft: 10
//   paddingRight: 10
//   orientation: 'portrait' // could be also 'landscape'

// ReportBody
//   marginTop: 5 // mm

// ReportHeader

// ReportFooter
//   marginTop: 5 // mm

// Table
//   columns: []
//   borderWidth: 0.25 // pt
//   borderColor: 'gray'
//   marginTop: 5 // mm

// TableBody

// TableHeader, TableFooter and TableRow

// TableCell
//   span: 1 // implemented in the future?
//   paddingTop: 1
//   paddingBottom: 1
//   paddingLeft: 1
//   paddingRight: 1

// Text
//   value: undefined

// === Methods ===

var report = KindaReport.create([options], [fn]); // => KindaReport

var reportHeader = report.addHeader([options], [fn]); // => ReportHeader

var reportFooter = report.addFooter([options], [fn]); // => ReportFooter

var table = report.addTable([options], [fn]); // => Table

var tableBody = table.addBody([options], [fn]); // => TableHeader

var tableHeader = table.addHeader([options], [fn]); // => TableHeader

var tableFooter = table.addFooter([options], [fn]); // => TableFooter

var tableRow = tableBody.addRow([options], [fn]); // => TableRow

var tableCell = tableRow.addCell([options], [fn]); // => TableCell

var text = tableCell.addText(value, [options], [fn]); // => Text

yield report.renderToPDFFile(path);

var blob = yield report.renderToPDFBlob(); // For the future

// === Remarks ===

// Some columns can have fixed width:
//   columns: [{ width: 200 }, { width: undefined }, { width: 200 }]

// Text values can contains special variables:
//   {{reportTitle}}
//   Page {{pageNumber}} of {{numberOfPages}}

// For now, only one table is allowed but this may change in the future

// Two steps rendering:
//   1) For automatic columns, calculate maximum width.
//   2) Create the PDF.
