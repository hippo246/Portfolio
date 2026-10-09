const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const resumePath = path.resolve(__dirname, 'resume.html');
  const pdfPath = path.resolve(__dirname, 'public', 'Rahil_Tahir_Resume.pdf');

  await page.goto(`file://${resumePath}`, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0.5cm',
      right: '0.5cm',
      bottom: '0.5cm',
      left: '0.5cm'
    }
  });

  await browser.close();
  console.log('PDF generated successfully:', pdfPath);
})();
