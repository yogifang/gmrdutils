import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';


import * as XLSX from 'xlsx';

type AOA = any[][];
@Component({
  selector: 'app-search-parts',
  templateUrl: './search-parts.component.html',
  styleUrls: ['./search-parts.component.scss']
})
export class SearchPartsComponent implements OnInit {


  partsNumber :string = '';
  itemName: string ='' ;
  updateDate: string ='' ;
  bomFileName: string = '';

  data: AOA = [[1, 2], [3, 4]];
  resultData : AOA = [] ;

  constructor() {

  }

  ngOnInit(): void {

  }


  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      this.bomFileName = evt.target.files[0].name ;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const res = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      // this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      this.updateDate = res[3].toString();
      this.data = [];
      res.map(item => {
        if(item[3] !== undefined && item[3] !== null  && item[3] !== "貨品編號") {
          const resdata:string[] = [item[3],item[4],item[6]] ;
          this.data.push(resdata);
        }
      })

      console.log(this.data);
    };
    reader.readAsBinaryString(target.files[0]);
  }


  queryItems(event: any) {
    console.log(event);
    console.log(this.itemName);
    console.log(this.partsNumber);
    console.log(this.resultData.length);
    this.resultData = [];
    this.data.map(item => {
      if(item[0] !== undefined && item[0] !== null) {
        if (item[0].toLowerCase().includes(this.partsNumber.toLocaleLowerCase()) || this.partsNumber === '') {
           if (item[1].toLowerCase().includes(this.itemName.toLocaleLowerCase()) || this.itemName === '') {
            this.resultData.push(item);
           }

        }
      }

    });
   console.log(this.resultData);
  }

  export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
