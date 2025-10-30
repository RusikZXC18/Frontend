import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
  standalone: true
})
export class ShortenPipe implements PipeTransform {
  transform(value: string, limit: number = 100): string {
    if (!value) return '';
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }

  static testPipe(): void {
    const pipe = new ShortenPipe();
    console.log('▶ Тестування ShortenPipe...');
    const res = pipe.transform('Angular is great framework', 10);
    if (res === 'Angular is...') console.log('✅ Пайп працює');
    else console.error('❌ Помилка пайпа');
  }
}
