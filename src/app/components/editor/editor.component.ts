import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  text = '';
  result: any = { matches: [] };
  collapsedIndex: number | null = null;
  isDark = true;
  progressPercent = 81;

  constructor(private http: HttpClient) {}

  // Computed de Vue => Getter en Angular:
  get wordCount(): number {
    return this.text
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;
  }

    getReplacementsText(match: any): string {
    return match.replacements.map((rep: any) => rep.value).join(', ');
  }
  // Equivale a @click="toggleTheme" de Vue
  toggleTheme(): void {
    this.isDark = !this.isDark;
  }

  // Lógica para llamar a LanguageTool con POST
  checkText(): void {
    // Podemos usar fetch() o HttpClient; aquí uso HttpClient
    const body = new HttpParams()
      .set('text', this.text)
      .set('language', 'es');

    this.http
      .post('http://localhost:8010/v2/check', body.toString(), {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      })
      .subscribe({
        next: (data: any) => {
          this.result = data;
        },
        error: (err) => {
          console.error('Error al conectar con LanguageTool:', err);
        },
      });
  }

  // Reemplazar la palabra errónea con la sugerencia elegida
  applySuggestion(match: any, suggestion: string): void {
    const offset = match.context.offset;
    const length = match.context.length;
    const before = this.text.slice(0, offset);
    const after = this.text.slice(offset + length);

    this.text = before + suggestion + after;

    // Volver a chequear el texto tras la corrección
    this.checkText();
  }

  // Mostrar / ocultar detalles
  toggleCollapse(index: number): void {
    this.collapsedIndex = this.collapsedIndex === index ? null : index;
  }

  // Equivale a getErrorLabel de Vue
  getErrorLabel(type: string): string {
    if (!type) return 'Error';
    switch (type.toLowerCase()) {
      case 'misspelling':
        return 'Ortografía';
      case 'grammar':
        return 'Error gramatical';
      case 'style':
        return 'Estilo';
      default:
        return 'Error';
    }
  }

  // Equivale a dotColor de Vue
  dotColor(type: string): string {
    if (!type) return 'dot-default';
    switch (type.toLowerCase()) {
      case 'misspelling':
        return 'dot-pink';
      case 'grammar':
        return 'dot-yellow';
      case 'style':
        return 'dot-purple';
      default:
        return 'dot-default';
    }
  }
}
