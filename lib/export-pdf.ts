'use client';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportToPDF(
  elementId: string,
  title: string,
  options?: { subtitle?: string; classification?: string },
) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const canvas = await html2canvas(element, {
    backgroundColor: '#F7F3EA',
    scale: 2,
    useCORS: true,
    logging: false,
  });

  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;

  // ─── HEADER ───
  pdf.setFillColor(28, 24, 20); // #1C1814
  pdf.rect(0, 0, pageWidth, 28, 'F');

  // Gold dot + brand
  pdf.setFillColor(184, 150, 62); // #B8963E
  pdf.circle(margin + 3, 14, 2.5, 'F');
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(16);
  pdf.setTextColor(212, 182, 98); // #D4B662
  pdf.text('EIGEN', margin + 10, 16);

  // Subtitle
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8);
  pdf.setTextColor(145, 137, 119); // #918977
  pdf.text(title.toUpperCase(), margin + 10, 22);

  // Classification badge
  if (options?.classification) {
    pdf.setFontSize(7);
    pdf.setTextColor(156, 61, 61);
    pdf.text(options.classification, pageWidth - margin - 30, 16);
  }

  // Date
  pdf.setFontSize(7);
  pdf.setTextColor(145, 137, 119);
  pdf.text(
    new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
    pageWidth - margin - 30,
    22,
  );

  // ─── CONTENT ───
  const imgWidth = pageWidth - margin * 2;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  const imgData = canvas.toDataURL('image/png');

  const addFooter = () => {
    pdf.setDrawColor(212, 182, 98);
    pdf.setLineWidth(0.3);
    pdf.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(6);
    pdf.setTextColor(145, 137, 119);
    pdf.text('CONFIDENTIEL — Eigen Holding SAS — Mars 2026', margin, pageHeight - 8);
    pdf.text(`Page ${pdf.getNumberOfPages()}`, pageWidth - margin - 15, pageHeight - 8);
  };

  let yOffset = 34;
  const availableFirst = pageHeight - yOffset - 20;

  if (imgHeight <= availableFirst) {
    // Fits on one page
    pdf.addImage(imgData, 'PNG', margin, yOffset, imgWidth, imgHeight, undefined, 'FAST');
    addFooter();
  } else {
    // Multi-page: clip using canvas slices
    const pxPerMm = canvas.width / imgWidth;
    let sourceY = 0;
    let page = 0;

    while (sourceY < canvas.height) {
      const availH = page === 0 ? availableFirst : pageHeight - 15 - 20;
      const slicePxH = Math.min(availH * pxPerMm, canvas.height - sourceY);
      const sliceMmH = slicePxH / pxPerMm;

      // Create slice canvas
      const sliceCanvas = document.createElement('canvas');
      sliceCanvas.width = canvas.width;
      sliceCanvas.height = slicePxH;
      const ctx = sliceCanvas.getContext('2d')!;
      ctx.drawImage(canvas, 0, sourceY, canvas.width, slicePxH, 0, 0, canvas.width, slicePxH);

      const sliceData = sliceCanvas.toDataURL('image/png');
      pdf.addImage(sliceData, 'PNG', margin, page === 0 ? yOffset : 15, imgWidth, sliceMmH, undefined, 'FAST');
      addFooter();

      sourceY += slicePxH;
      if (sourceY < canvas.height) {
        pdf.addPage();
        page++;
      }
    }
  }

  pdf.save(`Eigen_${title.replace(/\s/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`);
}
