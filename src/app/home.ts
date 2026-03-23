import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Timezone {
  city: string;
  offset: string;
  time: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>Current Time</h2>
      <div class="time-display">
        <div class="clock-face">
          <div class="time">{{ currentTime }}</div>
          <div class="date">{{ currentDate }}</div>
        </div>
      </div>
      
      <div class="quick-timezones">
        <h3>Quick Access</h3>
        <div class="tz-grid">
          <div *ngFor="let tz of timezones" class="tz-card">
            <h4>{{ tz.city }}</h4>
            <p class="tz-time">{{ tz.time }}</p>
            <p class="tz-offset">{{ tz.offset }}</p>
          </div>
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
      margin-bottom: 2rem;
      text-align: center;
    }

    .time-display {
      display: flex;
      justify-content: center;
      margin: 2rem 0;
    }

    .clock-face {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      width: 250px;
      height: 250px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    }

    .time {
      color: white;
      font-size: 3.5rem;
      font-weight: bold;
      text-align: center;
    }

    .date {
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.9rem;
      margin-top: 1rem;
    }

    .quick-timezones {
      margin-top: 3rem;
    }

    h3 {
      color: #764ba2;
      margin-bottom: 1.5rem;
    }

    .tz-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
    }

    .tz-card {
      background: #f0f4ff;
      border-left: 4px solid #667eea;
      padding: 1rem;
      border-radius: 4px;
      text-align: center;
    }

    .tz-card h4 {
      margin: 0 0 0.5rem 0;
      color: #333;
    }

    .tz-time {
      margin: 0.5rem 0;
      font-size: 1.25rem;
      font-weight: bold;
      color: #667eea;
    }

    .tz-offset {
      margin: 0;
      color: #999;
      font-size: 0.9rem;
    }
  `]
})
export class HomeComponent implements OnInit {
  currentTime = '';
  currentDate = '';
  timezones: Timezone[] = [];

  ngOnInit() {
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
    this.currentDate = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    this.timezones = [
      { city: 'New York', offset: 'UTC-5', time: this.getTimeInTimezone(-5) },
      { city: 'London', offset: 'UTC+0', time: this.getTimeInTimezone(0) },
      { city: 'Paris', offset: 'UTC+1', time: this.getTimeInTimezone(1) },
      { city: 'Dubai', offset: 'UTC+4', time: this.getTimeInTimezone(4) },
      { city: 'Tokyo', offset: 'UTC+9', time: this.getTimeInTimezone(9) },
      { city: 'Sydney', offset: 'UTC+10', time: this.getTimeInTimezone(10) }
    ];
  }

  getTimeInTimezone(offset: number): string {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const tzTime = new Date(utc + (3600000 * offset));
    return tzTime.toLocaleTimeString();
  }
}
