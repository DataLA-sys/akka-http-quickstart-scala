import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopologyComponent } from './components/topology/topology.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/topoloy', pathMatch: 'full' },
  { path: '', component: TopologyComponent },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
