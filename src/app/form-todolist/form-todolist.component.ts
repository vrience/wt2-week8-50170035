import { Component, OnInit } from '@angular/core';
import {  Item } from '../item';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-form-todolist',
  templateUrl: './form-todolist.component.html',
  styleUrls: ['./form-todolist.component.scss']
})
export class FormToDoListComponent implements OnInit {
  id: string;
  update: boolean = false;
  item: Item;
  itemForm = this.fb.group({
    message: ["", [Validators.required, Validators.minLength(4)]],
    time: ["", [Validators.required]],
    status: ["Undone", [Validators.required]],
    check: [false, [Validators.requiredTrue]],
  });
  error=false;
  message = this.itemForm.get("message");
  time = this.itemForm.get("time");
  status = this.itemForm.get("status");
  check = this.itemForm.get("check");

  constructor(
    private _snackBar: MatSnackBar,
    private ds: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      if (param.get("id")) {
        this.id = param.get("id");
        this.ds.getItem(this.id).subscribe(
          (response) => {
            this.item = response;
            this.update = true;

            this.itemForm.get("message").setValue(this.item.message);
            this.itemForm.get("time").setValue(this.item.time);
            this.itemForm.get("status").setValue(this.item.status);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  postItem() {
    const param = this.itemForm.value;
    delete param.check;

    this.ds.postItem(this.itemForm.value).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(["first"]);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateItem() {
    this.ds.updateItem(this.id, this.itemForm.value).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(["first"]);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteItem() {
    if (confirm("Are you sure you want to delete this user?")) {
      this.ds.deleteItem(this.id).subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(["first"]);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}

