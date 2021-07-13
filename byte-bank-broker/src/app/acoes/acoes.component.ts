import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { merge, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { AcoesService } from './acoes.service';

const DEBOUNCE_TIME = 300;

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  acoesInput = new FormControl();
  todasAcoes$ = this.acoesService.getAcoes();

  filtroPeloInput$ = this.acoesInput.valueChanges.pipe(
    debounceTime(DEBOUNCE_TIME),
    distinctUntilChanged(),
    filter(valorDigitado => valorDigitado.length >= 3 || !valorDigitado.length),
    switchMap(valorDigitado => this.acoesService.getAcoes(valorDigitado))
  );

  // $ é uma convenção para indicar um observable
  acoes$ = merge(this.todasAcoes$, this.filtroPeloInput$);

  private subscription: Subscription;

  constructor(private acoesService: AcoesService) { }
}
