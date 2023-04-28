import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


// resister code stand must be value_torrance_power_type
// size will be wiriten in the footprint

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

  private getResValue( v: string): string {
      var r:string = "0000" ;
      const tempV : string = v.trim() ; // remove spaces and tabs
      const pureV : string = tempV.slice(0,tempV.indexOf("_")) ;// remove _

      if( !pureV.includes("R") && !pureV.includes("K") && !pureV.includes("M")) { // no K no R must 1R ~ 999R
        const len:number = pureV.length ; // get the length of the value
        switch(len) {
          case 1:   // 0R ~ 9R00
            r =  pureV + "00" + "B" ; // B = 10-2
            break ;
          case 2:  // 10R ~ 99R
            r =  pureV + "0" + "A" ; // A = 10-1
            break ;
          case 3: // 100R ~ 999R
            r =  pureV + "0" ;
            break ;

          default:
            r = "xxxx" ;
            break ;
        }

      }

      if(pureV.includes("R")){   // 1R01 ~99R9
        const pre:string = pureV.slice(0,pureV.indexOf("R")) ;
        const tail:string = pureV.slice(pureV.indexOf("R")+1,pureV.length) ;
        const lenPre:number = pre.length ; // get the length of the value
        const lenTail:number = tail.length ; // get the length of the value
        switch(lenPre) {
          case 1: // 0R01 ~ 9R99
            r =  pre + tail + "B" ;  // B = 10-2
            if(pre == "0") {
              if( lenTail == 1) {
                r = tail + "00" + "C" ;  // C = 10-3
               }
               if( lenTail == 2) {
                r = tail + "0" + "C" ;  // C = 10-3
               }
            }
            break ;
          case 2:  //10R1 ~ 99R9
            r =  pre + tail + "A" ;
            break ;
          case 3:
            r =  pre   + "0" ;
            break ;
          default:
            r = "xxxx" ;
        }
      }
      if(pureV.includes("K")){
        const pre:string = pureV.slice(0,pureV.indexOf("K")) ;
        const tail:string = pureV.slice(pureV.indexOf("K")+1,pureV.length) ;
        const lenPre:number = pre.length ; // get the length of the value
      //  const lenTail:number = tail.length ; // get the length of the value
        switch(lenPre) {
          case 1:  //1K01 ~ 9K99
            r =  pre + tail + "1" ;
            break ;
          case 2: //10K1 ~ 99K9
            r =  pre + tail + "2" ;
            break ;
          case 3: //100K ~ 999K
            r =  pre   + "3" ;
            break ;
          default:
            r = "xxxx" ;
        }
      }
      if(pureV.includes("M")){
        const pre:string = pureV.slice(0,pureV.indexOf("M")) ;
        const tail:string = pureV.slice(pureV.indexOf("M")+1,pureV.length) ;
        const lenPre:number = pre.length ; // get the length of the value
    //    const lenTail:number = tail.length ; // get the length of the value

        switch(lenPre) {
          case 1: //1M01 ~ 9M99
            r =  pre + tail + "4" ;
            break ;
          case 2:
            r =  pre + tail + "5" ;
            break ;
          case 3:
            r =  pre   + "6" ;
            break ;
          default:
            r = "xxxx" ;
        }
      }
      return r ;
  }

  public getResisterCode(value: string , footprint:string) :string {
    var r:string = "";
    r = "CR"+ this.getResType(footprint) + this.getResSize(footprint) + this.getResTorrance(value) + this.getResPower(value) + this.getResRoHS("RoHS");
    return r;

  }
}
