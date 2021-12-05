import {
  Component,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { FormsModule } from '@angular/forms'
import { UserService } from '../user.service'
import { Location } from '@angular/common'
import { Router, ActivatedRoute } from '@angular/router'
import { User } from '../home/home.model'
import { actionEnum, titleEnum } from '../enums'
@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss'],
})
export class UserEditorComponent implements OnInit {
  // @Output() changeTitle: EventEmitter<string> = new EventEmitter<string>()
   @Output() title: string = 'Edit';
  //@Input() action: string | undefined;
  public user: User = {
    id: '',
    firstName: '',
    lastName: '',
    age: 0,
    phone: '',
  }
  // private action: actionsEnum.Add | undefined;
  // private action: actionsEnum.Add | undefined;
  public action!: actionEnum
  // public action: string = 'add';
  @ViewChild('f') form: any
  // public profileForm = new FormGroup({
  //   firstName: new FormControl('',Validators.required),
  //   lastName: new FormControl('',Validators.required),
  //   age: new FormControl('',Validators.required),
  //   phone: new FormControl('',Validators.required)
  // });
  constructor(
    private userService: UserService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.user.id = params['id']
      this.user.firstName = params['firstName']
      this.user.lastName = params['lastName']
      this.user.age = params['age']
      this.user.phone = params['phone']
      this.action = params['action']
      // this.changeTitle.emit(params['action'])
    })
  }

  goBack(): void {
    this.location.back()
  }

  onSubmit() {
    if (this.form.valid) {
      // this.user.firstName = this.form.value.name.firstName;
      // this.user.lastName = this.form.value.lastName;
      // this.user.age = this.form.value.age;
      // this.user.phone = this.form.value.phone;
      if (this.action == 'Edit') {
        this.userService.updateUser(this.user).subscribe(() => this.goBack())
      }
      if (this.action == 'Add') {
        this.userService.addUser(this.user).subscribe(() => this.goBack())
      }

      // switch(this.action) {
      //   case actionEnum.Add: {
      //     this.userService.addUser(this.user).subscribe(() => this.goBack());
      //     break;
      //   }
      //   case actionEnum.Edit: {
      //     this.userService.updateUser(this.user).subscribe(() => this.goBack());
      //     break;
      //   }
      //   default: {
      //     this.userService.addUser(this.user).subscribe(() => this.goBack());
      //     break;
      //  }
      // }
      console.log('our form', this.form)
    } else {
      console.log('not valid form', this.form)
    }

    // TODO: Use EventEmitter with form value
  }
}
