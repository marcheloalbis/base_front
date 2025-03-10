import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as mammoth from 'mammoth';
import * as docx from 'docx';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoPage implements OnInit {
  textoHTML: string = '';
  formattedText: string = ''; // Para mostrar el texto corregido en vista previa
  result: any = { matches: [] };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  async onFileSelect(event: any): Promise<void> {
    const file: File = event.target.files[0];

    if (file) {
      const fileType = file.type;

      if (fileType === 'text/plain') {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.textoHTML = e.target.result;
        };
        reader.readAsText(file);
      } else if (fileType === 'application/msword' || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const reader = new FileReader();
        reader.onload = async (e: any) => {
          const arrayBuffer = e.target.result;
          try {
            const result = await mammoth.convertToHtml({ arrayBuffer });
            this.textoHTML = result.value;
          } catch (error) {
            console.error('Error al procesar el archivo DOC/DOCX:', error);
            alert('No se pudo procesar el archivo.');
          }
        };
        reader.readAsArrayBuffer(file);
      } else {
        alert('Por favor, selecciona un archivo de texto (.txt) o documento de Word (.doc, .docx)');
      }
    }
  }

  checkText(): void {
    const body = new HttpParams()
      .set('text', this.textoHTML)
      .set('language', 'es');

    this.http
      .post('http://localhost:8010/v2/check', body.toString(), {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      })
      .subscribe({
        next: (data: any) => {
          console.log('Respuesta de LanguageTool:', data);
          this.result = data;
          this.applyCorrections();
        },
        error: (err) => {
          console.error('Error al conectar con LanguageTool:', err);
        },
      });
  }

  applyCorrections(): void {
    let correctedText = this.textoHTML;

    this.result.matches.forEach((match: any) => {
      const errorWord = match.context.text.substr(match.context.offset, match.context.length);
      const replacement = `<span style="color: red; font-weight: bold;" title="${match.message}">${errorWord}</span>`;
      const regex = new RegExp(errorWord, 'g');
      correctedText = correctedText.replace(regex, replacement);
    });

    this.formattedText = correctedText;
  }

  async downloadAsDocx(): Promise<void> {
    const doc = new docx.Document({
      sections: [
        {
          properties: {},
          children: [
            new docx.Paragraph({
              children: [
                new docx.TextRun(this.textoHTML.replace(/<\/?[^>]+(>|$)/g, '')), // Remover etiquetas HTML
              ],
            }),
          ],
        },
      ],
    });

    const blob = await docx.Packer.toBlob(doc);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'texto-correcciones.docx';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
