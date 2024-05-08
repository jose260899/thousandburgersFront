import { Injectable } from '@angular/core';
import { OrderLineService } from './order.line.service';

import { jsPDF } from 'jspdf';
import { IOrder, IProduct } from '../interfaces/modelInterfaces';

@Injectable({
  providedIn: 'root'
})
export class TicketPrintService {
  order: IOrder[] = [];
  products: IProduct[] = [];
  constructor(
    private oOrderService: OrderLineService,
  ) { }

  printTicket = (id_booking: number): void => {
    this.order = [];
    this.products = [];
    this.oOrderService.getByBooking(id_booking).subscribe({
      next: (oOrderToPrint: IOrder[]) => {
        this.order = oOrderToPrint;
        console.log('Order to print:', this.order);
        var doc = new jsPDF();
        doc.setFont('Arial');
        doc.setFontSize(12);
        doc = this.cabecera(doc);
        doc = this.contenido(doc);
        //doc = this.pie(doc);
        console.log(doc);
        doc.save('ticket.pdf');
      }
    })
  }

  private cabecera(doc: jsPDF): jsPDF {
    const black = "#000000";
    doc.setFontSize(20);
    doc.text('ThousandBurgers', 70, 25);
    doc.setDrawColor(black);
    doc.line(60, 30, 145, 30);
    doc.text('Ticket', 80, 40);
    doc.setDrawColor(black);
    doc.line(10, 45, 200, 45);
    return doc;
  }

  private contenido(doc: jsPDF): jsPDF {
    const baseX = 10;
    const black = "#000000";
    let baseY = 50;
    let price = 0;
    this.order.forEach(order => {
      this.products.push(order.product);
      price += order.product.price;
    });
    console.log(this.products);
    this.products.forEach(product => {
      doc.text(product.name, baseX, baseY);
      baseY += 10;
    });
    doc.text('Total price: ' + price, baseX, baseY);

    
    return doc;
  }

}
