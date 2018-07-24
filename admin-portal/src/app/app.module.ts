import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { routing } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {  MatAutocompleteModule,
		  MatBadgeModule,
		  MatBottomSheetModule,
		  MatButtonModule,
		  MatButtonToggleModule,
		  MatCardModule,
		  MatCheckboxModule,
		  MatChipsModule,
		  MatDatepickerModule,
		  MatDialogModule,
		  MatDividerModule,
		  MatExpansionModule,
		  MatGridListModule,
		  MatIconModule,
		  MatInputModule,
		  MatFormFieldModule,
		  MatListModule,
		  MatMenuModule,
		  MatNativeDateModule,
		  MatPaginatorModule,
		  MatProgressBarModule,
		  MatProgressSpinnerModule,
		  MatRadioModule,
		  MatRippleModule,
		  MatSelectModule,
		  MatSidenavModule,
		  MatSliderModule,
		  MatSlideToggleModule,
		  MatSnackBarModule,
		  MatSortModule,
		  MatStepperModule,
		  MatTableModule,
		  MatTabsModule,
		  MatToolbarModule,
		  MatTooltipModule,
		  MatTreeModule} from '@angular/material';
import 'hammerjs';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './components/login/login.component';
import { AddNewBookComponent } from './components/add-new-book/add-new-book.component';
import { BookListComponent, DialogResultExampleDialog } from './components/book-list/book-list.component';
import { ViewBookComponent } from './components/view-book/view-book.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';

import { LoginService } from './services/login.service';
import { AddBookService } from './services/add-book.service';
import { UploadImageService } from './services/upload-image.service';
import { GetBookListService } from './services/get-book-list.service';
import { GetBookService } from './services/get-book.service';
import { EditBookService } from './services/edit-book.service';
import { RemoveBookService } from './services/remove-book.service';





//overiew file that mentain all the components, services within our app
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    AddNewBookComponent,
    BookListComponent,
    DialogResultExampleDialog,
    ViewBookComponent,
    EditBookComponent
  ],
  imports: [
    BrowserModule,
    MatAutocompleteModule,
	MatBadgeModule,
	MatBottomSheetModule,
	MatButtonModule,
	MatButtonToggleModule,
	MatCardModule,
	MatCheckboxModule,
	MatChipsModule,
	MatDatepickerModule,
	MatDialogModule,
	MatDividerModule,
	MatExpansionModule,
	MatGridListModule,
	MatIconModule,
	MatInputModule,
	MatFormFieldModule,
	MatListModule,
	MatMenuModule,
	MatNativeDateModule,
	MatPaginatorModule,
	MatProgressBarModule,
	MatProgressSpinnerModule,
	MatRadioModule,
	MatRippleModule,
	MatSelectModule,
	MatSidenavModule,
	MatSliderModule,
	MatSlideToggleModule,
	MatSnackBarModule,
	MatSortModule,
	MatStepperModule,
	MatTableModule,
	MatTabsModule,
	MatToolbarModule,
	MatTooltipModule,
	MatTreeModule,
	HttpModule,
	routing,
	FormsModule,
	BrowserAnimationsModule  
  ],
  providers: [
  	LoginService,
  	AddBookService,
  	UploadImageService,
  	GetBookListService,
  	GetBookService,
  	EditBookService,
  	RemoveBookService
  ],
  bootstrap: [AppComponent, DialogResultExampleDialog]
})

export class AppModule {
	title = 'app works!';
}
