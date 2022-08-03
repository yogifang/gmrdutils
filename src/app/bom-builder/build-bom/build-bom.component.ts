import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

type AOA = any[][];
@Component({
  selector: 'app-build-bom',
  templateUrl: './build-bom.component.html',
  styleUrls: ['./build-bom.component.scss']
})


export class BuildBomComponent implements OnInit {


  partsNumber :string = '';
  itemName: string ='' ;
  updateDate: string ='' ;
  stockFileName: string = '';
  bomFileName: string = '' ;
  data: AOA = [[1, 2], [3, 4]];
  resultData : AOA = [] ;
  bomContent: AOA = [];

  constructor() { }

  ngOnInit(): void {
    console.log('BuildBomComponent ngOnInit');
  }


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
      // this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      this.updateDate = res[3].toString();
      this.data = [];
      res.map(item => {
        if(item[3] !== undefined && item[3] !== null  && item[3] !== "貨品編號") {
          const resdata:string[] = [item[3],item[4],item[6]] ;
          this.data.push(resdata);
        }
      })

    }
    reader.readAsBinaryString(target.files[0]);
  }
  public  onBomChange(evt: any) {
      /* wire up file reader */
      const fileList = evt.files ;
      const file = fileList[0] ;
      this.bomFileName = file.name ;
      this.bomContent = [];
      let fileReader: FileReader = new FileReader();
      let self = this;
      fileReader.onload = (e: any) => {
        const content = fileReader.result?.toString();
        const lines = content?.split('\n');
    //    console.log(lines);
        lines?.map(line => {
          const items = line.slice(0,-1).split('\t');
          if(items.length > 4) {
            while(items[3] === items[4]) {
              items.splice(4,1);
             }
          }


          if(items.length > 1) {
            if(items.length === 3) {
              let wordWrap: any= self.bomContent?.slice(-1).pop();
              wordWrap[2] = wordWrap[2] + items[2].substring(0,items[2].length);
            } else {
              self.bomContent.push(items);
            }

          }
        })
        console.log(self.bomContent);
        this.bomContent = self.bomContent;
      }
      fileReader.readAsBinaryString(file);
    }



    remove_non_ascii(str:string) {

      if ((str===null) || (str===''))
           return "";
     else
       str = str.toString();

      return str.replace(/[^\x20-\x7E]/g, '');
    }

   getFileName = (name: any) => {
      let timeSpan = new Date().toLocaleDateString();

      let sheetName = name.slice(0,name.search('BOM')-8)+"BOM" || "MartianBom";

      if(sheetName.length > 31) {
        alert("sheetName is too long");
      }
      let fileName = `${sheetName}-${timeSpan}`;
      return {
        sheetName,
        fileName
      };
    };
 exportArrayToExcel(arr: any[], name?: string) {
      let { sheetName, fileName } = this.getFileName(name);

      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.json_to_sheet(arr);
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
      XLSX.writeFile(wb, `${fileName}.xlsx`);
    }

onBuildBom(evt:any) {

  for (var i = 0; i < this.bomContent.length; i++) {

    if(this.bomContent[i][3] !== undefined && this.bomContent[i][3] !== null) {

      const strDescript = this.remove_non_ascii(this.bomContent[i][3]).toLocaleLowerCase();

      const pid = this.data.map( item => this.remove_non_ascii(item[1]).toLowerCase().includes(strDescript)).indexOf(true);
      if(pid !== -1) {
        this.bomContent[i].push(this.data[pid][0] );
        this.bomContent[i].push(this.data[pid][1]);
      } else {
        this.bomContent[i].push("--new parts--");
      }


    }

  }

  this.exportArrayToExcel(this.bomContent, this.bomFileName.replace('.',''));
  console.log(this.bomContent);
}




}
