import { Injectable } from '@angular/core';
import { ClientAjaxService } from './client.ajax.service';
import { IClient } from '../interfaces/modelInterfaces';

import  jsPDF  from "jspdf"; // Método común si jsPDF soporta ES6



@Injectable({
  providedIn: 'root',

})
export class ClientPrintService {

constructor(
  private oClientService: ClientAjaxService,
) { }

printUser = (id_user: number): void => {
  this.oClientService.getOne(id_user).subscribe({
    next: (oUserToPrint: IClient) => {
      console.log('User to print:', oUserToPrint);
      var doc = new jsPDF();
      doc.setFont('Arial');
      doc.setFontSize(12);
      doc = this.cabecera(doc);
      doc = this.contenido(doc, oUserToPrint);
      doc = this.pie(doc);
      console.log(doc);
      doc.save('profile.pdf');
      

    }
  })
}


  private cabecera(doc: jsPDF) : jsPDF{

    const indigoPastel =  "#7887AB";
    
    //doc.setFontType('bold');
    doc.setFontSize(20);
    doc.text('ThousandBurgers', 70, 25);
    //
    doc.setDrawColor(indigoPastel);
    doc.line(60, 30, 145, 30);
    //
    doc.text('Client Profile', 80, 40);
    doc.setDrawColor(indigoPastel);
    doc.line(10, 45, 200, 45);
    //doc.setFontType('normal');

    return doc;
  }

  private contenido(doc: jsPDF, oClient: IClient) : jsPDF {

    const baseX = 10;
    const indigoPastel =  "#7887AB";
    doc.setTextColor(0, 0, 0, 0);
    doc.setFillColor(parseInt(indigoPastel.substring(1, 3), 16),
    parseInt(indigoPastel.substring(3, 5), 16),
    parseInt(indigoPastel.substring(5, 7), 16));
    doc.roundedRect(baseX, 55, 80, 15, 5, 5, 'F');
    doc.setFontSize(14);


    doc.setFillColor(parseInt(indigoPastel.substring(1, 3), 16),
      parseInt(indigoPastel.substring(3, 5), 16),
      parseInt(indigoPastel.substring(5, 7), 16));
    doc.roundedRect(baseX, 75, 80, 15, 5, 5, 'F');
    doc.setFontSize(14);
    doc.text(`ID: ${oClient.id}` ,20,64);
    
    doc.setFillColor(parseInt(indigoPastel.substring(1, 3), 16),
      parseInt(indigoPastel.substring(3, 5), 16),
      parseInt(indigoPastel.substring(5, 7), 16));
    doc.roundedRect(baseX, 75, 80, 15, 5, 5, 'F');
    doc.setFontSize(14);
    doc.text(`Name: ${oClient.name}` ,20,84);

    doc.setFillColor(parseInt(indigoPastel.substring(1, 3), 16),
      parseInt(indigoPastel.substring(3, 5), 16),
      parseInt(indigoPastel.substring(5, 7), 16));
    doc.roundedRect(baseX, 95, 80, 15, 5, 5, 'F');
    doc.setFontSize(14);
    doc.text(`Telephone: ${oClient.telephone}`,20,104);
    
    doc.setFillColor(parseInt(indigoPastel.substring(1, 3), 16),
      parseInt(indigoPastel.substring(3, 5), 16),
      parseInt(indigoPastel.substring(5, 7), 16));
    doc.roundedRect(baseX, 115, 80, 15, 5, 5, 'F');
    doc.setFontSize(14);
    doc.text(`Birthdate: ${oClient.birthDate}`,20,124);

    doc.setFillColor(parseInt(indigoPastel.substring(1, 3), 16),
      parseInt(indigoPastel.substring(3, 5), 16),
      parseInt(indigoPastel.substring(5, 7), 16));
    doc.roundedRect(baseX, 135, 80, 15, 5, 5, 'F');
    doc.setFontSize(13);
    doc.text(`Role: ${oClient.role}`,20,144);

    doc.setFillColor(parseInt(indigoPastel.substring(1, 3), 16),
      parseInt(indigoPastel.substring(3, 5), 16),
      parseInt(indigoPastel.substring(5, 7), 16));
    doc.roundedRect(baseX, 155, 80, 15, 5, 5, 'F');
    doc.setFontSize(14);
    doc.text(`Email: ${oClient.email}`, 20, 164);

    doc.setFillColor(parseInt(indigoPastel.substring(1, 3), 16),
      parseInt(indigoPastel.substring(3, 5), 16),
      parseInt(indigoPastel.substring(5, 7), 16));
    doc.roundedRect(baseX, 175, 80, 15, 5, 5, 'F');
    doc.setFontSize(14);
    doc.text(`Username: ${oClient.username}`,20,184);

    return doc;
  }

  private pie(doc: jsPDF): jsPDF {

    const indigoPastel = "#7887AB";
    
    doc.setDrawColor(indigoPastel);
    doc.line(10, 244, 200, 244);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); 
    doc.text(`CIPFP Ausiàs March`, 11,254 );
    doc.text(`Télf: 961205930`, 11,264 );
    doc.text(`Fax: 961205931`, 65, 264);
    doc.text(`C/Ángel Villena, s/n. 46013 Valencia`, 11,274 );
    doc.text( `secretaria@ausiasmarch.net`, 11,284);

    return doc;
  }
}

//id,name,telephone,birthdate,role,email,username,verified
