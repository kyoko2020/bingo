import { Component, OnInit } from '@angular/core';

 const MAX_NUMBER = 75;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

   delArrayNum: number = 0;
   targetNumber: number[] = new Array();
   winningNumber: string[] =new Array();
   btnName: string = "START";
   panel1: string;
   panel10: string;
   timerId =null;
   targetIndex: string;
   
   
  ngOnInit():void {

    //1-75を配列に追加
    for(let i: number = 0; i <= MAX_NUMBER; i++){
    this.targetNumber.push(i);
    }

    this.panel1 = "0";
    this.panel10 = "0";

  }

  staBtn():void{

    if(this.btnName === "START"){
      this.timerId = setInterval( () => {
        var noDigitNumder = Math.floor(Math.random() * this.targetNumber.length).toString(); 
        // timerId.textContent = this.targetNumber[targetIndex];        
        //2桁にし、05表示をする
         this.targetIndex =("00"+ noDigitNumder).slice(-2);
        
     ;

        if(this.targetIndex != "00"){
        //ランダムで表示されている数字を1のくらいと、10のくらいで分割して表示させる
        this.panel1 = this.targetIndex.substr(0,1); 
        this.panel10 =this.targetIndex.substr(1,2); 
        }else{

        }

            //表示用に配列に保持
         this.winningNumber.push(this.targetIndex)
         
        //ランダムで選択された数字targetIndexをtargetNumber配列から選定
        this.delArrayNum = this.targetNumber.indexOf(Number(this.targetIndex));
          if(this.delArrayNum >= 0){
            //targetNumber配列から削除
            this.targetNumber.splice(this.delArrayNum,1);
          }
        this.btnName = "STOP";
       
        return;
      },10)
    }else if(this.btnName === "STOP"){
      clearInterval(this.timerId);
      // let targetIndex = this.targetNumber.indexOf(Number(targetIndex));   
      // this.targetNumber.splice(this.targetIndex, 1);
      this.btnName = "START";
      return;
    
    }

    //数字がなくなったら発表を終わる
    if(this.targetNumber.length === 0){
      alert('すべての番号の発表が終わりました') ;
      clearInterval(this.timerId);
      return;
    }
  }

  delBtn(): void{
    var display =confirm("抽選結果をすべてクリアします。よろしいですか?"); // 警告ダイアログを表示
    if(display){
      //削除成功,データを消す
      clearInterval();
    }else{
      //削除キャンセル
      window.alert('キャンセルされました'); // 警告ダイアログを表示 
    }
  }
}



