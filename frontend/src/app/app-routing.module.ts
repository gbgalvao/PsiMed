import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CadastroCreateComponent } from './components/cadastro/cadastro-create/cadastro-create.component';
import { CadastroDeleteComponent } from './components/cadastro/cadastro-delete/cadastro-delete.component';
import { CadastroUpdateComponent } from './components/cadastro/cadastro-update/cadastro-update.component';
import { HomeComponent } from './views/home/home.component';
import { PersonCrudComponent } from './views/person-crud/person-crud.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'person',component:PersonCrudComponent},
  {path:'cadastro',component:CadastroCreateComponent},
  {path:'cadastro/update/:id',component: CadastroUpdateComponent},
  {path:'cadastro/delete/:id',component: CadastroDeleteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
