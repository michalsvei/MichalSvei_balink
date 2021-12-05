import { Component, Input, OnInit, SimpleChanges } from '@angular/core'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string | undefined
  constructor() {}

  ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['title']) {
      console.log('title change')
    }
  }
}
