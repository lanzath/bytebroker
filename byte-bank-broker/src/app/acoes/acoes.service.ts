import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, pluck } from 'rxjs/operators';
import { Acao, AcoesAPI } from './modelo/acoes';

const API = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(private http: HttpClient) { }

  getAcoes(valor?: string) {
    const params = valor ? new HttpParams().append('valor', valor) : undefined;
    return this.http.get<AcoesAPI>(`${API}/acoes`, { params }).pipe(
      pluck('payload'), // extrai a propriedade de nome 'payload' do objeto.
      map(acoes => acoes.sort((acaoA, acaoB) => this.ordenaPorCodigo(acaoA, acaoB)))
    );
  }

  private ordenaPorCodigo(acaoA: Acao, acaoB: Acao) {
    if (acaoA.codigo > acaoB.codigo) {
      return 1;
    }

    if (acaoA.codigo < acaoB.codigo) {
      return -1;
    }

    return 0;
  }

  /**
   * Um observable é utilizado como recurso reativo para requisições assíncronas
   * que precisam tratar um fluxo/coleção de informações a partir de uma requisição
   * para o back-end.
   */
}
