import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface WorldClock {
  city: string;
  country: string;
  offset: number;
  time: string;
}

@Component({
  selector: 'app-clocks',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>World Clocks</h2>
      <p>View current time in major cities around the world</p>
      
      <div class="clocks-grid">
        <div *ngFor="let clock of clocks" class="clock-card">
          <h3>{{ clock.city }}</h3>
          <p class="country">{{ clock.country }}</p>
          <p class="time">{{ clock.time }}</p>
          <p class="offset">{{ formatOffset(clock.offset) }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      background: white;
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    h2 {
      color: #667eea;
      font-size: 2rem;
      margin-bottom: 0.5rem;
      border-bottom: 2px solid #667eea;
      padding-bottom: 0.5rem;
    }

    p {
      color: #777;
    }

    .clocks-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }

    .clock-card {
      background: linear-gradient(135deg, #f0f4ff 0%, #f5f8ff 100%);
      border: 2px solid #667eea;
      border-radius: 8px;
      padding: 1.5rem;
      text-align: center;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .clock-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(102, 126, 234, 0.2);
    }

    h3 {
      margin: 0 0 0.5rem 0;
      color: #333;
      font-size: 1.3rem;
    }

    .country {
      margin: 0 0 1rem 0;
      color: #999;
      font-size: 0.9rem;
    }

    .time {
      font-size: 1.8rem;
      font-weight: bold;
      color: #667eea;
      margin: 1rem 0;
    }

    .offset {
      margin: 0;
      color: #764ba2;
      font-weight: 600;
      font-size: 0.9rem;
    }
  `]
})
export class ClocksComponent implements OnInit {
  clocks: WorldClock[] = [];

  ngOnInit() {
    this.updateClocks();
    setInterval(() => {
      this.updateClocks();
    }, 1000);
  }

  updateClocks() {
    this.clocks = [
      { city: 'New York', country: 'USA', offset: -5, time: '' },
      { city: 'London', country: 'UK', offset: 0, time: '' },
      { city: 'Paris', country: 'France', offset: 1, time: '' },
      { city: 'Dubai', country: 'UAE', offset: 4, time: '' },
      { city: 'Tokyo', country: 'Japan', offset: 9, time: '' },
      { city: 'Sydney', country: 'Australia', offset: 10, time: '' },
      { city: 'Mumbai', country: 'India', offset: 5.5, time: '' },
      { city: 'Hong Kong', country: 'China', offset: 8, time: '' },
      { city: 'Singapore', country: 'Singapore', offset: 8, time: '' },
      { city: 'Toronto', country: 'Canada', offset: -5, time: '' },
      { city: 'Mexico City', country: 'Mexico', offset: -6, time: '' },
      { city: 'São Paulo', country: 'Brazil', offset: -3, time: '' }
    ];

    this.clocks.forEach(clock => {
      clock.time = this.getTimeInTimezone(clock.offset);
    });
  }

  getTimeInTimezone(offset: number): string {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const tzTime = new Date(utc + (3600000 * offset));
    return tzTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }

  formatOffset(offset: number): string {
    const sign = offset >= 0 ? '+' : '';
    return `UTC${sign}${offset}`;
  }
}
