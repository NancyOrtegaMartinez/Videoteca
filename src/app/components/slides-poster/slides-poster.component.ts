import { Component, Input, OnInit } from '@angular/core';
import { Movies } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetailsComponent } from '../details/details.component';
@Component({
  selector: 'app-slides-poster',
  templateUrl: './slides-poster.component.html',
  styleUrls: ['./slides-poster.component.scss'],
})
export class SlidesPosterComponent implements OnInit {

  @Input() discover: Movies[] = [];
  @Input() title: string='';

  constructor(private ModalController: ModalController) { }

  ngOnInit() {}

  async showDetails(id: number){
     
    const modal = await this.ModalController.create({
         component: DetailsComponent,
         componentProps: {
           id
         }
    });
    modal.present();
    //console.log(id);
 }
}