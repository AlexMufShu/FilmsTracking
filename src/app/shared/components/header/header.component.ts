import { Component } from '@angular/core';

@Component({
  selector: 'kinostorm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  links = [
    {
      name: 'Каталог',
      href: '/films',
      icon: '/assets/icons/home.png'
    },
    {
      name: 'Подборки',
      href: '/find',
      icon: '/assets/icons/search.png'
    },
    {
      name: 'Скоро на kinostorm',
      href: '/next',
      icon: '/assets/icons/folder.png'
    },
    {
      name: 'Мой список',
      href: '/list',
      icon: '/assets/icons/person.png'
    },
  ]

  constructor() {
  }
}
