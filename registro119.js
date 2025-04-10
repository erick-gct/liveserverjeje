function PDF_Mejorado(doc) {

    //CAMBIAR LA ORIENTACIÓN DE LA PÁGINA A HORIZONTAL
    const parseSafe = it => (it ?? '').toString()
    const headerbase_x = 9
    const header = [
      {
          label: 'HORA ',
          value: 'fecha_control',
          x: headerbase_x+4,
          //formatter: it => parseSafe(it?.split(' ')[0]),
          maxWidth: 9,
          maxHeigth: 30,
      },
      {
          label: 'FECHA',
          value: 'fecha_control',
          x: headerbase_x + 19,
          formatter: it => parseSafe(it?.split(' ')[1]),
          maxWidth: 10,
          maxHeigth: 7,
      },
      {
        label: 'TURNO',
        value: 'turno',
        x: headerbase_x + 35,
        formatter: it => parseSafe(it?.split(' ')[1]),
        maxWidth: 10,
        maxHeigth: 7,
    },
      {
          label: 'LOTE',
          value: 'lote',
          x: headerbase_x + 50,
          formatter: it => parseSafe(it),
          maxWidth: 10,
          maxHeigth: 7,
      },
      {
          label: 'CAMARONERA',
          value: 'camaronera',
          x: headerbase_x + 63,
          formatter: it => parseSafe(it),
          maxWidth: 16,
          maxHeigth: 7,
      },
      {
          label: 'PISC',
          value: 'piscina',
          x: headerbase_x + 84,
          formatter: it => parseSafe(it?.descripcion),
          maxWidth: 9,
          maxHeigth: 7,
      },
      {
          label: 'N. GAVETAS',
          value: 'gavetas',
          x: headerbase_x + 98,
          formatter: it => parseSafe(it),
          maxWidth: 17,
          maxHeigth: 15,
      },
      {
          label: 'N. MOVIL',
          value: 'movil',
          x: headerbase_x + 115,
          formatter: it => parseSafe(it?.descripcion),
          maxWidth: 16,
          maxHeigth: 15,
      },
      {
          label: 'CONSUMO INICIAL NaOH',
          value: 'consumo_inicial',
          x: headerbase_x + 130,
          formatter: it => parseSafe(it?.nombre),
          maxWidth: 25,
          maxHeigth: 7,
      },
      {
          label: 'CONSUMO FINAL NaOH',
          value: 'consumo_final',
          x: headerbase_x + 158,
          formatter: it => parseSafe(it),
          maxWidth: 25,
          maxHeigth: 7,
      },
   
      {
          label: 'RESULTADO',
          value: 'resultado',
          x: headerbase_x + 184,
          formatter: it => parseSafe(it),
          maxWidth: 15,
          maxHeigth: 7,
      },
      {
        label: 'RESIDUAL',
        value: 'residual',
        x: headerbase_x + 204,
        formatter: it => parseSafe(it),
        maxWidth: 15,
        maxHeigth: 7,
    },
    {
        label: 'RESPONSABLE',
        value: 'responsable',
        x: headerbase_x + 220,
        formatter: it => parseSafe(it),
        maxWidth: 20,
        maxHeigth: 7,
    },

  
      {
          label: 'OBSERVACIONES',
          value: 'observaciones',
          x: headerbase_x + 244,
          formatter: it => parseSafe(it),
          maxWidth: 25,
          maxHeigth: 7,
      },
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
    
  
    const pw = doc.getPageWidth()
  
   
    const codigo = 'RC.CC.119'
    const analisis = 'REGISTRO DE SULFITOS METODO MONIER WILLIAM EN MATERIA PRIMA Y PROCESO' 
    //const subtitulo = '(Record of sulphites by BioFish method in raw material and process)'
    let totalPages = 0
    let newIdx = 0
    const revision = '3'
    const fechaRevision = '28/11/2021'
    //const pages = array.length
    const itemsPerPage = 5 //Ingresar cantidad de registros que se desee ver por página :D
  
    const intervalos_melanosis = ['1h', '2h', '3h', '4h', '6h', '8h', '10h', '12h']
    const unidades_con_melanosis = ['CRUDOS', 'COCIDOS']
  
      /* --- Header documento --- */
    doc.rect(8, 8, pw - 16, 16)
    doc.rect(8, 8, 25, 16)
    doc.text(15, 15, 'Logo', { align: 'center' })
    //doc.addImage(logoSP, 'PNG', 11, 9, 18.5, 18.5, 'right')
    doc.setFontSize(8.5)
    doc.setFont('helvetica', 'bold')
    doc.text(pw / 2.2, 16, analisis, { align: 'center' })
    doc.setFont('helvetica', 'normal')
    //doc.text(pw / 2.2, 20, subtitulo, { align: 'center', maxWidth: 200, fontbold: false })
  
    doc.setFontSize(6)
    doc.setFont('helvetica', 'bold')
    doc.rect(pw - 58, 8, 50, 4)
    doc.text(pw - 54, 11, 'Revision (Review):')
    doc.rect(pw - 58, 12, 50, 4)
    doc.text(pw - 54, 15, 'Fecha (Date):')
    doc.rect(pw - 58, 16, 50, 4)
    doc.text(pw - 54, 19, 'Codigo (Code):')
    doc.setFont('helvetica', 'normal')
    doc.text(pw - 20, 11, revision, { align: 'center' })
    doc.text(pw - 20, 15, fechaRevision, { align: 'center' })
    doc.text(pw - 20, 19, codigo, { align: 'center' })
    doc.rect(pw - 58, 20, 50, 4)
    doc.line(pw - 33, 8, pw - 33, 20)
    doc.text(pw - 33, 23, "Pagina 1 de 1", { align: 'center' })  

  
  
       /* --- Header documento --- */
  
          /* --- Body documento --- */
  
    const [a, ,b] = [1,2,3]
    //bruh 
  
    let x = 38
    let y = 10
    const jump = 6.5
    let header_x = 30
    const header_y = 30
  
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7)
 
  
    doc.rect(8, 26, pw - 16, 155)
    for (let i = 0; i < 23; i++) {
        doc.line(8, x, pw - 8, x)
        x += jump
    }
    function drawFormattedText(doc, text, x, y, options = {}) {
      const {
          maxWidth = 15,
          lineHeight = 3,
          fontSize = 4.5,
          align = 'left',
          isBold = true
      } = options; 
  
      const maxHeight = 7; // Altura máxima de la línea
  
  
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
  
    doc.setFontSize(4.5)
  
  
      //Agregar los headers o titulos de cada columna
        header.forEach((it, i) => {
  
            const textOptions = {
              maxWidth: it.maxWidth || 15,
              lineHeight: 3,
              fontSize: 5.5,
              align: 'left',
              isBold: true
          };
          // Dibujar el texto formateado
          drawFormattedText(doc, it.label, it.x, header_y, textOptions);
          
          // Dibujar línea vertical
          if (i > 0) {
              doc.line(it.x - 2, 26, it.x - 2, 181);
          }
           
          })
          
          //linea horizontal debajo de los headers
          doc.line( 8, 32, pw - 8, 32)
  
          
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
  
     // doc.line(65, 258, 105, 258)
     doc.setFontSize(7)
      doc.line(115, 202, 168, 202)
      
      doc.text(125, 205 , "Jefe de Control de Calidad" )

  



  return doc
}

module.exports = {
  PDF_Mejorado,
};
