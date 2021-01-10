import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit, AfterViewInit {

  public greetingText = ""
  public flash = "‏‏"

  constructor() { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.type(["Hi there", "My name is Sebastian", "Welcome to my site."])
    this.startFlash()
  }

  startFlash() {
    (async () => {
      await this.delay(1000);
      let i = true
      while (true) {
        if (i) {
          i = !i
          this.flash = "\u258D"
        }
        else {
          i = !i
          this.flash = "‏‏"
        }
        await this.delay(1000)
      }
    })()
    
  }
 
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  type(texts: Array<string>) {
   
    
    (async () => {
      let i = 0;
      for await (const text of texts) {
        await this.delay(1000);
        
        for await (const letter of this.asyncGenerator(text, [80, 200])) {
          this.greetingText += letter;
        }
        if (texts.length - 1 > i) {
          await this.delay(1500);
  
          for await (const letter of this.asyncGenerator(text, [60, 120])) {
            this.greetingText = this.greetingText.slice(0, -1);
          }
        }
        i += 1
      }
    })();
    
  }

  async * asyncGenerator(text: string, speedRange: Array<number>) {  
    const letters = text.split("");
    while (letters.length > 0) {
      const letter = letters.shift() + "";
      yield this.asyncLetter(letter, this.getSpeed(speedRange));
    }
  }

  asyncLetter(letter: string, speed: number) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(letter);
      }, speed);
    });
  }

  getSpeed(speedRange: Array<number>) {
    if (Array.isArray(speedRange) && speedRange.length === 2) {
      const min = speedRange[0];
      const max = speedRange[1];
      return (Math.random() * (max - min)) + min;
    }
    return 0;
  }
}
