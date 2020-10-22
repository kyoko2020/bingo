import { Component, OnInit } from '@angular/core';

const MAX_NUMBER = 75;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

   // tslint:disable-next-line: no-inferrable-types
   delArrayNum: number = 0;
   targetNumber: string[] = new Array() ;
   winningNumber: string[] = new Array();
   targetIndex: string;
   isStartFlg: boolean;
   panel1: string;
   panel10: string;
   timerId = null;
   isPush: boolean;
   shineFlg: boolean;
  //  shineNumbers: string[] = new Array();

  ngOnInit(): void {

    // 1-75を配列に追加

  for (let i = 0; i < MAX_NUMBER ; i++) {
    this.targetNumber.push(('00' + (1 + i)).slice(-2));
    // this.shineNumbers.push(('00' + (1 + i)).slice(-2));
  }
  this.panel1 = '0';
  this.panel10 = '0';
  this.isStartFlg =  true;
  }

  staBtn(): void{

    if (this.isStartFlg){
      this.timerId = setInterval( () => {
        const onetargetIndex = this.targetNumber[Math.floor(Math.random() * this.targetNumber.length)];
        this.targetIndex = ( '00'  + onetargetIndex ).slice( -2 );

        // ランダムで表示されている数字を1のくらいと、10のくらいで分割して表示させる
        this.panel1 = this.targetIndex.substr(0, 1);
        this.panel10 = this.targetIndex.substr(1, 2);

        // ランダムで選択された数字targetIndexをtargetNumber配列から選定
        this.delArrayNum = this.targetNumber.indexOf(this.targetIndex);

        this.isStartFlg = false;
        return;
      }, 10);
    }else{
      if (this.targetNumber != null){
        this.winningNumber.push(this.targetIndex);
        // // 光らせる配列の要素を取ってきてフラグをたてる
        // if (this.shineNumbers[this.delArrayNum] != null){
        //   this.shineNumbers[this.delArrayNum] = this.shineFlg = true;
        // }
        this.isPush = false;
      }
      console.log(this.winningNumber);

      if (this.delArrayNum >= 0){

        // targetNumber配列から削除
        this.targetNumber.splice(this.delArrayNum, 1);

        console.log(this.targetNumber);

      }
      clearInterval(this.timerId);
      this.isStartFlg = true;
      return;
    }

    // 数字がなくなったら発表を終わる
    if (this.targetNumber.length === 0){
      alert('すべての番号の発表が終わりました') ;
      this.inItSet();
      this.isPush = true;
      return;
    }

  }

  delBtn(): void{

    const display = confirm('抽選結果をすべてクリアします。よろしいですか?'); // 警告ダイアログを表示
    if (display){
      // 削除成功,データを消す
      // todo 数字が回っている時
      this.inItSet();
      this.winningNumber = [];
      this.targetNumber = [];
      this.ngOnInit();
      this.isPush = false;
    }else{
      // 削除キャンセル
      window.alert('キャンセルされました');
    }
  }

  // mat-cardの初期表示
  inItSet(): void{
    clearInterval(this.timerId);
    this.panel1 = '0';
    this.panel10 = '0';
  }

}



