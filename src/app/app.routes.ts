import { Routes } from '@angular/router';
import { NotFoundComponent } from './domains/info/pages/not-found/not-found.component';
import { ProductDetailComponent } from './domains/products/pages/product-detail/product-detail.component';
import { LayoutComponent } from './domains/shared/components/layout/layout.component';

export const routes: Routes = [
    { 
        path: '', 
        component: LayoutComponent,
        children: [
            { 
                path: '', 
                loadComponent: () => import('@products/pages/list-products/list-products.component') },
            { 
                path: 'about',
                loadComponent: () => import('@info/pages/about/about.component') },
            { 
                path: 'product/:id',
                loadComponent: () => import('@products/pages/product-detail/product-detail.component').then(c => c.ProductDetailComponent) 
            },
        ]
    },
    { path: '**', component: NotFoundComponent}
];
