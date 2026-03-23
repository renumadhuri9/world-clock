import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TimezonePreference {
  city: string;
  enabled: boolean;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Settings</h2>
      <p>Customize your World Clock preferences</p>

      <div class="settings-group">
        <h3>Display Preferences</h3>
        
        <div class="setting-item">
          <label>Time Format</label>
          <select [(ngModel)]="timeFormat">
            <option value="12">12 Hour</option>
            <option value="24">24 Hour</option>
          </select>
        </div>

        <div class="setting-item">
          <label>Theme</label>
          <select [(ngModel)]="theme">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>

        <div class="setting-item">
          <label>
            <input type="checkbox" [(ngModel)]="autoRefresh" />
            Auto Refresh (Every 1 second)
          </label>
        </div>
      </div>

      <div class="settings-group">
        <h3>Manage Cities</h3>
        <p>Select which cities to display:</p>
        <div class="city-list">
          <div *ngFor="let tz of timezones" class="city-item">
            <input type="checkbox" [(ngModel)]="tz.enabled" />
            <label>{{ tz.city }}</label>
          </div>
        </div>
      </div>

      <div class="settings-actions">
        <button class="btn-save" (click)="saveSettings()">Save Settings</button>
        <button class="btn-reset" (click)="resetSettings()">Reset to Default</button>
      </div>

      <div *ngIf="saveMessage" class="save-message">{{ saveMessage }}</div>
    </div>
  `,
  styles: [`
    .container {
      background: white;
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      max-width: 600px;
      margin: 0 auto;
    }

    h2 {
      color: #667eea;
      font-size: 2rem;
      margin-bottom: 0.5rem;
      border-bottom: 2px solid #667eea;
      padding-bottom: 0.5rem;
    }

    h3 {
      color: #764ba2;
      margin-top: 2rem;
      margin-bottom: 1.5rem;
    }

    .settings-group {
      margin-bottom: 2rem;
    }

    .setting-item {
      display: grid;
      grid-template-columns: 150px 1fr;
      gap: 1rem;
      padding: 1rem 0;
      border-bottom: 1px solid #eee;
      align-items: center;
    }

    .setting-item:last-of-type {
      border-bottom: none;
    }

    label {
      font-weight: 600;
      color: #333;
    }

    select {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 0.95rem;
    }

    select:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .city-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
      padding: 1rem 0;
    }

    .city-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .city-item input[type="checkbox"] {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }

    .city-item label {
      margin: 0;
      cursor: pointer;
      font-weight: 400;
    }

    .settings-actions {
      margin-top: 2rem;
      display: flex;
      gap: 1rem;
    }

    button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-save {
      background-color: #667eea;
      color: white;
    }

    .btn-save:hover {
      background-color: #764ba2;
      transform: translateY(-2px);
    }

    .btn-reset {
      background-color: #f0f0f0;
      color: #333;
      border: 1px solid #ddd;
    }

    .btn-reset:hover {
      background-color: #e0e0e0;
    }

    .save-message {
      margin-top: 1rem;
      padding: 1rem;
      background-color: #f0f4ff;
      color: #667eea;
      border-radius: 4px;
      text-align: center;
      font-weight: 600;
    }
  `]
})
export class SettingsComponent {
  timeFormat = '12';
  theme = 'auto';
  autoRefresh = true;
  saveMessage = '';

  timezones: TimezonePreference[] = [
    { city: 'New York', enabled: true },
    { city: 'London', enabled: true },
    { city: 'Paris', enabled: false },
    { city: 'Dubai', enabled: false },
    { city: 'Tokyo', enabled: true },
    { city: 'Sydney', enabled: true },
    { city: 'Mumbai', enabled: false },
    { city: 'Hong Kong', enabled: false },
    { city: 'Singapore', enabled: false },
    { city: 'Toronto', enabled: false },
    { city: 'Mexico City', enabled: false },
    { city: 'São Paulo', enabled: false }
  ];

  saveSettings() {
    this.saveMessage = 'Settings saved successfully!';
    setTimeout(() => {
      this.saveMessage = '';
    }, 3000);
  }

  resetSettings() {
    this.timeFormat = '12';
    this.theme = 'auto';
    this.autoRefresh = true;
    this.timezones = this.timezones.map(tz => ({
      ...tz,
      enabled: ['New York', 'London', 'Tokyo', 'Sydney'].includes(tz.city)
    }));
    this.saveMessage = 'Settings reset to default!';
    setTimeout(() => {
      this.saveMessage = '';
    }, 3000);
  }
}
