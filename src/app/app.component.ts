import { Component } from '@angular/core';
//using bootstrap for modal
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})

export class AppComponent {
  // all the variables
  userImg = "https://dyl80ryjxr1ke.cloudfront.net/external_assets/hero_examples/hair_beach_v1785392215/original.jpeg";
  userId = 2;
  name = "Maria Khanam Tondra";
  menu = "Public";
  url;
  showStatus: any;
  alertType: string;
  alertMessage: string;
  success = "success";

  constructor(private modalService: NgbModal) { }

  openCustomModal(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  }

  //this function will change the value according to the selected dropdown menu
  selectDropdown(value) {
    this.menu = value;
  }

  // upload picture from system
  selectFile(event) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      return;
    }

    var mimeType = event.target.files[0].type;

    // use of regex to validate proper file name
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.url = reader.result;
    }
  }

  // if user click on the selected image then delete the file
  removeFile() {
    this.url = null;
  }

  // on submission post
  writePost(msg, location, keyword) {
    let result: boolean = this.validate(this.url, this.menu, msg, this.userId, location, keyword);
    // show result according to the validation
    if (result) {
      this.modalService.dismissAll();
      this.alertType = "success";
      this.alertMessage = "post successfully uploaded"
    } else {
      this.alertType = "danger";
      this.alertMessage = "uploading failed"
    }
  }

  // validate the input parameters
  validate(url: any, sharedType: string, fileDescription: any, userId: number, location: any, keyword: any) {
    if (url &&
      sharedType &&
      fileDescription &&
      userId &&
      location &&
      keyword)
      return true;
    else return false;

  }

  // hide the alert
  closeAlert() {
    this.alertType = undefined;
    this.alertMessage = undefined;
  }
}

