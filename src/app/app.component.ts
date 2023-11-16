import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  ngOnInit() {
    // Este código se ejecutará cuando la página se cargue completamente
    this.addScrollListener();
  }

  addScrollListener() {
    window.addEventListener('scroll', () => {
      const menu = document.querySelector('.menu');
      const body = document.querySelector('body');
      if (menu && body) {
        if (window.scrollY > 100) {
          menu.classList.add('scrolled');
          body.classList.add('scrolled');
        } else {
          menu.classList.remove('scrolled');
          body.classList.remove('scrolled');
        }
      }
    });
  }
}


