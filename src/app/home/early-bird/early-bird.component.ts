import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'koun-early-bird',
  templateUrl: './early-bird.component.html',
  styleUrls: ['./early-bird.component.scss'],
})
export class EarlyBirdComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  earlyBirdSuccess: boolean;
  constructor(
    translate: TranslateService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  subscribe() {
    this.formGroup.markAsDirty();
    if (this.formGroup.valid) {
      this.authenticationService
        .earlyBirdSubscribe(this.formGroup.get('email')?.value)
        .subscribe((authToken) => {
          this.earlyBirdSuccess = true;
        });
    }
  }
}
