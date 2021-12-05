import { Component, OnInit, Output } from '@angular/core'
import { UserService } from '../user.service'
import { User } from './home.model'
import { titleEnum } from '../enums'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @Output() title: titleEnum = titleEnum.Home
  public users: User[] = []

  constructor(private userService: UserService) {}

  async getUsers() {
    await this.userService.getUsers().subscribe({
      next: (data: User[]) => (this.users = data),
      error: (e) => console.error(e),
      complete: () => console.log('complete', this.users),
    })
  }
  ngOnInit(): void {
    this.getUsers()
  }
}
