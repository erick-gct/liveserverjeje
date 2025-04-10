import { $themeConfig } from '@themeConfig'
import { jsPDF } from 'jspdf'
import { RolesSuperiores } from '@core/utils/enums/registrosFirmas.ts'
import {
    createCorrecciones,
    createPaginaFotos,
    formatFecha,
    getHoraFirmaRol,
    getQRImageUrl,
    getQRUsuCreaImageUrl,
    getUserFirmaRol,
    writeLimitedText,
} from '@/assets/js/utilsPdf.ts'

const { logoSP } = $themeConfig.logos

const parseSafe = it => (it ?? '').toString()

const calcularPorcentaje = (array, muestra) => {
    const value = array.reduce((sum, it) => sum + Number.parseFloat(it.value), 0)
    const result = value / Number.parseFloat(muestra)
    return result.toFixed(2)
}

const headerbase_x = 9
const header = [
    {
        label: 'Fecha',
        value: 'fecha_control',
        x: headerbase_x,
        formatter: it => parseSafe(it?.split(' ')[0]),
        maxWidth: 7,
        maxHeigth: 7,
    },
    {
        label: 'Hora Control',
        value: 'fecha_control',
        x: headerbase_x + 14,
        formatter: it => parseSafe(it?.split(' ')[1]),
        maxWidth: 10,
        maxHeigth: 7,
    },
    {
        label: 'Lote',
        value: 'lote',
        x: headerbase_x + 25,
        formatter: it => parseSafe(it),
        maxWidth: 15,
        maxHeigth: 7,
    },
    {
        label: 'Proveedor',
        value: 'proveedor',
        x: headerbase_x + 36,
        formatter: it => parseSafe(it?.nombre),
        maxWidth: 13,
        maxHeigth: 7,
    },
    {
        label: '#Maquina',
        value: 'maquina',
        x: headerbase_x + 52,
        formatter: it => parseSafe(it?.descripcion),
        maxWidth: 15,
        maxHeigth: 7,
    },
    {
        label: 'Marca',
        value: 'marcas',
        x: headerbase_x + 65,
        formatter: it => parseSafe(it?.descripcion),
        maxWidth: 17,
        maxHeigth: 7,
    },
    {
        label: 'Importador',
        value: 'importador',
        x: headerbase_x + 78,
        formatter: it => parseSafe(it?.nombre),
        maxWidth: 15,
        maxHeigth: 7,
    },
    {
        label: 'Talla',
        value: 'tallas',
        x: headerbase_x + 97,
        formatter: it => parseSafe(it?.descripcion),
        maxWidth: 15,
        maxHeigth: 7,
    },
    {
        label: 'Unidades Muestreadas',
        value: 'unidades_muestreadas',
        x: headerbase_x + 195,
        formatter: it => parseSafe(it),
        maxWidth: 15,
        maxHeigth: 7,
    },
    {
        label: '%',
        value: 'melanosis', // Calcular porcentaje de unidades melanosis vs tiempo
        x: headerbase_x + 212,
        formatter: (it, muestra) => parseSafe(calcularPorcentaje(it, muestra)),
        maxWidth: 15,
        maxHeigth: 7,
    },
    {
        label: 'SO2',
        value: 'so2',
        x: headerbase_x + 220,
        formatter: it => parseSafe(it),
        maxWidth: 15,
        maxHeigth: 7,
    },
    {
        label: 'Responsable',
        value: 'responsable',
        x: headerbase_x + 230,
        formatter: it => parseSafe(it?.data?.name),
        maxWidth: 15,
        maxHeigth: 7,
    },
    {
        label: 'Observaciones',
        value: 'observaciones',
        x: headerbase_x + 250,
        formatter: it => parseSafe(it),
        maxWidth: 15,
        maxHeigth: 7,
    },
]

function groupArrayElements(arr, size) {
    let grouped = []
    for (let i = 0; i < arr.length; i += size) {
        grouped.push(arr.slice(i, i + size))
    }
    return grouped
}

export function genPDF(array, save = true) {
    const doc = new jsPDF('l', 'mm', 'a4')
    const codigo = 'RC.CC.97'
    const analisis = 'PRUEBA DE RESISTENCIA A LA MELANOSIS'
    let totalPages = 0
    let newIdx = 0
    const revision = '5'
    const fechaRevision = '2021-05-28'
    const pages = array.length
    const itemsPerPage = 5 //Ingresar cantidad de registros que se desee ver por página :D
    const grouped = groupArrayElements(array, itemsPerPage)
    const intervalos_melanosis = ['1h', '2h', '3h', '4h', '6h', '8h', '10h', '12h']
    const unidades_con_melanosis = ['CRUDOS', 'COCIDOS']



    for (const [index, element] of grouped.entries()) {

        totalPages++
        newIdx++

        const paginacion = `Pagina ${index + 1} de ${pages/itemsPerPage}`
        // const proveedor = element.proveedor ?? ''
        // const turno = element.turno
        // const producto = element.producto
        const correcciones = []
        const fotos = []

        doc.addPage('', 'l')
        doc.setPage(newIdx)

        const pw = doc.getPageWidth()
        /* --- Header documento --- */
        doc.rect(8, 8, pw - 16, 20)
        doc.rect(8, 8, 25, 20)
        doc.addImage(logoSP, 'PNG', 11, 9, 18.5, 18.5, 'right')
        doc.setFontSize(12)
        doc.setFont('helvetica', 'bold')
        doc.text(pw / 2.2, 20, analisis, { align: 'center' })
        doc.setFontSize(9)
        doc.rect(pw - 53, 8, 45, 5)
        doc.text(pw - 51, 11.2, 'Revision:')
        doc.rect(pw - 53, 13, 45, 5)
        doc.text(pw - 51, 16.8, 'Fecha:')
        doc.rect(pw - 53, 18, 45, 5)
        doc.text(pw - 51, 21.8, 'Codigo:')
        doc.setFont('helvetica', 'normal')
        doc.text(pw - 15.5, 11.2, revision, { align: 'center' })
        doc.text(pw - 20, 16.8, formatFecha(fechaRevision), { align: 'center' })
        doc.text(pw - 20, 21.8, codigo, { align: 'center' })
        doc.rect(pw - 53, 23, 45, 5)
        doc.line(pw - 33, 8, pw - 33, 23)
        doc.text(pw - 33, 26.8, paginacion, { align: 'center' })

        /* --- Header documento --- */

        /* --- Body documento --- */
        let x = 37
        let y = 8
        const jump = 7
        let header_x = 15
        const header_y = 32
        doc.rect(8, 30, pw - 16, 160)
        for (let i = 0; i < 22; i++) {
            doc.line(8, x, pw - 8, x)
            x += jump
        }

        doc.setFontSize(6)

        header.forEach((it, i) => {
            doc.setFont('helvetica', 'bold')
            const label = it.label?.split(' ')
            if (label.length > 1) {
                doc.text(it.x, header_y, parseSafe(label[0]))
                doc.text(it.x, header_y + 3, parseSafe(label[1]))
            } else doc.text(it.x, header_y, parseSafe(label[0]))
            doc.setFont('helvetica', 'normal')
            if (i > 0) doc.line(it.x - 2, 30, it.x - 2, 190)

        })

        let base_x = 117

        doc.setFont('helvetica', 'bold')
        doc.text(pw - pw / 2 - 4, header_y, 'Melanosis vs Tiempo', { align: 'center' })
        doc.line(base_x - 2, 30, base_x - 2, 190)
        //ForEach para mostrar los titulos de los intervalos de melanosis en la tabla
        intervalos_melanosis.forEach((it, i) => {
            doc.text(base_x, header_y + 4, intervalos_melanosis[i])
            doc.line(base_x - 2, header_y + 1, base_x - 2, 190)
            base_x += 7
            /*   doc.text(base_x +  16, header_y + 9, Number.parseFloat(element[0]['melanosis'][i]?.value).toFixed(2))
            base_x += 7 */
        })
        doc.line(100 + 15,  header_y + 1, base_x - 2, header_y + 1) //linea horizontal melanosis vs tiempo

        //  unidades_con_melanosis.forEach((it,i) =>{
        //      doc.text(base_x, header_y + 4, unidades_con_melanosis[i])
        //      doc.line(base_x - 2, header_y + 1, base_x - 2, 190)
        //      base_x += 7
        //  })

        doc.setFontSize(4)
        doc.line(base_x - 2, header_y - 2, base_x - 2, 190) //linea vertical final melanosis vs tiempo
        doc.line(base_x + 13, header_y + 1, base_x + 13, 190) //linea divisora CRUDOS COCIDOS
        doc.line(base_x - 2, header_y + 1, base_x + 29, header_y + 1) //linea horizontal melanosis
        doc.text(base_x + 13, header_y - 0.5, 'Unidades con', { align: 'center' })
        doc.text(base_x + 13, header_y + 0.5, 'Melanosis', { align: 'center' })
        doc.setFontSize(6)
        doc.text(base_x + 5, header_y + 4, 'CRUDOS', { align: 'center' })
        doc.text(base_x + 20, header_y + 4, 'COCIDOS', { align: 'center' })
        doc.setFont('helvetica', 'normal')

        let newHeight = header_y + 7

        // Llenado de Datos
        let startY = 32
        for (let item of element) {
            header.forEach((it, i) => {
                let result = null
                if (it.label !== '%') result = it.formatter(item[it.value])
                else result = it.formatter(item[it.value], item['unidades_muestreadas'])

                const marginX = it.x // Margen izquierdo
                const marginY = newHeight // Ajuste dinámico en la posición Y
                const lineHeight = 2 // Altura entre líneas NO CAMBIAR
                writeLimitedText(doc, result, marginX, marginY, it.maxWidth + 1, it.maxHeigth, lineHeight)
            })

            base_x = 100
            let tempBaseX = base_x + 16 // Posición inicial para los valores de melanosis
            intervalos_melanosis.forEach((it, i) => {
                let valorMelanosis = item.melanosis[i]?.value ?? 0 // Asegura que no haya valores undefined
                doc.text(base_x + 16, newHeight + 1, Number.parseFloat(valorMelanosis).toFixed(2))
                base_x += 7 // Ajusta la posición horizontal para el siguiente valor
            })

            const posicionCrudosCocidos = base_x + 23

            // Mostrar CRUDOS
            doc.text(
                posicionCrudosCocidos, 
                newHeight + 1, 
                parseSafe(item.crudos), 
                { align: 'center' }
            )

            // Mostrar COCIDOS
            doc.text(
                posicionCrudosCocidos + 15, 
                newHeight + 1, 
                parseSafe(item.cocidos), 
                { align: 'center' }
            )


            item.crudos = item.crudos
            newHeight += 7 // Incrementar la altura para la siguiente fila
        }

        /* --- Body documento --- */

        /* --- Footer documento --- */
        doc.text(pw - pw / 2, 205, 'Jefa de Control de Calidad', {
            align: 'center',
        })
        doc.text(pw - pw / 2, 194, 'NOMBRE', { align: 'center' })
        doc.text(pw - pw / 2, 198, 'FECHA Y HORA', { align: 'center' })
        doc.line(pw - pw / 2 - 25, 200, pw - pw / 2 + 25, 200)
        /* --- Footer documento --- */

        if (element.correcciones?.length > 0) {
            element.correcciones.forEach(correccion => correcciones.push(correccion))
        }

        if (element.fotos?.length > 0) {
            element.fotos.forEach(foto => fotos.push(foto))
        }

        const total_pages = doc.getNumberOfPages()
        // Opcional: Eliminar la última página si no se utiliza
        if (totalPages !== total_pages) {
            doc.deletePage(total_pages)
        }

        if (correcciones?.length > 0) {
            const tmp = createCorrecciones(doc, correcciones, newIdx)
            totalPages = tmp
            newIdx = tmp
        }

        if (fotos?.length > 0) {
            const tmp = createPaginaFotos(doc, fotos, newIdx, revision, fechaRevision, 'RC.CC.97')
            totalPages = tmp
            newIdx = tmp
        }
    }

    if (save) doc.save('RC.CC.97 PRUEBA DE RESISTENCIA A LA MELANOSIS.pdf')
    else return doc.output('blob')
}
