import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DisplaycoursesComponent } from './displaycourses/displaycourses.component';
import { ContentproviderComponent } from './contentprovider/contentprovider.component';
import { CourseContentComponent } from './displaycourses/course-content/course-content.component';
import { AdminComponent } from './admin/admin.component';
import { StudentComponent } from './student/student.component';
import { CourseVideoComponent } from './course-video/course-video.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { SearchCourseComponent } from './search-course/search-course.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { UpdatecourseComponent } from './contentprovider/updatecourse/updatecourse.component';


const routes: Routes = [

  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'displaycourses', component: DisplaycoursesComponent},
  {path: 'displaycourses/:catergory', component: DisplaycoursesComponent},
  {path: 'displaycourses/course-content/:id', component: CourseContentComponent},
  {path: 'displaycourses/:catergory/:subCatergory', component: DisplaycoursesComponent},

  {path: 'contentProvider', component: ContentproviderComponent},
  {path: 'admin', component: AdminComponent,data:{
    role: 'admin'
  }},
  {path: 'student', component: StudentComponent},
  {path: ':id/coursevideo', component: CourseVideoComponent,
   canActivate: [AuthGuard]
  },
  {path: 'superAdmin', component: SuperAdminComponent},
  {path: 'studentprofile/:id',component: StudentComponent },
  {path: 'contentproviderprofile/:id',component: ContentproviderComponent },
  {path: 'searchcourses',component:SearchCourseComponent  },
  {path: 'adminhome',component:AdminHomeComponent  },
  {path: 'contentProvider/update/:id',component:UpdatecourseComponent  },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
