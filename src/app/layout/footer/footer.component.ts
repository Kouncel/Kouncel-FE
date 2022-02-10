import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'koun-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  constructor() {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  subscribe() {
    this.formGroup.markAsDirty();
    if (this.formGroup.valid) {
      alert('Subscribed !');
      // this.authenticationService
      //   .login(
      //     this.formGroup.get('email')?.value,
      //     this.formGroup.get('password')?.value
      //   )
      //   .subscribe((authToken) => {
      //     localStorage.setItem('authToken', authToken);
      //     this.authenticationService.setLoggedInState(true);
      //     this.router.navigate(['']);
      //   });
    }
  }
}
