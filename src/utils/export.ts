/**
 * Export utilities for CSV, Excel, and PDF generation
 */

export interface ExportData {
  [key: string]: any;
}

/**
 * Convert data to CSV format
 */
export function exportToCSV(data: ExportData[], filename: string = 'export.csv') {
  if (!data || data.length === 0) {
    alert('No data to export');
    return;
  }

  // Get headers from first object
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Handle values with commas, quotes, or newlines
        if (value === null || value === undefined) return '';
        const stringValue = String(value);
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      }).join(',')
    )
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Export to Excel (XLSX) format
 * Note: Requires xlsx library - install with: npm install xlsx
 */
export async function exportToExcel(data: ExportData[], filename: string = 'export.xlsx') {
  try {
    // Dynamic import to avoid requiring xlsx at build time if not installed
    const XLSX = await import('xlsx');
    
    if (!data || data.length === 0) {
      alert('No data to export');
      return;
    }

    // Create workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Generate file and download
    XLSX.writeFile(workbook, filename);
  } catch (error) {
    console.error('Excel export error:', error);
    // Fallback to CSV if xlsx is not available
    exportToCSV(data, filename.replace('.xlsx', '.csv'));
  }
}

/**
 * Export to PDF using jsPDF with autotable plugin
 * Note: Requires jsPDF and jspdf-autotable libraries
 */
export async function exportToPDF(data: ExportData[], filename: string = 'export.pdf', title: string = 'Report') {
  try {
    // Dynamic import to avoid requiring jsPDF at build time if not installed
    const { jsPDF } = await import('jspdf');
    await import('jspdf-autotable');
    
    if (!data || data.length === 0) {
      alert('No data to export');
      return;
    }

    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.setTextColor(22, 163, 74); // Green color
    doc.text(title, 14, 22);
    
    // Add date
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Generated: ${new Date().toLocaleDateString('en-ZA')}`, 14, 30);
    
    // Prepare data for table
    const headers = Object.keys(data[0]);
    const rows = data.map(row => 
      headers.map(header => {
        const value = row[header];
        if (value === null || value === undefined) return '';
        return String(value);
      })
    );

    // Use autotable plugin for better table formatting
    (doc as any).autoTable({
      head: [headers],
      body: rows,
      startY: 35,
      theme: 'striped',
      headStyles: {
        fillColor: [22, 163, 74], // Green header
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 10,
      },
      bodyStyles: {
        fontSize: 8,
        textColor: [0, 0, 0],
      },
      alternateRowStyles: {
        fillColor: [245, 247, 250],
      },
      margin: { top: 35, right: 14, bottom: 20, left: 14 },
      styles: {
        cellPadding: 3,
        overflow: 'linebreak',
        cellWidth: 'wrap',
      },
      columnStyles: {
        // Auto-adjust column widths
      },
    });

    // Save PDF
    doc.save(filename);
  } catch (error) {
    console.error('PDF export error:', error);
    // Fallback to CSV if jsPDF is not available
    exportToCSV(data, filename.replace('.pdf', '.csv'));
  }
}

/**
 * Format submission data for export
 */
export function formatSubmissionsForExport(submissions: any[]) {
  return submissions.map(sub => ({
    'Reference Number': sub.reference_number || '',
    'Type': sub.submission_type || '',
    'Status': sub.status || '',
    'Full Name': sub.full_name || '',
    'Email': sub.email || '',
    'Phone': sub.phone || '',
    'ID Number': sub.id_number || '',
    'Address': sub.address || '',
    'City': sub.city || '',
    'Postal Code': sub.postal_code || '',
    'Branch Location': sub.branch_location || '',
    'Donation Amount': sub.donation_amount || '',
    'Donation Type': sub.donation_type || '',
    'Project Allocation': sub.project_allocation || '',
    'Message': sub.message || sub.motivation || '',
    'Created Date': sub.created_date ? new Date(sub.created_date).toLocaleString() : '',
    'Assigned To': sub.assigned_to || '',
    'Notes': sub.notes || '',
  }));
}

