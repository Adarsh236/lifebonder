import { Component } from '@angular/core';
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

  selectDropdown(value) {
    this.menu = value;
  }

  selectFile(event) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.url = reader.result;
    }
  }

  removeFile() {
    this.url = null;
  }

  writePost(msg, location, keyword) {
    let result: boolean = this.validate(this.url, this.menu, msg, this.userId, location, keyword);
    if (result) {
      this.modalService.dismissAll();
      this.alertType = "success";
      this.alertMessage = "post successfully uploaded"
    } else {
      this.alertType = "danger";
      this.alertMessage = "uploading failed"
    }
  }

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

  closeAlert() {
    this.alertType = undefined;
    this.alertMessage = undefined;
  }
}

