function PDF_Mejorado(doc) {
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeigth = doc.internal.pageSize.getHeight()
  const x = 10;
  const y = 10;
  const width = pageWidth - 20;
  const height = pageHeigth - 20;
  doc.setFillColor(200,220, 255);
  doc.rect(x, y, width, height);
  doc.setFontSize(10);
  const top = 18;
  let x_start = 15;
  doc.text("Cedula", x_start, top);
  x_start += 20
  doc.text("Nombre", x_start, top);
  x_start += 50
  doc.text("Correo", x_start, top);
  x_start += 30
  doc.text("Cargo", x_start, top);
  x_start += 30
  doc.text("Area", x_start, top);
  x_start += 30
  doc.text("Planta", x_start, top);
  doc.text("tuptm", x_start + 23, top);
  doc.line(x, y + 10, width, y + 10)
  return doc
}

module.exports = {
  PDF_Mejorado,
};
