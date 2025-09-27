import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { AuthJWTService } from '../../services/auth/auth-jwt.service';
import { NgFor, NgIf } from '@angular/common';
import Swal from 'sweetalert2';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatDialog, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-registerradius',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule,
    MatSelectModule, MatFormFieldModule, MatDatepickerModule,
    MatNativeDateModule, MatButtonModule, MatIconModule,
    MatPaginatorModule, MatDialogModule, MatTableModule, NgIf],
  templateUrl: './registerradius.component.html',
  styleUrl: './registerradius.component.css'
})
export class RegisterradiusComponent {
  radiusForm: any;
  TokenGKey: any = "";
  Decreptedtoken: any = "";
  VendorID: any;
  editForm!: FormGroup;
  selectedRow: any;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'comapanyname', 'latitude', 'longitude', 'radiusinmeter', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // @ViewChild('editDialog') editDialogTemplate!: TemplateRef<any>;
  constructor(private fb: FormBuilder, private URL: AdminService, private auth: AuthJWTService, private dialog: MatDialog) {
    this.TokenGKey = this.auth.getglobaltoken();
    this.Decreptedtoken = this.auth.decrypt(this.TokenGKey);
    this.VendorID = this.auth.getUserId();
    this.Getradius();
  }

  ngOnInit() {
    this.radiusForm = this.fb.group({
      latitude: [null],
      longitude: [null],
      radiusinmeter: [null],
      comapanyname: [null],
      Ipaddress: [],
      VendorID: []
    });
    // Edit form - this was missing
  this.editForm = this.fb.group({
    comapanyname: [null],
    latitude: [null],
    longitude: [null],
    radiusinmeter: [null],
    VendorID: [],
    ID:[]
  });
  }

  //  ngAfterViewInit(): void {
  //   this.loadMapWithCurrentLocation();
  // }
  //  loadMapWithCurrentLocation(): void {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(position => {
  //       const lat = position.coords.latitude;
  //       const lng = position.coords.longitude;

  //       // Set values in the form
  //       this.radiusForm.patchValue({
  //         latitude: lat,
  //         longitude: lng
  //       });

  //       const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
  //         center: { lat, lng },
  //         zoom: 17
  //       });

  //       // Add marker
  //       new google.maps.Marker({
  //         position: { lat, lng },
  //         map,
  //         title: "You are here"
  //       });
  //     }, error => {
  //       console.error("Geolocation error:", error);
  //       alert("Unable to access location. Please allow location access.");
  //     });
  //   } else {
  //     alert("Geolocation is not supported by this browser.");
  //   }
  // }

  Getradius() {
    this.URL.Getradiusasync(this.Decreptedtoken, this.VendorID).subscribe({
      next: data => {
        this.dataSource.data = data;
      },
      error: err => {
        let errorMessage = 'Something went wrong.';

        if (err.error && err.error.message) {
          errorMessage = err.error.message; // Extract message from backend
        } else if (err.status === 0) {
          errorMessage = 'Server is unreachable.';
        }

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
        });
      }
    })
  }
  onSubmit() {

    const Comapanyname = this.radiusForm.get('comapanyname').value;
    const latitude = this.radiusForm.get('latitude').value;
    const longitude = this.radiusForm.get('longitude').value;
    const radiusinmeter = this.radiusForm.get('radiusinmeter').value;

    if (Comapanyname === '' || latitude === null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Enter location name.'
      })
      return;
    }
   else if (latitude === 0 || latitude === null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Enter latitude'
      })
      return;
    }
    else if (longitude === 0 || longitude === null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Enter longitude'
      })
      return;
    }
    else if (radiusinmeter === 0 || radiusinmeter === null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Enter radius in meter'
      })
      return;
    }

    this.auth.getIpAddress().subscribe({
      next: (ip: any) => {
        this.radiusForm.patchValue({
          Ipaddress: ip.ip
        })
      },
      error: (err) => {
        console.error('Failed to get IP address:', err);
      }
    });
    this.radiusForm.patchValue({
      VendorID: this.VendorID
    })
    const param = this.radiusForm.value;
    this.URL.Registerradiusasync(this.Decreptedtoken, param).subscribe({
      next: data => {
        if (data.status === "success") {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: data.message
          });
          this.Getradius()
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: data.message
          })
        }

      },
      error: err => {
        let errorMessage = 'Something went wrong.';

        if (err.error && err.error.message) {
          errorMessage = err.error.message; // Extract message from backend
        } else if (err.status === 0) {
          errorMessage = 'Server is unreachable.';
        }

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
        });
      }
    })
  }

  // Open the dialog and populate form with selected row data
openEditDialog(element: any, dialogTemplate: TemplateRef<any>) {
  this.selectedRow = element;

  // Patch values to the form (make sure keys match formControlName)
  this.editForm.patchValue({
    comapanyname: element.comapanyname,
    latitude: element.latitude,
    longitude: element.longitude,
    radiusinmeter: element.radiusinmeter,
    ID:element.id
  });

  // Open dialog
  this.dialog.open(dialogTemplate);
}

// Update radius method
updateRadius() {
  // Validate form before submitting
  if (this.editForm.invalid) {
    Swal.fire({
      icon: 'warning',
      title: 'Invalid Input',
      text: 'Please fill all required fields correctly.'
    });
    return;
  }

  // Add VendorID to form data
  this.editForm.patchValue({
    VendorID: this.VendorID
  });

  const param = this.editForm.value;

  // Call API to update radius
  this.URL.Updateradiusasync(this.Decreptedtoken, param).subscribe({
    next: data => {
      if (data.status === "success") {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: data.message
        });

        this.dialog.closeAll(); // Close the dialog
        this.Getradius();       // Refresh list
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message || 'Something went wrong.'
        });
      }
    },
    error: err => {
      let errorMessage = 'Something went wrong.';

      if (err.error && err.error.message) {
        errorMessage = err.error.message;
      } else if (err.status === 0) {
        errorMessage = 'Server is unreachable.';
      }

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
      });
    }
  });
}



  allowOnlyFloat(event: KeyboardEvent) {
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
    const inputChar = event.key;

    // Prevent multiple decimal points
    const inputElement = event.target as HTMLInputElement;
    const currentValue = inputElement.value;

    if (!allowedKeys.includes(inputChar)) {
      event.preventDefault();
    }

    if (inputChar === '.' && currentValue.includes('.')) {
      event.preventDefault();
    }
  }

  preventPaste(event: ClipboardEvent) {
    const clipboardData = event.clipboardData?.getData('text') || '';
    const floatRegex = /^\d*\.?\d*$/;

    if (!floatRegex.test(clipboardData)) {
      event.preventDefault();
    }
  }

  allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  allowEnglishNumbersSpecialCharsAndSpace(event: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'];
    const regex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._\- ]$/; // includes space at the end

    if (allowedKeys.includes(event.key)) {
      return; // Allow navigation and control keys
    }

    if (!regex.test(event.key)) {
      event.preventDefault(); // Block everything else
    }
  }
}
