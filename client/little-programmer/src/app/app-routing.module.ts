import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RootLevelComponent} from "./root-level/root-level.component";
import {LevelMenuComponent} from "./level-menu/level-menu.component";


const routes: Routes = [
  {path: 'level/:id', component: RootLevelComponent},
  {path: '', component: LevelMenuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
