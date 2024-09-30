import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // Necessari per a l'interacció (clics i seleccions)
import { FullCalendarModule } from '@fullcalendar/angular';

@Component({
  selector: 'app-fullcalendar',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './fullcalendar.component.html',
  styleUrls: ['./fullcalendar.component.css']
})
export class FullcalendarComponent {
  calendarEvents: any[] = [
    { id: '1', title: 'Event 1', start: '2024-09-29T09:00:00', end: '2024-09-29T10:00:00' },
    { id: '2', title: 'Event 2', start: '2024-09-30T12:00:00', end: '2024-09-30T13:00:00' }
  ];

  calendarOptions: CalendarOptions = {
    plugins: [timeGridPlugin, interactionPlugin],
    initialView: 'timeGridWeek', // Només mostra la vista setmanal
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: '' // No inclou cap botó per canviar la vista
    },
    editable: false, // Desactiva l'opció d'editar esdeveniments (arrossegar, canviar mida)
    selectable: true, // Permet seleccionar un interval de temps per afegir esdeveniments
    events: this.calendarEvents,
    height: 'auto', // Ajusta automàticament l'alçada del calendari
    select: this.handleDateSelect.bind(this), // Funció per afegir esdeveniments
    eventClick: this.handleEventClick.bind(this) // Funció per eliminar esdeveniments
  };

  // Afegir un nou esdeveniment després de seleccionar una data
  handleDateSelect(selectInfo: any) {
    const title = prompt('Introdueix el títol de l\'esdeveniment');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // Neteja la selecció actual

    if (title) {
      calendarApi.addEvent({
        id: String(this.calendarEvents.length + 1), // Assigna un id únic
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr
      });
    }
  }

  // Eliminar un esdeveniment quan es fa clic
  handleEventClick(clickInfo: any) {
    if (confirm(`Segur que vols eliminar l'esdeveniment '${clickInfo.event.title}'?`)) {
      clickInfo.event.remove(); // Elimina l'esdeveniment seleccionat
    }
  }
}
