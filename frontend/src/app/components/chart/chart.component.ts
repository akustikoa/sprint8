import { Component, OnInit, signal } from '@angular/core';
import { LocationService, Location } from '../../services/location.service';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, LineController, PointElement, LineElement, Title, Tooltip } from 'chart.js';

@Component({
  selector: 'app-chart',
  standalone: true,
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  chart: any;
  locations = signal<Location[]>([]);

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.registerChartElements();
    this.loadLocations();
  }

  registerChartElements(): void {
    Chart.register(BarController, BarElement, CategoryScale, LinearScale, LineController, PointElement, LineElement, Title, Tooltip);
  }

  loadLocations(): void {
    this.locationService.getLocations().subscribe((locations) => {
      this.locations.set(locations);
      this.createCharts();
    });
  }

  createCharts(): void {
    const locationNames = this.locations().map(location => location.name);
    const latitudes = this.locations().map(location => location.latitude);
    const longitudes = this.locations().map(location => location.longitude);


    const ctxBar = document.getElementById('barChart') as HTMLCanvasElement;
    this.chart = new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: locationNames,
        datasets: [{
          label: 'Latitud',
          data: latitudes,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });


    const ctxLine = document.getElementById('lineChart') as HTMLCanvasElement;
    new Chart(ctxLine, {
      type: 'line',
      data: {
        labels: locationNames,
        datasets: [{
          label: 'Longitud',
          data: longitudes,
          fill: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
