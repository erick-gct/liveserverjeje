function PDF_Mejorado(doc) {
  const parseSafe = (it) => (it ?? "").toString();
  const headerbase_x = 9;
  const header = [
    {
      label: "HORA LLEGADA (Time of arrival)",
      value: "fecha_control",
      x: headerbase_x,
      //formatter: it => parseSafe(it?.split(' ')[0]),
      maxWidth: 7,
      maxHeigth: 30,
    },
    {
      label: "HORA CONTROL (Time of check)",
      value: "fecha_control",
      x: headerbase_x + 14,
      formatter: (it) => parseSafe(it?.split(" ")[1]),
      maxWidth: 10,
      maxHeigth: 7,
    },
    {
      label: "LOTE (Lot)",
      value: "lote",
      x: headerbase_x + 25,
      formatter: (it) => parseSafe(it),
      maxWidth: 9,
      maxHeigth: 7,
    },
    {
      label: "CAMARONERA (Shrimp farm)",
      value: "proveedor",
      x: headerbase_x + 36,
      formatter: (it) => parseSafe(it?.nombre),
      maxWidth: 13,
      maxHeigth: 7,
    },
    {
      label: "PISC. (Pond)",
      value: "maquina",
      x: headerbase_x + 52,
      formatter: (it) => parseSafe(it?.descripcion),
      maxWidth: 15,
      maxHeigth: 7,
    },
    {
      label: "N. MOVIL (N. Vehicle)",
      value: "marcas",
      x: headerbase_x + 65,
      formatter: (it) => parseSafe(it?.descripcion),
      maxWidth: 12,
      maxHeigth: 15,
    },
    {
      label: "CONSUMO INICIAL 2NaOH (Initial consumption)",
      value: "importador",
      x: headerbase_x + 78,
      formatter: (it) => parseSafe(it?.nombre),
      maxWidth: 15,
      maxHeigth: 7,
    },
    {
      label: "CONSUMO FINAL 2NaOH (Final consumption)",
      value: "tallas",
      x: headerbase_x + 97,
      formatter: (it) => parseSafe(it),
      maxWidth: 15,
      maxHeigth: 7,
    },

    {
      label: "RESULTADO (Result)",
      value: "unidades_muestreadas",
      x: headerbase_x + 114,
      formatter: (it) => parseSafe(it),
      maxWidth: 15,
      maxHeigth: 7,
    },
    {
      label: "RESIDUAL (Residual)",
      value: "melanosis", // Calcular porcentaje de unidades melanosis vs tiempo
      x: headerbase_x + 127,
      formatter: (it) => parseSafe(it),
      maxWidth: 15,
      maxHeigth: 7,
    },
    {
      label: "TALLA (Size)",
      value: "so2",
      x: headerbase_x + 140,
      formatter: (it) => parseSafe(it),
      maxWidth: 15,
      maxHeigth: 7,
    },
    {
      label: "EMPAQUE (Packing)",
      value: "responsable",
      x: headerbase_x + 155,
      formatter: (it) => parseSafe(it),
      maxWidth: 15,
      maxHeigth: 7,
    },
    {
      label: "OBSERVACION (Observations)",
      value: "observaciones",
      x: headerbase_x + 172,
      formatter: (it) => parseSafe(it),
      maxWidth: 15,
      maxHeigth: 7,
    },
  ];

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeigth = doc.internal.pageSize.getHeight();
  // const x = 10;
  // const y = 10;
  const width = pageWidth - 20;
  const height = pageHeigth - 20;
  doc.setFillColor(200, 220, 255);
  //doc.rect(x, y, width, height);
  doc.setFontSize(7);
  const top = 18;
  let x_start = 15;
  // doc.text("Cedula", x_start, top);
  // x_start += 20
  // doc.text("Nombre", x_start, top);
  // x_start += 50
  // doc.text("Correo", x_start, top);
  // x_start += 30
  // doc.text("Cargo", x_start, top);
  // x_start += 30
  // doc.text("Area", x_start, top);
  // x_start += 30
  // doc.text("Planta", x_start, top);
  // doc.text("tuptm", x_start + 23, top);
  // doc.line(x, y + 10, width, y + 10)

  const pw = doc.getPageWidth();

  const codigo = "RC.CC.06";
  const analisis =
    "REGISTRO DE SULFITOS METODO KJELDAHL EN MATERIA PRIMA Y PROCESO";
  const subtitulo =
    "(Record of sulphites by kjeldahl method in raw material and process)";
  let totalPages = 0;
  let newIdx = 0;
  const revision = "3";
  const fechaRevision = "2-09-2020";
  //const pages = array.length
  const itemsPerPage = 5; //Ingresar cantidad de registros que se desee ver por página :D

  /* --- Header documento --- */
  doc.rect(8, 8, pw - 16, 16);
  doc.rect(8, 8, 25, 16);
  doc.text(15, 15, "Logo", { align: "center" });
  //doc.addImage(logoSP, 'PNG', 11, 9, 18.5, 18.5, 'right')
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.text(pw / 2.2, 16, analisis, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.text(pw / 2.2, 20, subtitulo, {
    align: "center",
    maxWidth: 200,
    fontbold: false,
  });

  doc.setFontSize(6);
  doc.setFont("helvetica", "bold");
  doc.rect(pw - 53, 8, 45, 4);
  doc.text(pw - 52, 11, "Revision (Review):");
  doc.rect(pw - 53, 12, 45, 4);
  doc.text(pw - 52, 15, "Fecha (Date):");
  doc.rect(pw - 53, 16, 45, 4);
  doc.text(pw - 52, 19, "Codigo (Code):");
  doc.setFont("helvetica", "normal");
  doc.text(pw - 20, 11, revision, { align: "center" });
  doc.text(pw - 20, 15, fechaRevision, { align: "center" });
  doc.text(pw - 20, 19, codigo, { align: "center" });
  doc.rect(pw - 53, 20, 45, 4);
  doc.line(pw - 33, 8, pw - 33, 20);
  doc.text(pw - 33, 23, "Pagina 1 de 1/ Page 1 of 1", { align: "center" });

  /* --- Header documento --- */

  /* --- Body documento --- */

  const [a, , b] = [1, 2, 3];
  //bruh

  let x = 51;
  let y = 8;
  const jump = 8.5;
  let header_x = 15;
  const header_y = 41;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  //Fecha
  doc.text(pw - 198, 33, "FECHA (Date):");
  doc.line(pw - 180, 33, pw - 130, 33);

  //Turno
  doc.text(pw - 70, 33, "TURNO (Shift):");
  doc.line(pw - 50, 33, pw - 10, 33);

  //Rectangulo general de la tabla
  doc.rect(8, 38, pw - 16, 200);
  for (let i = 0; i < 23; i++) {
    doc.line(8, x, pw - 8, x);
    x += jump;
  }

  function drawFormattedText(doc, text, x, y, options = {}) {
    const {
      maxWidth = 15,
      lineHeight = 3,
      fontSize = 4.5,
      align = "left",
      isBold = true,
    } = options;

    doc.setFontSize(fontSize);
    doc.setFont("helvetica", isBold ? "bold" : "normal");

    // Dividir el texto en palabras
    const words = text.split(" ");
    let lines = [];
    let currentLine = "";

    // Agrupar palabras en líneas según el ancho máximo
    words.forEach((word) => {
      const testLine = currentLine + " " + word;
      const testWidth =
        (doc.getStringUnitWidth(testLine) * fontSize) /
        doc.internal.scaleFactor;

      if (testWidth > maxWidth) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });
    lines.push(currentLine);

    // Dibujar cada línea
    lines.forEach((line, index) => {
      doc.text(x, y + index * lineHeight, line.trim(), { align });
    });

    return lines.length * lineHeight; // Retorna altura total del texto
  }

  doc.setFontSize(4.5);

  header.forEach((it, i) => {
    const textOptions = {
      maxWidth: it.maxWidth || 15,
      lineHeight: 3,
      fontSize: 4.5,
      align: "left",
      isBold: true,
    };

    // Dibujar el texto formateado
    drawFormattedText(doc, it.label, it.x, header_y, textOptions);

    // Dibujar línea vertical
    if (i > 0) {
      doc.line(it.x - 2, 38, it.x - 2, 238);
    }
  });

  doc.line(8, 51, pw - 8, 51);

  //Insersion de los datos en el documento

  header.forEach((it, i) => {
    const textOptions = {
      maxWidth: it.maxWidth || 15,
      lineHeight: 3,
      fontSize: 5.5,
      align: "left",
      isBold: false,
    };
  });

  //ESPACIO DE CUADROS

  doc.setFontSize(6);
  doc.setFont("helvetica", "bold");
  doc.text(8, 251, "N. de Analisis:");
  doc.text(8, 255, "Materia Prima:");
  doc.text(8, 261, "Proceso:");
  doc.setFont("helvetica", "normal");
  doc.text(24, 251, "(N of Analysis)");


  doc.text(44, 258, "(Analysis)");
  doc.text(44, 264, "(Analysis)");
  doc.text(8, 258, "(Raw Material)");
  doc.text(8, 264, "(Process)");
  doc.setFont("helvetica", "bold");

  doc.text(44, 255, "Analisis:");

  doc.text(44, 261, "Analisis:");

  doc.rect(25, 253, 14, 7);

  doc.rect(25, 260, 14, 7);

  //FIRMAS

  doc.line(65, 282, 105, 282);
  doc.line(135, 282, 173, 282);

  doc.text(78, 285, "Realizado por");
  doc.text(140, 285, "Jefe de Control de Calidad");

  doc.setFont("helvetica", "normal");
  doc.text(80, 288, "(Made by)");

  doc.text(142, 288, "(Chief Quality Officer) ");

  return doc;
}

module.exports = {
  PDF_Mejorado,
};
