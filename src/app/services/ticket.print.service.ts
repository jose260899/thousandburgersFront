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
        const width = 80; // Ancho de la hoja en mm
        const height = 200; // Alto de la hoja en mm
        doc.addPage([width, height]);
        doc = this.cabecera(doc);
        doc = this.contenido(doc);
        //doc = this.pie(doc);
        console.log(doc);
        doc.deletePage(1);
        doc.save('ticket.pdf');
      }
    })
  }

  private cabecera(doc: jsPDF): jsPDF {
    const black = "#000000";
    doc.setFontSize(20);
    doc.text('ThousandBurgers', 15, 25);
    doc.setDrawColor(black);
    doc.line(10, 30, 70, 30);
    doc.text('Ticket', 30, 40);
    doc.setDrawColor(black);
    doc.line(10, 45, 70, 45);
    return doc;
  }

  private contenido(doc: jsPDF): jsPDF {
    const baseX = 10;
    let baseY = 60;
    let totalPrice = 0;

    // Encabezado del ticket
    doc.setFontSize(12);
    doc.text("Tienda XYZ", baseX, baseY);
    baseY += 7;
    doc.text("Dirección de la tienda", baseX, baseY);
    baseY += 7;
    doc.text("Teléfono: 123-456-789", baseX, baseY);
    baseY += 10;
    doc.text("------------------------------------", baseX, baseY);
    baseY += 5;

    // Contenido de la orden
    this.order.forEach(order => {
        const product = order.product;
        doc.setFontSize(10);
        doc.text(product.name, baseX, baseY);
        doc.text(product.price.toFixed(2) + " €", baseX + 40, baseY);
        baseY += 5;
        totalPrice += product.price;
    });

    // Línea divisoria y total
    doc.text("------------------------------------", baseX, baseY);
    baseY += 5;
    //doc.setFontStyle('bold');
    doc.text("Total:", baseX, baseY);
    doc.text(totalPrice.toFixed(2) + " €", baseX + 80, baseY);

    // Pie de página
    baseY += 10;
    //doc.setFontStyle('normal');
    doc.text("¡Gracias por su compra!", baseX, baseY);
    baseY += 5;
    doc.text("Visítenos de nuevo pronto", baseX, baseY);

    return doc;
}

}
