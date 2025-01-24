 function PDF_Mejorado(doc) {

  
  //VARIABLES POR  DEFECTO
  /*  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeigth = doc.internal.pageSize.getHeight();
  const x = 10;
  const y = 10;
  const width = pageWidth - 20;
  const height = pageHeigth - 20;  */

  //VARIABLES DEL OTRO PDF
  //var length = array.length;
  var i = 0;
  //var pages = 0;
  var turno_hora = "Dia";
  var revision = "6";
  //var supervisor = array[0].supervisor_c_f.supervisor;
  //var maquina = array[0].equipo_c_f.maquina;
  //var lote = array[0].lote;
  //var proveedor = array[0].proveedor;

/* 
  var correcciones = [];
  var fotosEtiqueta = [];    */

  var pw = doc.getPageWidth();

  var ph = doc.getPageHeight();

  /* if (length % 13 == 0) {
    pages = parseInt(length / 13);
  } else {
    pages = parseInt(length / 13) + 1;
  }
 */


    /* doc.addPage(1);
    doc.setPage(); */
    
    //var turno = array[0].turno;

    /* if (turno == "N") {
        turno_hora = "Noche";
    } */


    //var fecha = new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear();
    var fecha = "07/07/2021";
    //var paginacion = "Pagina " + index + " de " + pages;

    /* --- Header documento --- */
    doc.rect(8, 8, pw - 16, 15);
    doc.rect(8, 8, 45, 15);
   // doc.addImage(logoSP, "PNG", 13.0, 9, 35, 18.5, "right");
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    //yo puse el título
    doc.text(pw / 2, 17,' CONTROL DE PROCESO COLA FRESCO ', { align: "center" });
    doc.setFontSize(9);
    doc.rect(pw - 53, 8, 45, 5);
    doc.text(pw - 51, 11.2, "Código:");
    doc.rect(pw - 53, 13, 45, 5);
    doc.text(pw - 51, 16.8, "Versión:");
    doc.rect(pw - 53, 18, 45, 5);
    doc.text(pw - 51, 21.8, "Codigo:");
    doc.setFont("helvetica", "normal");
    doc.text(pw - 17.5, 11.2, revision, { align: "center" });
    doc.text(pw - 17.5, 16.8, fecha, { align: "center" });
    doc.text(pw - 17.5, 21.8, ' tuki tuki tuki', { align: "center" });
 

    doc.setFontSize(8);

   /*  let solo_fecha = array[0].Fecha.split(" ")[0];
    let solo_fecha_noche = array[0].fecha_actual.split(" ")[0];
    let solo_dia = solo_fecha_noche.split("-")[2];
    let fecha_turno = turno == "D" ? solo_fecha : solo_fecha + " Turno " + solo_dia + " " + turno_hora; */

    /* if (supervisor.length * 1.5 >= 30) {
        let strings_supervisor = supervisor.split(" ");
        supervisor = strings_supervisor[0] + " " + strings_supervisor[1] + " " + strings_supervisor[2];
    } */



    /* --- Información de Lote --- */
    // Fecha y Supervisor
    doc.text(16, 33, "Fecha:");
    doc.text(35, 33, "fecha_turno");
    doc.line(35, 35, 35, 35);
    doc.text(16, 40, "Supervisor:");

    /* if (supervisor.length <= 18) {
        doc.text(35, 40, supervisor, { maxWidth:30 });
    } else {
        doc.text(35, 38.1, supervisor, { maxWidth:35 });
    } */
    doc.line(35, 42, 55, 42);
    // Lote y Proveedor
    doc.text(pw / 4 + 16, 40, "Lote:");
    doc.text(pw / 4 + 28, 40, " " );
    doc.line(pw / 4 + 28, 42, pw / 4 + 68, 42);
    doc.text(pw / 2 + 16, 40, "Proveedor:");
   /*  if (proveedor.length <= 11) {
        doc.text(pw / 2 + 33, 40, proveedor, { maxWidth:40 });
    } else {
        doc.text(pw / 2 + 33, 38.1, proveedor, { maxWidth: 45 });
    } */

    doc.line(pw / 2 + 33, 42, pw / 2 + 68, 42);
    // Turno y Maquina
    doc.text(pw * (3 / 4) + 16, 33, "Turno:");
    doc.text(pw * (3 / 4) + 31, 33, turno_hora);
    doc.line(pw * (3 / 4) + 31, 35, pw - 16, 35);
    doc.text(pw * (3 / 4) + 16, 40, "Maquina:");
    doc.text(pw * (3 / 4) + 31, 40, " ");
    doc.line(pw * (3 / 4) + 31, 42, pw - 16, 42);


    
      /* --- Creacion de Tabla --- */
      doc.rect(8, 50, pw - 16, 112);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.text(11, 63, "Hora", null, 90);
      doc.line(14, 50, 14, 162);
      doc.text(18, 65, "Empaque", null,90);
      doc.line(pw - 276, 50, pw - 276, 162);

      //Agregado de Proveedor

      doc.text(28, 65, "Proveedor", null,90);
      doc.line(pw - 263, 50, pw - 263, 162);
      //Agregado de Lote
      doc.text(38, 63, "Lote",null,90);
      doc.line(pw - 256, 50, pw - 256, 162);


      doc.text(pw - 257 + 5, 60, "Talla", { align: "center" }, 0);
      doc.line(pw - 247, 50, pw - 247, 162);

      doc.text(pw - 248 + 5, 67, "Peso Bruto", null, 90);
      doc.line(pw - 241, 50, pw - 241, 162);

      doc.text(pw - 242 + 5, 67, "Peso Neto", null, 90);
      doc.line(pw - 234, 50, pw - 234, 162);

      doc.text(pw - 234 + 5, 67, "Cta./Total", null, 90);
      doc.line(pw - 226, 50, pw - 226, 162);

      doc.text(pw - 227 + 5, 67, "Cta./Lbs", null, 90);
      doc.line(pw - 218, 50, pw - 218, 162);

      //GGGGGGG
      doc.text(80, 60, "Uniformidad");
      doc.text(pw - 222 + 5, 69.5, "G");
      doc.line(pw - 214, 67, pw - 214, 162);
      doc.text(pw - 216 + 5, 69.5, "P");
      doc.line(pw - 208, 67, pw - 208, 162);
      doc.text(pw - 209 + 5, 69.5, "%", { align: "center" });
      doc.line(pw - 218, 67, pw - 8, 67);
      doc.line(pw - 202, 50, pw - 202, 162);
      doc.text(pw - 179 + 5, 63, "Flacidos", null, 90);
      doc.text(pw - 179 + 5, 69.5, "%", { align: "center" });
      doc.line(pw - 169, 50, pw - 169, 162);
      doc.text(pw - 169 + 5, 63, "Mudados", null, 90);
      doc.text(pw - 169 + 5, 69.5, "%", { align: "center" });
      doc.line(pw - 159, 50, pw - 159, 162);
      doc.text(pw - 159 + 5, 63, "Picados", null, 90);
      doc.text(pw - 159 + 5, 69.5, "%", { align: "center" });
      doc.line(pw - 149, 50, pw - 149, 162);
      doc.text(pw - 149 + 5, 66.1, "Semirosados", null, 90);
      doc.text(pw - 149 + 5, 69.5, "%", { align: "center" });
      doc.line(pw - 139, 50, pw - 139, 162);
      doc.text(pw - 139 + 5, 63, "Rosados", null, 90);
      doc.text(pw - 139 + 5, 69.5, "%", { align: "center" });
      doc.line(pw - 129, 50, pw - 129, 162);
      doc.text(pw - 129 + 5, 65, "Quebrados", null, 90);
      doc.text(pw - 129 + 8, 64, "en 3° seg.", null, 90);
      doc.text(pw - 129 + 5, 69.5, "%", { align: "center" });
      doc.line(pw - 119, 50, pw - 119, 162);
      doc.text(pw - 119 + 5, 60, "Mal", null, 90);
      doc.text(pw - 119 + 8, 66.3, "descabezados", null, 90);
      doc.text(pw - 119 + 5, 69.5, "%", { align: "center" });
      doc.line(pw - 109, 50, pw - 109, 162);
      doc.text(pw - 109 + 5, 66.3, "Deshidratados", null, 90);
      doc.text(pw - 109 + 5, 69.5, "%", { align: "center" });
      doc.line(pw - 99, 50, pw - 99, 162);
      doc.text(pw - 99 + 5, 63, "Melanosis", null, 90);
      doc.text(pw - 99 + 5, 69.5, "%", { align: "center" });
      doc.line(pw - 89, 50, pw - 89, 162);
      doc.text(pw - 89 + 5, 63, "Quebrados", null, 90);
      doc.text(pw - 89 + 5, 69.5, "%", { align: "center" });
      doc.line(pw - 79, 50, pw - 79, 162);
      doc.text(pw - 79 + 5, 63, "Corbatas", null, 90);
      doc.text(pw - 79 + 5, 69.5, "%", { align: "center" });
      doc.line(pw - 69, 50, pw - 69, 162);
      doc.text(pw - 69 + 5, 63, "Patas", null, 90);
      doc.text(pw - 69 + 5, 69.5, "%", { align: "center" });
      doc.line(pw - 59, 50, pw - 59, 162);
      doc.text(pw - 59 + 5, 63, "Deformes", null, 90);
      doc.text(pw - 59 + 5, 69.5, "%", { align: "center" });
      doc.line(pw - 49, 50, pw - 49, 162);
      doc.text(pw - 49 + 5, 63, "Juveniles", null, 90);
      doc.text(pw - 49 + 5, 69.5, "%", { align: "center" });
      doc.line(pw - 39, 50, pw - 39, 162);
      doc.text(pw - 39 + 5, 63, "Materiales", null, 90);
      doc.text(pw - 39 + 8, 63, "Extraños", null, 90);
      doc.text(pw - 39 + 5, 69.5, "%", { align: "center" });
      doc.line(pw - 29, 50, pw - 29, 162);
      doc.text(pw - 29 + 5, 60, "Total", null, 90);
      doc.text(pw - 29 + 8, 63, "Defectos", null, 90);
      doc.text(pw - 29 + 5, 69.5, "%", { align: "center" });
      doc.line(pw - 19, 50, pw - 19, 162);
      doc.text(pw - 19 + 10, 60, "T °C", { angle: 90, align: "center" });
      doc.text(pw - 19 + 5, 69.5, "%", { align: "center" });
      doc.line(8, 70, pw - 8, 70);
      doc.line(8, 77, pw - 8, 77);
      doc.line(8, 84, pw - 8, 84);
      doc.line(8, 91, pw - 8, 91);
      doc.line(8, 98, pw - 8, 98);
      doc.line(8, 105, pw - 8, 105);
      doc.line(8, 112, pw - 8, 112);
      doc.line(8, 119, pw - 8, 119);
      doc.line(8, 126, pw - 8, 126);
      doc.line(8, 133, pw - 8, 133);
      doc.line(8, 140, pw - 8, 140);
      doc.line(8, 147, pw - 8, 147);
      doc.line(8, 154, pw - 8, 154);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      //doc.text(16, 166, "*Rango de temperatura: <= 4.4°C");
  




      /* --- Footer del documento --- */
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(10, ph * 0.81, "Observaciones: ");
      //Agregado de lineas para escritura de observaciones
      doc.text(pw / 4 + 28, 40, " " );
      doc.line(42, 172, 280, 172);
      doc.line(12, 178, 280, 178);
      doc.line(12, 184, 280, 184);
    
  //modificacion
      doc.text(33, ph - 13, " ", { align: 'center', maxWidth:45 });
      doc.line(8, ph - 11, 58, ph - 11);
      doc.text(33, ph - 8, "Realizado por", { align: "center" });
  
      doc.text(pw / 5 + 8 + 25, ph - 13, " ",  { align: 'center', maxWidth:45 });
      doc.line(pw / 5 + 8, ph - 11, pw / 5 + 8 + 50, ph - 11);
      doc.text(pw / 5 + 8 + 25, ph - 8, "Supervisor de máquina", { align: "center" });
  
      doc.text(pw * (2 / 5) + 8 + 25, ph - 13, " ", { align: 'center', maxWidth:45 });
      doc.line(pw * (2 / 5) + 8, ph - 11, pw * (2 / 5) + 8 + 50, ph - 11);
      doc.text(pw * (2 / 5) + 8 + 25, ph - 8, "Jefe de planta", { align: "center" });
  
      doc.text(pw * (3 / 5) + 8 + 25, ph - 13, " ", { align: 'center', maxWidth:45 });
      doc.line(pw * (3 / 5) + 8, ph - 11, pw * (3 / 5) + 8 + 50, ph - 11);
      doc.text(pw * (3 / 5) + 8 + 25, ph - 8, "Jefe de control calidad", { align: "center" });
  
      doc.text(pw * (4 / 5) + 8 + 22, ph - 13, " ", { align: 'center', maxWidth:45 });
      doc.line(pw * (4 / 5) + 8, ph - 11, pw - 8, ph - 11);
      doc.text(pw * (4 / 5) + 8 + 22, ph - 8, "Verificado por", { align: "center" });
  
      doc.setFont("helvetica", "normal");
      doc.setFontSize(6);

    

  return doc
}

module.exports = {
  PDF_Mejorado,
};
