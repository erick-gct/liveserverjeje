function PDF_Mejorado(doc) {

    const parseSafe = it => (it ?? '').toString()
    const headerbase_x = 13
    const header = [
      {
          label: 'FECHA',
          value: 'fecha_control',
          x: headerbase_x,
          //formatter: it => parseSafe(it?.split(' ')[0]),
          maxWidth: 7,
          maxHeigth: 30,
      },
      {
          label: 'HORA',
          value: 'fecha_control',
          x: headerbase_x + 16,
          formatter: it => parseSafe(it?.split(' ')[1]),
          maxWidth: 10,
          maxHeigth: 7,
      },
      {
          label: 'TURNO',
          value: 'lote',
          x: headerbase_x + 32,
          formatter: it => parseSafe(it),
          maxWidth: 9,
          maxHeigth: 7,
      },
      {
          label: 'PROVEEDOR',
          value: 'proveedor',
          x: headerbase_x + 48,
          formatter: it => parseSafe(it?.nombre),
          maxWidth: 13,
          maxHeigth: 7,
      },
      {
          label: 'PISC',
          value: 'maquina',
          x: headerbase_x + 75,
          formatter: it => parseSafe(it?.descripcion),
          maxWidth: 15,
          maxHeigth: 7,
      },
      {
          label: 'LOTE',
          value: 'marcas',
          x: headerbase_x + 90,
          formatter: it => parseSafe(it?.descripcion),
          maxWidth: 12,
          maxHeigth: 15,
      },
      {
          label: '# DE MOVIL',
          value: 'movil',
          x: headerbase_x + 110,
          formatter: it => parseSafe(it),
          maxWidth: 17,
          maxHeigth: 7,
      },
      // {
      //     label: 'CONSUMO FINAL 2NaOH (Final consumption)',
      //     value: 'tallas',
      //     x: headerbase_x + 97,
      //     formatter: it => parseSafe(it),
      //     maxWidth: 15,
      //     maxHeigth: 7,
      // },
   
      // {
      //     label: 'RESULTADO (Result)',
      //     value: 'unidades_muestreadas',
      //     x: headerbase_x + 114,
      //     formatter: it => parseSafe(it),
      //     maxWidth: 15,
      //     maxHeigth: 7,
      // },
      // {
      //     label: 'RESIDUAL (Residual)',
      //     value: 'melanosis', // Calcular porcentaje de unidades melanosis vs tiempo
      //     x: headerbase_x + 127,
      //     formatter: (it) => parseSafe(it),
      //     maxWidth: 15,
      //     maxHeigth: 7,
      // },
  ]
  
    
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeigth = doc.internal.pageSize.getHeight()
    // const x = 10;
    // const y = 10;
    const width = pageWidth - 20;
    const height = pageHeigth - 20;
    doc.setFillColor(200,220, 255);
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
  
    const pw = doc.getPageWidth()
  
   
    const codigo = 'RC.CC.41'
    const analisis = 'CONTROL DE RECEPCION DE BINES' 
    //const subtitulo = '(Record of sulphites by kjeldahl method in raw material and process)'
    let totalPages = 0
    let newIdx = 0
    const revision = '5'
    const fechaRevision = '22/10/2024'
    //const pages = array.length
    const itemsPerPage = 5 //Ingresar cantidad de registros que se desee ver por página :D
    const condiciones_materia_prima = ['# DE BINES RECIBIDOS', 'COLOR DE BINES', 'ppm DE SULFITOS']
  
  
      /* --- Header documento --- */
    doc.rect(8, 8, pw - 16, 16)
    doc.rect(8, 8, 25, 16)
    doc.text(15, 15, 'Logo', { align: 'center' })
    //doc.addImage(logoSP, 'PNG', 11, 9, 18.5, 18.5, 'right')
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.text(pw / 2.2, 16, analisis, { align: 'center' })
    doc.setFont('helvetica', 'normal')
    //doc.text(pw / 2.2, 20, subtitulo, { align: 'center', maxWidth: 200, fontbold: false })
  
    doc.setFontSize(7)
    doc.setFont('helvetica', 'bold')
    doc.rect(pw - 53, 8, 45, 4)
    doc.text(pw - 52, 11, 'Revision:')
    doc.rect(pw - 53, 12, 45, 4)
    doc.text(pw - 52, 15, 'Fecha:')
    doc.rect(pw - 53, 16, 45, 4)
    doc.text(pw - 52, 19, 'Codigo:')
    doc.setFont('helvetica', 'normal')
    doc.text(pw - 20, 11, revision, { align: 'center' })
    doc.text(pw - 20, 15, fechaRevision, { align: 'center' })
    doc.text(pw - 20, 19, codigo, { align: 'center' })
    doc.rect(pw - 53, 20, 45, 4)
    doc.line(pw - 33, 8, pw - 33, 20)
    doc.text(pw - 33, 23, "Pagina 1 de 1", { align: 'center' })  
  
  
       /* --- Header documento --- */
  
          /* --- Body documento --- */
  
    const [a, ,b] = [1,2,3]
      //bruh 
  
    let x = 47
    let y = 8
    const jump = 7
    let header_x = 15
    const header_y = 38
  
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7)
  
    doc.rect(8, 30, pw - 16, 171)
    for (let i = 0; i < 23; i++) {
        doc.line(8, x, pw - 8, x)
        x += jump
    }
  
    function drawFormattedText(doc, text, x, y, options = {}) {
      const {
          maxWidth = 15,
          lineHeight = 0,
          fontSize = 10,
          align = 'center',
          isBold = true
      } = options;
  
      doc.setFontSize(fontSize);
      doc.setFont('helvetica', isBold ? 'bold' : 'normal');
  
      // Dividir el texto en palabras
      const words = text.split(' ');
      let lines = [];
      let currentLine = '';
  
      // Agrupar palabras en líneas según el ancho máximo
      words.forEach(word => {
          const testLine = currentLine + ' ' + word;
          const testWidth = doc.getStringUnitWidth(testLine) * fontSize / doc.internal.scaleFactor;
          
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
          doc.text(x, y + (index * lineHeight), line.trim(), { align });
      });
  
      return lines.length * lineHeight; // Retorna altura total del texto
  }
  
    doc.setFontSize(6)
  
    header.forEach((it, i) => {
  
      const textOptions = {
        maxWidth: it.maxWidth || 15,
        lineHeight: 0,
        fontSize: 7.5,
        align: 'left',
        isBold: true
    };
  
    // Dibujar el texto formateado
    drawFormattedText(doc, it.label, it.x, header_y, textOptions);
    
    // Dibujar línea vertical
    if (i > 0) {
        doc.line(it.x - 2, 30, it.x - 2, 201);
    }
     
    })
    
    //doc.line( 8, 51, pw - 8, 51)
  
    doc.setFontSize(6)
    doc.text(pw - 38, header_y - 3, 'CONDICIONES DE LA MATERIA PRIMA EN RECEPCION', { align: 'center' })
  
    doc.line(pw- 68, header_y - 1, pw - 8, header_y - 1)
    doc.line(pw - 68, 30 , pw - 68, 201)
  
    let base_x = 143
  
   
    doc.text(pw - 60, header_y +3, '# DE BINES', { align: 'center' })
    doc.text(pw - 60, header_y +6, 'RECIBIDOS', { align: 'center' })
    
    doc.text(pw - 39, header_y +5, 'COLOR DE BINES', { align: 'center' })
  
    doc.text(pw - 20, header_y +3, 'ppm DE', { align: 'center' })
    doc.text(pw - 20, header_y +6, 'SULFITOS', { align: 'center' })
  
  
    //Lineas verticales de las condiciones de la materia prima
    let jump2 = 22
    let x2= pw-50
    for (let i = 0; i < 2; i++) {
        doc.line(x2,header_y-1 , x2, 201)
        x2 += jump2
    }
  
    doc.setFontSize(8)
    //Recuadro infenior derecho
    doc.rect(pw - (pw/2)-4, 201 , 41, 6)
    doc.text(pw - (pw/2)+15, 205 , "TOTAL DE BINES", { align: 'center' })
    doc.rect(pw - 68, 201 , 40, 6)
  
    condiciones_materia_prima.forEach((it, i) => {
  
      // Dibujar el texto formateado
  
      // const label = condiciones_materia_prima.split(' ')
      // if (label.length > 1) {
     
      base_x += 20
  
    })

      //Insersion de los datos en el documento

      header.forEach((it, i) => {
        const textOptions = {
            maxWidth: it.maxWidth || 15,
            lineHeight: 3,
            fontSize: 5.5,
            align: 'left',
            isBold: false
        };
        
    })
  
  
  
      //FIRMAS
  
      doc.setFontSize(7)
      doc.line(8, 258, 50, 258)
      doc.line(125, 258, 180, 258)
  
      doc.text(17, 261 , "REALIZADO POR" )
      doc.text(134, 261 , "JEFA DE CONTROL DE CALIDAD" )
  
      doc.setFont('helvetica', 'normal')
  
     
  
  
  
  
  
  
  
  
    return doc
  }
  
  module.exports = {
    PDF_Mejorado,
  };
  