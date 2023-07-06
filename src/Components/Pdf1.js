import React, { useState } from 'react'
import { Button } from 'primereact/button';
import jsPDF from 'jspdf'
import 'jspdf-autotable';
import './Pdf1.css'; // Import the CSS file

const Pdf1 = () => {

  const [x, setX] = useState('');
  const [y, setY] = useState('');

  const isButtonDisabled = !x || !y;

  const generatePdf = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF({
      orientation: 'portrait', // 'portrait' / 'p' or 'landscape' / 'l'
      unit: 'mm', // measurement unit, e.g., 'mm', 'in', 'pt'
      format: [200, 400], // width and height in units specified by the 'unit' property. If portrait, height will be the bigger number of the 2. If landscape, width will be the bigger number of the 2.
    });

    // Add content to the PDF
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#00FF00'); // Set text color to blue
    doc.text('Hello, I\'m Mario', 10.5, 20.5);
    doc.setTextColor('#0000FF'); // Set text color to green
    doc.text('Hello, I\'m Mario', 10, 20); // Since this code is placed after text code above it, it will be placed in front.
    doc.setTextColor('#000000'); // Set text color to black

    doc.setFontSize(14);
    doc.setFont('courier', 'normal');
    doc.text('Hello, I\'m Mario', 10, 35);

    doc.setFontSize(12);
    doc.setFont('times', 'italic');
    doc.text('Hello, I\'m Mario', 10, 50);

    doc.setFontSize(18);
    doc.setFont('arial', 'bolditalic');
    doc.text('Hello, I\'m Mario', 10, 65);

    doc.setFontSize(20);
    doc.setFont('georgia', 'normal');
    doc.text('Hello, I\'m Mario', 10, 80);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const loremIpsumText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius felis ligula, eu ullamcorper nisl laoreet a. Curabitur in mi ac risus efficitur facilisis vel ac tortor. Morbi pharetra vestibulum magna, eget gravida nunc volutpat id. Quisque iaculis, mi quis auctor gravida, mauris ligula interdum tortor, sit amet mattis erat nunc id dui. Maecenas pulvinar venenatis dictum. Phasellus facilisis malesuada metus ut scelerisque. Sed ut sem ac massa lacinia fermentum. Aliquam non finibus neque. Morbi vitae augue nibh. Nam pulvinar justo a viverra tincidunt. Donec vehicula massa eget vulputate consectetur. In id viverra est, eget placerat dui. Sed eu erat lectus. Mauris a risus eget enim gravida condimentum ut a justo. Nullam iaculis dapibus tellus vel hendrerit.';
    const loremIpsumLines = doc.splitTextToSize(loremIpsumText, 120); // Specify the width for wrapping
    doc.text(loremIpsumLines, 70, 20);

    // Add images to the PDF
    const imageUrl1 = 'image1.png';
    const imageUrl2 = 'image2.jpg';

    doc.addImage(imageUrl1, 'PNG', 10, 90, 50, 50);
    doc.addImage(imageUrl2, 'JPEG', 25, 105, 80, 20);

    // Create table data
    const tableData = [
      ['Action', 'Result'],
      [`Addition (${x} + ${y})`, parseFloat(x) + parseFloat(y)],
      [`Subtraction (${x} - ${y})`, parseFloat(x) - parseFloat(y)],
      [`Multiplication (${x} * ${y})`, parseFloat(x) * parseFloat(y)],
      [`Division (${x} / ${y})`, parseFloat(x) / parseFloat(y)],
    ];

    const headerRow = [{ content: 'Operations Table', colSpan: 2, styles: { halign: 'center' } }];

    doc.autoTable({
      head: [headerRow, tableData[0]],
      body: tableData.slice(1),
      startY: 150,
      startX: 50,
      theme: 'plain',
      margin: { top: 10, bottom: 10 },
      styles: {
        lineColor: [0, 0, 0], // Black border
        lineWidth: 0.5,
        cellPadding: 5,
        textColor: [0, 0, 0], // Black text color
      },
      headStyles: {
        fillColor: false, // No header cell coloring
        halign: 'center', // Center align header cells
      },
      bodyStyles: {
        fillColor: false, // No body cell coloring
        alternateRowStyles: { fillColor: false }, // Remove fill color from even rows
      },
      columnStyles: {
        0: { cellWidth: 50 }, // First column width
        1: { cellWidth: 50 }, // Second column width
      },
    });

    // Create table data
    const tableData2 = [];
    const columnHeaders = ['Country A', 'Country B', 'Country C'];
    const row1 = ['10', '20', '30'];
    const row2 = ['40', '50', '60'];
    const row3 = ['70', '80', '90'];
    const row4 = ['100', '110', '120'];
    const row5 = ['130', '140', '150'];

    tableData2.push(columnHeaders);
    tableData2.push(row1);
    tableData2.push(row2);
    tableData2.push(row3);
    tableData2.push(row4);
    tableData2.push(row5);

    doc.autoTable({
      startY: 250,
      head: [columnHeaders],
      body: tableData2.slice(1),
    });

    // F = fill only, S = outline (stroke) only, DF/FD = both

    // Draw green circle
    doc.setFillColor(0, 255, 0); // Green color
    doc.circle(160, 120, 30, 'F'); // Center (160, 120), radius 30

    // Draw purple rectangle
    doc.setFillColor(128, 0, 128); // Purple color
    doc.setDrawColor(255, 0, 0); // Red outline color
    doc.rect(125, 160, 60, 20, 'DF'); // Top-left corner (125, 160), width 60, height 20

    // Draw yellow line
    doc.setDrawColor(255, 255, 0); // Yellow color
    doc.setLineWidth(2); // Line width 2
    doc.line(125, 200, 175, 225); // Start (250, 300), end (350, 300)

    // Add watermark
    doc.saveGraphicsState();
    doc.setGState(new doc.GState({ opacity: 0.3 }));
    doc.setFontSize(150);
    doc.setTextColor(0, 0, 0);
    doc.text('MARIO', 30, 150, { angle: 315, });
    doc.restoreGraphicsState();

    // Save the PDF
    doc.save('mario_generated_pdf.pdf');
  };

  return (
    <div className="container">
      <label htmlFor="xInput" className="label">Value of x:</label>
      <input id="xInput" type="number" value={x} onChange={(e) => setX(e.target.value)} className="input" />
      <label htmlFor="yInput" className="label">Value of y:</label>
      <input id="yInput" type="number" value={y} onChange={(e) => setY(e.target.value)} className="input" />
      <Button label={isButtonDisabled ? "Insert both values first" : "Generate PDF"} onClick={generatePdf} disabled={isButtonDisabled} className="button" style={{ backgroundColor: isButtonDisabled ? "#999999" : "#000000" }} />
      <p><a href='https://artskydj.github.io/jsPDF/docs/index.html'>Click here for jsPDF documentation</a></p>
      <p><a href='https://www.npmjs.com/package/jspdf-autotable/v/3.5.14'>Click here for jspdf-autotable documentation</a></p>
    </div>
  );
}

export default Pdf1