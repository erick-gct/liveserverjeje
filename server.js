const express = require('express');
const {jsPDF} = require('jspdf');
const fs = require('fs');
const path = require('path');
const { PDF_Mejorado, PDF_Control_PT_Cola_VAC_Fresco } = require('./funciones.pdf');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/generate-pdf', (req, res) => {
    // const registros = JSON.parse(fs.readFileSync('./test.json', 'utf8'));
    // const parametros = {
    //     tipo_control: {
    //         value: 'IQF'
    
    //     },
    //     lote: null,
    //     fecha: '2024-08-12',
    //     area: {value:'IQFcocido'},
    //     turno: {text:'D'},
    //     tipo_muestreo: { value: 'PRODUCTO TERMINADO'}
    // };
    // Inicializa jsPDF o la librería que estés usando
    const doc = new jsPDF('l'); // Asegúrate de usar la librería que estés usando
    let d = PDF_Mejorado(doc);
    d.save('output.pdf');
    // PDF_Control_PT_Cola_VAC_Fresco(doc, registros, parametros);
    const filePath = path.join(__dirname, 'output.pdf');
    fs.writeFileSync(filePath, doc.output()); // Guarda el PDF directamente en un archivo

    res.sendFile(filePath);
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});