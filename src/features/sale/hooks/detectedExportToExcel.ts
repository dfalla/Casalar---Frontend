import { useRef } from 'react';
import { useDownloadExcel  } from 'react-export-table-to-excel';

import { Sale } from '../interfaces';

interface DetectedExportToExcelArgs {
    array: Sale[];
    exportTableExcel: boolean
}

export const detectedExportToExcel = ({ array, exportTableExcel }:DetectedExportToExcelArgs) => {
    let excelExport: () => boolean;
    const tableRef = useRef(null);

    const exportToExcel = (fecha: string) =>{
        const { onDownload } = useDownloadExcel({
            currentTableRef: tableRef.current,
            filename: `Inventario ${fecha}`,
            sheet: 'VENTA',
        })

        return onDownload;
    }
    
        array.forEach((element)=>{
            excelExport = exportToExcel(element.fecha);
        }) 

    return {
        tableRef,
        excelExport: () => excelExport
    }
  
}
