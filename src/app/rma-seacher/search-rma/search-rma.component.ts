import { Component, OnInit } from '@angular/core';


import * as XLSX from 'xlsx';

type AOA = any[][];

@Component({
  selector: 'app-search-rma',
  templateUrl: './search-rma.component.html',
  styleUrls: ['./search-rma.component.scss']
})
export class SearchRmaComponent implements OnInit {

  partsNumber :string = '';
  itemName: string ='' ;
 // updateDate: string ='' ;
  stockFileName: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  data: AOA = [[1, 2], [3, 4]];
  resultData : AOA = [] ;


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
      this.stockFileName = evt.target.files[0].name ;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const res = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
  //    console.log(res);
      // this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
   //   this.updateDate = res[3].toString();
      this.data = [];
      console.log(this.data);
      res.map((item, index) => {
        if(item[0] !== undefined && item[0] !== null  && item[0] !== "原料編號" &&  index > 0) {
          const resdata:string[] = [item[0],item[3]] ;
          this.data.push(resdata);
        }
      })

     console.log(this.data);
     this.queryItems(null);
    };
    reader.readAsBinaryString(target.files[0]);
  }


  queryItems(event: any) {
    console.log(event);
   // console.log(this.itemName);
    console.log(this.partsNumber);
 //   console.log(this.resultData.length);
    this.resultData = [];
    this.data.map(item => {
      if(item[0] !== undefined && item[0] !== null) {
           console.log(item[0]);
        if (item[0].toLowerCase().includes(this.partsNumber.toLocaleLowerCase()) || this.partsNumber === '') {

            this.resultData.push(item);


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
