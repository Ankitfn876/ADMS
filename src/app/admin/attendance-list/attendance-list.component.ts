import { Component, ViewChild } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { AuthJWTService } from '../../services/auth/auth-jwt.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import Swal from 'sweetalert2';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgStyle } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
@Component({
  selector: 'app-attendance-list',
  imports: [MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule, MatTooltipModule,MatProgressBarModule],
  templateUrl: './attendance-list.component.html',
  styleUrl: './attendance-list.component.css'
})
export class AttendanceListComponent {

}
