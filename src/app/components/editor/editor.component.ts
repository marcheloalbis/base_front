import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { renderAsync } from 'docx-preview';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  text = '';
  result: any = { matches: [] };
  collapsedIndex: number | null = null;
  isDark = false;
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
    const incorrectWord = match.context.text.slice(
      match.context.offset,
      match.context.offset + match.context.length
    );
  
    // Expresión regular para encontrar la palabra exacta y reemplazar solo la primera coincidencia
    const regex = new RegExp(`\\b${incorrectWord}\\b`, 'g');
  
    this.text = this.text.replace(regex, suggestion);
  
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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = async (e: any) => {
      try {
        const arrayBuffer = e.target.result;
        const extractedText = await this.extractTextFromDocx(arrayBuffer);
        this.text = extractedText; // Asignamos el texto al editor
  
        this.checkText(); // Llamar automáticamente al servicio de corrección
      } catch (error) {
        console.error('Error al leer el archivo de Word:', error);
      }
    };
  
    reader.readAsArrayBuffer(file);
  }
  

  async extractTextFromDocx(arrayBuffer: ArrayBuffer): Promise<string> {
    try {
      // Crear un div temporal para renderizar el contenido del .docx
      const tempContainer = document.createElement('div');

      // Renderizar el documento en HTML dentro del div
      await renderAsync(arrayBuffer, tempContainer);

      // Remover estilos y extraer solo el texto visible
      const cleanText = this.getPlainText(tempContainer);

      return cleanText;
    } catch (error) {
      console.error('Error al extraer texto del DOCX:', error);
      return 'Error al extraer texto.';
    }
  }

  /**
   * Extrae solo el texto visible y elimina etiquetas innecesarias.
   */
  getPlainText(container: HTMLElement): string {
    // Removemos todos los elementos `<style>` y `<script>` dentro del documento renderizado
    container.querySelectorAll('style, script').forEach((node) => node.remove());

    // Extraer solo el texto visible del documento sin etiquetas HTML
    return container.innerText.trim();
  }
}
