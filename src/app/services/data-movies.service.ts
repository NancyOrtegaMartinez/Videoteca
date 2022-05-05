import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResultTMDB, ResultDetails, Cast, ResultCredits } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

//Constantes traidas de environment 

const URL = environment.URL;
const API_KEY = environment.API_KEY;

@Injectable({
  providedIn: 'root'
})
export class DataMoviesService {

  constructor(private http: HttpClient) { }

  //recibe cualquier tipo de objeto del api  y provee del servicio
  private execQuery<T> (query: string){

    // es diferente al de abajo porque ... ' url + variable'
    query = URL + query;  //https://api.themoviedb.org/3/discover/movie

    // += es para concatena la query + otra cosa , se le agrega '&' por
    query += `&api_key=${API_KEY}&language=es`  // 'https://api.themoviedb.org/3/discover/movie?api_key=ab4c7f325d588c10b01034205f2d91ec&language=es&primary_release_date.gte=2022-03-01&primary_release_date.lte=2022-03-31
    //para consumir un servicio y se comenta despues de que se copio el codigo en interfaces
    //console.log(query);
    return this.http.get<T>(query);
  }

  getDiscover() {

      //automatizar las fechas...

          const fechaActual = new Date();
          const ultimoDia = new Date(fechaActual.getFullYear() ,fechaActual.getMonth() +1 , 0).getDate();
          const mes = fechaActual.getMonth()+1;

          //let cambia el valor
          let mesString;

          //validacion para trer el 0+numero de mes y sean dos digitos.

          if(mes < 10)
            { 
                mesString = '0'+ mes;
            } 
            else {
              mesString = mes;
            }

            //constantes para la fecha
            // `` <-- backtip , los get son metodos llevan ()
            const fecInicio = `${fechaActual.getFullYear()}-${mesString}-01`;
            const fecFin = `${fechaActual.getFullYear()}-${mesString}-${ultimoDia}`;
          
            // cuarto cambio , se agrega la automatizacion de fechas
          return  this.execQuery<ResultTMDB>(`/discover/movie?primary_release_date.gte=${fecInicio}&primary_release_date.lte=${fecFin}`);
      

          }

          getPopularity(){
            return  this.execQuery<ResultTMDB>(`/discover/movie?short_by=popularity.asc`);
          }

          getDetails(id: number){
            return  this.execQuery<ResultDetails>(`/movie/${id}?a=1`);
          }

          getCredits(id: number){
            return  this.execQuery<ResultCredits>(`/movie/${id}/credits?a=1`);
          }
}