import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncodeResisterService {



   resType: Array<string> = [ "SMD" , "1" ,
                                "SMDPACKS" , "2",
                                "SMDVR" , "3",
                                "DIPCARBON" ,"4" ,
                                "DIPPACKS" , "5",
                                "DIPVR" , "6" ,
                                "DIPMETALFILM" , "7" ,
                                "DIPMETALOXYGEN" , "8" ,
                                "DIPFUSE" , "9" ,
                                "DIPCEMENT" , "A",
                                "DIPWIRE" , "B" ,
                                "DIPALUMN" , "C",
                                "DIPPOWER" , "D" ,
                                "DIPPHOTO" , "E",
                                "DIPTHERMAL" , "F",
                                "OTHERS" , "X"
                              ]; //

    resSizes: Array<string> = [ "0402" , "1" ,
                                "0603" , "2",
                                "0805" , "3",
                                "1206" ,"4" ,
                                "1210" , "5",
                                "2010" , "6" ,
                                "DIPMVR" , "7" ,
                                "DIPFVR" , "8" ,
                                "2512" , "9" ,
                                "OTHERS" , "X" ,
                                "0201" , "A" ] ;


  resTorrance : Array<string> = [ "0.1%" , "1" ,
                                "0.25%" , "2",
                                "0.5%" , "3",
                                "1%" ,"4" ,
                                "2%" , "5",
                                "5%" , "6" ,
                                "10%" , "7" ,
                                "20%" , "8" ,
                                "0%" , "9" ];
resPower: Array<string> = [ "1W" , "01" ,
                            "2W" , "02" ,
                            "5W" , "05" ,
                            "10W" , "10" ,
                            "20W" , "20" ,
                             "3/4W" , "A1" ,
                              "1/2W" , "A2" ,
                              "1/3W" , "A3" ,
                              "1/4W" , "A4" ,
                              "1/8W" , "A5" ,
                              "1/10W" , "A6" ,
                              "1/16W" , "A7" ,
                              "125mW" , "A8" ];

 resRoHS: Array<string> = [ "RoHS" , "1" ] ;


  constructor() { }

private  getResType(type: string): string {

    var r:string = "X";
    this.resType.forEach((t , index)  => {
      if (type.includes(t)) {
        r = this.resType[index + 1];
      }
    });
    return r;

  }

private getResSize(type: string): string {

    var r:string = "X";
    this.resSizes.forEach((t , index)  => {
      if (type.includes(t)) {
        r = this.resSizes[index + 1];
      }
    });
    return r;

  }

private getResTorrance(type: string): string {

    var r:string = "X";
    this.resTorrance.forEach((t , index)  => {
      if (type.includes(t)) {
        r = this.resTorrance[index + 1];
      }
    });
    return r;

  }

private getResPower(type: string): string {

    var r:string = "X";
    this.resPower.forEach((t , index)  => {
      if (type.includes(t)) {
        r = this.resPower[index + 1];
      }
    });
    return r;

  }

private getResRoHS(type: string): string {
    var r:string = "1";
    this.resRoHS.forEach((t , index)  => {
      if (type.includes(t)) {
        r = this.resRoHS[index + 1];
      }
    });
    return r;

  }


  public getResisterCode(value: string , footprint:string) :string {
    var r:string = "";
    r = "CR"+ this.getResType(footprint) + this.getResSize(footprint) + this.getResTorrance(value) + this.getResPower(value) + this.getResRoHS("RoHS");
    return r;

  }
}
