import { OnInit,Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Animation, AnimationController, AnimationDirection } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  @ViewChild('header') header: ElementRef;
  private  headerEl: any;
  private lastScrollTop:number = 0;
  private animation: Animation;
  public stories : Array<any> = new Array<any>();
  public movies: Array<any> = new Array<any>();
  public slideOptions: any = { slidesPerView:3, freeMode:true, spaceBetween:10};

  constructor(
    private httpClient: HttpClient,
    private animationCtrl: AnimationController
    ) {}

  ngOnInit(){}

  ionViewDidEnter(){
    this.headerEl=this.header.nativeElement;
    this.loadStories();
    this.loadMovies();
    this.createAnimation();
  }
 

  loadStories(){
    this.httpClient.get('  https://www.omdbapi.com/?i=tt3896198&apikey=951ada0e&s=net&page=1').subscribe(data=>{
      const response: any = data;

      this.stories = response.Search;
    })
  }

  loadMovies(){
    this.httpClient.get('https://www.omdbapi.com/?i=tt3896198&apikey=951ada0e&s=love&page=1').subscribe( data =>{
      const response: any = data;

      this.movies= response.Search;
    })
  }

  createAnimation(){
    this.animation = this.animationCtrl.create()
    .addElement(this.headerEl)
    .duration(300)
    .direction('reverse')
    .fromTo('transform','translateY(0)',`translateY(-${this.headerEl.clientHeight}px)`);
   }

  onScroll(event: any){
    const scrollTop: number = event.detail.scrollTop;
    const direction: AnimationDirection = scrollTop > this.lastScrollTop ? 'normal' : 'reverse' ;

    if(this.animation.getDirection() != direction){
      this.animation.direction(direction).play();
    }
  
    this.lastScrollTop = scrollTop;
  }
}
