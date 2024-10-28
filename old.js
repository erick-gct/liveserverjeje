

function PDF_Control_PT_Cola_VAC_Fresco(doc, array, parametros) {
    // Agrupar datos por fecha_etiquetado
    const groupedData = aplicarFiltroLoteYAgruparPorFechaEtiqueta(array, parametros)
    let pages = 1
    const dataPorcentaje = [
        'mudados',
        'flacidez',
        'deformes',
        'picados',
        'cola_floja',
        'deshidratados',
        'principio_melanosis',
        'melanosis',
        'pelado_vena',
        'falta_corte',
        'corte_largo',
        'corte_profundo',
        'corte_irregular',
        'cascara',
        'patas',
        'quebrados',
        'luxados',
        'quebrado_3',
        'cola_danada',
        'pedazos',
        'corbatas',
        'rosados',
        'semi_rosados',
        'mal_descabezado',
        'juveniles',
        'intestinos',
        'residuos_venas',
        'cascara_floja',
        'mal_desvenado',
        'sin_telson',
        'total_defecto',
    ]

    Object.keys(groupedData).forEach((date, idx) => {
        const dataForDate = groupedData[date]
        let length = dataForDate.length
        let k = 0
        let page_tmp = 0

        while (k < length) {
            if (k > 0 && k % 4 === 0) {
                pages++;
                doc.addPage();
                doc.setPage(pages);
            }

            const pw = doc.getPageWidth()
            const correcciones = []
            const observaciones = []
            const fotos = []
            const revisado_por = dataForDate[0].revisado_por ?? ''

            // Crear líneas horizontales
            doc.setLineWidth(0.5)
            doc.setDrawColor(0) // Negro


            const paginacion = `Pagina ${k} de ${page_tmp}`

            const lineData = [
                { startX: 30, startY: 258.5, endX: pw + 10, endY: 258.5, size: 15 },
                { startX: 10, startY: 262, endX: pw - 10, endY: 262, size: 15 },
                { startX: 10, startY: 266, endX: pw - 10, endY: 265.5, size: 20 },
                { startX: 10, startY: 270, endX: pw - 10, endY: 269, size: 25 },
            ]

            for (const linea of lineData) {
                doc.line(32, linea.startY, pw - 8, linea.startY) // Coordenadas x1, y1, x2, y2
            }

            // Especificar las coordenadas y tamaño de la última línea horizontal
            const lastLine = { startX: 8, startY: 274, endX: pw - 8, endY: 274, size: 10 }

            // Crear la última línea horizontal
            doc.setLineWidth(0.5)
            doc.line(lastLine.startX, lastLine.startY, lastLine.endX, lastLine.endY)

            /* --- Header documento --- */
            doc.rect(8, 8, pw - 16, 20)
            doc.rect(8, 8, 45, 20)
            doc.setFontSize(9)
            doc.setFont('helvetica', 'bold')
            doc.text(pw / 2, 18, 'CONTROL DE PRODUCTO TERMINADO PARA CAMARON COLA', { align: 'center' })
            doc.text(pw / 2, 22, 'Y VALOR AGREGADO CONGELADO/FRESCO', { align: 'center' })
            doc.rect(pw - 53, 8, 45, 5)
            doc.text(pw - 51, 11.2, 'Revision:')
            doc.rect(pw - 53, 13, 45, 5)
            doc.text(pw - 51, 16.8, 'Fecha:')
            doc.rect(pw - 53, 18, 45, 5)
            doc.text(pw - 51, 21.8, 'Codigo:')
            doc.setFont('helvetica', 'normal')
            doc.text(pw - 17.5, 11.2, '7', { align: 'center' })
            doc.text(pw - 17.5, 16.8, '01/11/2023', { align: 'center' })
            doc.text(pw - 17.5, 21.8, 'RC.CC.108', { align: 'center' })
            doc.rect(pw - 53, 23, 45, 5)
            doc.line(pw - 33, 8, pw - 33, 23)
            doc.text(pw - 33, 26.8, paginacion, { align: 'center' })

            doc.setFontSize(8)
            doc.setFont('helvetica', 'bold')
            doc.line(pw / 4 - 5, 33, pw / 4 + 5, 33)
            doc.text(pw / 4 - 15, 33, 'IQF:')
            doc.line(pw / 2 - 5, 33, pw / 2 + 5, 33)
            doc.text(pw / 2 - 24, 33, 'BLOQUE:')
            doc.line((3 * pw) / 4 - 5, 33, (3 * pw) / 4 + 5, 33)
            doc.text((3 * pw) / 4 - 22, 33, 'OTRO:')

            if (parametros.tipo_control.value === 'IQF')
                doc.text(pw / 4 - 1, 32, 'X')

            if (parametros.tipo_control.value === 'BLOQUE')
                doc.text(pw / 2 - 1, 32, 'X')

            if (parametros.tipo_control.value === 'OTRO')
                doc.text((3 * pw) / 4 - 1, 32, 'X')


            doc.text(pw / 11, 39, 'Fecha:')
            doc.line(pw / 11 + 12, 39, pw / 11 + 42, 39)
            doc.text(pw / 11, 44, 'Area:')
            doc.line(pw / 11 + 12, 44, pw / 11 + 42, 44)
            doc.text(pw - 70, 39, 'Turno:')
            doc.line(pw - 50, 39, pw - 20, 39)
            doc.setFont('helvetica', 'normal')

            doc.text(pw / 11 + 27, 38, dataForDate[0].fecha, { align: 'center' }) //Fecha
            doc.text(pw / 11 + 27, 43, parametros.area.value, { align: 'center' }) //Area
            doc.text(pw - 35, 38, parametros.turno.text, { align: 'center' }) //Turno

            // Crear rectángulo
            doc.rect(8, 46, pw - 16, 236)

            // Crear líneas horizontales dentro del rectángulo
            let startY = 46
            const lineSpacing = 4
            const numHorizontalLines = 59

            for (let i = 0; i < numHorizontalLines; i++) {
                // Omitir la línea número 20 y las últimas 6 líneas
                if (i !== 19 && i < 53) {
                    doc.line(8, startY, pw - 8, startY)
                }
                startY += lineSpacing
            }

            // Crear líneas verticales dentro del rectángulo
            let startX = 54
            const verticalLineSpacing = (pw - 20) / 5 // Distribuir verticalmente en el rectángulo
            const numVerticalLines = 4

            for (let j = 0; j < numVerticalLines; j++) {
                doc.line(startX, 46, startX, 274) // Ajustar la coordenada y para que las líneas estén dentro del rectángulo
                startX += verticalLineSpacing
            }

            let index_y = startX - 88

            doc.line(32, index_y, 32, index_y + 8)
            doc.line(72, index_y, 72, index_y + 8)
            doc.line(112, index_y, 112, index_y + 8)
            doc.line(152, index_y, 152, index_y + 8)
            doc.line(187, index_y, 187, index_y + 8)

            doc.line(32, index_y + 4, 53.8, index_y + 4)
            doc.line(72, index_y + 4, 91.5, index_y + 4)
            doc.line(112, index_y + 4, 130, index_y + 4)
            doc.line(152, index_y + 4, 168, index_y + 4)
            doc.line(187, index_y + 4, 202, index_y + 4)
            index_y = startX + 48
            doc.line(32, index_y, 32, index_y + 20)

            index_y = startX + 67
            doc.line(54, index_y, 54, index_y + 9)

            doc.setFontSize(6.5)
            doc.text(29, 49, 'Tipo de Producto', { align: 'center' })
            doc.text(29, 53, '*Presentación', { align: 'center' })
            doc.text(29, 57, '**Tipo de Muestreo', { align: 'center' })
            doc.text(29, 61, 'Hora', { align: 'center' })
            doc.text(29, 65, 'Lote', { align: 'center' })
            doc.text(29, 69, 'Cliente', { align: 'center' })
            doc.text(29, 73, 'T °C', { align: 'center' })
            doc.text(29, 77, 'Talla Real', { align: 'center' })
            doc.text(29, 81, 'Talla Marcada', { align: 'center' })
            doc.text(29, 85, 'Peso Bruto', { align: 'center' })
            doc.text(29, 89, 'Peso sin funda/congelado/fresco', { align: 'center' })
            doc.text(29, 93, 'Peso Neto', { align: 'center' })
            doc.text(29, 97, '% Glaseo', { align: 'center' })
            doc.text(29, 101, 'Cuenta Total', { align: 'center' })
            doc.text(29, 105, 'Cta x kg y/o lb Congelada', { align: 'center' })
            doc.text(29, 109, 'Cta x kg y/o lb Final', { align: 'center' })
            doc.text(29, 113, 'Olor', { align: 'center' })
            doc.text(29, 117, 'Sabor', { align: 'center' })

            doc.text(20, 123, 'Uniformidad', { align: 'center' })
            doc.text(43, 121, 'G', { align: 'center' })
            doc.text(43, 125, 'P', { align: 'center' })

            doc.text(29, 129, '% Mudados', { align: 'center' })
            doc.text(29, 133, '% Flacidez', { align: 'center' })
            doc.text(29, 137, '% Deformes', { align: 'center' })
            doc.text(29, 141, '% Picados', { align: 'center' })
            doc.text(29, 145, '% Cola Floja', { align: 'center' })
            doc.text(29, 149, '% Deshidratados', { align: 'center' })
            doc.text(29, 153, '% Principio de Melanosis', { align: 'center' })
            doc.text(29, 157, '% Melanosis', { align: 'center' })
            doc.text(29, 161, '% PUD (Pelado con Vena Sin Corte)', { align: 'center' })
            doc.text(29, 165, '% Falta de Corte', { align: 'center' })
            doc.text(29, 169, '% Corte Largo (Hasta 6to segmento)', { align: 'center' })
            doc.text(29, 173, '% Corte Profundo', { align: 'center' })
            doc.text(29, 177, '% Corte Irregular', { align: 'center' })
            doc.text(29, 181, '% Cascaras', { align: 'center' })
            doc.text(29, 185, '% Patas', { align: 'center' })
            doc.text(29, 189, '% Quebrados', { align: 'center' })
            doc.text(29, 193, '% Luxados', { align: 'center' })
            doc.text(29, 197, '% Quebrados 3er Segmento', { align: 'center' })
            doc.text(29, 201, '% Cola Dañada', { align: 'center' })
            doc.text(29, 205, '% Pedazos', { align: 'center' })
            doc.text(29, 209, '% Corbatas', { align: 'center' })
            doc.text(29, 213, '% Rosados', { align: 'center' })
            doc.text(29, 217, '% Semi-Rosados', { align: 'center' })
            doc.text(29, 221, '% Mal Descabezados', { align: 'center' })
            doc.text(29, 225, '% Juveniles', { align: 'center' })
            doc.text(29, 229, '% Intestinos', { align: 'center' })
            doc.text(29, 233, '% Residuos de Venas', { align: 'center' })
            doc.text(29, 237, '% Cáscara Floja o 6to Segmento', { align: 'center' })
            doc.text(31, 241, '% Mal desvenado (inestinos 4to segmento)', { align: 'center' })
            doc.text(29, 245, '% Sin Telson', { align: 'center' })
            doc.text(29, 249, '% Total de Defectos', { align: 'center' })
            doc.text(29, 253, '*** Calidad (A)/(R)', { align: 'center' })

            doc.setFontSize(5)
            doc.text(43, 256, 'Fundas correctamente', { align: 'center' })
            doc.text(43, 257.5, 'selladas', { align: 'center' })
            doc.text(43, 261, 'Etiquetado', { align: 'center' })
            doc.text(43, 264, 'Declara Sulfitos', { align: 'center' })
            doc.text(43, 265.5, '(Si/No)', { align: 'center' })
            doc.text(43, 268, 'Declara Crustáceos', { align: 'center' })
            doc.text(43, 269.5, '(Camarón) (Si/No)', { align: 'center' })
            doc.text(43, 273, 'Tratamiento (Si/No)', { align: 'center' })

            doc.setFontSize(7)
            doc.text(29, 279, 'OBSERVACIONES', { align: 'center' })
            doc.text(20, 264.5, 'Material de', { align: 'center' })
            doc.text(20, 268.5, 'Empaque', { align: 'center' })

            const allHaveSupervisor = dataForDate.every(item =>
                item.firmas.some(
                    firma =>
                        firma.rol_id === 47 &&
                        firma.firma && // Comprueba que firma no sea null
                        firma.firma.user && // Comprueba que user no sea null
                        firma.firma.user.name !== undefined // Asegura que name está definido
                )
            )
            let supervisor = ''
            let supervisorFechaHora = ''
            if (allHaveSupervisor) {
                supervisor = dataForDate[0].firmas.find(firma => firma.rol_id === 47)?.firma?.user?.name
                supervisorFechaHora = dataForDate[0].firmas.find(firma => firma.rol_id === 47)?.created_at || ''
                supervisorFechaHora = `${supervisorFechaHora?.split('T')[0] || ''} ${supervisorFechaHora?.split('T')[1]?.slice(0, 8) || ''}`
            } else if (dataForDate[0].ult_fecha <= '2024-08-08 00:00:00') {
                supervisor = dataForDate[0].Supervisor ?? ''
            }

            const allHaveJefeCalidad = array.every(item =>
                item.firmas.some(
                    firma =>
                        firma.rol_id === 46 && firma.firma && firma.firma.user && firma.firma.user.name !== undefined
                )
            )
            let jefe_calidad = ''
            let jefeCalidadFechaHora = ''
            if (allHaveJefeCalidad) {
                jefe_calidad = dataForDate[0].firmas.find(firma => firma.rol_id === 46)?.firma?.user?.name
                jefeCalidadFechaHora = dataForDate[0].firmas.find(firma => firma.rol_id === 46)?.created_at || ''
                jefeCalidadFechaHora = `${jefeCalidadFechaHora?.split('T')[0] || ''} ${jefeCalidadFechaHora?.split('T')[1]?.slice(0, 8) || ''}`
            } else if (dataForDate[0].ult_fecha <= '2024-08-08 00:00:00') {
                jefe_calidad = 'Dra. Rita Montiel'
            }

            const allHaveJefePlanta = array.every(item =>
                item.firmas.some(
                    firma =>
                        firma.rol_id === 50 && firma.firma && firma.firma.user && firma.firma.user.name !== undefined
                )
            )
            let jefe_planta = ''
            let jefePlantaFechaHora = ''
            if (allHaveJefePlanta) {
                jefe_planta = dataForDate[0].firmas.find(firma => firma.rol_id === 50)?.firma?.user?.name
                jefePlantaFechaHora = dataForDate[0].firmas.find(firma => firma.rol_id === 50)?.created_at || ''
                jefePlantaFechaHora = `${jefePlantaFechaHora?.split('T')[0] || ''} ${jefePlantaFechaHora?.split('T')[1]?.slice(0, 8) || ''}`
            } else if (dataForDate[0].ult_fecha <= '2024-08-08 00:00:00') {
                jefe_planta = array[0].Jefe_planta ?? ''
            }

            const monitor = dataForDate[k].ult_usu ?? ''
            let monitorFechaHora = ''

            const fecha = dataForDate[k].ult_fecha ?? ''
            monitorFechaHora = fecha <= '2024-08-08 00:00:00' ? '' : fecha

            doc.text(pw / 5, 286, monitor, { align: 'center' })
            doc.text(pw / 5, 289, monitorFechaHora, { align: 'center' })
            doc.line(pw / 5 - 15, 290, pw / 5 + 15, 290)
            doc.text(pw / 5, 293, 'Realizado por:', { align: 'center' })

            doc.text((2 * pw) / 5, 286, jefe_calidad, { align: 'center' })
            doc.text((2 * pw) / 5, 289, jefeCalidadFechaHora, { align: 'center' })
            doc.line((2 * pw) / 5 - 15, 290, (2 * pw) / 5 + 15, 290)
            doc.text((2 * pw) / 5, 293, 'Verificado por:', { align: 'center' })

            doc.text((3 * pw) / 5, 286, supervisor, { align: 'center' })
            doc.text((3 * pw) / 5, 289, supervisorFechaHora, { align: 'center' })
            doc.line((3 * pw) / 5 - 15, 290, (3 * pw) / 5 + 15, 290)
            doc.text((3 * pw) / 5, 293, 'Supervisor:', { align: 'center' })

            doc.text((4 * pw) / 5, 286, jefe_planta, { align: 'center' })
            doc.text((4 * pw) / 5, 289, jefePlantaFechaHora, { align: 'center' })
            doc.line((4 * pw) / 5 - 15, 290, (4 * pw) / 5 + 15, 290)
            doc.text((4 * pw) / 5, 293, 'Jefe de Planta:', { align: 'center' })

            let x_coor = 73
            doc.setFontSize(6)

            for (let index = 1; index < 5 && k < length; index++, k++) {
                // Especificar las coordenadas y tamaños de las líneas

                doc.text(x_coor, 49, dataForDate[k].tipo_producto, { align: 'center' })
                doc.text(x_coor, 53, `${dataForDate[k].presentacion} ${dataForDate[k].unidad_medida}`, {
                    align: 'center',
                })
                doc.text(x_coor, 57, dataForDate[k].tipo_muestreo, { align: 'center' })
                const fecha_split = dataForDate[k].ult_fecha.split(' ')
                doc.text(x_coor, 61, fecha_split[1], { align: 'center' })
                doc.text(x_coor, 65, dataForDate[k].lote, { align: 'center' })

                if (dataForDate[k].cliente.nombre.length <= 15) {
                    doc.text(x_coor, 69, dataForDate[k].cliente.nombre, { align: 'center' })
                } else {
                    doc.text(x_coor, 68, dataForDate[k].cliente.nombre.slice(0, 15), { align: 'center' })
                    doc.text(x_coor, 69.7, dataForDate[k].cliente.nombre.slice(15, 30), { align: 'center' })
                }

                if (dataForDate[k].temperatura > -18) {
                    doc.setTextColor(255, 0, 0) // Establece el color del texto a rojo
                }
                doc.text(x_coor, 73, `${dataForDate[k].temperatura.toString()} °C`, { align: 'center' })
                doc.setTextColor(0, 0, 0) // Restablece el color del texto a negro

                doc.text(x_coor, 77, dataForDate[k].talla_real.descripcion, { align: 'center' })
                doc.text(x_coor, 81, dataForDate[k].talla_marcada.descripcion, { align: 'center' })
                doc.text(
                    x_coor,
                    85,
                    `${dataForDate[k].peso_bruto} ${dataForDate[k].unidad_medida === 'LB' ? 'LB' : 'KG'}`,
                    {
                        align: 'center',
                    }
                )
                doc.text(
                    x_coor,
                    89,
                    `${dataForDate[k].peso_sin_funda} ${dataForDate[k].unidad_medida === 'LB' ? 'LB' : 'KG'}`,
                    {
                        align: 'center',
                    }
                )
                doc.text(
                    x_coor,
                    93,
                    `${dataForDate[k].peso_neto} ${dataForDate[k].unidad_medida === 'LB' ? 'LB' : 'KG'}`,
                    {
                        align: 'center',
                    }
                )
                doc.text(x_coor, 97, dataForDate[k].glaseo.toString(), { align: 'center' })
                doc.text(x_coor, 101, dataForDate[k].cuenta_total.toString(), { align: 'center' })
                doc.text(x_coor, 105, dataForDate[k].cta_congelada.toString(), { align: 'center' })
                doc.text(x_coor, 109, dataForDate[k].cta_final.toString(), { align: 'center' })
                doc.text(x_coor, 113, dataForDate[k].olor, { align: 'center' })
                doc.text(x_coor, 117, dataForDate[k].sabor, { align: 'center' })

                doc.text(x_coor - 10, 123, dataForDate[k].uniformidad_t.toString(), { align: 'center' })
                doc.text(x_coor + 9, 121, dataForDate[k].uniformidad_g.toString(), { align: 'center' })
                doc.text(x_coor + 9, 125, dataForDate[k].uniformidad_p.toString(), { align: 'center' })
                const pesoNeto = Number.parseFloat(dataForDate[k].peso_neto)
                let initY = 129
                Object.values(dataPorcentaje).forEach(it => {
                    const tmpvalue = ((Number.parseFloat(dataForDate[k][it]) * 100) / pesoNeto).toFixed(2)
                    if (it === 'residuo_venas' && dataForDate[k][it] > 0) doc.setTextColor(255, 0, 0)
                    doc.text(x_coor, initY, tmpvalue, { align: 'center' })
                    initY += 4
                })
                doc.text(x_coor, 253, dataForDate[k].calidad, { align: 'center' })

                doc.text(x_coor, 257, dataForDate[k].fundas === 'S' ? 'Si' : 'No', { align: 'center' })
                doc.text(x_coor, 261, dataForDate[k].etiquetado === 'S' ? 'Si' : 'No', { align: 'center' })
                doc.text(x_coor, 265, dataForDate[k].sulfitos === 'S' ? 'Si' : 'No', { align: 'center' })
                doc.text(x_coor, 269, dataForDate[k].crustaceos === 'S' ? 'Si' : 'No', { align: 'center' })
                doc.text(x_coor, 273, dataForDate[k].tratamiento === 'S' ? 'Si' : 'No', { align: 'center' })

                if (dataForDate[k].correccion != null) {
                    dataForDate[k].correccion.forEach(correccion => {
                        correcciones.push({
                            lugar: correccion.Lugar,
                            accion: correccion.Acciones,
                            problema: correccion.Problema,
                            desviacion: correccion.Desviacion,
                            observacion: correccion.ObserCorreccion,
                            fecha_cor: correccion.FechaCrea,
                            fecha_vef: correccion.FechaVerificacion,
                            verifica: correccion.ResponsableArea,
                            usuario: correccion.ResponsableSeguimiento,
                        })
                    })
                }

                if (dataForDate[k].fotos.length > 0) {
                    dataForDate[k].fotos.forEach(element => {
                        fotos.push({
                            ruta: element.url,
                            nombreFoto: element.Nombre,
                        })
                    })
                }

                if (dataForDate[k].observacion != null && !observaciones.includes(dataForDate[k].observacion)) {
                    observaciones.push(dataForDate[k].observacion.replaceAll('\n', ' ').replaceAll('\r', ' '))
                }

                // k += 1
                x_coor += 38
            }

            if (observaciones.length > 0) {
                const observacion = observaciones.join(', ')
                if (observacion.length <= 150) {
                    doc.text(56, 279, observacion)
                } else if (observacion.length > 150 && observacion.length <= 300) {
                    doc.text(56, 278, observacion.slice(0, 150))
                    doc.text(56, 280, observacion.slice(150, 300))
                } else if (observacion.length > 300) {
                    doc.text(56, 277, observacion.slice(0, 150))
                    doc.text(56, 279, observacion.slice(150, 300))
                    doc.text(56, 281, observacion.slice(300, 450))
                }
            }

            length = correcciones.length
            if (length > 0) {

                let i = 0
                let observacion = ''
                const obser = []

                let pagesForCorrecciones = Math.ceil(length / 3)

                for (let index = 0; index < pagesForCorrecciones; index++) {
                    if (index>0 || index % 4 === 0) {
                        pages++
                        doc.addPage('', 'l')
                        doc.setPage(pages)

                        const pw = doc.getPageWidth()
                        const ph = doc.getPageHeight()
                        const limite = 3 * (index + 1 - pages)
                        const paginacion = `Pagina ${index + 1 - pages} de ${pagesForCorrecciones}`

                        /* --- Header documento --- */
                        doc.rect(8, 8, pw - 16, 20)
                        doc.rect(8, 8, 45, 20)
                        doc.setFontSize(12)
                        doc.setFont('helvetica', 'bold')
                        doc.text(pw / 2, 20, 'REGISTRO DE ACCIONES CORRECTIVAS', { align: 'center' })
                        doc.setFontSize(9)
                        doc.rect(pw - 53, 8, 45, 5)
                        doc.text(pw - 51, 11.2, 'Revision:')
                        doc.rect(pw - 53, 13, 45, 5)
                        doc.text(pw - 51, 16.8, 'Fecha:  ')
                        doc.rect(pw - 53, 18, 45, 5)
                        doc.text(pw - 51, 21.8, 'Codigo:')
                        doc.setFont('helvetica', 'normal')
                        doc.text(pw - 17.5, 11.2, '4', { align: 'center' })

                        const fecha = '22/04/21' //  Fecha de Creacion/Revision del formato
                        // del registro de Acciones Correctivas
                        doc.text(pw - 17.5, 16.8, fecha, { align: 'center' })
                        doc.text(pw - 17.5, 21.8, 'RC.CC.201', { align: 'center' })
                        doc.rect(pw - 53, 23, 45, 5)
                        doc.line(pw - 33, 8, pw - 33, 23)
                        doc.text(pw - 33, 26.8, paginacion, { align: 'center' })

                        /* --- Tabla de documento --- */
                        doc.rect(8, 28, pw - 16, 100)

                        doc.line(8, 38, pw - 8, 38)
                        doc.line(149, 48, 170, 48)
                        doc.line(206, 48, pw - 8, 48)
                        doc.line(8, 56, pw - 8, 56)
                        doc.line(8, 80, pw - 8, 80)
                        doc.line(8, 104, pw - 8, 104)

                        doc.line(23, 38, 23, 128)
                        doc.line(53, 38, 53, 128)
                        doc.line(101, 38, 101, 128)
                        doc.line(149, 38, 149, 128)
                        doc.line(159.5, 48, 159.5, 128)
                        doc.line(170, 38, 170, 128)
                        doc.line(188, 56, 188, 128)
                        doc.line(206, 38, 206, 128)
                        doc.line(224, 48, 224, 128)
                        doc.line(242, 38, 242, 128)
                        doc.line(265.5, 48, 265.5, 128)

                        doc.setFontSize(8)
                        doc.setFont('helvetica', 'bold')
                        doc.text(16, 35, 'FECHA:')
                        doc.text(30, 35, dataForDate[0].fecha)
                        doc.text(11, 49, 'HORA')
                        doc.text(38, 44, 'LUGAR / ETAPA', { align: 'center' })
                        doc.text(38, 47, 'DE PROCESO /', { align: 'center' })
                        doc.text(38, 50, 'PRODUCTO', { align: 'center' })
                        doc.text(38, 53, 'AFECTADO', { align: 'center' })
                        doc.text(77, 47, 'DESCRIPCION DEL', { align: 'center' })
                        doc.text(77, 50, 'PROBLEMA / DESVIACION', { align: 'center' })
                        doc.text(125, 49, 'ACCIONES TOMADAS', { align: 'center' })
                        doc.text(159.5, 42, 'DESVIACIÓN', { align: 'center' })
                        doc.text(159.5, 45, '(Corregido)', { align: 'center' })
                        doc.text(153, 53, 'Si')
                        doc.text(163, 53, 'No')
                        doc.text(188, 45, 'FECHA Y HORA DE LA', { align: 'center' })
                        doc.text(188, 48, 'VERIFICACIÓN DE LA', { align: 'center' })
                        doc.text(188, 51, 'CORRECCIÓN', { align: 'center' })
                        doc.text(224, 42, 'RESPONSABLE DE', { align: 'center' })
                        doc.text(224, 45, 'AREA O PRODUCTO', { align: 'center' })
                        doc.text(215, 53, 'Nombre', { align: 'center' })
                        doc.text(233, 53, 'Firma', { align: 'center' })
                        doc.text(244, 42, 'RESPONSABLE DE REPORTAR')
                        doc.text(252, 45, 'Y DEL SEGUIMIENTO')
                        doc.text(253.75, 53, 'Nombre', { align: 'center' })
                        doc.text(277.25, 53, 'Firma', { align: 'center' })

                        doc.line(8, 138, pw - 8, 138)
                        doc.line(8, 148, pw - 8, 148)
                        doc.line(8, 158, pw - 8, 158)
                        doc.line(8, 168, pw - 8, 168)
                        doc.line(8, 178, pw - 8, 178)

                        /* --- Datos de tabla --- */
                        doc.setFont('helvetica', 'normal')

                        let layout = 69
                        while (i < limite && i < length) {
                            const fecha_cor_split = correcciones[i].fecha_cor.split(' ')
                            const hora_cor_split = fecha_cor_split[1].split(':')
                            doc.text(12, layout, `${hora_cor_split[0]}:${hora_cor_split[1]}`)

                            getEspaciosLugar(doc, correcciones[i].lugar, layout)
                            getEspaciosProblemaAcciones(doc, correcciones[i].problema, layout, 54)
                            getEspaciosProblemaAcciones(doc, correcciones[i].accion, layout, 102)

                            if (correcciones[i].desviacion === 'S') {
                                doc.text(153, layout, 'X')
                            } else {
                                doc.text(163, layout, 'X')
                            }

                            if (correcciones[i].fecha_vef != null) {
                                const fecha_vef_split = correcciones[i].fecha_vef.split(' ')

                                doc.text(179, layout, fecha_vef_split[0], { align: 'center' })
                                doc.text(197, layout, fecha_vef_split[1], { align: 'center' })

                                let usu_ver = ''
                                if (correcciones[i].verifica != null) {
                                    usu_ver = correcciones[i].verifica.split(' ')
                                }

                                if (usu_ver.length === 2) {
                                    doc.text(207, layout - 1.5, usu_ver[0])
                                    doc.text(207, layout + 1.5, usu_ver[1])

                                    doc.text(225, layout - 1.5, usu_ver[0])
                                    doc.text(225, layout + 1.5, usu_ver[1])
                                } else if (usu_ver.length === 3) {
                                    doc.text(207, layout - 3, usu_ver[0])
                                    doc.text(207, layout, usu_ver[1])
                                    doc.text(207, layout + 3, usu_ver[2])

                                    doc.text(225, layout - 3, usu_ver[0])
                                    doc.text(225, layout, usu_ver[1])
                                    doc.text(225, layout + 3, usu_ver[2])
                                } else if (usu_ver.length === 4) {
                                    doc.text(207, layout - 4.5, usu_ver[0])
                                    doc.text(207, layout - 1.5, usu_ver[1])
                                    doc.text(207, layout + 1.5, usu_ver[2])
                                    doc.text(207, layout + 4.5, usu_ver[3])

                                    doc.text(225, layout - 4.5, usu_ver[0])
                                    doc.text(225, layout - 1.5, usu_ver[1])
                                    doc.text(225, layout + 1.5, usu_ver[2])
                                    doc.text(225, layout + 4.5, usu_ver[3])
                                }
                            }

                            const usu_rep = correcciones[i].usuario.split(' ')

                            if (usu_rep.length === 2) {
                                doc.text(243, layout - 1.5, usu_rep[0])
                                doc.text(243, layout + 1.5, usu_rep[1])

                                doc.text(266.5, layout - 1.5, usu_rep[0])
                                doc.text(266.5, layout + 1.5, usu_rep[1])
                            } else if (usu_rep.length === 3) {
                                doc.text(243, layout - 3, usu_rep[0])
                                doc.text(243, layout, usu_rep[1])
                                doc.text(243, layout + 3, usu_rep[2])

                                doc.text(266.5, layout - 3, usu_rep[0])
                                doc.text(266.5, layout, usu_rep[1])
                                doc.text(266.5, layout + 3, usu_rep[2])
                            } else if (usu_rep.length === 4) {
                                doc.text(243, layout - 4.5, usu_rep[0])
                                doc.text(243, layout - 1.5, usu_rep[1])
                                doc.text(243, layout + 1.5, usu_rep[2])
                                doc.text(243, layout + 4.5, usu_rep[3])

                                doc.text(266.5, layout - 4.5, usu_rep[0])
                                doc.text(266.5, layout - 1.5, usu_rep[1])
                                doc.text(266.5, layout + 1.5, usu_rep[2])
                                doc.text(266.5, layout + 4.5, usu_rep[3])
                            }

                            if (correcciones[i].observacion != null && !obser.includes(correcciones[i].observacion)) {
                                obser.push(correcciones[i].observacion)
                                observacion = `${observacion} - ${correcciones[i].observacion}`
                            }

                            i++
                            layout += 24
                        }

                        doc.setFontSize(8)
                        doc.text(8, 134, observacion.slice(0, 220))
                        doc.text(8, 144, observacion.slice(220, 440))
                        doc.text(8, 154, observacion.slice(440, 660))

                        doc.setFont('helvetica', 'bold')
                        doc.text(
                            8,
                            174,
                            'NOTA: Considerar llenar las fechas y la hora cuando se da la corrección definitiva de la desviación'
                        )

                        /* --- Footer del documento --- */
                        doc.setFont('helvetica', 'normal')
                        doc.setFontSize(7)

                        doc.text(60, ph - 13, revisado_por, { align: 'center' })
                        doc.text(8, ph - 12, 'REVISADO POR:')
                        doc.line(30, ph - 11, 90, ph - 11)
                        doc.text(60, ph - 8, 'FIRMA Y FECHA', { align: 'center' })

                        doc.text(pw * (3 / 4) + 8, ph - 13, 'Dr Rita Montiel')
                        doc.text(206, ph - 12, 'VERIFICADO POR:')
                        doc.line(pw * (3 / 4) + 8, ph - 11, pw - 8, ph - 11)
                        doc.text(pw * (3 / 4) + 8 + 30, ph - 8, 'FIRMA Y FECHA', { align: 'center' })
                    }
                }
            }

            if (fotos.length > 0) {
                let pagesForFotos = Math.ceil(fotos.length / 3)
                for (let p = 0; p < pagesForFotos; p++) {
                    pages++
                    doc.addPage()
                    doc.setPage(pages)
                    getPaginaFotos(doc, pages, fotos.length, fotos, '01/11/2023', '7')
                }
            }
        }
    })
}

module.exports = {
    PDF_Control_PT_Cola_VAC_Fresco
};