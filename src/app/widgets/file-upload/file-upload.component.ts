import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  @Output() fileToUpload = new EventEmitter<File>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onFileDropped(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.fileToUpload.emit(files.item(i));
    }
  }

  onFileSelected(event) {
    this.onFileDropped(event.target.files);
  }

}
