import { CanDeactivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { ProductListComponent } from '../product-list/product-list.component';
import { Observable } from 'rxjs';

export class DeactivateProductList implements CanDeactivate<ProductListComponent> {
  canDeactivate(component: ProductListComponent, currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot)
    : boolean | Observable<boolean> | Promise<boolean> {

    if ( component.hasChanges() ) {
      return window.confirm('You have unsaved changes. Do you really want to cancel?');
    }
    return true;
  }
}
