import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="container">
      <h2>About World Clock</h2>
      <div class="about-content">
        <section>
          <h3>What is World Clock?</h3>
          <p>
            World Clock is a simple and intuitive application that displays the current time in major cities around the world.
            Keep track of different time zones effortlessly and plan your global communications with ease.
          </p>
        </section>

        <section>
          <h3>Features</h3>
          <ul>
            <li>Real-time clock updates every second</li>
            <li>Display time in 12 major cities worldwide</li>
            <li>Easy timezone management and settings</li>
            <li>Clean and intuitive user interface</li>
            <li>Responsive design for all devices</li>
          </ul>
        </section>

        <section>
          <h3>How to Use</h3>
          <ol>
            <li>Navigate to the "Clocks" section to see current time in different cities</li>
            <li>Visit "Settings" to customize your preferred timezones</li>
            <li>The home page shows your local time with quick access to major cities</li>
          </ol>
        </section>

        <section>
          <h3>Technologies Used</h3>
          <p>Built with Angular 19 for a fast, responsive experience.</p>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .container {
      background: white;
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      max-width: 800px;
      margin: 0 auto;
    }

    h2 {
      color: #667eea;
      font-size: 2rem;
      margin-bottom: 2rem;
      border-bottom: 2px solid #667eea;
      padding-bottom: 0.5rem;
    }

    .about-content {
      line-height: 1.8;
    }

    section {
      margin-bottom: 2rem;
    }

    section:last-child {
      margin-bottom: 0;
    }

    h3 {
      color: #764ba2;
      margin-top: 0;
      margin-bottom: 1rem;
      font-size: 1.3rem;
    }

    p {
      color: #555;
      margin: 0 0 1rem 0;
    }

    ul, ol {
      color: #555;
      padding-left: 1.5rem;
    }

    li {
      margin-bottom: 0.5rem;
    }
  `]
})
export class AboutComponent {}
