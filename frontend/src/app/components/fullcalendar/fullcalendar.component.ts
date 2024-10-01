import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular';

@Component({
  selector: 'app-fullcalendar',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './fullcalendar.component.html',
  styleUrls: ['./fullcalendar.component.css']
})
export class FullcalendarComponent {
  calendarEvents: any[] = [];

  calendarOptions: CalendarOptions = {
    plugins: [timeGridPlugin, interactionPlugin],
    initialView: 'timeGridWeek',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: ''
    },
    editable: true, // edita events
    selectable: true, // interval setmanes 
    events: this.calendarEvents,
    height: 'auto',
    allDaySlot: false,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this)
  };

  handleDateSelect(selectInfo: any) {
    const title = prompt('Introdueix el títol de l\'esdeveniment');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: String(this.calendarEvents.length + 1),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr
      });
    }
  }

  handleEventClick(clickInfo: any) {
    if (confirm(`Segur que vols eliminar l'esdeveniment '${clickInfo.event.title}'?`)) {
      clickInfo.event.remove();
    }
  }
}
