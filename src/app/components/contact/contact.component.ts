import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
    public widthSlider:number;
    public anchuraToSlider:any;
    public captions:boolean;
    public autor:any;
  constructor() {
    this.captions = false;
 this.autor = {}

   }

  ngOnInit(){
  
   
    

  }
  cargarSlider(){
    this.anchuraToSlider = this.widthSlider
  }
  resetSlider(){
    this.anchuraToSlider = false
  }
  getAutor(event){
   
    this.autor= event
  }
}
