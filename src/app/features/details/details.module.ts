import { NgModule } from '@angular/core';

import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [DetailsComponent],
  imports: [SharedModule, DetailsRoutingModule],
})
export class DetailsModule {}
