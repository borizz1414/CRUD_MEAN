import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {
  public url:string;
  public title: string;
  public project: Project;
  public save_project;
  public status: string;
  public filesToUpload: Array<File>
  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _route:ActivatedRoute,
    private _router:Router
  ) {
    this.title = "Editar proyecto";
    this.url = Global.url

  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = params.id;

      this.getProject(id)
    })
  }
  getProject(id) {

    this._projectService.getProject(id).subscribe(
      response => {
        this.project = response.Project;
      },
      error => {
        console.log(<any>error)
      }
    )

  }
  OnSubmit(){
    this._projectService.updateProject(this.project).subscribe(
      response => {
        if (response.project) {


          //Subir la Imagen
          if(this.filesToUpload){
            this._uploadService.makeFileRequest(this.url + "upload-image/" + response.project._id, [], this.filesToUpload, 'image').then((result: any) => {
              console.log(result)
              this.save_project = result.project;
              this.status = 'success';

            })
        }else{
            this.save_project = response.project;
            this.status = 'success';
        }


        } else {
          this.status = 'failed';
        }
      },
      error =>{
console.log(<any>error)
      }
    )
  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files
  }

}
