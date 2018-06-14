import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators'


@Component({
    selector: 'rxjs',
    templateUrl: './rxjs.component.html',
    styleUrls: []
})
export class RxjsComponent implements OnInit, OnDestroy {

    subs: Subscription;
    constructor() {
        this.subs = this.regresaObservable()
            .subscribe(
                numero => console.log('subs', numero),
                (err) => console.error('error en el obs', err),
                () => console.log('el observador termino')
            );
    }

    ngOnInit(): void { }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    regresaObservable(): Observable<any> {
        let obs = new Observable<any>(observer => {
            let contador = 0
            let intervalo = setInterval(() => {
                contador += 1;

                const salida = {
                    valor: contador
                };

                observer.next(salida);


            }, 1000)
        }).pipe(
            map((resp => resp.valor)),
            filter((valor, index) => {
                if ((valor % 2) === 1) {
                    return true;
                } else {
                    return false;
                }
            })
        )
        return obs;
    }
}
